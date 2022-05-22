/**
 * Actually, a schedule is an object like this
 * {
 *  name: String,
 *  sections: Array with sections.
 * }
 */

const state = {
  sections: [],
  colors: [
    "blue accent-1",
    "blue-grey lighten-3",
    "brown lighten-3",
    "deep-orange",
    "green",
    "teal",
    "teal accent-1",
    "indigo accent-1",
    "deep-purple accent-1",
    "pink",
    "light-blue",
    "lime",
    "grey",
  ],
};

const mutations = {
  setSections(state, sections) {
    state.sections = sections;
  },

  addSection(state, section) {
    state.sections.push(section);
  },

  removeSection(state, section) {
    const index = state.sections.findIndex(
      (s) => s.seccion === section.seccion
    );
    console.log(index);
    if (index < 0) return;
    state.sections.splice(index, 1);
  },
};

const getters = {
  usedColors(state) {
    const { sections } = state;
    return sections.map((s) => s.color);
  },
};

const actions = {
  addSection({ state, commit, getters }, section) {
    // Check if section is already in
    const { sections, colors } = state;
    if (sections.find((s) => s.seccion === section.seccion)) return null;

    // Add unique color to section
    const unusedColors = colors.filter((c) => !getters.usedColors.includes(c));
    const randomColor =
      unusedColors[Math.floor(Math.random() * unusedColors.length)];

    commit("addSection", { ...section, color: randomColor });
    localStorage.schedule = JSON.stringify(sections);
    return sections;
  },

  removeSection({ state, commit }, section) {
    commit("removeSection", section);
    const { sections } = state;
    localStorage.schedule = JSON.stringify(sections);
    return sections;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
