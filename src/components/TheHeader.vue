<template>
  <v-app-bar app fixed flat>
    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->
    <v-app-bar-title @click="$router.push({ name: 'home' })">
      Duocmatico
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <v-btn icon href="https://github.com/BaaltRodrigo/duocmatico" target="none">
      <v-icon size="x-large">{{ "mdi-github" }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>
