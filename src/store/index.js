import Vue from "vue";
import Vuex from "vuex";
import fileUpload from "./fileUpload.js";
import calendars from "./calendars.js";
import schedule from "./schedule.js";
import firebase from "./firebase.js";

Vue.use(Vuex);

const state = {
  eventLog: [],
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
  schedule,
};

export default new Vuex.Store({
  state,
  mutations,
  modules,
});
