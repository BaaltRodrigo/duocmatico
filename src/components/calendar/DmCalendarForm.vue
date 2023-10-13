<template>
  <v-card class="rounded-xl bg-white" title="Nuevo Calendario">
    <v-card-text>
      <v-form ref="form">
        <v-text-field
          v-model="name"
          filled
          label="Nombre del calendario"
        ></v-text-field>
        <v-autocomplete
          v-model="chargeId"
          :items="academicCharges"
          item-value="id"
          label="Carga Academica"
          :item-title="(item) => `${item.season} ${item.name}`"
        >
        </v-autocomplete>
        <!-- combobox to select career or school -->
        <v-radio-group inline v-model="calendarableType">
          <v-radio label="Carreras" value="career"></v-radio>
          <v-radio class="mx-auto" label="Escuelas" value="school"></v-radio>
        </v-radio-group>
        <v-autocomplete
          v-model="calendarableId"
          :loading="calendarableLoading"
          :items="calendarableItems"
          :label="calendarableType === 'career' ? 'Carrera' : 'Escuela'"
          item-title="name"
          item-value="id"
        >
          <template #item="{ props, item }">
            <v-list-item v-bind="props">
              <v-list-item-title class="text-capitalize" v-text="item.name">
              </v-list-item-title>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-form>
      <v-btn
        :disabled="isDisabled"
        block
        :variant="isDisabled ? 'text' : 'elevated'"
        color="green-accent-1"
        class="rounded-pill text-none mb-2"
        @click="handleSubmit"
      >
        Empieza a armar tu horario!
      </v-btn>
    </v-card-text>
  </v-card>
  <!-- loading dialog to wait api response -->
  <v-dialog v-model="calendarableLoading" persistent width="auto">
    <v-card class="rounded-lg bg-white text-center" title="Obteniendo datos">
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
    ...mapState("academicCharges", ["academicCharges", "academicCharge"]),

    isDisabled() {
      return !(this.name && this.chargeId && this.calendarableId);
    },

    calendarableItems() {
      // Empty charge returns empty array to not break the autocomplete
      if (!this.academicCharge) return [];

      // We search the calendarable type in plural.
      // As the API uses singular model names for the morph relationship
      return this.academicCharge[this.calendarableType + "s"];
    },
  },

  data: () => ({
    name: null,
    chargeId: null,
    calendarableId: null,
    calendarableType: "career",
    calendarableLoading: false, // Used to disable the autocomplete while loading
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
    ]),
    ...mapActions("calendars", ["createCalendar"]),

    async changeAcademicCharge() {
      if (!this.chargeId) return; // Academic charge is not selected or not modified

      this.calendarableLoading = true;
      this.calendarableId = null;

      await this.getAcademicCharge(this.chargeId);
      this.calendarableLoading = false;
    },

    async handleSubmit() {
      const calendarable = this.calendarableItems.find(
        (c) => c.id === this.calendarableId
      );

      // This calendar object is using the API name convention
      await this.createCalendar({
        name: this.name,
        description: "",
        academic_charge_id: this.chargeId,
        academic_charge: this.academicCharge,
        calendarable: calendarable,
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
