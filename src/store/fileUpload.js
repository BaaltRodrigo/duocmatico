const state = {
  attemptedFile: null,
  temporaryData: null,
};

const getters = {
  careers(state) {
    return [...new Set(state.temporaryData.map((data) => data.carrera))];
  },
};

const mutations = {
  setAttemptedFile(state, file) {
    state.attemptedFile = file;
  },

  setTemporaryData(state, data) {
    state.temporaryData = data;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
