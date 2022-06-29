<template>
  <v-calendar
    ref="calendar"
    type="week"
    :first-interval="7"
    :interval-count="17"
    :interval-height="56"
    :start="startDate.toISOString().split('T')[0]"
    :weekdays="weekdays"
    locale="es"
  ></v-calendar>
</template>

<script lang="ts">
import Vue from "vue";
import { getFirstDayOfTheWeek } from "@/helpers/calendarHelpers";

export default Vue.extend({
  name: "DmCalendar",

  data() {
    return {
      startDate: getFirstDayOfTheWeek(),
      weekdays: [1, 2, 3, 4, 5, 6], // From Monday to Saturday
      dayValues: {
        Do: 0,
        Lu: 1,
        Ma: 2,
        Mi: 3,
        Ju: 4,
        Vi: 5,
        Sa: 6,
      }, // Spanish
    } as {
      startDate: Date;
      weekdays: Number[];
      dayValues: any;
    };
  },

  methods: {},
});
</script>
