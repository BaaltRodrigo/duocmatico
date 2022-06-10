export interface UploadFileState {
  attemptedFile: File | null;
  temporaryData: any[];
  showModal: Boolean;
}

const state: UploadFileState = {
  attemptedFile: null,
  temporaryData: [],
  showModal: false,
};

const getters = {
  careers(state: UploadFileState) {
    return [...new Set(state.temporaryData.map((data) => data.carrera))];
  },
};

const mutations = {
  setAttemptedFile(state: UploadFileState, file: File) {
    state.attemptedFile = file;
  },

  setTemporaryData(state: UploadFileState, data: any[]) {
    state.temporaryData = data;
  },

  setShowModal(state: UploadFileState, show: Boolean) {
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
