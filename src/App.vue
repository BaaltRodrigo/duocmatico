<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
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
    if (localStorage.isRemembered) {
      const savedCareer = localStorage.selectedCareer;
      const savedData = JSON.parse(localStorage.xslxJsonData);
      this.setCareersData(savedData);
      const careerData = await this.findCareerData(savedCareer);
      this.setCareer(savedCareer);
      this.setCourses(careerData.ramos);
    }
  },
};
</script>
