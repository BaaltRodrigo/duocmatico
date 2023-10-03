<template>
  <v-container>
    <h4 class="text-h4 mb-2">Mis calendarios</h4>
    <v-row>
      <v-col cols="12" md="4">
        <v-card
          @click="newCalendarForm = true"
          variant="flat"
          height="150px"
          class="rounded-lg"
          style="border: 4px  lightgray; background-color: #FF9C72"
        >
          <v-container class="text-center text-white mt-4">
            <v-icon size="7vh">mdi-plus</v-icon>
            <h3>Nuevo calendario</h3>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <!-- Get calendars from store and create a card for every one -->
    <v-row>
      <v-col
        cols="12"
        md="4"
        v-for="(calendar, index) in localCalendars"
        :key="`calendar-${index}`"
      >
        <v-card
          height="150px"
          class="rounded-xl"
          style="background-color: #F0BD6A"
          @click="
            $router.push({ name: 'calendars.show', params: { id: index } })
          "
        >
          <v-card-title class="ml-2">{{ calendar.name }}</v-card-title>
          <v-card-subtitle class="ml-2 my-n2 text-capitalize">
            {{ `${calendar.carrera} - ${calendar.carga}`.toLowerCase() }}
          </v-card-subtitle>
          <v-card-actions class="float-end mt-8">
            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            <v-btn icon v-on:click.stop.prevent="deleteCalendar = true">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn icon color="grey-lighten-5" variant="flat">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>
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
    <dm-calendar-form @created="newCalendarForm = false"></dm-calendar-form>
  </v-dialog>

  <v-dialog
    v-model="deleteCalendar"
    max-width="530px"
    content-class="elevation-0"
    hide-overlay
  >
    <dm-delete-calendar @created="deleteCalendar = false"></dm-delete-calendar>
  </v-dialog>
</template>

<script>
import { mapState, mapAction } from "vuex";
import DmCalendarForm from "../components/calendar/DmCalendarForm.vue";
import DmDeleteCalendar from "../components/calendar/DmDeleteCalendar.vue";

export default {
  name: "CalendarIndexView",

  components: {
    DmCalendarForm,
    DmDeleteCalendar,
  },

  computed: {
    ...mapState("calendars", ["localCalendars"]),
  },

  methods:{
    ...mapAction("calendars", ["removeCalendar"]),

    deleteCalendar(){
      
    }
  },

  data: () => ({
    newCalendarForm: false,
    deleteCalendar: false,
  }),
};
</script>

