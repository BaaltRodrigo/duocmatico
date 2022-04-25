import Vue from "vue";
import Vuex from "vuex";
import fileUpload from "./fileUpload.js";

Vue.use(Vuex);

const state = {
  careersData: [],
  career: null,
};

const mutations = {
  setCareersData(state, data) {
    state.careersData = data;
    console.log(data);
  },

  setCareer(state, career) {
    state.career = career;
  },
};

const getters = {
  careerCourses(state) {
    const index = state.careersData.findIndex(
      (c) => c.carrera === state.career
    );
    console.log(index);
    if (index < 0) return [];
    return state.careersData[index].ramos;
  },

  careers(state) {
    return [...new Set(state.careersData.map((data) => data.carrera))];
  },

  semesters(state, getters) {
    let allSemesters = getters.careerCourses.map(
      (course) => course.nivel || null
    );
    return [...new Set(allSemesters)].sort((a, b) => a > b);
  },

  times(state, getters) {
    return [...new Set(getters.careerCourses.map((c) => c.jornada))];
  },
};

const actions = {
  increaseStep(state) {
    state.step++;
  },

  decreaseStep(state) {
    state.setp--;
  },
};

const modules = {
  fileUpload,
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules,
});
