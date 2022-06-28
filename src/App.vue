<template>
  <v-app>
    <the-header></the-header>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import { version } from "../package";
import TheHeader from "./components/TheHeader.vue";
import Section from "./models/section";

export default Vue.extend({
  name: "App",

  components: {
    TheHeader,
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapState(["xlsxRows"]),
  },

  methods: {
    ...mapMutations("sections", ["setSections", "setCareer"]),

    loadExcelData() {
      if (!localStorage.excelRows) return;
      const excelRows = JSON.parse(localStorage.excelRows);
      const sections = Section.mapFromExcelRows(excelRows);

      this.setSections(sections);
      console.log("Load sections:", sections);
    },

    loadSavedSchedule() {
      const schedule = localStorage.schedule;

      const scheduledSections = Section.mapFromExcelRows(JSON.parse(schedule));
      console.log("Saved schedule:", scheduledSections);
      this.$store.commit("schedule/setSections", scheduledSections);
    },
  },

  async mounted() {
    // Check LocalStorage for xlsxJsonData
  },

  created() {
    // Clean the localStorage every time there is a major update
    // By every time I mean, every time we do a change on how the
    // xslx file is read.
    const subVersions = version.split(".");
    if (subVersions[0] != "2") {
      localStorage.clear();
    }

    // We can do this without any data because it will resolve into null or undefined
    const { selectedCareer, excelRows } = localStorage;
    this.setCareer(selectedCareer);

    const sections = Section.mapFromExcelRows(JSON.parse(excelRows));
    this.setSections(sections);

    console.log("Loaded Sections:", sections);

    this.loadSavedSchedule();
  },
});
</script>
