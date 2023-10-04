<template>
  <v-card
    class="rounded-xl bg-white"
    variant="outlined"
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
          v-model="chargeId"
          :items="academicCharges"
          item-title="full_name"
          item-value="id"
          label="Carga Academica"
          variant="outlined"
        >
        </v-autocomplete>
        <v-autocomplete
          v-model="calendarableId"
          :loading="calendarableLoading"
          :items="calendarableItems"
          label="Carrera"
          item-title="name"
          item-value="id"
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
  <!-- loading dialog to wait api response -->
  <v-dialog v-model="calendarableLoading" persistent width="auto">
    <v-card
      class="rounded-lg bg-white text-center"
      variant="outlined"
      title="Obteniendo datos"
    >
      <v-card-text class="text-center">
        <v-progress-circular indeterminate color="purple"></v-progress-circular>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DmCalendarForm",

  computed: {
    ...mapState("academicCharges", [
      "academicCharges",
      "academicCharge",
      "carreras",
    ]),

    isDisabled() {
      return !(this.name && this.chargeId && this.calendarableId);
    },

    calendarableItems() {
      if (!this.academicCharge) return [];

      console.log("Calendarable items changed");
      return this.academicCharge["careers"];
    },
  },

  data: () => ({
    name: null,
    chargeId: null,
    calendarableId: null,
    calendarableType: "careers",
    calendarableLoading: false, // Used to disable the autocomplete while loading
    calendarableTypes: ["careers", "schools"],
  }),

  watch: {
    chargeId: {
      immediate: true,
      deep: true,
      async handler(newValue) {
        await this.$nextTick();
        this.chargeId = newValue;
        this.changeAcademicCharge();
      },
    },
  },

  methods: {
    ...mapActions("academicCharges", [
      "setCargaAcademica",
      "getAcademicCharge",
      "getAcademicCharges",
      "setCarrera",
    ]),
    ...mapActions("calendars", ["addCalendar"]),

    async changeAcademicCharge() {
      if (!this.chargeId) return; // Academic charge is not selected
      this.calendarableLoading = true;
      this.calendarableId = null;
      await this.getAcademicCharge(this.chargeId);
      this.calendarableLoading = false;
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
    await this.getAcademicCharges();
  },
};
</script>
