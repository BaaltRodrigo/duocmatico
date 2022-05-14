<template>
  <v-app-bar clipped-left app fixed dark color="purple" flat>
    <v-app-bar-title>Duocmatico</v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="setShowModal(true)">
      <v-icon>mdi-cloud-upload</v-icon>
    </v-btn>
    <v-btn icon href="https://github.com/BaaltRodrigo/duocmatico" target="none">
      <v-icon>{{ "mdi-github" }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "TheHeader",
  methods: {
    ...mapMutations("fileUpload", ["setShowModal"]),
  },
};
</script>
