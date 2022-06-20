import Section from "@/models/section";

export interface SectionFilters {
  levels: number[];
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
    // Filter by levels
    if (levels.length > 0) {
      filtered = filtered.filter((s: Section) => levels.includes(s.level));
    }

    if (daytimes.length > 0) {
      filtered = filtered.filter((s: Section) => daytimes.includes(s.daytime));
    }

    return filtered;
  },

  // No use for state, but needed to call
  levelsBySections(state: SectionState, getters: any): number[] {
    const allSections: number[] = getters.sectionsByCareer.map(
      (s: Section) => s.level
    );
    return [...new Set(allSections)].sort();
  },

  daytimeBySections(state: SectionState, getters: any): string[] {
    const allDaytimes: string[] = getters.sectionsByCareer.map(
      (s: Section) => s.daytime
    );
    return [...new Set(allDaytimes)];
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
