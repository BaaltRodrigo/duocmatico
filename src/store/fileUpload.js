const state = {
  attemptedFile: null,
  temporaryData: null,
  showModal: false,
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

  setShowModal(state, show) {
    state.showModal = show;
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
