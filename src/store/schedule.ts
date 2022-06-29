import { ExcelFileRow } from "@/helpers/fileConverter";
import Section from "@/models/section";
import { RootState } from ".";

/**
 * Actually, a schedule is an object like this
 * {
 *  name: String,
 *  sections: Array with sections.
 * }
 */
export interface CalendarState {
  sections: Section[];
  colors: string[];
}

const state: CalendarState = {
  sections: [],
  colors: [
    "blue accent-1",
    "blue-grey lighten-3",
    "brown lighten-3",
    "deep-orange",
    "green",
    "teal",
    "teal accent-4",
    "indigo accent-1",
    "deep-purple accent-1",
    "pink",
    "light-blue",
    "lime darken-3",
    "grey",
  ],
};

const mutations = {
  setSections(state: CalendarState, sections: Section[]) {
    state.sections = sections;
  },

  addSection(state: CalendarState, section: Section) {
    state.sections.push(section);
  },

  removeSection(state: CalendarState, section: Section) {
    const index = state.sections.findIndex(
      (s) => s.section === section.section
    );
    // console.log(index);
    if (index < 0) return;
    state.sections.splice(index, 1);
  },
};

const getters = {
  usedColors(state: CalendarState): string[] {
    const { sections } = state;
    return sections.map((s: Section) => s.color) as string[];
  },
};

const actions = {
  addSection(
    {
      state,
      commit,
      getters,
    }: { state: CalendarState; commit: Function; getters: any },
    section: Section
  ) {
    // Check if section is already in
    const { sections, colors } = state;
    if (sections.find((s: Section) => s.section === section.section)) {
      return null;
    }

    // Add unique color to section
    const unusedColors = colors.filter((c) => !getters.usedColors.includes(c));
    const randomColor =
      unusedColors[Math.floor(Math.random() * unusedColors.length)];
    section.setColor(randomColor);
    commit("addSection", section);
    const rows = sections.map((s: Section) => s.excelRows);
    localStorage.schedule = JSON.stringify(rows.flat());
    return sections;
  },

  removeSection(
    {
      state,
      commit,
      dispatch,
    }: { state: CalendarState; commit: Function; dispatch: Function },
    section: Section
  ) {
    commit("removeSection", section);
    const { sections } = state;
    const rows = sections.map((s: Section) => s.excelRows);
    localStorage.schedule = JSON.stringify(rows.flat());
    return sections;
  },

  /**
   * For every section added to the calendar, save on localStorage
   * all the rows that includes information of that section
   *
   */
  sectionRowsToLocaleStorage({
    state,
    rootState,
  }: {
    state: CalendarState;
    rootState: RootState;
  }) {
    const { sections } = state;
    const { xslxRows } = rootState;
    const rowsToSave: ExcelFileRow[] = [];
    sections.forEach((s: Section) => {
      rowsToSave.concat(
        xslxRows.filter((row: ExcelFileRow) => row.section === s.section)
      );
    });
    localStorage.scheduleRows = JSON.stringify(rowsToSave);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
