<template>
  <v-calendar
    ref="calendar"
    type="week"
    :start="calendarStart"
    :end="calendarEnd"
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
    /**
     * This function helps to calculate the start and end date
     * of the weekly calendar.
     *
     * @param {string} calendarDate Data attribute that we want to change
     * @param {number} weekDay Day number of the week. See data -> dayValues
     *
     * @return {string} Date string formated YYYY-M-D or YYYT-MM-DD. I think it's the first one...
     */
    setupDates(calendarDate, weekDay) {
      const today = new Date();
      const dayDiff = today.getDay() - weekDay;

      today.setDate(today.getDate() - dayDiff);

      this[calendarDate] = today.toISOString().split("T")[0];
    },

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

    getTimes({ horario }) {
      const eventDate = new Date(); // Date on locale machine
      const eventWeekdayNumber = this.dayValues[horario.substring(0, 2)];
      const todayWeekdayNumber = eventDate.getDay();

      // calculate correct day based on the actual week
      const differece = todayWeekdayNumber - eventWeekdayNumber;
      eventDate.setDate(eventDate.getDate() - differece);
      // eventDate.setDate(eventDay);
      console.log("La fecha de evento:", eventDate.toISOString().split("T")[0]);

      const startEnd = horario.substring(3).split(" - ");

      return {
        start: `${eventDate.toISOString().split("T")[0]} ${startEnd[0]}`,
        end: `${eventDate.toISOString().split("T")[0]} ${startEnd[1]}`,
      };
    },
  },

  mounted() {
    // Move calendar to 8:00 AM
    this.$refs.calendar.scrollToTime("08:00");
  },

  created() {
    this.setupDates("calendarStart", this.dayValues.Lu);
    this.setupDates("calendarEnd", this.dayValues.Sa);
  },
};
</script>
