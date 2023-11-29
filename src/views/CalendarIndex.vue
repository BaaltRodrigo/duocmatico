<template>
  <v-container style="max-width: 90rem">
    <h4 class="text-h4 mb-2">Mis calendarios</h4>
    <v-card class="my-4" :width="isMobile ? '100%' : '480'">
      <v-text-field
        v-model="search"
        variant="solo"
        hide-details
        placeholder="Busca entre tus calendarios"
        clearable
      ></v-text-field>
    </v-card>
    <v-row :dense="!isMobile">
      <v-col cols="12" md="4" xl="3">
        <v-btn
          block
          color="black"
          variant="outlined"
          class="elevation-4 bg-primary"
          height="64px"
          @click="newCalendarForm = true"
        >
          <v-icon size="32" class="mr-2">mdi-plus</v-icon>
          <span class="text-body-1"> Crear nuevo calendario </span>
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="4"
        xl="3"
        v-for="calendar in filteredCalendars"
        :key="`calendar-${calendar.uuid}`"
      >
        <dm-calendar-card :calendar="calendar" />
      </v-col>
    </v-row>
  </v-container>

  <!-- Option dialogs -->
  <v-dialog v-model="newCalendarForm">
    <dm-calendar-form @created="handleCreated"></dm-calendar-form>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import { useDisplay } from "vuetify/lib/framework.mjs";
import DmCalendarCard from "../components/calendar/DmCalendarCard.vue";
import DmCalendarForm from "../components/calendar/DmCalendarForm.vue";
import { CALENDAR_SOURCES } from "../helpers/constants";
import { auth } from "../config/firebase";

export default {
  name: "CalendarIndexView",

  components: {
    DmCalendarCard,
    DmCalendarForm,
  },

  data: () => ({
    search: "",
    newCalendarForm: false,
  }),

  computed: {
    ...mapState("calendars", ["localCalendars", "apiCalendars", "calendar"]),

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
    ...mapMutations("calendars", ["setCalendar"]),
    getCalendars() {
      this.$store.dispatch("calendars/getCalendars", {
        source: CALENDAR_SOURCES.LOCAL,
      });

      if (!auth.currentUser) return;
      this.$store.dispatch("calendars/getCalendars", {
        source: CALENDAR_SOURCES.API,
      });
    },

    openEditCalendarNameCard(calendar) {
      this.calendarToEditName = calendar;
      this.editCalendarName = true;
    },

    handleCreated() {
      this.newCalendarForm = false;
      this.getCalendars();
    },
  },

  created() {
    this.getCalendars();
  },
};
</script>
