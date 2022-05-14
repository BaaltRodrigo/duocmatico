<template>
  <div style="height: calc(100vh - 64px)">
    <v-card class="rounded-lg" height="100%">
      <calendario></calendario>
      <v-tooltip right>
        <template #activator="{ on, attr }">
          <v-btn
            @click="showClasses = true"
            class="my-12"
            small
            fab
            absolute
            top
            left
            dark
            color="purple"
            v-on="on"
            v-bind="attr"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Agregar un curso al calendario</span>
      </v-tooltip>
    </v-card>
    <!-- Dialog to included classes -->
    <v-dialog v-model="showClasses" scrollable content-class="elevation-0">
      <v-card class="rounded-xl">
        <v-card-title>
          Cursos disponibles para agregar
          <v-spacer></v-spacer>
          <v-btn icon @click="showClasses = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-title>
          <v-text-field
            dense
            outlined
            label="Buscar cursos"
            placeholder="Nombre del curso, seccion, sigla"
            prepend-icon="mdi-filter-outline"
            v-model="busquedaTMP"
            hint="Para ver mas filtros puedes hacer click en el icono"
            persistent-hint
            @click:prepend="showFilters = true"
            @keypress.enter="changeBusqueda"
          ></v-text-field>
        </v-card-title>
        <v-card-text style="height: calc(80vh - 102px)">
          <cluster-curso
            v-for="cluster in clusters"
            :key="`clouster-${cluster.asignatura}`"
            :cluster="cluster"
          ></cluster-curso>
        </v-card-text>
        <!-- <v-container>
          <v-text-field
            dense
            outlined
            label="Buscar cursos"
            placeholder="Nombre del curso, seccion, sigla"
            prepend-icon="mdi-filter-outline"
          ></v-text-field>
        </v-container> -->
      </v-card>
    </v-dialog>
    <!-- Dialogo con filtros -->
    <v-dialog
      persistent
      v-model="showFilters"
      content-class="elevation-0"
      max-width="700px"
    >
      <filtros-card @close="showFilters = false"></filtros-card>
    </v-dialog>
    <!-- Dialog para subir archivo -->
    <v-dialog
      :value="showModal"
      content-class="elevation-0"
      persistent
      max-width="700px"
    >
      <cargar-archivo @done="setShowModal(false)" />
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Calendario from "../components/Calendario.vue";
import CargarArchivo from "../components/fileUpload/CargarArchivo.vue";
import ClusterCurso from "../components/curso/ClusterCurso.vue";
import FiltrosCard from "../components/filtros/FiltrosCard.vue";

export default {
  name: "About",
  components: {
    Calendario,
    CargarArchivo,
    ClusterCurso,
    FiltrosCard,
  },

  computed: {
    ...mapState("fileUpload", ["showModal"]),
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

  data: () => ({
    showClasses: false,
    busqueda: null,
    busquedaTMP: null,
    showFilters: false,
  }),

  methods: {
    ...mapMutations("fileUpload", ["setShowModal"]),

    changeBusqueda() {
      this.busqueda = this.busquedaTMP;
    },
  },

  mounted() {
    const { xslxJsonData } = localStorage;
    if (!xslxJsonData) {
      this.setShowModal(true);
    }
  },
};
</script>
