/**
 * Calendar schema
 * {
 *    name: string
 *    carga: string,
 *    carrera: string
 *    sections: []
 * }
 */

const state = {
  all: [],
  selected: null,
};

const mutations = {
  setCalendars(state, calendars) {
    state.all = calendars;
  },

  addCalendar(state, calendar) {
    state.all.push(calendar);
    localStorage.calendars = JSON.stringify(state.all);
  },

  deleteCalendar(state, index) {
    state.all.splice(index, 1);
    localStorage.calendars = JSON.stringify(state.all);
  },

  addSection(state, section) {
    state.selected.sections.push(section);
  },

  deleteSection({ selected }, section) {
    const index = selected.sections.findIndex(
      (s) => s.seccion === section.seccion
    );
    if (index < 0) return;
    selected.sections.splice(index, 1);
  },
};

const actions = {
  loadCalendarsFromLocalStorage({ commit }) {
    const { calendars } = localStorage;
    if (calendars) {
      commit("setCalendars", JSON.parse(calendars));
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
