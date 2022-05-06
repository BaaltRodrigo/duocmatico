<template>
  <v-calendar
    ref="calendar"
    type="week"
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
      today: new Date(),
    };
  },

  methods: {
    sectionToEvents(section) {
      const timeBlocks = [];
      section.horarios.forEach((bloque) => {
        if (bloque.horario == "0:00:00 - 0:00:00") return;
        timeBlocks.push({
          name: section.asignatura,
          ...this.getTimes(bloque),
        });
      });
      console.log("Bloques:", timeBlocks);
      return timeBlocks;
    },

    getTimes({ horario }) {
      const mutableDate = new Date(); // Date on locale machine
      const eventWeekdayNumber = this.dayValues[horario.substring(0, 2)];
      const todayWeekdayNumber = mutableDate.getDay();

      // calculate correct day based on the actual week
      const differece = todayWeekdayNumber - eventWeekdayNumber;
      mutableDate.setDate(mutableDate.getDate() - differece);
      // mutableDate.setDate(eventDay);
      console.log("La fecha de evento:", mutableDate.toLocaleString());

      const startEnd = horario.substring(3).split(" - ");

      return {
        start: `${mutableDate
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-")} ${startEnd[0]}`,
        end: `${mutableDate
          .toLocaleDateString()
          .split("/")
          .reverse()
          .join("-")} ${startEnd[1]}`,
      };
    },
  },

  mounted() {
    // Move calendar to 8:00 AM
    this.$refs.calendar.scrollToTime("08:00");
  },
};
</script>
