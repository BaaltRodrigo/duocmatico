import axios from "axios";
import { auth } from "../config/firebase";

const state = {
  academicCharges: [],
  academicCharge: null,
  sections: [],
};

const mutations = {
  setCharges(state, charges) {
    state.academicCharges = charges;
  },

  addCharge(state, charge) {
    state.academicCharges.push(charge);
  },

  updateCharge(state, charge) {
    const index = state.academicCharges.findIndex(
      (item) => item.id === charge.id
    );
    state.academicCharges.splice(index, 1, charge);
  },

  setCharge(state, charge) {
    state.academicCharge = charge;
  },

  setSections(state, sections) {
    state.sections = sections;
  },
};

const actions = {
  async getAcademicCharges({ rootState, commit }, payload = {}) {
    const response = await axios.get(`${rootState.apiUrl}/academic-charges`, {
      params: {
        ...payload,
      },
    });

    commit("setCharges", response.data.charges);
    commit("addLogEvent", `Academic charges loaded from the API`, {
      root: true,
    });
  },

  async getAcademicCharge({ rootState, commit }, id) {
    const response = await axios.get(
      `${rootState.apiUrl}/academic-charges/${id}`
    );

    commit("setCharge", response.data);
    commit("addLogEvent", `Academic charge loaded from the API`, {
      root: true,
    });
  },

  /**
   * Sent the csv data related from an academic charge xlsx file
   * into the database.
   *
   * This return may change to a response for a job in the queue
   * @return { Promise } The response from the API
   */
  async uploadAcademicChargeFile({ rootState, commit }, payload) {
    if (!payload) {
      // Use the error to show a message to the user
      commit("addLogEvent", `Missing params for uploadAcademicChargeFile`, {
        root: true,
      });
      return;
    }

    const token = await auth.currentUser.getIdToken();
    const route = `${rootState.apiUrl}/academic-charges/`;

    // send the payload as a file to the api route using token as a bearer
    const response = await axios.post(route, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    commit("addLogEvent", `Academic charge file uploaded to the API`, {
      root: true,
    });
    commit("addCharge", response.data);
  },

  async updateAcademicCharge({ rootState, commit }, payload) {
    if (!payload.id) {
      // Use the error to show a message to the user
      commit("addLogEvent", `Missing params for updateAcademicCharge`, {
        root: true,
      });
      return;
    }

    const token = await auth.currentUser.getIdToken();

    const route = `${rootState.apiUrl}/academic-charges/${payload.id}`;

    const response = await axios.patch(route, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    commit("addLogEvent", `Academic charge updated to the API`, {
      root: true,
    });

    commit("setCharge", response.data);
  },

  /**
   * This action is used when we want to add sections to a calendar.
   * Use it wisely, as this action will fetch plenty of data from the API.
   * payload must contain:
   * - academicChargeId
   * - calendarableId
   * - calendarableType
   *
   * @param { Object } payload The payload object
   * @param { Number } payload.academicChargeId The academic charge id
   * @param { Number } payload.calendarableId The calendarable id
   * @param { String } payload.calendarableType The calendarable type  school | career
   */
  async getSections({ rootState, commit }, payload) {
    const { academicChargeId, calendarableId, calendarableType } = payload;
    if (!(academicChargeId && calendarableId && calendarableType)) {
      // Early exist for missing params
      commit("addLogEvent", `Missing params for getSections`, {
        root: true,
      });
      commit("set404", true, { root: true });
      return;
    }

    const route = `${rootState.apiUrl}/academic-charges/${academicChargeId}/sections`;
    const response = await axios.get(route, {
      params: {
        resource_id: calendarableId,
        resource_type: calendarableType,
      },
    });

    commit("setSections", response.data);
    commit("addLogEvent", `Sections loaded from the API`, {
      root: true,
    });
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
