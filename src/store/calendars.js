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
    state.localCalendars = calendars;
  },

  setApiCalendars(state, calendars) {
    state.apiCalendars = calendars;
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

    try {
      const serviceResponse = await service.create(calendar);
      // commit("setCalendar", serviceResponse);
      return serviceResponse;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  /**
   * Deletes a calendar from where the calendar lives. Locally or in the API.
   * @param {string} uuid
   * @returns
   */
  async deleteCalendar(_, calendar) {
    // check if payload source exist in CALENDAR_SOURCES
    if (!Object.values(CALENDAR_SOURCES).includes(calendar.source)) {
      throw new Error("Invalid calendar source");
    }

    // _ as first because we don't need the state
    const service = services[calendar.source];

    // This should throw an error when calendar is not found
    const deleted = await service.delete(calendar);
    return deleted;
  },

  /**
   * Search for a calendar with given uuid.
   * We search locally and inside the API for the calendar.
   * And always prioritize local calendars over the API ones.
   *
   * @param {string} uuid The uuid for a desired calendar
   * @returns Calendar or null if not found
   */
  async getCalendar({ commit }, uuid) {
    try {
      // We always get an error from one service, so we need to handle it
      // to not break the App, as a calendar cannot exist in both services
      const [localCalendar, apiCalendar] = await Promise.all([
        localService.get(uuid).catch(() => null),
        apiService.get(uuid).catch(() => null),
      ]);

      const calendar = localCalendar ?? apiCalendar;
      commit("setCalendar", calendar);
      return calendar;
    } catch (error) {
      // console.log(error);
      return null;
    }
  },

  /**
   * Change the states of apiCalendars and localCalendars.
   * If some error happens when getting those calendars, it
   * should be handled separately.
   *
   * TODO: Handle errors properly
   */
  async getCalendars({ commit }) {
    // Local calendars should never throw an error...
    const locals = await localService.index();
    commit("setLocalCalendars", locals);

    try {
      if (!auth.currentUser) return; // Not logged so not api calendars
      const apiCalendars = await apiService.index();
      commit("setApiCalendars", apiCalendars);
    } catch (error) {
      // Handle the error properly
      // Possible errors:
      // - No token
      // - Invalid token
      // - Network error
      // - Server error
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
