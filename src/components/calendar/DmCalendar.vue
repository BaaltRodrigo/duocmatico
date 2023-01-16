<template>
  <vue-cal
    :time-from="8 * 60"
    :time-to="23 * 60"
    :time-step="30"
    :hide-weekdays="[7]"
    :events="calendarEvents"
    :disable-views="['year', 'day']"
    hide-view-selector
    hide-title-bar
    locale="es"
    class="rounded-lg"
    ref="calendar"
    @ready="setDateToDays"
  >
  </vue-cal>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "DmCalendar",

  components: { VueCal },

  props: {
    sections: {
      type: Array,
      required: true,
    },
  },

  computed: {
    calendarEvents() {
      return this.mapCalendarEvents();
    },
  },

  data: () => ({
    dayDates: {
      Lunes: "",
      Martes: "",
      Miercoles: "",
      Jueves: "",
      Viernes: "",
      Sabado: "",
    },
  }),

  methods: {
    setDateToDays(e) {
      const { startDate } = e;
      const days = [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sabado",
      ];
      let count = 0;
      days.forEach((d) => {
        this.dayDates[d] = startDate.addDays(count).toISOString().split("T")[0];
        count++;
      });
    },

    mapCalendarEvents() {
      const { sections } = this;
      const schedules = sections
        .map((s) => this.sectionToCalendarEvents(s))
        .flat();
      // Only return events with weekday events
      return schedules.filter((s) => s.day != "En linea");
    },

    sectionToCalendarEvents(section) {
      const events = section.horarios.map((h) => {
        return {
          section: section.seccion,
          title: section.asignatura.toLowerCase(),
          content: `Sala: ${h.sala}`,
          classroom: h.sala,
          schedule: h.horario,
          ...this.addStartAndEndDateToSchedule(h.horario, h.dia),
          day: h.dia,
          class: `text-capitalize ${section.color} grey--text text--lighten-3 text-caption rounded-lg`,
        };
      });
      return events;
    },

    // htmlTemplate(section) {
    //   return `Sala: ${h.sala}`;
    // },

    // This transform the "horario" string to an object with start and end date
    addStartAndEndDateToSchedule(horario, dia) {
      // Early exit when day is "En Linea"
      if (dia === "En linea") return { start: null, end: null };

      const scheduleHours = horario.split(" - ");
      const startHour = scheduleHours[0].slice(2); // this string contains an abbreviation of the day before time
      const endHour = scheduleHours[1];

      return {
        start: `${this.dayDates[dia]} ${startHour}`,
        end: `${this.dayDates[dia]} ${endHour}`,
      };
    },
  },
};
</script>

<style>
.vuecal__event {
  cursor: pointer;
}

.vuecal__event-title {
  font-size: 1.2em;
  font-weight: bold;
}
</style>
