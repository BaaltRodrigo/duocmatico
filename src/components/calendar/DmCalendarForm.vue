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
          v-model="cargaForm"
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
      return !(this.name && this.cargaForm && this.careerForm);
    },
  },

  data: () => ({
    name: null,
    cargaForm: null,
    careerForm: null,
  }),

  methods: {
    ...mapActions("firebase", [
      "setCargaAcademica",
      "getCargasFromFirebase",
      "setCarrera",
    ]),
    ...mapMutations("calendars", ["addCalendar"]),

    async changeCargaAcademica() {
      this.careerForm = null; // Esto ocurre siempre que cambia la carga academica
      if (!this.cargaForm) return; // Carga academica es borrada -> no hago nada
      await this.setCargaAcademica(this.cargaForm);
    },

    async changeCarrera() {
      await this.setCarrera(this.careerForm);
    },

    createCalendar() {
      this.addCalendar({
        name: this.name,
        carga: this.cargaForm,
        carrera: this.careerForm,
        sections: [],
      });
      this.$emit("created");
    },
  },

  async mounted() {
    await this.getCargasFromFirebase();
  },
};
</script>
