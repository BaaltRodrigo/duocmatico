import Section from "@/models/section";

export interface SectionState {
  sections: Section[];
  career: string | null;
}

const state: SectionState = {
  sections: [],
  career: null,
};

const getters = {
  getCareers(state: SectionState): string[] {
    return [...new Set(state.sections.map((s: Section) => s.career))];
  },

  getCareerSections(state: SectionState): Section[] {
    return state.sections.filter((s: Section) => s.career === state.career);
  },
};

const mutations = {
  setSections(state: SectionState, sections: Section[]) {
    state.sections = sections;
  },

  setCareer(state: SectionState, career: string) {
    state.career = career;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
