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
      <seleccion-carrera />
    </v-card>

    <!-- Aca empiezan los cursos y las cosas para buscarlos -->
    <h2 id="inicio-listado" class="text-center">Listado de cursos</h2>
    <v-text-field
      outlined
      dense
      prepend-inner-icon="mdi-magnify"
      v-model="busqueda"
      clearable
      @click:clear="limpiarBusqueda"
    ></v-text-field>
    <!-- Listado de cursos -->
    <v-card v-if="!!carrera" outlined>
      <div
        v-for="curso in filtroCursos"
        :key="curso.seccion"
      >
        <curso :curso="curso" />
        <v-divider></v-divider>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import CargarArchivo from "../components/CargarArchivo.vue";
import Curso from "../components/Curso.vue";
import SeleccionCarrera from "../components/SeleccionCarrera.vue";

export default {
  name: "Home",

  components: {
    CargarArchivo,
    Curso,
    SeleccionCarrera,
  },

  computed: {
    ...mapState(["carrera"]),
    
    filtroCursos() {
      if (!this.carreraSeleccionada) return [];
      if (!this.busqueda) return this.carrera.ramos;
      const buscar = this.busqueda.toUpperCase();
      return this.carrera.ramos.filter( r => 
        r.seccion.toUpperCase().includes(buscar) ||
        r.asignatura.toUpperCase().includes(buscar)
      );
    },
  },

  data() {
    return {
      busqueda: null,
    };
  },

  methods: {
    limpiarBusqueda() {
      this.busqueda = null;
      this.$vuetify.goTo("#inicio-listado")
    },
  }
};
</script>
