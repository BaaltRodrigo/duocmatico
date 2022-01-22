<template>
  <v-alert text color="info" v-model="showAlert">
    <v-row align="center" class="mb-2">
      <v-col class="grow">
        <h2>En construccion</h2>
      </v-col>
      <v-col class="shrink">
        <v-btn icon color="info" outlined @click="showAlert = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    Aun no esta disponible la opcion de armar el horario como tal, pero podras ver las asignaturas disponibles de manera bonita!
    <v-divider class="mx-2 my-3"></v-divider>
    <v-row align="center">
      <v-col class="grow">
        Si te interesa, puedes ver el codigo de la app!
      </v-col>
      <v-col class="shrink">
        <v-btn icon href="https://github.com/BaaltRodrigo/duocmatico" target="none">
          <v-icon large>mdi-github</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-alert>
</template>

<script>
export default {
  name: "EnConstruccionAlert",

  data() {
    return {
      showAlert: true
    }
  }
}
</script>