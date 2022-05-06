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

  watch: {
    sections() {
      console.log("Eventos:", this.events);
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
      const mutableDate = new Date();
      const eventWeekdayNumber = this.dayValues[horario.substring(0, 2)];
      const todayWeekdayNumber = mutableDate.getDay();

      // calculate correct day based on the actual week
      const differece = todayWeekdayNumber - eventWeekdayNumber;
      const eventDay = mutableDate.getDate() - differece;
      mutableDate.setDate(eventDay);
      console.log("La fecha:", mutableDate.toString());
      const yearMonthDay = mutableDate.toISOString().split("T")[0];
      console.log("YYYY-MM-DD:", yearMonthDay);

      const startEnd = horario.substring(3).split(" - ");
      const startDate = new Date(`${yearMonthDay} ${startEnd[0]}`);
      const endtDate = new Date(`${yearMonthDay} ${startEnd[1]}`);
      console.log("Inicio:", startDate.toString());

      return {
        start: `${yearMonthDay} ${startDate
          .toString()
          .split(" ")[4]
          .substr(0, 5)}`,
        end: `${yearMonthDay} ${endtDate
          .toString()
          .split(" ")[4]
          .substr(0, 5)}`,
      };
    },
  },

  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  },
};
</script>
