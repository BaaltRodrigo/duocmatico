<template>
  <v-card outlined>
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
          Modalidad: <v-chip small v-if="isPresencial">Presencial</v-chip>
          <v-chip small v-if="isOnline">Online</v-chip>
          <!-- Plan de estudios: {{curso.planes}} -->
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import CursoHeader from "./CursoHeader.vue";
import CursoHorario from "./CursoHorario.vue";

export default {
  name: "Curso",

  components: {
    CursoHeader,
    CursoHorario,
  },

  props: {
    curso: {
      type: Object,
      required: true,
    },
  },

  computed: {
    diasCurso() {
      return this.curso.horarios.map((h) => h.dia);
    },

    isOnline() {
      return this.diasCurso.includes("En linea");
    },

    isPresencial() {
      const semana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];
      return semana.some((d) => this.diasCurso.includes(d));
    },
  },

  methods: {
    test() {
      console.log(this.curso);
    },
  },
};
</script>
