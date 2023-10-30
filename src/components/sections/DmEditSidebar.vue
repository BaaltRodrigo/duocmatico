<template>
  <v-navigation-drawer class="px-2" floating :width="450" color="transparent">
    <v-card class="elevation-0">
      <v-text-field class="pt-3 pl-3 mr-2" v-model="search" prepend-inner-icon="mdi-magnify" clearable label="Asignatura"
        type="text" variant="outlined" :append-icon="'mdi-cog-outline'" @click:append="showFilter = !showFilter"
        @click:clear="clearSearch">
      </v-text-field>
      <v-expand-transition v-show="showFilter">
        <v-card-text class="text-subtitle-1">
          Semestre
          <v-row>
            <v-col cols="7" class="mt-1">
              <v-autocomplete v-model="selectedLevel" chips closable-chips multiple clearable :items="levelOptions"
                label="Seleccione el nivel" item-title="name" item-value="value"></v-autocomplete>
            </v-col>
            <v-col cols="5">
              <v-radio-group v-model="selectedShift">
                <v-radio label="Diurno" value="diurno"></v-radio>
                <v-radio label="Vespertino" value="vespertino"></v-radio>
              </v-radio-group>
              <v-btn @click="clearSearch">Limpiar Datos</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-expand-transition>
      <v-expansion-panels v-if="groupedSections" variant="accordion">
        <v-expansion-panel v-for="(group, subjectId) in filteredSubjects" :key="subjectId">
          <v-expansion-panel-title expand-icon="mdi-menu-down" class="text-body-1">
            {{ formatGroupName(group.subject.name) }}
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <dm-section-card v-for="section in group.sections" :key="section.id" :section="section"
              :calendar="calendar" />
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DmSectionCard from './DmSectionCard.vue';

export default {
  data: () => ({
    search: "",
    show: false,
    showFilter: false,
    selectedLevel: [],
    selectedShift: '',
    levelOptions: [
      { value: 0, name: "Optativo" },
      { value: 1, name: "1" },
      { value: 2, name: "2" },
      { value: 3, name: "3" },
      { value: 4, name: "4" },
      { value: 5, name: "5" },
      { value: 6, name: "6" },
      { value: 7, name: "7" },
      { value: 8, name: "8" },
    ]
  }),

  components: {
    DmSectionCard
  },

  computed: {
    ...mapState('academicCharges', ['sections']),
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
      return Object.values(this.groupedSections).filter(group => {
        const searchTerm = this.search.toLowerCase().replace(/[-\s]/g, '');
        const subjectName = group.subject.name.toLowerCase().replace(/[-\s]/g, '');
        const isMatch = subjectName.includes(searchTerm);

        const hasLevelFilter = this.selectedLevel.length === 0 || this.selectedLevel.includes(group.subject.level);

        const hasShiftFilter = !this.selectedShift || group.sections.some(section => this.selectedShift === section.shift);

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
    ...mapActions('academicCharges', ['getSections']),
    formatGroupName(name) {
      let sentences = name.replace(/-/g, ' ').split(" ").map(word => {
        return word[0].toUpperCase() + word.slice(1);
      })
      return sentences.join(" ");
    },

    clearSearch() {
      this.search = '';
      this.selectedLevel = [];
      this.selectedShift = null;
    },

  },
  async created() {

    await this.getSections({
      academicChargeId: this.calendar.academic_charge.id,
      calendarableId: this.calendar.calendarable.id,
      calendarableType: this.calendar.calendarable_type.toLowerCase(),
    });

  },
};
</script>