<template>
  <v-card title="Nuevo Calendario">
    <v-card-text>
      <v-alert
        class="mb-4"
        icon="mdi-information-outline"
        color="blue-lighten-4"
      >
        {{ whereIsSaved }}
      </v-alert>
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
        class="rounded-pill mb-2"
        @click="handleSubmit"
      >
        Empieza a armar tu horario!
      </v-btn>
    </v-card-text>
  </v-card>
  <!-- loading dialog to wait api response -->
  <v-dialog v-model="calendarableLoading" persistent width="auto">
    <v-card class="text-center" title="Obteniendo datos">
      <v-card-text class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { auth } from "../../config/firebase";
import { mapActions, mapState } from "vuex";
import { CALENDAR_SOURCES } from "../../helpers/constants";

export default {
  name: "DmCalendarForm",

  computed: {
    ...mapState("academicCharges", ["academicCharges", "academicCharge"]),

    whereIsSaved() {
      if (this.source === CALENDAR_SOURCES.LOCAL) {
        return "Este calendario se guardará en este dispositivo";
      } else {
        return "Este calendario se guardará en tu cuenta";
      }
    },

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
    source: CALENDAR_SOURCES.LOCAL, // Local as default source
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

      const charge = this.academicCharges.find((c) => c.id === this.chargeId);

      // This calendar object is using the API name convention
      const calendar = {
        name: this.name,
        description: "",
        academic_charge: { ...charge },
        calendarable: {
          ...calendarable,
          type: this.calendarableType,
        },
        source: this.source,
      };

      await this.createCalendar(calendar);

      this.$emit("created");
    },
  },

  emits: ["created"],

  async mounted() {
    await this.getAcademicCharges();

    if (auth.currentUser) {
      this.source = CALENDAR_SOURCES.API;
    }

    console.log("Source:", this.source);
  },
};
</script>
