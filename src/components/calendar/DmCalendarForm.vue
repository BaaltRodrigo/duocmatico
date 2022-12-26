<template>
  <v-card rounded="lg">
    <v-card-title>Nuevo calendario</v-card-title>
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          filled
          label="Nombre del calendario"
        ></v-text-field>
        <v-autocomplete
          label="Carga academica"
          :items="cargasAcademicas"
          @input="changeCargaAcademica"
          v-model="fileForm"
        ></v-autocomplete>
        <v-autocomplete
          label="Carrera"
          :items="carreras"
          @input="changeCarrera"
          v-model="careerForm"
        ></v-autocomplete>
      </v-form>
      <v-card-actions>
        <v-btn
          :disabled="isDisabled"
          block
          color="purple"
          class="text--white"
          @click="createCalendar"
        >
          Empieza a armar tu horario!
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "DmCalendarForm",

  computed: {
    ...mapState("firebase", ["cargasAcademicas", "carga", "carreras"]),

    isDisabled() {
      return !(this.name && this.fileForm && this.careerForm);
    },
  },

  data: () => ({
    name: null,
    fileForm: null,
    careerForm: null,
  }),

  methods: {
    ...mapActions("firebase", ["setCargaAcademica", "setCarrera"]),
    ...mapMutations("calendars", ["addCalendar"]),

    async changeCargaAcademica() {
      this.careerForm = null; // Esto ocurre siempre que cambia la carga academica
      if (!this.fileForm) return; // Carga academica es borrada -> no hago nada
      await this.setCargaAcademica(this.fileForm);
    },

    async changeCarrera() {
      await this.setCarrera(this.careerForm);
    },

    createCalendar() {
      this.addCalendar({
        name: this.name,
        carga: this.fileForm,
        carrera: this.careerForm,
        sections: [],
      });
    },
  },
};
</script>
