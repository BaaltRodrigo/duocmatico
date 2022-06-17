import Section from "@/models/section";

export interface SectionFilters {
  levels: string[];
  daytimes: string[];
}

export interface SectionState {
  sections: Section[];
  career: string | null;
  filters: SectionFilters;
}

const state: SectionState = {
  sections: [], // All sections from xlsx
  career: null, // Selected Career
  filters: {
    levels: [],
    daytimes: [],
  },
};

const getters = {
  getCareers({ sections }: SectionState): string[] {
    return [...new Set(sections.map((s: Section) => s.career))];
  },

  sectionsByCareer({ career }: SectionState): Section[] {
    return state.sections.filter((s: Section) => s.career === career);
  },

  // Uses SectionFilters
  filteredSections({ filters }: SectionState, getters: any): Section[] {
    const { levels, daytimes } = filters;
    let filtered = getters.sectionsByCareer;
    console.log("All sections", filtered);
    // Filter by levels
    if (levels.length > 0) {
      filtered = filtered.filter((s: Section) =>
        levels.includes(String(s.level))
      );
      console.log("After levels", filtered);
    }

    if (daytimes.length > 0) {
      filtered = filtered.filter((s: Section) => daytimes.includes(s.daytime));
      console.log("After daytimes ", filtered);
    }

    return filtered;
  },

  // No use for state, but needed to call
  levelsBySections(state: SectionState, getters: any): string[] {
    return getters.getCareerSections.map((s: Section) => String(s.level));
  },

  daytimeBySections(state: SectionState, getters: any): string[] {
    return getters.getCareerSections.map((s: Section) => s.daytime);
  },
};

const mutations = {
  setSections(state: SectionState, sections: Section[]) {
    state.sections = sections;
  },

  setCareer(state: SectionState, career: string) {
    state.career = career;
    localStorage.selectedCareer = career; // May move this in the future
  },

  setFilters(state: SectionState, filters: SectionFilters) {
    state.filters = filters;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
