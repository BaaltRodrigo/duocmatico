<template>
  <v-container fluid>
    <h3 class="text-h4 mb-2">Calendarios en este dispositivo</h3>
    <v-row>
      <v-col cols="12" md="4">
        <v-card
          @click="newCalendarForm = true"
          variant="flat"
          height="16vh"
          class="rounded-lg"
          style="border: 4px dashed lightgray; background-color: transparent"
        >
          <v-container class="text-center">
            <v-icon size="7vh">mdi-plus</v-icon>
            <h3>Nuevo calendario</h3>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- Get calendars from store and create a card for every one -->
    <v-row>
      <v-col cols="12" md="4" v-for="calendar in calendars" :key="calendar.id">
        <v-card
          variant="flat"
          height="16vh"
          class="rounded-lg"
          style="background-color: #f5f5f5"
        >
          <v-container class="text-center">
            <h3>{{ calendar.name }}</h3>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog
    v-model="newCalendarForm"
    max-width="480px"
    content-class="elevation-0"
    hide-overlay
  >
    <dm-calendar-form></dm-calendar-form>
  </v-dialog>
</template>

<script>
import DmCalendarForm from "../components/calendar/DmCalendarForm.vue";

export default {
  name: "CalendarIndexView",

  components: {
    DmCalendarForm,
  },

  data: () => ({
    newCalendarForm: false,
    calendars: [
      { name: "calendario1" },
      { name: "calendario2" },
      { name: "calendario3" },
      { name: "calendario4" },
    ],
  }),
};
</script>
