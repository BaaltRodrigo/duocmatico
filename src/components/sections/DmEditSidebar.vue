<template>
  <v-navigation-drawer class="px-2" floating :width="450" color="transparent">
    <v-card class="elevation-0">
      <v-expansion-panels v-if="groupedSections" variant="accordion">
        <v-expansion-panel v-for="(group, subjectId) in groupedSections" :key="subjectId">
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