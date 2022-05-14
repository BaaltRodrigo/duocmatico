<template>
  <v-calendar
    ref="calendar"
    type="week"
    :first-interval="7"
    :interval-count="17"
    :interval-height="90"
    :start="startISO"
    :end="endISO"
    :weekdays="weekdays"
    :events="events"
    locale="es"
  ></v-calendar>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Calendario",

  computed: {
    ...mapState("schedule", ["sections"]),
    startISO() {
      return this.calendarStart.toISOString().split("T")[0];
    },
    endISO() {
      return this.calendarEnd.toISOString().split("T")[0];
    },
    events() {
      const allEvents = [];
      this.sections.forEach((section) => {
        allEvents.push(...this.sectionToEvents(section));
      });
      return allEvents;
    },
  },

  data() {
    return {
      weekdays: [1, 2, 3, 4, 5, 6],
      dayValues: {
        Do: 0,
        Lu: 1,
        Ma: 2,
        Mi: 3,
        Ju: 4,
        Vi: 5,
        Sa: 6,
      }, // Spanish
      calendarStart: null,
      calendarEnd: null,
    };
  },

  methods: {
    sectionToEvents(section) {
      const timeBlocks = [];
      section.horarios.forEach((bloque) => {
        if (bloque.horario == "0:00:00 - 0:00:00") return;
        timeBlocks.push({
          name: section.asignatura,
          color: section.color,
          ...this.getTimes(bloque),
        });
      });
      console.log("Bloques:", timeBlocks);
      return timeBlocks;
    },

    getFirstDayOfTheWeek() {
      const today = new Date();
      today.setDate(today.getDate() - today.getDay() + 1); // Always to monday
      if (today.getDay() > 1) {
        console.log("No era nada lunes");
        // Be aware that because of timezone this "MONDAY" may no be YOUR MONDAY
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
      }
      const fecha = today.toLocaleString().split(", ")[0];
      // console.log("Fecha", fecha.split("/").reverse().join("-"));
      const monday = new Date(fecha.split("/").reverse().join("-"));
      return monday;
    },

    /**
     * Used to get the start and end date of an event
     */
    getTimes({ horario }) {
      const monday = this.getFirstDayOfTheWeek();
      const horarioDay = this.dayValues[horario.substring(0, 2)];
      const dayMinutes = 24 * 60;
      // get the real date of the event
      monday.setMinutes(dayMinutes * (horarioDay - 1));
      const eventDate = new Date(monday).toISOString().split("T")[0]; // Not actually monday
      const startEnd = horario.substring(3).split(" - ");

      return {
        start: `${eventDate} ${startEnd[0]}`,
        end: `${eventDate} ${startEnd[1]}`,
      };
    },
  },

  mounted() {
    // Move calendar to 8:00 AM
    this.$refs.calendar.scrollToTime("08:00");
  },

  created() {
    this.calendarStart = this.getFirstDayOfTheWeek();
    // Add minutes equivalent to 5 days to get saturday
    this.calendarEnd = new Date(
      this.getFirstDayOfTheWeek().setMinutes(60 * 24 * 5)
    );
  },
};
</script>
