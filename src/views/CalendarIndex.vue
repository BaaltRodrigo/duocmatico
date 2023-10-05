<template>
  <v-container>
    <h4 class="text-h4 mb-2">Mis calendarios</h4>
    <v-row>
      <v-col cols="12" md="4">
        <v-card
          @click="newCalendarForm = true"
          variant="flat"
          height="150px"
          class="rounded-xl"
          style="border: 4px dashed lightgray; background-color: transparent"
        >
          <v-container class="text-center mt-4">
            <v-icon size="7vh">mdi-plus</v-icon>
            <h3>Nuevo calendario</h3>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="4"
        v-for="(calendar, index) in localCalendars"
        :key="`calendar-${index}`"
      >
        <v-card
          height="150px"
          class="rounded-xl elevation-4"
          variant="outlined"
          @click="
            $router.push({ name: 'calendars.show', params: { id: index } })
          "
        >
          <v-card-title class="ml-2">{{ calendar.name }}</v-card-title>
          <v-card-subtitle class="ml-2 my-n2 text-capitalize">
            {{
              `${calendar.calendarable.name} - ${calendar.academicCharge.full_name}`.toLowerCase()
            }}
          </v-card-subtitle>
          <v-card-actions class="float-end mt-8">
            <v-btn icon @click.stop.prevent="true">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            <v-btn
              icon
              @click.stop.prevent="
                calendarToDelete = calendar;
                deleteCalendar = true;
              "
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-btn
              icon
              color="grey-lighten-5"
              variant="flat"
              @click.stop.prevent="openEditCalendarNameCard(calendar)"
            >
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
    <dm-delete-calendar
      @deleted-successfully="deleteCalendar = false"
      :calendar="calendarToDelete"
    ></dm-delete-calendar>
  </v-dialog>

  <v-dialog
    v-model="editCalendarName"
    max-width="480px"
    content-class="elevation-0"
    hide-overlay
  >
    <DmEditCalendarName :calendar="calendarEditName" @updated="nameUpdated" />
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import DmCalendarForm from "../components/calendar/DmCalendarForm.vue";
import DmDeleteCalendar from "../components/calendar/DmDeleteCalendar.vue";
import DmEditCalendarName from "../components/calendar/DmEditCalendarName.vue";

export default {
  name: "CalendarIndexView",

  components: {
    DmCalendarForm,
    DmDeleteCalendar,
    DmEditCalendarName,
  },

  data: () => ({
    newCalendarForm: false,
    deleteCalendar: false,
    editCalendarName: false,
    calendarToEditName: null,
  }),

  computed: {
    ...mapState("calendars", ["localCalendars"]),
    calendarEditName() {
      return this.localCalendars.find((c) => c === this.calendarToEditName);
    },
  },

  methods: {
    openEditCalendarNameCard(calendar) {
      this.calendarToEditName = calendar;
      this.editCalendarName = true;
    },
    nameUpdated() {
      this.editCalendarName = false;
    },
  },
};
</script>
