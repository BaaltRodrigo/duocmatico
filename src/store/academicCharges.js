import axios from "axios";

const state = {
  academicCharges: [],
  academicCharge: null,
};

const mutations = {
  clearState(state) {
    state.academicCharges = [];
    state.academicCharge = null;
  },

  setCharges(state, charges) {
    state.academicCharges = charges;
  },

  setCharge(state, charge) {
    state.academicCharge = charge;
  },
};

const actions = {
  async getAcademicCharges({ rootState, commit }) {
    const response = await axios.get(`${rootState.apiUrl}/academic-charges`);

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
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
