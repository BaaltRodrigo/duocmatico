<template>
  <v-container>
    <h4 class="text-h4 mb-2">{{ selectedCalendar.name }}</h4>

    <v-card class="rounded-xl elevation-3" variant="outlined" height="70vh">
      <vue-cal
        hide-view-selector
        hide-title-bar
        :disable-views="['years', 'year', 'month', 'day']"
        :hide-weekdays="[7]"
        :time-from="8 * 60"
        :time-step="30"
        locale="es"
      />
    </v-card>
    <br />
    <v-btn
      variant="outlined"
      class="rounded-pill elevation-3 text-capitalize"
      color="primary"
      >Agregar secciones</v-btn
    >
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "CalendarShow",

  components: {
    VueCal,
  },

  computed: {
    ...mapState("calendars", ["selectedCalendar"]),
  },

  async created() {
    // set calendar from param id in url to store
    await this.$store.dispatch(
      "calendars/selectCalendarByIndex",
      this.$route.params.id
    );
  },

  mounted() {
    console.log(this.selectedCalendar);
  },
};
</script>
