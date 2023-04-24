<template>
  <v-navigation-drawer
    class="pl-4"
    floating
    width="480"
    :model-value="sectionsSidebar"
  >
    <v-card
      height="90%"
      class="rounded-xl mt-2 mb-4 bg-white elevation-0"
      variant="outlined"
    >
      <v-card-title class="text-h5 font-weight-regular">Secciones</v-card-title>
      <!-- For some reason, having a card to overflow inside prevents the scrolls to render OUTSIDE the card -->
      <v-card variant="flat" class="overflow-auto" height="90%">
        <v-list lines="two">
          <v-list-item
            v-for="section in sectionsGroupedByCourse"
            :key="section.name"
            @click="() => {}"
            :title="section.name"
            :subtitle="`Secciones disponibles: ${section.sections.length}`"
            class="text-capitalize"
          >
          </v-list-item>
        </v-list>
      </v-card>
    </v-card>
    <v-btn
      block
      class="rounded-xl"
      variant="outlined"
      @click="toggleSectionsSidebar"
    >
      Finalizar
    </v-btn>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "DmSectionSelectorNav",

  computed: {
    ...mapState("calendars", ["sectionsSidebar"]),
    ...mapGetters("academicCharges", ["sectionsGroupedByCourse"]),
  },

  data: () => ({
    step: 1,
  }),

  methods: {
    ...mapActions("calendars", ["toggleSectionsSidebar"]),
  },

  mounted() {
    console.log(this.sectionsSidebar);
    console.log(this.sectionsGroupedByCourse);
  },
};
</script>
