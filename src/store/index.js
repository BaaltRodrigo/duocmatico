import { createStore } from "vuex";
import authModule from "./auth";
import academicChargesModule from "./academicCharges";
import calendarModule from "./calendars";

const state = {
  eventLog: [],
  apiUrl: import.meta.env.VITE_API_URL,
};

const mutations = {
  addLogEvent(state, event) {
    const eventDate = new Date();
    state.eventLog.push(`[${eventDate.toISOString()}] ${event}`);
    // console.log(state.eventLog);
  },
};

const actions = {};

const modules = {
  academicCharges: academicChargesModule,
  calendars: calendarModule,
  auth: authModule,
};

const store = createStore({ state, mutations, actions, modules });

export default store;
