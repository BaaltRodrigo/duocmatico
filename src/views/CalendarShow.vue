<template>
  <v-container v-if="calendar">
    <h4 class="text-h4 mb-2">{{ calendar.name }}</h4>

    <v-card class="my-4 elevation-0" height="70vh">
      <vue-cal
        hide-view-selector
        hide-title-bar
        :disable-views="['years', 'year', 'month', 'day']"
        :hide-weekdays="[7]"
        :time-from="8 * 60"
        :time-step="30"
        locale="es"
        :events="calendarEvents"
      >
        <!-- This slot is how every calendar event should render -->
        <template v-slot:event="{ event }">
          <v-card
            class="rounded-lg"
            variant="tonal"
            height="100%"
            :color="event.color"
            @click="openSectionInformation(event.sectionId)"
          >
            <v-card-title class="text-capitalize text-body-2">
              {{ event.title }}
            </v-card-title>
            <v-card-text class="text-body-2">
              {{ event.start.toTimeString().slice(0, 5) }} -
              {{ event.end.toTimeString().slice(0, 5) }}
              <br />
              Sala: {{ event.classroom.toUpperCase() }}
            </v-card-text>
          </v-card>
        </template>
      </vue-cal>
    </v-card>
    <v-btn
      class="rounded-xl text-none"
      color="green-accent-1"
      @click="handleGetSections()"
    >
      Agregar secciones
    </v-btn>

    <v-dialog v-model="sectionInformation" :width="isMobile ? '' : '50%'">
      <dm-section-card :section="section" hide-add-button></dm-section-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { useDisplay } from "vuetify";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";
import DmSectionCard from "../components/sections/DmSectionCard.vue";

export default {
  name: "CalendarShow",

  components: {
    VueCal,
    DmSectionCard,
  },

  computed: {
    ...mapState("calendars", ["calendar"]),
    ...mapState("academicCharges", ["secciones"]),
    ...mapGetters("academicCharges", ["sectionsGroupedByCourse"]),

    calendarEvents() {
      return this.getCalendarEvents();
    },

    isMobile() {
      const { mobile } = useDisplay();
      return mobile.value;
    },
  },

  data: () => ({
    loaded: false,
    sectionInformation: false,
    section: null,
  }),

  methods: {
    // An example of how to get sections
    handleGetSections() {
      this.$store.dispatch("academicCharges/getSections", {
        academicChargeId: this.calendar.academic_charge_id,
        calendarableType: this.calendar.calendarable_type,
        calendarableId: this.calendar.calendarable_id,
      });
    },

    openSectionInformation(sectionId) {
      this.section = this.secciones.find(
        (section) => section.seccion === sectionId
      );
      this.$nextTick(() => (this.sectionInformation = true));
    },

    getCalendarEvents() {
      const { sections } = this.calendar;
      return sections.map((section) => this.getSectionEvents(section)).flat();
    },

    getSectionEvents(section) {
      const { schedules } = section;
      return schedules
        .filter((schedule) => schedule.times != "0:00:00 - 0:00:00") // Deleting non valid schedules
        .map((schedule) => {
          // const { start, end } = this.getScheduleCalendarEvents(schedule);
          // For some reason, there is no need to subtract the timezone offset
          // start.setHours(start.getHours() - start.getTimezoneOffset() / 60);
          // end.setHours(end.getHours() - end.getTimezoneOffset() / 60);
          return {
            title: section.subject.name.toLowerCase(),
            ...this.getScheduleCalendarEvents(schedule), // start, end, sala
            color: "purple",
            class: `text-capitalize`,
            sectionId: section.code,
          };
        });
    },

    getScheduleCalendarEvents(schedule) {
      // The early exit will never be executed because we are filtering
      if (schedule.times === "0:00:00 - 0:00:00") return null;

      const today = new Date(); // used to calculate current week's monday
      const monday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay() + 1
      );

      const dayToNumber = {
        lunes: 1,
        martes: 2,
        miercoles: 3,
        jueves: 4,
        viernes: 5,
        sabado: 6,
      };

      // string without first 3 characters of schedule.horario
      const [start, end] = schedule.times.slice(3).split(" - ");
      return {
        classroom: schedule.classroom,
        start: new Date(
          monday.getFullYear(),
          monday.getMonth(),
          monday.getDate() + dayToNumber[schedule.day] - 1, // Monday + day of schedule
          start.split(":")[0],
          start.split(":")[1]
        ),
        end: new Date(
          monday.getFullYear(),
          monday.getMonth(),
          monday.getDate() + dayToNumber[schedule.day] - 1, // Monday + day of schedule
          end.split(":")[0],
          end.split(":")[1]
        ),
      };
    },
  },

  /**
   * Here we check everything we need to show the calendar
   * If something is missing, we get it from the API
   * If something is missing on the API, we show an error
   */
  async created() {
    const { uuid } = this.$route.params;

    // Calendar is inside local calendars, use that one
    await this.$store.dispatch("calendars/getLocalCalendarByUuid", uuid);
    if (this.calendar) return;

    // Calendar is inside API calendars, use that one
    await this.$store.dispatch("calendars/getApiCalendarByUuid", uuid);
    if (this.calendar) return;

    // Calendar is not in local or API calendars, show error
    this.$store.commit("calendars/setCalendar", null);
    this.$store.commit("set404", true);
  },
};
</script>

<!-- Similar border radius to rounded-lg -->
<style>
.vuecal__event {
  border-radius: 0.5rem;
}
</style>
