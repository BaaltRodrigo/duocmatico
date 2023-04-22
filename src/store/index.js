import { createStore } from "vuex";
import academicChargesModule from "./academicCharges";

const state = {
  eventLog: [],
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
};

const store = createStore({ state, mutations, actions, modules });

export default store;
