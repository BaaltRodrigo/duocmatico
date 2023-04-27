<template>
  <v-navigation-drawer
    app
    floating
    width="500"
    class="pl-4 pb-4"
    :model-value="sectionsSidebar"
  >
    <template v-slot:prepend>
      <v-chip
        size="x-large"
        style="width: 100%"
        variant="outlined"
        class="bg-white"
      >
        <v-text-field
          variant="plain"
          placeholder="Buscar sección"
          v-model="search"
        ></v-text-field>
      </v-chip>
    </template>

    <template v-slot:append>
      <v-btn
        block
        variant="outlined"
        class="rounded-pill"
        @click="toggleSectionsSidebar"
      >
        Finalizar
      </v-btn>
    </template>

    <v-card height="95%" class="my-4 rounded-xl bg-white" variant="outlined">
      <v-breadcrumbs density="compact">
        <v-breadcrumbs-item>
          <v-btn
            @click="step = 1"
            variant="text"
            class="rounded-pill text-capitalize text-body-2"
          >
            Secciones
          </v-btn>
        </v-breadcrumbs-item>
        <div v-if="step == 2">
          <v-breadcrumbs-divider></v-breadcrumbs-divider>
          <v-breadcrumbs-item>
            <v-btn
              variant="text"
              class="rounded-pill text-body-2 text-capitalize"
            >
              {{ group.name.toLowerCase() }}
            </v-btn>
          </v-breadcrumbs-item>
        </div>
      </v-breadcrumbs>
      <v-divider></v-divider>
      <!-- Needs to set styles to force scrollbar -->
      <v-window v-model="step" style="height: 90%; overflow: auto">
        <!-- window to select course -->
        <v-window-item :value="1">
          <v-list two-line>
            <v-list-item
              v-for="(course, index) in filteredSectionGroups"
              :key="course.name"
              @click="selectCourse(course)"
            >
              <v-list-item-title class="text-capitalize">
                {{ course.name.toLowerCase() }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Secciones disponibles: {{ course.sections.length }}
              </v-list-item-subtitle>
              <template #append>
                <v-icon>mdi-chevron-down</v-icon>
              </template>
            </v-list-item>
          </v-list>
        </v-window-item>
        <!-- Window to select sections -->
        <v-window-item :value="2" class="px-4">
          <dm-section-card
            v-for="section in group.sections"
            :key="section.seccion"
            :section="section"
            class="my-2"
          >
          </dm-section-card>
        </v-window-item>
      </v-window>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import DmSectionCard from "./DmSectionCard.vue";

export default {
  name: "DmSectionSelectorNav",

  components: {
    DmSectionCard,
  },

  computed: {
    ...mapState("calendars", ["sectionsSidebar"]),
    ...mapGetters("academicCharges", ["sectionsGroupedByCourse"]),

    // Filter sectionsGroupedByCourse name and initials by search
    filteredSectionGroups() {
      if (!this.search) return this.sectionsGroupedByCourse;

      return this.sectionsGroupedByCourse.filter((course) => {
        return (
          course.name.toLowerCase().includes(this.search.toLowerCase()) ||
          course.initials.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },

  data: () => ({
    step: 1,
    group: {},
    panels: [],
    search: "",
  }),

  methods: {
    ...mapActions("calendars", ["toggleSectionsSidebar"]),

    selectCourse(groupSelected) {
      this.step = 2;
      this.group = groupSelected;
      console.log(this.group);
    },

    getValidSchedules(schedules) {
      return schedules.filter((h) => h.horario != "0:00:00 - 0:00:00");
    },
  },
};
</script>
