<template>
  <div>
    <v-toolbar fixed dark color="purple" flat>
      <v-toolbar-title>Duocmatico</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="wantUpload = true">
        <v-icon>mdi-cloud-upload</v-icon>
      </v-btn>
      <v-btn
        icon
        href="https://github.com/BaaltRodrigo/duocmatico"
        target="none"
      >
        <v-icon>{{ "mdi-github" }}</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container>
      <v-card class="rounded-lg" height="24rem">
        <calendario></calendario>
      </v-card>
    </v-container>

    <v-container>
      <v-row justify="center" dense>
        <v-col cols="12" md="10">
          <h2 id="inicio-listado">Listado de cursos</h2>
          <v-text-field
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            v-model="busqueda"
            clearable
            @click:clear="limpiarBusqueda"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="10">
          <v-divider></v-divider>
          <cluster-course
            v-for="cluster in clusters"
            :key="`clouster-${cluster.asignatura}`"
            :cluster="cluster"
          ></cluster-course>
        </v-col>
      </v-row>
      <v-btn
        fab
        bottom
        right
        fixed
        dark
        color="purple"
        @click="showFiltros = true"
      >
        <v-icon>mdi-filter-outline</v-icon>
      </v-btn>
      <!-- Pop up para subir un nuevo archivo -->
      <v-dialog
        content-class="elevation-0"
        v-model="wantUpload"
        max-width="700px"
        persistent
      >
        <v-card flat class="rounded-lg">
          <v-alert type="warning" outlined text>
            Si ya usaste Duocmatico, puede que tengas que volver a subir el
            archivo con los cursos. Hicimos un cambio en como leemos la
            informacion en el excel!
          </v-alert>
        </v-card>
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
import Calendario from "../components/Calendario.vue";
import CargarArchivo from "../components/fileUpload/CargarArchivo.vue";
import ClusterCourse from "../components/curso/ClusterCurso.vue";
import FiltrosCard from "../components/filtros/FiltrosCard.vue";

export default {
  name: "Home",

  components: {
    Calendario,
    CargarArchivo,
    ClusterCourse,
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

    clusters() {
      const coursesNames = [
        ...new Set(this.filtroCursos.map((c) => c.asignatura)),
      ];
      const grouped = coursesNames.map((name) => {
        return {
          asignatura: name,
          secciones: this.filtroCursos.filter((c) => c.asignatura === name),
        };
      });
      return grouped;
    },
  },

  data() {
    return {
      busqueda: null,
      wantUpload: false,
      showFiltros: false,
    };
  },

  methods: {
    limpiarBusqueda() {
      this.busqueda = null;
      this.$vuetify.goTo("#inicio-listado");
    },
  },

  mounted() {
    const { xslxJsonData } = localStorage;
    if (!xslxJsonData) {
      this.wantUpload = true;
    }
  },
};
</script>
