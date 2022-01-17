<template>
  <v-card>
    <v-list-item @click="test" two-line>
      <v-list-item-content>
        <v-list-item-subtitle>
          <small>{{curso.seccion}}</small>
          <v-chip class="ml-2" x-small>Semestre {{curso.nivel}}</v-chip>
        </v-list-item-subtitle>
        <v-list-item-title class="text-capitalize font-weight-bold">
          {{curso.asignatura.toLowerCase()}}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon outlined>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider class="mx=4"></v-divider>
    <!-- Esto se muestra al hacer click en el ramo -->
    <v-container>
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
              Modalidad: <v-chip small v-if="isPresencial">Presencial</v-chip> <v-chip small v-if="isOnline">Online</v-chip>
              <!-- Plan de estudios: {{curso.planes}} -->
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-card>
</template>

<script>
import CursoHorario from "../components/CursoHorario.vue";

export default {
  name: "Curso",

  components: {
    CursoHorario,
  },

  props: {
    curso: {
      type: Object,
      required: true
    }
  },

  computed: {
    diasCurso() {
      return this.curso.horarios.map(h => h.dia);
    },
    
    isOnline() {
      return this.diasCurso.includes('En linea');
    },

    isPresencial() {
      const semana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      return semana.some(d => this.diasCurso.includes(d));
    }
  },

  methods: {
    test() {
      console.log(this.curso);
    }
  },
}
</script>