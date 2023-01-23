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
  selected: {},
  shared: {},
};

const getters = {
  /**
   * Used to map all levels of the sections and return an array whit
   * unique levels.
   *
   * @returns {array} Non repetitive levels
   */
  getSemesters({ selected }) {
    const { sections } = selected;
    let allSemesters = sections.map((c) => c.nivel || null);
    return [...new Set(allSemesters)].sort((a, b) => a > b);
  },

  /**
   * Gives an array whit the day shifts for the sections available
   *
   * @returns {array} day shifts
   */
  getTimes({ selected }) {
    const { sections } = selected;
    return [...new Set(sections.map((c) => c.jornada))];
  },
};

const mutations = {
  updateSelectedName(state, name) {
    state.selected.name = name;
  },

  setCalendars(state, calendars) {
    state.all = calendars;
  },

  addCalendar(state, calendar) {
    state.all.push(calendar);
  },

  setSelectedByIndex(state, index) {
    state.selected = state.all[index];
  },

  setShared(state, calendar) {
    state.shared = calendar;
  },

  deleteCalendar(state, index) {
    state.all.splice(index, 1);
  },

  addSectionToSelectedCalendar(state, section) {
    state.selected.sections.push(section);
  },

  addSectionToSharedCalendar(state, section) {
    state.shared.sections.push(section);
  },

  deleteCalendarSection({ selected }, index) {
    selected.sections.splice(index, 1);
  },
};

const actions = {
  addCalendarAction({ commit, dispatch }, calendar) {
    commit("addCalendar", calendar);
    commit("addLogEvent", `Created calendar ${calendar.name}`, {
      root: true,
    });
    dispatch("saveCalendarsToLocalStorage");
  },

  addSectionToSelectedCalendar(
    { state, commit, dispatch, rootState },
    section
  ) {
    // Add color to the section object
    if (!section.color) {
      const { selected } = state;
      const { colors } = rootState;
      const usedColors = selected.sections.map((s) => s.color);
      const unusedColors = colors.filter((c) => !usedColors.includes(c));
      const randomColor =
        unusedColors[Math.floor(Math.random() * unusedColors.length)];
      section.color = randomColor;
    }
    commit("addSectionToSelectedCalendar", section);
    commit("addLogEvent", `Added ${section.seccion} to calendar`, {
      root: true,
    });
    dispatch("saveCalendarsToLocalStorage");
  },

  updateCalendarName({ state, commit, dispatch }, name) {
    const { selected } = state;
    if (selected.name === name) return;

    commit("updateSelectedName", name);

    commit("addLogEvent", `Updated calendar name to: ${name}`, {
      root: true,
    });
    dispatch("saveCalendarsToLocalStorage");
  },

  saveCalendarsToLocalStorage({ commit }) {
    localStorage.calendars = JSON.stringify(state.all);
    commit("addLogEvent", `Updated localStorage calendars`, {
      root: true,
    });
  },

  deleteCalendarAction({ state, commit, dispatch }, index) {
    if (state.all.length < index || index < 0) {
      commit("addLogEvent", `Calendar index to delete out of range`, {
        root: true,
      });
      return;
    }
    const { name } = state.all[index];
    commit("deleteCalendar", index);
    commit("addLogEvent", `Deleted calendar ${name}`, { root: true });
    dispatch("saveCalendarsToLocalStorage");
  },

  deleteSectionToSelectedCalendar({ state, commit, dispatch }, section) {
    const { selected } = state;
    const index = selected.sections.findIndex(
      (s) => s.seccion === section.seccion
    );
    if (index < 0) return;

    commit("deleteCalendarSection", index);
    commit("addLogEvent", `Deleted section ${section.seccion} from calendar`, {
      root: true,
    });
    dispatch("saveCalendarsToLocalStorage");
  },

  loadCalendarsFromLocalStorage({ state, commit }) {
    const { calendars } = localStorage;
    if (calendars) {
      commit("setCalendars", JSON.parse(calendars));
      commit("addLogEvent", `Loaded ${state.all.length} saved calendars`, {
        root: true,
      });
    } else {
      commit("addLogEvent", "No calendars to load", { root: true });
    }
  },

  saveCalendarsToLocalStorageTest({ state }) {
    const { calendars } = state;
    const calendarsSimplified = calendars.map((calendar) => {
      let sections = calendar.sections.map((section) => section.seccion);
      return {
        ...calendar,
        sections: sections,
      };
    });
    // localStorage.calendars = calendarsSimplified;
    console.log(calendarsSimplified);
  },

  setCalendarByIndex({ state, commit, rootState }, index) {
    if (index > state.all.length - 1 || index < 0) {
      commit("setDisplay404", true, { root: true });
      return;
    }
    commit("setSelectedByIndex", index);
    commit("addLogEvent", `Selected calendar number: ${index}`, { root: true });
    const { carrera, carga } = state.selected;
    // Clear firebase sections if carga && carrera have to change
    if (
      rootState.firebase.carga != carga ||
      rootState.firebase.carrera != carrera
    ) {
      commit("firebase/setSecciones", [], { root: true });
      commit("addLogEvent", `Firebase sections cleared`, { root: true });
    }

    // Change the state of firebase module in case user wants to add sections to their calendars
    commit("firebase/setCarga", carga, { root: true });
    commit("addLogEvent", `Carga set to: ${carga}`, { root: true });

    commit("firebase/setCarrera", carrera, { root: true });
    commit("addLogEvent", `Carrera set to: ${carrera}`, { root: true });
  },

  setSharedCalendar({ commit, rootState }, calendar) {
    const { carga, carrera } = calendar;
    commit("setShared", { ...calendar, sections: [] });
    commit("addLogEvent", `Selected calendar to shared`, { root: true });

    if (
      rootState.firebase.carga != carga ||
      rootState.firebase.carrera != carrera
    ) {
      console.log("CARGAS O CARRERA DISTINTA, LIMPIO SECCIONES");
      commit("firebase/setSecciones", [], { root: true });
      commit("addLogEvent", `Firebase sections cleared`, { root: true });
    }

    commit("firebase/setCarga", carga, { root: true });
    commit("addLogEvent", `Carga set to: ${carga}`, { root: true });

    commit("firebase/setCarrera", carrera, { root: true });
    commit("addLogEvent", `Carrera set to: ${carrera}`, { root: true });
  },

  addSectionToSharedCalendar({ state, commit, rootState }, section) {
    const { shared } = state;
    // add color to new section
    const { colors } = rootState;
    const color = colors[shared.sections.length];
    section.color = color;

    // add section to calendar
    commit("addSectionToSharedCalendar", section);
    commit(
      "addLogEvent",
      `Added section ${section.seccion} to shared calendar`,
      { root: true }
    );
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
