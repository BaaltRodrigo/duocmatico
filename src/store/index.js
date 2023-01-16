import Vue from "vue";
import Vuex from "vuex";
import fileUpload from "./fileUpload.js";
import calendars from "./calendars.js";
import firebase from "./firebase.js";

Vue.use(Vuex);

const state = {
  eventLog: [],
  colors: [
    "blue accent-1",
    "blue-grey lighten-3",
    "brown lighten-3",
    "deep-orange",
    "green",
    "teal",
    "teal accent-4",
    "indigo accent-1",
    "deep-purple accent-1",
    "pink",
    "light-blue",
    "lime darken-3",
    "grey",
  ],
};

const mutations = {
  addLogEvent(state, event) {
    const eventDate = new Date();
    state.eventLog.push(`[${eventDate.toISOString()}] ${event}`);
    console.log(state.eventLog);
  },
};

const modules = {
  calendars,
  firebase,
  fileUpload,
};

export default new Vuex.Store({
  state,
  mutations,
  modules,
});
