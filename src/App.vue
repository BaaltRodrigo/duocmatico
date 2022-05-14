<template>
  <v-app>
    <the-header></the-header>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { version } from "../package";
import TheHeader from "./components/TheHeader.vue";

export default {
  name: "App",

  components: {
    TheHeader,
  },

  data: () => ({
    //
  }),

  computed: {
    ...mapState(["careersData"]),
  },

  methods: {
    ...mapMutations(["setCareersData"]),
    ...mapActions(["findCareerData"]),
    ...mapMutations("courses", ["setCareer", "setCourses"]),
  },

  async mounted() {
    // Check LocalStorage for xlsxJsonData
    const { xslxJsonData, selectedCareer } = localStorage;
    if (xslxJsonData && selectedCareer) {
      this.setCareersData(JSON.parse(xslxJsonData));
      const careerData = await this.findCareerData(selectedCareer);
      this.setCareer(selectedCareer);
      this.setCourses(careerData.ramos);
    }
  },

  created() {
    // Clean the localStorage every time there is a major update
    // By every time I mean, every time we do a change on how the
    // xslx file is readed.
    if (!(version == localStorage.lastVersion)) {
      localStorage.clear();
    }
  },
};
</script>

<style scoped>
html {
  overflow-y: auto;
}
</style>
