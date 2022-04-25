<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "App",

  data: () => ({
    //
  }),

  methods: {
    ...mapMutations(["setCareersData", "setCareer"]),
  },

  mounted() {
    // Check LocalStorage for xlsxJsonData
    if (localStorage.isRemembered) {
      this.setCareersData(JSON.parse(localStorage.xslxJsonData));
      this.setCareer(localStorage.selectedCareer);
    }
  },
};
</script>
