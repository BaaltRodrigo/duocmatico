<template>
  <v-card outlined class="rounded-lg">
    <curso-header :curso="curso"></curso-header>
    <v-divider></v-divider>
    <!-- Esto se muestra al hacer click en el ramo -->
    <v-container>
      <v-row>
        <!-- Horarios -->
        <v-col cols="12" md="6">
          <v-card outlined>
            <curso-horario :horarios="curso.horarios"></curso-horario>
          </v-card>
        </v-col>
        <!-- Datos extras -->
        <v-col cols="12" md="6">
          <v-card outlined>
            <curso-extra-info :curso="curso"></curso-extra-info>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import CursoHeader from "./CursoHeader.vue";
import CursoHorario from "./CursoHorario.vue";
import CursoExtraInfo from "./CursoExtraInfo.vue";

export default {
  name: "Curso",

  components: {
    CursoHeader,
    CursoHorario,
    CursoExtraInfo,
  },

  props: {
    curso: {
      type: Object,
      required: true,
    },
  },

  methods: {
    test() {
      console.log(this.curso);
    },
  },
};
</script>
