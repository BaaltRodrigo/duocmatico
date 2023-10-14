<template>
  <v-container class>
    <h4 class="text-h4 mb-2">Mis calendarios</h4>
    <v-card class="elevation-4 my-4" :width="isMobile ? '100%' : '480'">
      <v-text-field
        v-model="search"
        variant="solo"
        hide-details
        density="comfortable"
        placeholder="Busca entre tus calendarios"
        clearable
      ></v-text-field>
    </v-card>
    <v-row :dense="!isMobile">
      <v-col cols="12" md="4" xl="3">
        <v-btn
          block
          class="rounded-lg elevation-4 bg-primary"
          variant="outlined"
          height="64px"
          @click="newCalendarForm = true"
        >
          <v-icon size="32" class="mr-2">mdi-plus</v-icon>
          Crear nuevo calendario
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="4"
        xl="3"
        v-for="calendar in filteredCalendars"
        :key="`calendar-${calendar.uuid}`"
      >
        <dm-calendar-card
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
  <v-dialog v-model="newCalendarForm">
    <dm-calendar-form @created="handleCreated"></dm-calendar-form>
  </v-dialog>

  <v-dialog v-model="deleteCalendar" c>
    <dm-delete-calendar
      @deleted-successfully="deleteCalendar = false"
      :calendar="calendarToDelete"
    ></dm-delete-calendar>
  </v-dialog>

  <v-dialog v-model="editCalendarName" @done="getCalendars()">
    <dm-edit-calendar-name
      :calendar="calendarEditName"
      @updated="nameUpdated"
    />
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import { useDisplay } from "vuetify/lib/framework.mjs";
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
    search: "",
    newCalendarForm: false,
    deleteCalendar: false,
    editCalendarName: false,
    calendarToEditName: null,
  }),

  computed: {
    ...mapState("calendars", ["localCalendars", "apiCalendars", "calendar"]),
    ...mapState("auth", ["token"]),

    isMobile() {
      const { mobile, smAndDown } = useDisplay();
      return mobile.value || smAndDown.value;
    },

    calendarEditName() {
      const allCalendars = [...this.localCalendars, ...this.apiCalendars];
      return allCalendars.find((c) => c.uuid === this.calendarToEditName.uuid);
    },

    filteredCalendars() {
      const allCalendars = [...this.localCalendars, ...this.apiCalendars];
      if (!this.search) return allCalendars;

      return allCalendars.filter(
        (c) =>
          c.name.toLowerCase().includes(this.search.toLowerCase()) ||
          c.academic_charge.name
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          c.calendarable.name.toLowerCase().includes(this.search.toLowerCase())
      );
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
