const state = {
  career: null,
  courses: [],
  filters: {
    semesters: [],
    times: [],
  },
};

const getters = {
  /**
   * Usado para mapear todos los semestres dentro de los ramos de una carrera
   * sin repetirlos
   *
   * @param {*} state
   * @returns {array} Semestres disponibles en los cursos sin repetirlos
   */
  getSemesters(state) {
    let allSemesters = state.courses.map((c) => c.nivel || null);
    return [...new Set(allSemesters)].sort((a, b) => a > b);
  },

  /**
   *
   * @param {*} state
   * @returns {array} jornadas disponibles sin repetir
   */
  getTimes(state) {
    return [...new Set(state.courses.map((c) => c.jornada))];
  },
};

const mutations = {
  setCareer(state, career) {
    state.career = career;
  },

  setCourses(state, courses) {
    state.courses = courses;
  },

  setFilters(state, filters) {
    state.filters = {
      ...state.filters,
      ...filters,
    };
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
};
