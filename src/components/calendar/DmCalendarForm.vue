<template>
  <v-card
    class="rounded-xl"
    variant="outlined"
    style="background-color: #f5f5f5"
    title="Nuevo Calendario"
  >
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          filled
          variant="outlined"
          label="Nombre del calendario"
        ></v-text-field>
        <v-autocomplete
          v-model="cargaForm"
          :items="cargasAcademicas"
          label="Carga academica"
          variant="outlined"
        ></v-autocomplete>
        <v-autocomplete
          v-model="careerForm"
          :items="carreras"
          label="Carrera"
          variant="outlined"
        ></v-autocomplete>
      </v-form>
      <v-card-actions>
        <v-btn
          :disabled="isDisabled"
          block
          color="purple"
          variant="outlined"
          class="rounded-pill"
          @click="createCalendar"
        >
          Empieza a armar tu horario!
        </v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DmCalendarForm",

  computed: {
    ...mapState("academicCharges", ["cargasAcademicas", "carga", "carreras"]),

    isDisabled() {
      return !(this.name && this.cargaForm && this.careerForm);
    },
  },

  data: () => ({
    name: null,
    cargaForm: null,
    careerForm: null,
  }),

  watch: {
    cargaForm() {
      this.changeCargaAcademica();
    },
  },

  methods: {
    ...mapActions("academicCharges", [
      "setCargaAcademica",
      "getCargasFromFirebase",
      "setCarrera",
    ]),
    ...mapActions("calendars", ["addCalendar"]),

    async changeCargaAcademica() {
      this.careerForm = null; // Esto ocurre siempre que cambia la carga academica
      if (!this.cargaForm) return; // Carga academica es borrada -> no hago nada
      await this.setCargaAcademica(this.cargaForm);
    },

    async changeCarrera() {
      await this.setCarrera(this.careerForm);
    },

    async createCalendar() {
      await this.addCalendar({
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
