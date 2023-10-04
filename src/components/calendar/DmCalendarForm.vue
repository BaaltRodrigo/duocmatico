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
        >
          <template #item="{ props, item }">
            <v-list-item v-bind="props">
              <v-list-item-title class="text-capitalize" v-text="item.name">
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-form>
      <v-card-actions>
        <v-btn :disabled="isDisabled" block color="green-accent-1" variant="flat" class="rounded-pill text-white"
          @click="createCalendar">
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

      console.log("Calendarable items changed", this.academicCharge);
      console.log(this.academicCharge["careers"]);
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

    async createCalendar() {
      await this.addCalendar({
        name: this.name,
        description: "",
        academic_charge_id: this.chargeId,
        calendarable_id: this.calendarableId,
        calendarable_type: this.calendarableType,
        sections: [],
      });
      this.$emit("created");
    },
  },

  emits: ["created"],

  async mounted() {
    await this.getAcademicCharges();
  },
};
</script>
