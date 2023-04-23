<template>
  <v-app>
    <the-header></the-header>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import TheSidebar from "./components/TheSidebar.vue";

export default {
  name: "App",

  components: {
    TheHeader,
    TheSidebar,
  },

  data: () => ({
    //
  }),

  async mounted() {
    // get load saved local calendars
    await this.$store.dispatch("calendars/getLocalCalendars");
  },
};
</script>
