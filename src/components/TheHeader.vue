<template>
  <v-app-bar app fixed dark color="purple" flat>
    <v-app-bar-title @click="$router.push({ name: 'home' })">
      Duocmatico
    </v-app-bar-title>
    <a :to="'calendar.index'">Mis Calendarios</a>
    <v-spacer></v-spacer>
    <v-btn icon href="https://github.com/BaaltRodrigo/duocmatico" target="none">
      <v-icon>{{ "mdi-github" }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>
