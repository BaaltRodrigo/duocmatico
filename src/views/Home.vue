<template>
  <div>
    <v-toolbar fixed dark color="purple" flat>
      <v-toolbar-title>Duocmatico</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        icon
        href="https://github.com/BaaltRodrigo/duocmatico"
        target="none"
      >
        <v-icon>{{ "mdi-github" }}</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="9">
          <h2 id="inicio-listado">Listado de cursos</h2>
          <v-text-field
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            v-model="busqueda"
            clearable
            @click:clear="limpiarBusqueda"
          ></v-text-field>
          <v-btn @click="showFiltros = true">filtros</v-btn>
          <curso
            v-for="curso in filtroCursos"
            :key="curso.seccion"
            :curso="curso"
            class="mb-3"
          />
        </v-col>
      </v-row>
      <!-- Pop up para subir un nuevo archivo -->
      <v-dialog
        content-class="elevation-0"
        v-model="wantUpload"
        max-width="700px"
        persistent
      >
        <cargar-archivo @done="wantUpload = false" />
      </v-dialog>
      <v-dialog
        persistent
        v-model="showFiltros"
        content-class="elevation-0"
        max-width="700px"
      >
        <filtros-card @close="showFiltros = false"></filtros-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Curso from "../components/curso/Curso.vue";
import CargarArchivo from "../components/fileUpload/CargarArchivo.vue";
import FiltrosCard from "../components/filtros/FiltrosCard.vue";
// import { delay } from "../helpers/utilities";

export default {
  name: "Home",

  components: {
    Curso,
    CargarArchivo,
    FiltrosCard,
  },

  computed: {
    ...mapState(["careersData", "career"]),
    ...mapState("courses", ["courses", "filters"]),

    filtroCursos() {
      let filtered = this.courses;
      // console.log("Sin filtrar", filtered);
      //Filtro por semestres primero
      if (this.filters.semesters.length > 0) {
        // console.log(this.filters.semesters);
        filtered = filtered.filter((c) =>
          this.filters.semesters.includes(c.nivel)
        );
      }
      // console.log("Filtro Semestres", filtered);
      // Filtro por jornada
      if (this.filters.times.length > 0) {
        // console.log("jornadas", this.filters.times);
        filtered = filtered.filter((c) =>
          this.filters.times.includes(c.jornada)
        );
      }
      // console.log("Filtro Jornadas", filtered);
      // Hago la busqueda por input de la pagina.
      if (!this.busqueda) return filtered;
      const buscar = this.busqueda.toUpperCase();
      return filtered.filter(
        (c) =>
          c.seccion.toUpperCase().includes(buscar) ||
          c.asignatura.toUpperCase().includes(buscar)
      );
    },
  },

  data() {
    return {
      busqueda: null,
      wantUpload: !localStorage.isRemembered,
      showFiltros: false,
    };
  },

  methods: {
    test() {
      console.log(this.careerCourses);
    },

    limpiarBusqueda() {
      this.busqueda = null;
      this.$vuetify.goTo("#inicio-listado");
    },
  },
};
</script>
