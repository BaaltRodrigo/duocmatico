<template>
  <v-container :fluid="showSections">
    <v-row>
      <v-col v-show="showSections" cols="4">
        <dm-section-selection
          @done="showSections = false"
        ></dm-section-selection>
      </v-col>
      <v-col :cols="showSections ? '8' : '12'">
        <v-card
          class="elevation-0"
          color="background"
          height="70vh"
          rounded="lg"
        >
          <v-text-field
            v-model="inputName"
            class="my-2 custom text-h6"
            hint="Puedes editar el nombre de tu calendario"
            persistent-hint
            dense
            @click:append="inputName = selected.name || ''"
            @click:prepend="updateCalendarName(inputName)"
            :append-icon="sameName ? '' : 'mdi-close-circle'"
            :prepend-icon="sameName ? 'mdi-calendar' : 'mdi-content-save'"
          >
          </v-text-field>
          <dm-calendar :sections="selected.sections || []"></dm-calendar>
          <v-row v-if="!showSections">
            <v-col cols="4">
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
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
import DmSectionSelection from "../components/sections/DmSectionSelection.vue";
import DmCalendar from "../components/calendar/DmCalendar.vue";

export default {
  name: "DmCalendarShow",

  components: {
    DmCalendar,
    DmSectionSelection,
  },

  computed: {
    ...mapState("calendars", ["selected"]),
    ...mapState("firebase", ["carga", "carrera", "secciones"]),
    ...mapGetters("firebase", { groups: "sectionsGroupedByCourse" }),

    sameName() {
      return this.selected?.name == this.inputName;
    },
  },

  data: () => ({
    inputName: "",
    showSections: false,
  }),

  methods: {
    ...mapMutations(["addLogEvent"]),
    ...mapActions("calendars", ["setCalendarByIndex", "updateCalendarName"]),
    ...mapActions("firebase", ["getSectionsFromFirebase"]),

    async agregarRamos() {
      if (!this.secciones.length) {
        // Cargar secciones desde firebase
        await this.getSectionsFromFirebase();
      }
      this.showSections = true;
    },

    restoreCalendarName() {
      this.inputName = this.selected.name;
    },
  },

  mounted() {
    this.inputName = this.selected.name;
  },

  async created() {
    // setCalendarByIndex can commit setDisplay404
    await this.setCalendarByIndex(Number(this.$route.params.id));
  },
};
</script>

<style scoped>
.v-text-field >>> .v-input__slot::before {
  border-style: none !important;
}

.v-text-field >>> .v-input__slot::after {
  border-style: none !important;
}
</style>
