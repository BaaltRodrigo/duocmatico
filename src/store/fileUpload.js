import {
  mapFileContent,
  groupBySections,
  groupByCareer,
} from "../helpers/fileConverter.js";

const state = {
  all: [],
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
  addFilesToConvert(state, files) {
    let filesWhitFlags = files.map((file) => {
      console.log(file);
      return { fileData: file, error: false, conversion: null };
    });
    state.all = [...state.all, ...filesWhitFlags];
    console.log(state.all);
  },

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

const actions = {
  startFileConversion({ state, commit }, filesToConvert) {
    commit("addFilesToConvert", filesToConvert);

    const notConverted = state.all.filter(
      (file) => !file.conversion || file.error
    );

    notConverted.forEach(async (file) => {
      let fileContent = await mapFileContent(file.fileData);
      let dataBySections = groupBySections(fileContent);
      let dataByCareer = groupByCareer(dataBySections);

      // updated data
      file.error = false;
      file.conversion = dataByCareer;
      console.log(file.fileData.name, dataByCareer);
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
