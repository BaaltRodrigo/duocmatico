<template>
  <v-container fill-height>
    <p class="text-h5">{{ shared.name }}</p>
    <v-card height="70vh" width="100%" rounded="lg">
      <dm-calendar :sections="shared.sections || []"></dm-calendar>
    </v-card>
    <v-card flat>
      <v-btn @click="saveCalendar">Agregar a mis calendarios</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import DmCalendar from "../components/calendar/DmCalendar.vue";

export default {
  name: "SharedCalendarView",

  components: {
    DmCalendar,
  },

  computed: {
    ...mapState("firebase", ["secciones"]),
    ...mapState("calendars", ["shared", "all"]),
  },

  data: () => ({
    calendar: {},
    sectionNames: [],
  }),

  methods: {
    ...mapMutations(["addLogEvent"]),
    ...mapMutations("firebase", ["setCarga", "setCarrera"]),
    ...mapActions("firebase", ["getSectionsFromFirebase"]),
    ...mapActions("calendars", [
      "addCalendarAction",
      "addSectionToSharedCalendar",
      "setSharedCalendar",
    ]),
    mapQueryParamsToData({ carrera, carga, sections: sectionNames, nombre }) {
      this.calendar = {
        carrera: carrera,
        carga: carga,
        name: nombre,
      };
      this.sectionNames = sectionNames.split(",");
    },

    saveCalendar() {
      this.addCalendarAction(this.shared);
      console.log("Popup de que se guardo.");
    },

    mapSectionNamesToFirebaseSections() {
      const realSections = this.sectionNames.map((name) => {
        const section = this.secciones.filter((s) => s.seccion === name)[0];
        if (section) return section;
      });
      realSections.forEach((section) =>
        this.addSectionToSharedCalendar(section)
      );
    },
  },

  async mounted() {
    // get route query params,
    this.mapQueryParamsToData(this.$route.query);
    await this.setSharedCalendar(this.calendar);
    // bring sections
    await this.getSectionsFromFirebase();
    // add sections to calendar
    this.mapSectionNamesToFirebaseSections();
  },
};
</script>
