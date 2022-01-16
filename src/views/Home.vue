<template>
  <v-container>
    <!-- Espacio para el calendario -->
    <v-card class="mb-3" outlined>
      <v-card-title>Aca va el calendario</v-card-title>
      <v-card-text>Intentar mostrarlo por semana</v-card-text>
    </v-card>

    <!-- Espacio para decir que suban el archivo -->
    <v-card class="mb-3" outlined>
      <v-card-text>
        <cargar-archivo />
      </v-card-text>
    </v-card>

    <v-card class="mb-3" outlined>
      <v-card-title>Filtros del listado de cursos</v-card-title>
      <v-card-text>
        {{ disponibles.map((d) => d.carrera) }}
      </v-card-text>
    </v-card>

    <v-card>
      <v-container>
        <h1>hola</h1>
      </v-container>
    </v-card>

    <!-- Lugar para escoger los cursos -->
    <h2>Listado de cursos</h2>
    <!-- <v-text-field v-model="busqueda" clearable @click:clear="busqueda = null"></v-text-field> -->
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import CargarArchivo from "../components/CargarArchivo.vue";

export default {
  name: "Home",

  components: {
    CargarArchivo,
  },

  computed: {
    ...mapState(["disponibles"]),
  },

  data() {
    return {
      busqueda: null,
    };
  },
};
</script>
