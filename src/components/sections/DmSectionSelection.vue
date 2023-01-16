<template>
  <v-card height="700px" rounded="lg">
    <v-list-item>
      <v-list-item-content
        v-text="currentTitle"
        class="text-capitalize text-h6"
      ></v-list-item-content>
      <v-list-item-action v-if="step == 2">
        <v-btn icon @click="goBack()">
          <v-icon size="lg">mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-virtual-scroll height="582" item-height="64" :items="groups">
          <template v-slot:default="{ item }">
            <dm-section-group
              :course="item"
              @click="changeStep(item)"
            ></dm-section-group>
          </template>
        </v-virtual-scroll>
      </v-window-item>
      <v-window-item :value="2">
        <v-card flat class="overflow-auto" height="582px">
          <dm-section-card
            v-for="s in course.sections"
            :key="s.seccion"
            :section="s"
            class="mx-2 my-2"
          ></dm-section-card>
        </v-card>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn block rounded depressed outlined @click="$emit('done')">
        Finalizar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import DmSectionCard from "./DmSectionCard.vue";
import DmSectionGroup from "./DmSectionGroup.vue";

export default {
  name: "DmSectionSelection",

  components: {
    DmSectionCard,
    DmSectionGroup,
  },

  computed: {
    ...mapGetters("firebase", { groups: "sectionsGroupedByCourse" }),
    currentTitle() {
      return this.course.name?.toLowerCase() ?? "Cursos Disponibles";
    },
  },

  data: () => ({
    step: 1,
    course: {},
  }),

  methods: {
    changeStep(item) {
      console.log(item);
      this.course = item;
      this.step = 2;
    },

    goBack() {
      this.course = {};
      this.step = 1;
    },
  },
};
</script>
