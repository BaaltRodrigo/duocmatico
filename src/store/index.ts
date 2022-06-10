import Vue from "vue";
import Vuex from "vuex";
import fileUpload from "./fileUpload";
import sections from "./sections";
import courses from "./courses";
import schedule from "./schedule";

Vue.use(Vuex);

export interface RootState {
  careersData: any[];
  career: string | null;
}

const state: RootState = {
  careersData: [],
  career: null,
};

const mutations = {
  setCareersData(state: RootState, data: any) {
    state.careersData = data;
  },
};

const getters = {
  careerCourses(state: RootState) {
    const index = state.careersData.findIndex(
      (c) => c.carrera === state.career
    );
    // console.log(index);
    if (index < 0) return [];
    return state.careersData[index].ramos;
  },

  careers(state: RootState) {
    return [...new Set(state.careersData.map((data) => data.carrera))];
  },

  semesters(state: RootState, getters: any) {
    const allSemesters = getters.careerCourses.map(
      (course) => course.nivel || null
    );
    return [...new Set(allSemesters)];
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

  findCareerData({ state }, career) {
    const index = state.careersData.findIndex((c) => c.carrera === career);
    return state.careersData[index] || [];
  },
};

const modules = {
  fileUpload,
  sections,
  schedule,
  courses,
};

export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules,
});
