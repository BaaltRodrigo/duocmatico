<template>
  <v-app>
    <the-header></the-header>
    <!-- <dm-section-selector-nav></dm-section-selector-nav> -->
    <v-main>
      <not-found v-if="show404" />
      <router-view v-else></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import { useDisplay } from "vuetify";
import TheHeader from "./components/TheHeader.vue";
import NotFound from "./views/errors/NotFound.vue";

export default {
  name: "App",

  components: {
    TheHeader,
    NotFound,
  },

  computed: {
    ...mapState(["show404"]),
  },

  provide() {
    const { mobile } = useDisplay();
    return {
      isMobile: mobile.value,
    };
  },
};
</script>

<style>
/* Set de background color in all views */
.my-app {
  background-color: #fff7ea;
}

/* Set the style for the entire scrollbar */
::-webkit-scrollbar {
  width: 5px;
  /* width of the scrollbar */
}

/* Set the style for the thumb (the part that you drag) */
::-webkit-scrollbar-thumb {
  background-color: #ccc;
  /* color of the thumb */
  border-radius: 5px;
  /* round the corners of the thumb */
}

/* Set the style for the track (the area behind the thumb) */
::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  /* color of the track */
}
</style>
