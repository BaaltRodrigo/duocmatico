/**
 * Actually, a schedule is an object like this
 * {
 *  name: String,
 *  sections: Array with sections.
 * }
 */

const state = {
  sections: [],
};

const mutations = {
  addSection(state, section) {
    // If sections already includes the new one, we simply don't
    if (state.sections.find((s) => s.seccion === section.seccion)) return;
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

export default {
  namespaced: true,
  state,
  mutations,
};
