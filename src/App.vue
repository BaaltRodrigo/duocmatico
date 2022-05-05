<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import { version } from "../package";

export default {
  name: "App",

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
    // Celan the localStorage every time there is a major update
    // By every time I mean, every time we do a change on how the
    // xslx file is readed.
    if (!(version == localStorage.lastVersion)) {
      localStorage.clear();
    }
  },
};
</script>
