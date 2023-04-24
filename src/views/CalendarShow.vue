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
      />
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
