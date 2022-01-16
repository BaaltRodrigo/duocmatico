import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  subioArchivo: false,
  disponibles: [],
  carrera: null,
};

const mutations = {
  setDisponibles(state, disponibles) {
    state.disponibles = disponibles;
  },

  setCarrera(state, carrera) {
    state.carreraSeleccionada = carrera;
  },
};

const actions = {};

const modules = {};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
});
