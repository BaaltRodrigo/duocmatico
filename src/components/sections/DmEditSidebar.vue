<template>
  <v-navigation-drawer class="px-2" floating :width="450" color="transparent">
    <v-card class="elevation-0">
      <v-container>
        <v-text-field
          hide-details
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          clearable
          label="Asignatura"
          type="text"
          variant="outlined"
          :append-inner-icon="'mdi-cog-outline'"
          @click:appendInner="showFilter = !showFilter"
          @click:clear="clearFilters"
        >
        </v-text-field>
      </v-container>
      <v-expand-transition v-show="showFilter">
        <v-card-text class="text-subtitle-1">
          <v-autocomplete
            v-model="selectedLevel"
            chips
            closable-chips
            multiple
            clearable
            :items="availableLevels"
            label="Seleccione el semestre"
          ></v-autocomplete>
          <v-radio-group inline v-model="selectedShift">
            <v-radio label="Diurno" value="diurno"></v-radio>
            <v-radio
              class="mx-auto"
              label="Vespertino"
              value="vespertino"
            ></v-radio>
          </v-radio-group>
          <v-btn @click="clearFilters">Limpiar Filtros</v-btn>
        </v-card-text>
      </v-expand-transition>
      <v-expansion-panels v-if="groupedSections" variant="accordion">
        <v-expansion-panel
          v-for="(group, subjectId) in filteredSubjects"
          :key="subjectId"
        >
          <v-expansion-panel-title
            expand-icon="mdi-menu-down"
            class="text-body-1"
          >
            {{ formatGroupName(group.subject.name) }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <dm-section-card
              v-for="section in group.sections"
              :key="section.id"
              :section="section"
              :calendar="calendar"
            />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DmSectionCard from "./DmSectionCard.vue";

export default {
  data: () => ({
    search: "",
    show: false,
    showFilter: false,
    selectedLevel: [],
    selectedShift: "",
  }),

  components: {
    DmSectionCard,
  },

  computed: {
    ...mapState("academicCharges", ["sections"]),

    availableLevels() {
      const levels = this.sections.map((s) => s.subject.level);

      const uniqueLevels = [...new Set(levels)];

      return uniqueLevels
        .sort()
        .map((i) => ({ value: i, title: i == 0 ? "Optativo" : i }));
    },

    groupedSections() {
      return this.sections.reduce((acc, section) => {
        const subjectId = section.subject.id;
        if (!this.selectedShift || this.selectedShift === section.shift) {
          if (!acc[subjectId]) {
            acc[subjectId] = {
              subject: section.subject,
              sections: [],
            };
          }
          acc[subjectId].sections.push(section);
        }
        return acc;
      }, {});
    },

    filteredSubjects() {
      return Object.values(this.groupedSections).filter((group) => {
        const searchTerm = this.search.toLowerCase().replace(/[-\s]/g, "");
        const subjectName = group.subject.name
          .toLowerCase()
          .replace(/[-\s]/g, "");
        const isMatch = subjectName.includes(searchTerm);

        const hasLevelFilter =
          this.selectedLevel.length === 0 ||
          this.selectedLevel.includes(group.subject.level);

        const hasShiftFilter =
          !this.selectedShift ||
          group.sections.some(
            (section) => this.selectedShift === section.shift
          );

        return isMatch && hasLevelFilter && hasShiftFilter;
      });
    },
  },

  props: {
    calendar: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    ...mapActions("academicCharges", ["getSections"]),
    formatGroupName(name) {
      let sentences = name
        .replace(/-/g, " ")
        .split(" ")
        .map((word) => {
          return word[0].toUpperCase() + word.slice(1);
        });
      return sentences.join(" ");
    },

    clearFilters() {
      this.search = "";
      this.selectedLevel = [];
      this.selectedShift = null;
    },
  },
  async created() {
    await this.getSections({
      academicChargeId: this.calendar.academic_charge.id,
      calendarableId: this.calendar.calendarable.id,
      calendarableType: this.calendar.calendarable.type.toLowerCase(),
    });
  },
};
</script>
