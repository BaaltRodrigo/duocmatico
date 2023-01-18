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
import TheHeader from "./components/TheHeader.vue";

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
  },

  created() {
    this.addLogEvent("Creating application");

    this.loadCalendarsFromLocalStorage();
  },
};
</script>
