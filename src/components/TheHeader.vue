<template>
  <v-app-bar app fixed flat>
    <v-app-bar-title @click="$router.push({ name: 'home' })">
      Duocmatico
      <v-chip variant="outlined" size="x-small" label color="primary">
        Beta
      </v-chip>
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
