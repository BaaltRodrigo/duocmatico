<template>
  <v-card class="rounded-xl">
    <v-card-title>
      Filtros disponibles
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-autocomplete
        outlined
        dense
        return-object
        v-model="selectedCareer"
        label="Tu carrera"
        placeholder="Buscar entre las carreras"
        :items="getCareers"
        item-text="carrera"
        hint="Podras podras cambiar la carrera si lo deseas mas adelante"
      ></v-autocomplete>
      <v-divider class="my-4"></v-divider>
      <h2 class="text-h6 mb-2">Semestre</h2>
      <v-chip-group column multiple v-model="selectedLevels">
        <v-chip
          v-for="level in levelsBySections"
          :key="`level-${level}`"
          filter
          outlined
          :value="level"
        >
          {{ level ? `Semestre ${level}` : "Optativo" }}
        </v-chip>
      </v-chip-group>
      <v-divider class="my-4"></v-divider>

      <h2 class="text-h6 mb-2">Jornada</h2>
      <v-chip-group column multiple v-model="selectedDaytimes">
        <v-chip
          v-for="time in daytimeBySections"
          :key="`jornada-${time}`"
          filter
          outlined
          :value="time"
        >
          {{ time }}
        </v-chip>
      </v-chip-group>
      <v-btn
        @click="applyFilters"
        class="rounded-pill white--text mt-4"
        block
        color="purple"
      >
        Aplicar Filtros
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { SectionFilters } from "@/store/sections";
import { mapGetters, mapMutations, mapState } from "vuex";
import Vue from "vue";

export default Vue.extend({
  name: "FiltrosCard",

  computed: {
    ...mapGetters("sections", [
      "daytimeBySections",
      "getCareers",
      "levelsBySections",
    ]),
    ...mapState("sections", ["career", "filters"]),

    filters(): SectionFilters {
      return {
        levels: this.selectedLevels,
        daytimes: this.selectedDaytimes,
      };
    },
  },

  watch: {
    selectedCareer() {
      this.setCareer(this.selectedCareer);
    },
  },

  data() {
    return {
      selectedCareer: "",
      selectedLevels: [],
      selectedDaytimes: [],
    } as {
      selectedCareer: string;
      selectedLevels: number[];
      selectedDaytimes: string[];
    };
  },

  methods: {
    ...mapMutations("sections", ["setCareer", "setFilters"]),

    applyFilters() {
      this.setFilters(this.filters);
      this.$emit("close");
    },
  },

  mounted() {
    this.selectedCareer = this.career;
    this.selectedLevels = this.filters.levels;
    this.selectedDaytimes = this.filters.daytimes;
  },
});
</script>
