<template>
  <v-card outlined>
    <v-list-item>
      <v-list-item-content class="text-subtitle-1 font-weight-medium">
        {{ section.seccion }}
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          v-if="!isInCalendar"
          icon
          @click="addSectionToSelectedCalendar(section)"
        >
          <v-icon size="lg">mdi-plus</v-icon>
        </v-btn>
        <v-btn v-else icon @click="deleteSectionToSelectedCalendar(section)">
          <v-icon size="lg">mdi-minus</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <dm-section-card-schedule
      :horarios="section.horarios"
    ></dm-section-card-schedule>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DmSectionCardSchedule from "./DmSectionCardSchedule.vue";

export default {
  name: "DmSectionCard",

  components: {
    DmSectionCardSchedule,
  },

  computed: {
    ...mapState("calendars", ["selected"]),
    isInCalendar() {
      const { section } = this;
      const { sections } = this.selected;
      return sections.some((s) => s.seccion === section.seccion);
    },
  },

  props: {
    section: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions("calendars", [
      "addSectionToSelectedCalendar",
      "deleteSectionToSelectedCalendar",
    ]),
  },
};
</script>
