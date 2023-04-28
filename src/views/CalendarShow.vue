<template>
  <v-container>
    <h4 class="text-h4 mb-2">{{ selectedCalendar.name }}</h4>

    <v-card class="rounded-xl elevation-0" variant="outlined" height="70vh">
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
        <template v-slot:event="{ event }">
          <v-card
            class="rounded-lg"
            variant="outlined"
            height="100%"
            :color="event.color"
          >
            <v-card-title class="text-capitalize text-body-2">{{
              event.title
            }}</v-card-title>
            <v-card-text>
              {{ event.start.toTimeString().slice(0, 5) }} -
              {{ event.end.toTimeString().slice(0, 5) }}
              <br />
              Sala: {{ event.sala }}
            </v-card-text>
          </v-card>
        </template>
      </vue-cal>
    </v-card>
    <br />
    <v-btn
      variant="outlined"
      class="rounded-pill text-capitalize"
      color="primary"
      @click="openSectionsSidebar()"
    >
      Agregar secciones
    </v-btn>
  </v-container>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "CalendarShow",

  components: {
    VueCal,
  },

  computed: {
    ...mapState("calendars", ["selectedCalendar"]),
    ...mapState("academicCharges", ["secciones"]),
    ...mapGetters("academicCharges", ["sectionsGroupedByCourse"]),

    calendarEvents() {
      return this.getCalendarEvents();
    },
  },

  methods: {
    openSectionsSidebar() {
      if (this.secciones.length === 0) {
        // Only getting sections from firebase if sections array is empty
        this.$store.dispatch("academicCharges/getSectionsFromFirebase");
      } else {
        console.log("Sections grouped");
        console.log(this.sectionsGroupedByCourse);
      }
      this.$store.dispatch("calendars/toggleSectionsSidebar");
    },

    getCalendarEvents() {
      const { sections } = this.selectedCalendar;
      return sections.map((section) => this.getSectionEvents(section)).flat();
    },

    getSectionEvents(section) {
      const { horarios } = section;
      return horarios
        .filter((h) => h.horario != "0:00:00 - 0:00:00") // Deleting non valid schedules
        .map((schedule) => {
          // const { start, end } = this.getScheduleCalendarEvents(schedule);
          // For some reason, there is no need to substract the timezone offset
          // start.setHours(start.getHours() - start.getTimezoneOffset() / 60);
          // end.setHours(end.getHours() - end.getTimezoneOffset() / 60);
          return {
            title: section.asignatura.toLowerCase(),
            ...this.getScheduleCalendarEvents(schedule), // start, end, sala
            color: "purple",
            class: `text-capitalize`,
          };
        });
    },

    getScheduleCalendarEvents(schedule) {
      // The early exit will never be executed because we are filtering
      if (schedule.horario === "0:00:00 - 0:00:00") return null;

      const today = new Date(); // used to calculate current week's monday
      const monday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - today.getDay() + 1
      );

      const dayToNumber = {
        Lunes: 1,
        Martes: 2,
        Miercoles: 3,
        Jueves: 4,
        Viernes: 5,
        Sabado: 6,
      };

      // string without first 3 characters of schedule.horario
      const [start, end] = schedule.horario.slice(3).split(" - ");
      return {
        sala: schedule.sala,
        start: new Date(
          monday.getFullYear(),
          monday.getMonth(),
          monday.getDate() + dayToNumber[schedule.dia] - 1, // Monday + day of schedule
          start.split(":")[0],
          start.split(":")[1]
        ),
        end: new Date(
          monday.getFullYear(),
          monday.getMonth(),
          monday.getDate() + dayToNumber[schedule.dia] - 1, // Monday + day of schedule
          end.split(":")[0],
          end.split(":")[1]
        ),
      };
    },
  },

  async created() {
    // set calendar from param id in url to store
    // set a calendar with this action also set academic charges and career into store
    await this.$store.dispatch(
      "calendars/selectCalendarByIndex",
      this.$route.params.id
    );
  },

  mounted() {
    console.log(this.calendarEvents);
  },
  async beforeUnmount() {
    await this.$store.dispatch("calendars/setSectionsSidebar", false);
  },
};
</script>
