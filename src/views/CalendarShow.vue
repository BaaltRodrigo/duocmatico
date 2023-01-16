<template>
  <v-container :fluid="showSections">
    <v-row>
      <v-col v-show="showSections" cols="4">
        <dm-section-selection></dm-section-selection>
      </v-col>
      <v-col :cols="showSections ? '8' : '12'">
        <div style="position: sticky">
          <v-card class="elevation-0" height="70vh" rounded="lg">
            <v-card-title>{{ selected.name }}</v-card-title>
            <dm-calendar :sections="selected.sections"></dm-calendar>
            <v-btn
              block
              color="purple"
              class="mt-4"
              dark
              depressed
              @click="agregarRamos"
            >
              Agregar ramos
            </v-btn>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <!-- <v-dialog v-model="showSections" max-width="70vh" scrollable>
      <v-card rounded="lg">
        <v-card-title>Cursos disponibles</v-card-title>
        <v-card-text style="height: calc(80vh - 102px)">
          <dm-section-group
            v-for="course in groups"
            :key="`clouster-${course.name}`"
            :course="course"
          ></dm-section-group>
        </v-card-text>
      </v-card>
    </v-dialog> -->
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import DmSectionSelection from "../components/sections/DmSectionSelection.vue";
import DmCalendar from "../components/calendar/DmCalendar.vue";

export default {
  name: "test",

  components: {
    DmCalendar,
    DmSectionSelection,
  },

  computed: {
    ...mapState("calendars", ["selected"]),
    ...mapState("firebase", ["carga", "carrera", "secciones"]),
    ...mapGetters("firebase", { groups: "sectionsGroupedByCourse" }),
  },

  data: () => ({
    showSections: false,
  }),

  methods: {
    ...mapMutations(["addLogEvent"]),
    ...mapActions("calendars", ["setCalendarByIndex"]),
    ...mapActions("firebase", ["getSectionsFromFirebase"]),

    async agregarRamos() {
      if (!this.secciones.length) {
        // Cargar secciones desde firebase
        await this.getSectionsFromFirebase();
      }
      // Mostrar popup con secciones disponibles
      this.showSections = true;
    },
  },

  async created() {
    await this.setCalendarByIndex(Number(this.$route.params.id));
  },
};
</script>
