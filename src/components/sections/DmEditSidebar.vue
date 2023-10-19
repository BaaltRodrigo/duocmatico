<template>
  <v-navigation-drawer floating :width="450">
    <v-card class="ml-5">
      <v-text-field class="pt-3 pl-3 mr-2" prepend-inner-icon="mdi-magnify" clearable label="Asignatura" type="text"
        variant="outlined" :append-icon="'mdi-cog-outline'" @click:append="show = !show">
      </v-text-field>
      <v-expand-transition>
        <v-card-text class="text-subtitle-1" v-show="show">
          Semestre
          <v-row>
            <v-col cols="7">
              <v-autocomplete class="pt-1" variant="outlined" clearable label="Cualquier semestre"></v-autocomplete>
            </v-col>
            <v-col cols="5">
              <v-radio-group>
                <v-radio label="Diurno" value="1"></v-radio>
                <v-radio label="Vespertino" value="2"></v-radio>
              </v-radio-group>
              <v-btn color="green" variant="flat">Limpiar Datos</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-expand-transition>
    </v-card>
    <v-expansion-panels class="ml-5 mt-2" variant="inset" v-if="groupedSections">
      <v-expansion-panel v-for="(group, subjectId) in groupedSections" :key="subjectId">
        <v-expansion-panel-title expand-icon="mdi-menu-down" class="text-body-1">
          {{ formatGroupName(group.subject.name) }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <dm-section-card v-for="section in group.sections" :key="section.id" :section="section" :calendar="calendar" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DmSectionCard from './DmSectionCard.vue';

export default {
  data: () => ({
    show: false,
  }),

  components: {
    DmSectionCard
  },

  computed: {
    ...mapState('academicCharges', ['sections']),
    groupedSections() {
      return this.sections.reduce((acc, section) => {
        const subjectId = section.subject.id;
        if (!acc[subjectId]) {
          acc[subjectId] = {
            subject: section.subject,
            sections: [],
          };
        }
        acc[subjectId].sections.push(section);
        return acc;
      }, {});
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

  },
  created() {
    this.getSections({
      academicChargeId: this.calendar.academic_charge.id,
      calendarableId: this.calendar.calendarable.id,
      calendarableType: this.calendar.calendarable_type.toLowerCase(),
    });
  },
};
</script>