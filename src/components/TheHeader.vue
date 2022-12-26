<template>
  <v-app-bar app fixed dark color="purple" flat>
    <v-container class="py-0 fill-height">
      <v-app-bar-title>Duocmatico</v-app-bar-title>
      <v-btn text @click="$router.push({ name: 'calendar.index' })">
        Mis Calendarios
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        icon
        href="https://github.com/BaaltRodrigo/duocmatico"
        target="none"
      >
        <v-icon>{{ "mdi-github" }}</v-icon>
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  name: "TheHeader",

  data: () => ({
    buttonOptions: [{ title: "Mis calendarios", page: "calendar.index" }],
  }),
};
</script>
