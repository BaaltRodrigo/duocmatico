<template>
  <div>
    <v-toolbar fixed dark color="purple" flat>
      <v-toolbar-title>Duocmatico</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="test">
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
      >
        <cargar-archivo @done="wantUpload = false" />
      </v-dialog>
      <!-- <v-window v-model="paso"> -->
      <!-- Primer sector para subir archivo y decir OK -->
      <!-- <v-window-item :value="1">
          <cargar-archivo @done="paso = 2" />
        </v-window-item> -->
      <!-- Seleccionar la carrera -->
      <!-- <v-window-item :value="2">
          <seleccion-carrera @done="paso = 3" />
        </v-window-item> -->
      <!-- Mostrar los cursos -->
      <!-- <v-window-item :value="3">
          <div v-if="!!carrera">
            <h2 id="inicio-listado" class="text-center">Listado de cursos</h2>
            <v-text-field
              outlined
              dense
              prepend-inner-icon="mdi-magnify"
              v-model="busqueda"
              clearable
              @click:clear="limpiarBusqueda"
            ></v-text-field>
            <curso
              v-for="curso in filtroCursos"
              :key="curso.seccion"
              :curso="curso"
              class="mb-3"
            />
          </div>
        </v-window-item> -->
      <!-- </v-window> -->
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Curso from "../components/Curso.vue";
import CargarArchivo from "../components/fileUpload/CargarArchivo.vue";
import { delay } from "../helpers/utilities";

export default {
  name: "Home",

  components: {
    Curso,
    CargarArchivo,
  },

  computed: {
    ...mapGetters(["careerCourses"]),
    ...mapState(["careersData", "career"]),

    filtroCursos() {
      delay(500);
      if (!this.career) return [];
      if (!this.busqueda) return this.careerCourses;
      const buscar = this.busqueda.toUpperCase();
      return this.careerCourses.filter(
        (r) =>
          r.seccion.toUpperCase().includes(buscar) ||
          r.asignatura.toUpperCase().includes(buscar)
      );
    },
  },

  data() {
    return {
      busqueda: null,
      wantUpload: true,
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
