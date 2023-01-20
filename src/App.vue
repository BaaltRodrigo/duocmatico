<template>
  <v-app>
    <the-header></the-header>
    <v-main class="background">
      <dm-error404 v-if="display404"></dm-error404>
      <router-view v-else />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import DmError404 from "./views/DmError404.vue";
import TheHeader from "./components/TheHeader.vue";

export default {
  name: "App",

  components: {
    DmError404,
    TheHeader,
  },

  computed: {
    ...mapState(["display404"]),
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
