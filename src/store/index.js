import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  subioArchivo: false,
  cursos: [],
};

const mutations = {
  setCursos(state, cursos) {
    state.cursos = cursos;
  }
};

const actions = {};

const modules = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
});
