import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  subioArchivo: false,
  disponibles: [],
};

const mutations = {
  setDisponibles(state, disponibles) {
    state.disponibles = disponibles;
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
