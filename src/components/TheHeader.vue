<template>
  <v-app-bar app fixed dark color="purple" flat>
    <v-container class="py-0 fill-height">
      <v-toolbar-title>DuocMatico</v-toolbar-title>
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
};
</script>
