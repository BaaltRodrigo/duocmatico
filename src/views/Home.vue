<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card height="600px" class="mb-4">
          <dm-calendar></dm-calendar>
        </v-card>
        <v-card>
          <v-card-text>
            <v-btn outlined class="rounded-pill">
              Borrar todos los cursos
              <v-icon color="error">mdi-delete</v-icon>
            </v-btn>
            <v-btn class="ml-3 rounded-pill" outlined>
              Exportar calendario
              <v-icon>mdi-export</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="order-md-first">
        <v-card outlined class="rounded-xl" min-height="600px">
          <v-card-title> Cursos disponibles para agregar </v-card-title>
          <v-card-title>
            <v-text-field
              dense
              outlined
              label="Buscar cursos"
              placeholder="Nombre del curso, seccion, sigla"
              prepend-icon="mdi-filter-outline"
              v-model="search"
              hint="Para ver mas filtros puedes hacer click en el icono"
              persistent-hint
              @click:prepend="showFilters = true"
            ></v-text-field>
          </v-card-title>
          <v-card-text v-if="subjects.length > 0">
            <dm-subject
              v-for="s in subjects"
              :key="`cluster-${s.subject}`"
              :subject-name="s.subject"
              :sections="s.sections"
            ></dm-subject>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-tooltip right>
        <template #activator="{ on, attr }">
          <v-btn
            @click="showClasses = true"
            class="my-12"
            small
            fab
            absolute
            top
            left
            dark
            color="purple"
            v-on="on"
            v-bind="attr"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Agregar un curso al calendario</span>
      </v-tooltip> -->
    <!-- Filter dialog -->
    <v-dialog
      persistent
      v-model="showFilters"
      content-class="elevation-0"
      max-width="700px"
    >
      <dm-filters @close="showFilters = false"></dm-filters>
    </v-dialog>
    <!-- Upload file dialog -->
    <v-dialog
      :value="showModal"
      content-class="elevation-0"
      persistent
      max-width="700px"
    >
      <cargar-archivo @done="setShowModal(false)" />
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";
import CargarArchivo from "../components/fileUpload/CargarArchivo.vue";
import DmCalendar from "@/components/calendar/DmCalendar.vue";
import DmSubject from "@/components/section/DmSubject.vue";
import DmFilters from "../components/filter/DmFilters.vue";
import Section from "@/models/section";

export default Vue.extend({
  name: "Home",
  components: {
    CargarArchivo,
    DmCalendar,
    DmSubject,
    DmFilters,
  },

  computed: {
    ...mapState("fileUpload", ["showModal"]),
    ...mapState("sections", ["sections", "filters"]),
    ...mapGetters("sections", ["sectionsByCareer", "filteredSections"]),

    /**
     * Adds the search filter into the filtered sections from the store
     *
     * @return {Section[]}
     */
    inputFiltered(): Section[] {
      if (!this.search) return this.filteredSections;
      const upperSearch = this.search.toUpperCase();
      return this.filteredSections.filter(
        (s: Section) =>
          s.section.toUpperCase().includes(upperSearch) ||
          s.subject.toUpperCase().includes(upperSearch)
      );
    },

    /**
     * Groups filtered sections into subjects
     *
     * @return {Array} with subject and sections
     */
    subjects(): Array<any> {
      // Without next line, `this.inputFiltered` raises "Object is of type unknown" error
      let filtered = this.inputFiltered as Section[];
      const subjectsNames = [
        ...new Set(filtered.map((s: Section) => s.subject)),
      ];
      const grouped = subjectsNames.map((name) => {
        return {
          subject: name,
          sections: filtered.filter((s: Section) => s.subject === name),
        };
      });
      return grouped;
    },
  },

  data: () => ({
    busqueda: null,
    showFilters: false,
    search: "",
  }),

  methods: {
    ...mapMutations("fileUpload", ["setShowModal"]),
  },

  mounted() {
    const { excelRows } = localStorage;
    if (!excelRows) {
      // No saved data. Force to upload it
      this.setShowModal(true);
    }
  },
});
</script>
