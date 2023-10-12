<template>
  <v-container class>
    <h4 class="text-h4 mb-2">Mis calendarios</h4>
    <v-row>
      <v-col cols="12" md="4" xl="3">
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
        xl="3"
        v-for="calendar in [...localCalendars, ...apiCalendars]"
        :key="`calendar-${calendar.uuid}`"
      >
        <dm-calendar-card
          class="mb-2"
          :calendar="calendar"
          @delete="handleDelete"
          @rename="handleRename"
          @show="handleShow"
        >
        </dm-calendar-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- Option dialogs -->
  <v-dialog
    v-model="newCalendarForm"
    max-width="480px"
    content-class="elevation-0"
    hide-overlay
  >
    <dm-calendar-form @created="handleCreated"></dm-calendar-form>
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
    @done="getCalendars()"
  >
    <dm-edit-calendar-name
      :calendar="calendarEditName"
      @updated="nameUpdated"
    />
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import DmCalendarCard from "../components/calendar/DmCalendarCard.vue";
import DmCalendarForm from "../components/calendar/DmCalendarForm.vue";
import DmDeleteCalendar from "../components/calendar/DmDeleteCalendar.vue";
import DmEditCalendarName from "../components/calendar/DmEditCalendarName.vue";

export default {
  name: "CalendarIndexView",

  components: {
    DmCalendarCard,
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
    ...mapState("calendars", ["localCalendars", "apiCalendars", "calendar"]),
    ...mapState("auth", ["token"]),

    calendarEditName() {
      const allCalendars = [...this.localCalendars, ...this.apiCalendars];
      return allCalendars.find((c) => c.uuid === this.calendarToEditName.uuid);
    },
  },

  methods: {
    getCalendars() {
      this.$store.dispatch("calendars/getLocalCalendars");

      if (!this.token) return;
      this.$store.dispatch("calendars/getApiCalendars");
    },

    openEditCalendarNameCard(calendar) {
      this.calendarToEditName = calendar;
      this.editCalendarName = true;
    },

    handleShow(calendar) {
      this.$router.push({
        name: "calendars.show",
        params: { uuid: calendar.uuid },
      });
    },

    handleDelete(calendar) {
      this.calendarToDelete = calendar;
      this.deleteCalendar = true;
    },

    handleRename(calendar) {
      this.calendarToEditName = calendar;
      this.editCalendarName = true;
    },

    nameUpdated() {
      this.editCalendarName = false;
      this.$store.dispatch("calendars/getApiCalendars");
    },

    handleCreated() {
      this.newCalendarForm = false;
      this.$store.dispatch("calendars/getApiCalendars");
    },
  },

  created() {
    this.getCalendars();
  },
};
</script>
