import axios from "axios";

const state = {
  academicCharges: [],
  academicCharge: null,
};

const getters = {
  sectionsGroupedByCourse({ secciones }) {
    const courses = [...new Set(secciones.map((s) => s.asignatura))];
    return courses.map((name) => {
      const sections = secciones.filter((s) => s.asignatura === name);
      return {
        name: name,
        initials: sections[0].sigla,
        sections,
      };
    });
  },
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
    const request = {
      url: `${rootState.apiUrl}/academic-charges`,
      method: "GET",
    };
    const response = await axios(request);

    console.log("Academi charges:", response.data.charges);
    commit("setCharges", response.data.charges);
    commit("addLogEvent", `Academic charges loaded from the API`, {
      root: true,
    });
  },

  async getAcademicCharge({ rootState, commit }, id) {
    const request = {
      url: `${rootState.apiUrl}/academic-charges/${id}`,
      method: "GET",
    };
    const response = await axios(request);

    commit("setCharge", response.data);
    commit("addLogEvent", `Academic charge loaded from the API`, {
      root: true,
    });
  },
};

export default {
  namespaced: true,
  state,
  // getters,
  actions,
  mutations,
};
