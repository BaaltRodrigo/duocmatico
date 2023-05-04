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
            variant="tonal"
            height="100%"
            :color="event.color"
            @click="openSectionInformation(event.sectionId)"
          >
            <v-card-title class="text-capitalize text-body-2">
              {{ event.title }}
            </v-card-title>
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
    ...mapState("calendars", ["selectedCalendar"]),
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
    sectionInformation: false,
    section: null,
  }),

  methods: {
    openSectionsSidebar() {
      if (this.secciones.length === 0) {
        // Only getting sections from firebase if sections array is empty
        this.$store.dispatch("academicCharges/getSectionsFromFirebase");
      }
      this.$store.dispatch("calendars/toggleSectionsSidebar");
    },

    openSectionInformation(sectionId) {
      this.section = this.secciones.find(
        (section) => section.seccion === sectionId
      );
      this.$nextTick(() => (this.sectionInformation = true));
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
            sectionId: section.seccion,
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

  mounted() {
    console.log("Calendario:", this.selectedCalendar);
    console.log("Eventos", this.calendarEvents);
  },

  async created() {
    // set calendar from param id in url to store
    // set a calendar with this action also set academic charges and career into store
    await this.$store.dispatch(
      "calendars/selectCalendarByIndex",
      this.$route.params.id
    );
  },

  async beforeUnmount() {
    await this.$store.dispatch("calendars/setSectionsSidebar", false);
  },
};
</script>

<!-- Similar border radius to rounded-lg -->
<style>
.vuecal__event {
  border-radius: 0.5rem;
}
</style>
