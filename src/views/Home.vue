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
      <v-card-text>Quizas termine quitando esto y poniendolo en otro lado</v-card-text>
    </v-card>

    <!-- Lugar para escoger los cursos -->
    <v-card outlined>
      <v-card-title>Listado con los cursos</v-card-title>
      <v-card-text>{{cursos}}</v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import CargarArchivo from "../components/CargarArchivo.vue"

export default {
  name: "Home",

  components: {
    CargarArchivo
  },

  computed: {
    ...mapState(['cursos']),
  }
};
</script>
