<template>
  <v-app>
    <the-header></the-header>
    <dm-section-selector-nav></dm-section-selector-nav>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { useDisplay } from "vuetify";
import TheHeader from "./components/TheHeader.vue";
import TheSidebar from "./components/TheSidebar.vue";
import DmSectionSelectorNav from "./components/sections/DmSectionSelectorNav.vue";

export default {
  name: "App",

  components: {
    DmSectionSelectorNav,
    TheHeader,
    TheSidebar,
  },

  data: () => ({
    //
  }),

  provide() {
    const { mobile } = useDisplay();
    return {
      isMobile: mobile.value,
    };
  },

  async created() {
    // get load saved local calendars
    await this.$store.dispatch("calendars/getLocalCalendars");
    // add uuid to all calendars without uuid
    await this.$store.dispatch("calendars/addUuidToCalendars");
  },
};
</script>

<style>
/* Set the style for the entire scrollbar */
::-webkit-scrollbar {
  width: 5px; /* width of the scrollbar */
}

/* Set the style for the thumb (the part that you drag) */
::-webkit-scrollbar-thumb {
  background-color: #ccc; /* color of the thumb */
  border-radius: 5px; /* round the corners of the thumb */
}

/* Set the style for the track (the area behind the thumb) */
::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* color of the track */
}
</style>
