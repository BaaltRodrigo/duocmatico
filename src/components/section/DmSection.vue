<template>
  <v-card outlined class="rounded-lg">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{ section.section }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn
          outlined
          :color="isInSchedule ? 'error' : 'success'"
          class="rounded-pill"
          @click="handle"
        >
          {{ isInSchedule ? "Quitar" : "Agregar" }}
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <!-- Esto se muestra al hacer click en el ramo -->
    <v-container>
      <v-row>
        <!-- Schedules -->
        <v-col cols="12" md="6">
          <v-card outlined>
            <dm-section-timetable
              :schedules="section.schedules"
            ></dm-section-timetable>
          </v-card>
        </v-col>
        <!-- Extra Data -->
        <v-col cols="12" md="6">
          <v-card outlined>
            <dm-section-information :section="section"></dm-section-information>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Section from "@/models/section";
import DmSectionTimetable from "./DmSectionTimetable.vue";
import DmSectionInformation from "./DmSectionInformation.vue";
import { mapState } from "vuex";

export default Vue.extend({
  name: "DmSection",

  components: {
    DmSectionInformation,
    DmSectionTimetable,
    // CursoExtraInfo,
  },

  props: {
    section: {
      type: Object as () => Section,
      required: true,
    },
  },

  computed: {
    ...mapState("schedule", ["sections"]),
    isInSchedule() {
      return this.sections.find(
        (s: Section) => s.section === this.section.section
      );
    },
  },

  methods: {
    async handle() {
      if (this.isInSchedule) {
        await this.$store.dispatch("schedule/addSection", this.section);
      } else {
        await this.$store.dispatch("schedule/removeSection", this.section);
      }
    },
  },
});
</script>
