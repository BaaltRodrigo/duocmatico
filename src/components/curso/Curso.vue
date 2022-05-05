<template>
  <v-card outlined class="rounded-lg">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{ curso.seccion }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          outlined
          :color="isInSchedule ? 'error' : 'success'"
          class="rounded-pill"
          @click="handle"
        >
          {{ isInSchedule ? "Quitar" : "Agregar" }}
        </v-btn>
      </v-list-item-action>
    </v-list-item>
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
import CursoHorario from "./CursoHorario.vue";
import CursoExtraInfo from "./CursoExtraInfo.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Curso",

  components: {
    CursoHorario,
    CursoExtraInfo,
  },

  props: {
    curso: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState("schedule", ["sections"]),
    isInSchedule() {
      return this.sections.find((s) => s.seccion === this.curso.seccion);
    },
  },

  methods: {
    ...mapMutations("schedule", ["addSection", "removeSection"]),
    test() {
      this.addSection(this.curso);
      console.log(this.sections);
    },

    handle() {
      if (this.isInSchedule) {
        this.removeSection(this.curso);
      } else {
        this.addSection(this.curso);
      }
      console.log(this.sections);
    },

    remove() {
      this.removeSection(this.curso);
      console.log(this.sections);
    },
  },
};
</script>
