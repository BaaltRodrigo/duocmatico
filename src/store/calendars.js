import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { ApiCalendarService } from "../services/ApiCalendarService";
import { LocalCalendarService } from "../services/LocalCalendarService";

// Services configurations
const apiService = new ApiCalendarService(import.meta.env.VITE_API_URL);
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

  updateApiCalendar(state, calendar) {
    const index = state.apiCalendars.findIndex((c) => c.uuid === calendar.uuid);
    state.apiCalendars.splice(index, 1, calendar);
  },

  // This is used to update a calendar when editing it
  addSection(state, section) {
    state.calendar.sections.push(section);
  },
};

const actions = {
  /**
   * Action to create a calendar either in the API or Locally
   * depending on the token.
   *
   * @param {Object} payload.calendar Calendar to create
   * @param {string} payload.mode api|local to override the token and decide where to create the calendar
   * @return created calendar
   */
  async createCalendar({ commit, rootState }, payload) {
    const { token } = rootState.auth;
    const servicePayload = {
      token, // Api service uses tokens
      calendar: payload.calendar,
    };
    // If payload.mode is set, use that service. Otherwise, token decides
    const service =
      service[payload.mode] || token ? services.api : services.local;

    try {
      const serviceResponse = await service.create(servicePayload);
      commit("setCalendar", serviceResponse);
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
  async deleteCalendar({ rootState }, calendar) {
    const { token } = rootState.auth;
    const { fromApi } = calendar;
    const service = fromApi ? apiService : localService;

    // This should throw an error when calendar is not found
    const deleted = await service.delete({ token, calendar });
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
  async getCalendar({ commit, rootState }, uuid) {
    try {
      const [localCalendar, apiCalendar] = await Promise.all([
        localService.get({ uuid }).catch(() => null),
        apiService.get({ token: rootState.auth.token, uuid }).catch(() => null),
      ]);

      const calendar = localCalendar ?? apiCalendar;
      commit("setCalendar", calendar);
      return calendar;
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Change the states of apiCalendars and localCalendars.
   * If some error happens when getting those calendars, it
   * should be handled separately.
   *
   * TODO: Handle errors properly
   */
  getCalendars({ commit, rootState }) {
    localService
      .index()
      .then((calendars) => {
        console.log("LocalCalendars:", calendars);
        commit("setLocalCalendars", calendars);
      })
      .catch((error) => {
        // Log the error somewhere
        console.log(error);
        commit("setLocalCalendars", []);
      });

    const { token } = rootState.auth;
    apiService
      .index({ token })
      .then((calendars) => {
        commit("setApiCalendars", calendars);
      })
      .catch((error) => {
        // Log the error somewhere
        console.log(error);
        commit("setApiCalendars", []);
      });
  },

  async updateCalendar({ commit, rootState }, calendar) {
    const { fromApi } = calendar;
    const { token } = rootState.auth;
    const service = fromApi ? apiService : localService;

    const updated = await service.update({ token, calendar });

    commit("setCalendar", updated);
    return updated;
  },

  /**
   * This action is used to toggle the privacy of an API calendar.
   * It's a shortcut to update the calendar and set the is_public
   * attribute to the opposite value.
   *
   * @param {*} calendar
   * @returns
   */
  async togglePrivacy({ commit, rootState }, calendar) {
    const { token } = rootState.auth;
    const toggledCalendar = { ...calendar, is_public: !calendar.is_public };

    const updated = await apiService.togglePrivacy({
      token,
      calendar: toggledCalendar,
    });

    commit("setCalendar", updated);
    return updated;
  },
};

/**
 |--------------------------------------------------
 | Local Calendars Actions
 |--------------------------------------------------
 | Here you can find all the actions related to the
 | local calendars. This calendars are the ones
 | that are not stored inside the API.
 */

const localActions = {
  async addLocalCalendar({ commit, dispatch }, calendar) {
    // adds uuid to calendar
    commit("addCalendar", { uuid: uuidv4(), ...calendar });
    dispatch("saveLocalCalendars");
  },

  async deleteLocalCalendar({ state, commit, dispatch }, calendar) {
    const filteredCalendars = state.localCalendars.filter(
      (c) => c.uuid !== calendar.uuid
    );
    commit("setLocalCalendars", filteredCalendars);
    dispatch("saveLocalCalendars");
  },

  async getLocalCalendars({ commit }) {
    const calendars = JSON.parse(localStorage.getItem("calendars")) ?? [];
    commit("setLocalCalendars", calendars);
  },

  async updateLocalCalendar({ state, commit, dispatch }, calendar) {
    const index = state.localCalendars.findIndex(
      (c) => c.uuid === calendar.uuid
    );

    // Cant remember is splice was a destructive method
    state.localCalendars.splice(index, 1, calendar);
    commit("setLocalCalendars", state.localCalendars);
    commit("setCalendar", calendar);
    dispatch("saveLocalCalendars");
  },
  /**
   * This action keep the local storage updated to every change
   * made by the user or duocmatico inside the local calendars.
   *
   * This code was called over and over again, so we moved
   * it to an action.
   */
  async saveLocalCalendars({ state }) {
    localStorage.setItem("calendars", JSON.stringify(state.localCalendars));
  },

  // Is this used?
  async setLocalCalendars({ commit, dispatch }, calendars) {
    commit("setLocalCalendars", calendars);
    dispatch("saveLocalCalendars");
  },
};

/**
 |--------------------------------------------------
 | API Calendars Actions
 |--------------------------------------------------
 | The following actions are the ones related to the
 | calendars that are stored inside the API. This
 | actions commonly needs a token to work.
 */
const apiActions = {
  async createCalendar({ dispatch, commit, rootState }, calendar) {
    const { token } = rootState.auth;
    const response = await apiService.create(token, calendar);
    return response.data;
  },

  async getApiCalendars({ rootState, commit }) {
    try {
      const { token } = rootState.auth;
      const response = await apiService.index(token);

      const calendars = response.data.map((calendar) => {
        return { ...calendar, fromApi: true };
      });

      commit("setApiCalendars", calendars);
      return calendars;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  /**
   * This function is a general way to delete calendars. It first
   * check if the calendar is inside the local calendars.
   * We always check inside the API because the user could have
   * deleted the calendar from the API.
   */
  async deleteCalendar({ commit, dispatch, rootState }, calendar) {
    try {
      // Delete if from the api
      const { token } = rootState.auth;
      const response = await apiService.delete(token, calendar);
      // Do something with the response...
    } catch (error) {
      // If there is an error, the calendar does not exists on API
      // or it's not owned by the user, so we can safely ignore it
    }
  },

  async createCalendar({ dispatch, commit, rootState }, calendar) {
    const { token } = rootState.auth;

    // Code
    try {
      // More code
    } catch (error) {
      // Handle error
      throw new Error("Ups");
    }
    // Create Local Calendar when token is null
    if (!token) {
      commit("addLocalCalendar", {
        ...calendarData,
        fromApi: false,
        is_public: false,
      });
      dispatch("saveLocalCalendars");
      return { ...calendarData, fromApi: false, is_public: false };
    } else {
      try {
        const response = await apiService.create(token, calendar);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },

  async updateCalendar({ commit, dispatch, rootState }, calendar) {
    if (!calendar.fromApi) {
      commit("updateLocalCalendar", calendar);
      dispatch("saveLocalCalendars");
    } else {
      // TODO: Clean this up
      try {
        const { token } = rootState.auth;
        const response = await apiService.update(token, calendar);

        // TODO: send sections to api with an elegant way
        const sectionsId = calendar.sections.map((s) => s.id);
        const sectionsResponse = await axios.put(
          `${rootState.apiUrl}/calendars/${calendar.uuid}/sections`,
          { sections: sectionsId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error(error);
      }
    }
  },

  /**
   * Change the privacy status of the selected calendar.
   *
   * @param {*} uuid
   * @returns Promise
   */
  async togglePrivacy({ state, commit, rootState }, uuid) {
    const calendar = state.apiCalendars.find((c) => c.uuid === uuid);
    if (!calendar) {
      return Promise.reject("Calendar not found");
    }

    const { token } = rootState.auth;
    const response = await apiService.update(token, {
      ...calendar,
      ["is_public"]: !calendar["is_public"],
    });
    const apiCalendar = { ...response.data, fromApi: true };

    commit("updateApiCalendar", apiCalendar);
    commit("setCalendar", apiCalendar);

    return Promise.resolve(apiCalendar);
  },

  async getLocalCalendarByUuid({ state, commit }, uuid) {
    const calendar = state.localCalendars.find((c) => c.uuid === uuid);
    commit("setCalendar", calendar);
  },

  /**
   * Fetch a calendar from the API by its uuid
   * If the calendar is not found, it returns null
   */
  async getApiCalendarByUuid({ commit, rootState }, uuid) {
    try {
      const { token } = rootState.auth;
      const response = await apiService.get(token, uuid);

      commit("setCalendar", { ...response.data, fromApi: true });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  /**
   * The following set of actions are used only to
   * add or remove sections in the calendar editor.
   * They are not used anywhere else.
   */
  async updateSections({ state, dispatch, commit }, sections) {
    const calendar = state.calendar;

    const response = await apiService.updateSections(
      token,
      calendar.uuid,
      sections
    );

    commit("setSections", response.data);
    dispatch("updateCalendar", calendar);
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
