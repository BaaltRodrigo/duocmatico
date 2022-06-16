<template>
  <v-card flat style="border-top: 1px">
    <v-list-item @click="showCourses = !showCourses" two-line>
      <v-list-item-content>
        <v-list-item-title class="text-capitalize">
          {{ subjectName.toLowerCase() }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Cantidad de secciones: {{ sections.length }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-expand-transition>
      <v-card-text v-show="showCourses">
        <dm-section
          v-for="section in sections"
          :key="`section-${section.section}`"
          :section="section"
          class="mb-4"
        ></dm-section>
      </v-card-text>
    </v-expand-transition>
    <v-divider></v-divider>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Section from "@/models/section";
import DmSection from "./DmSection.vue";

export default Vue.extend({
  name: "DmSubject",

  components: {
    DmSection,
  },

  props: {
    subjectName: {
      type: String,
      required: true,
    },

    sections: {
      type: Array as () => Section[],
      required: true,
    },
  },

  data() {
    return {
      showCourses: false,
    };
  },
});
</script>
