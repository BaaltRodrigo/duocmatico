import Vue from "vue";
import Vuex from "vuex";
import fileUpload from "./fileUpload";
import sections from "./sections";
import schedule from "./schedule";
import { ExcelFileRow } from "@/helpers/fileConverter";
import Section from "@/models/section";

Vue.use(Vuex);

export interface RootState {
  xslxRows: ExcelFileRow[];
}

const state: RootState = {
  xslxRows: [],
};

const mutations = {
  setXslxRows(state: RootState, rows: ExcelFileRow[]) {
    state.xslxRows = rows;
  },
};

const actions = {
  sectionRows(
    { state }: { state: RootState },
    section: Section
  ): ExcelFileRow[] {
    return state.xslxRows.filter(
      (row: ExcelFileRow) => row.section === section.section
    );
  },
};

const modules = {
  fileUpload,
  sections,
  schedule,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules,
});
