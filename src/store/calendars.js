import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ApiCalendarService } from "../services/ApiCalendarService";
import { LocalCalendarService } from "../services/LocalCalendarService";
import { CALENDAR_SOURCES } from "../helpers/constants";
import { auth } from "../config/firebase";

// Services configurations
const apiService = new ApiCalendarService(import.meta.env.VITE_API_URL, auth);
const localService = new LocalCalendarService();
const services = { api: apiService, local: localService };

const state = {
  localCalendars: [], // Starts empty, then gets populated with the calendars from the local storage
  apiCalendars: [],
  calendar: null,
};

const mutations = {
  setLocalCalendars(state, calendars) {
    state.localCalendars = [...calendars];
  },

  setApiCalendars(state, calendars) {
    state.apiCalendars = [...calendars];
  },

  setCalendar(state, calendar) {
    state.calendar = calendar;
  },

  updateLocalCalendar(state, calendar) {
    const index = state.localCalendars.findIndex(
      (c) => c.uuid === calendar.uuid
    );
    state.localCalendars.splice(index, 1, calendar);
  },

  updateApiCalendar(state, calendar) {
    const index = state.apiCalendars.findIndex((c) => c.uuid === calendar.uuid);
    state.apiCalendars.splice(index, 1, calendar);
  },

  // This is used to update a calendar when editing it
  addSection(state, section) {
    state.calendar.sections.push(section);
  },

  removeSection(state, section) {
    const index = state.calendar.sections.findIndex((s) => s.id === section.id);
    state.calendar.sections.splice(index, 1);
  },
};

const actions = {
  /**
   * Action to create a calendar either in the API or Locally
   * depending on the calendar source
   *
   * The calendar source is defined where the action is used
   *
   * @param {Object} calendar Calendar to create
   * @return created calendar
   */
  async createCalendar({ commit }, calendar) {
    // check if payload source exist in CALENDAR_SOURCES
    if (!Object.values(CALENDAR_SOURCES).includes(calendar.source)) {
      throw new Error("Invalid calendar source");
    }

    const service = services[calendar.source];
    console.log("Api calendars", state.apiCalendars);

    try {
      const serviceResponse = await service.create(calendar);

      console.log(serviceResponse);

      const mutation =
        calendar.source === CALENDAR_SOURCES.API
          ? { name: "setApiCalendars", calendars: [...state.apiCalendars] }
          : { name: "setLocalCalendars", calendars: [...state.localCalendars] };

      console.log(mutation);
      commit(mutation.name, [...mutation.calendars, serviceResponse]);

      return serviceResponse;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  /**
   * Deletes a calendar from where the calendar lives. Locally or in the API.
   * It change the states of apiCalendars and localCalendars.
   *
   * @param {string} uuid
   * @returns
   */
  async deleteCalendar({ commit, state }, calendar) {
    // check if payload source exist in CALENDAR_SOURCES
    if (!Object.values(CALENDAR_SOURCES).includes(calendar.source)) {
      throw new Error("Invalid calendar source");
    }

    const service = services[calendar.source];

    // This should throw an error when calendar is not found
    const deleted = await service.delete(calendar);

    // Mutation to update the calendar list
    const mutation =
      calendar.source === CALENDAR_SOURCES.API
        ? { name: "setApiCalendars", calendars: state.apiCalendars }
        : { name: "setLocalCalendars", calendars: state.localCalendars };

    commit(
      mutation.name,
      mutation.calendars.filter((c) => c.uuid !== calendar.uuid)
    );

    return deleted;
  },

  /**
   * Search for a calendar with given uuid.
   * We search locally and inside the API for the calendar.
   * And always prioritize local calendars over the API ones.
   *
   * @param {string} payload.source The source of the calendar. Either "local" or "api"
   * @param {string} payload.uuid The uuid for a desired calendar
   * @returns Calendar or null if not found
   */
  async getCalendar({ commit }, payload) {
    if (!Object.values(CALENDAR_SOURCES).includes(payload.source)) {
      throw new Error("Invalid calendar source");
    }

    // This two lines may fail if the calendar is not found
    try {
      const service = services[payload.source];
      const calendar = await service.get(payload.uuid);

      commit("setCalendar", calendar);
      return calendar;
    } catch (error) {
      return null;
    }
  },

  /**
   * Change the states of apiCalendars and localCalendars.
   * If some error happens when getting those calendars, it
   * should be handled separately.
   *
   * @param {string} payload.source The source of the calendar. Either "local" or "api"
   */
  async getCalendars({ commit }, payload) {
    if (!Object.values(CALENDAR_SOURCES).includes(payload.source)) {
      throw new Error("Invalid calendar source");
    }

    try {
      const service = services[payload.source];
      const calendars = await service.index();

      const mutation =
        payload.source === CALENDAR_SOURCES.API
          ? "setApiCalendars"
          : "setLocalCalendars";
      commit(mutation, calendars);

      return calendars;
    } catch (error) {
      // Handle the error properly
      // Possible errors:
      // - No token
      // - Invalid token
      // - Network error
      // - Server error
      return [];
    }
  },

  /**
   * Updates a calendar from the local storage or the API.
   * The calendar source is defined where the action is used.
   *
   * @param {Object} calendar
   * @returns The updated calendar
   */
  async updateCalendar({ commit }, calendar) {
    // check if payload source exist in CALENDAR_SOURCES
    if (!Object.values(CALENDAR_SOURCES).includes(calendar.source)) {
      throw new Error("Invalid calendar source");
    }

    const service = services[calendar.source];

    const updated = await service.update(calendar);

    const updateMutation =
      calendar.source === CALENDAR_SOURCES.API
        ? "updateApiCalendar"
        : "updateLocalCalendar";
    commit("setCalendar", updated);
    commit(updateMutation, updated);
    return updated;
  },

  /**
   * This action is used to toggle the privacy of an API calendar.
   * It's a shortcut to update the calendar and set the is_public
   * attribute to the opposite value.
   *
   * @param {Object} calendar
   * @returns
   */
  async togglePrivacy({ commit }, calendar) {
    const toggledCalendar = { ...calendar, is_public: !calendar.is_public };

    const updated = await apiService.update(toggledCalendar);

    commit("setCalendar", updated);
    commit("updateApiCalendar", updated);
    return updated;
  },

  /**
   * This action is used to add a section to a calendar.
   * When the calendar is local, we dispatch updateCalendar
   *
   * @param {Object} payload
   * @returns
   */
  async addSections({ commit, dispatch }, calendar) {
    // Local calendars are updated differently
    if (calendar.source === CALENDAR_SOURCES.LOCAL) {
      return dispatch("updateCalendar", calendar);
    }

    const updated = await apiService.updateSections(calendar);

    // commit("setCalendar", updated);
    commit("updateApiCalendar", updated);
    return updated;
  },
};

const getters = {
  // Get the last N calendars from a source
  lastCalendars: (state) => (payload) => {
    if (!Object.values(CALENDAR_SOURCES).includes(payload.source)) {
      throw new Error("Invalid calendar source");
    }

    const source = payload.source === CALENDAR_SOURCES.API ? "api" : "local";
    // A copy of the array reversed to show the last calendars first
    const calendars = [...state[`${source}Calendars`]].reverse();

    return calendars.slice(0, payload.limit);
  },

  calendarExists: (state) => (uuid) => {
    const existsLocally = state.localCalendars.some(
      (calendar) => calendar.uuid === uuid
    );

    const existsInApi = state.apiCalendars.some(
      (calendar) => calendar.uuid === uuid
    );

    return existsLocally || existsInApi;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
