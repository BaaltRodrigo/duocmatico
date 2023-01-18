<template>
  <v-app>
    <the-header></the-header>
    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
// import { version } from "../package";
import TheHeader from "./components/TheHeader.vue";

// import cargaAcademica from "../public/cargas-academicas/2023-1 SAN-JOAQUIN.json";

export default {
  name: "App",

  components: {
    TheHeader,
  },

  data: () => ({
    //
  }),

  methods: {
    ...mapMutations(["addLogEvent"]),
    ...mapActions(["findCareerData"]),
    ...mapActions("calendars", ["loadCalendarsFromLocalStorage"]),
    ...mapActions("firebase", ["uploadCargaAcademica2"]),
    ...mapMutations("schedule", ["setSections"]),

    loadSavedSchedule() {
      const schedule = localStorage.schedule;
      if (!schedule) return;

      this.setSections(JSON.parse(schedule));
    },
  },

  async mounted() {
    // Check LocalStorage for xlsxJsonData
    // console.log(cargaAcademica);
    // await this.uploadCargaAcademica2(cargaAcademica);
  },

  created() {
    this.addLogEvent("Creating application");
    // Clean the localStorage every time there is a major update
    // By every time I mean, every time we do a change on how the
    // xslx file is readed.
    // if (!(version == localStorage.lastVersion)) {
    //   localStorage.clear();
    // }
    // this.loadSavedSchedule();
    this.loadCalendarsFromLocalStorage();
  },
};
</script>
