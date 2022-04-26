<template>
  <v-card class="rounded-lg">
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
        v-model="carrera"
        label="Tu carrera"
        placeholder="Buscar entre las carreras"
        :items="careers"
        item-text="carrera"
        hint="Podras podras cambiar la carrera si lo deseas mas adelante"
      ></v-autocomplete>
      <v-checkbox
        v-model="rememberCareer"
        label="Usar esta carrera cuando ingreses otra vez a Duocmatico?"
        dense
      >
      </v-checkbox>
      <v-divider class="my-4"></v-divider>
      <h2 class="text-h6 mb-2">Semestre</h2>
      <v-chip-group column multiple v-model="semestres">
        <v-chip
          v-for="semestre in getSemesters"
          :key="`semestre-${semestre}`"
          filter
          outlined
          :value="semestre"
        >
          {{ semestre ? `Semestre ${semestre}` : "Optativo" }}
        </v-chip>
      </v-chip-group>
      <v-divider class="my-4"></v-divider>

      <h2 class="text-h6 mb-2">Jornada</h2>
      <v-chip-group column multiple v-model="jornadas">
        <v-chip
          v-for="time in getTimes"
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
        Aplicar
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "FiltrosCard",

  computed: {
    ...mapGetters(["careers"]),
    ...mapState("courses", ["courses", "career"]),
    ...mapGetters("courses", ["getSemesters", "getTimes"]),

    filters() {
      return {
        semesters: this.semestres,
        times: this.jornadas,
      };
    },
  },

  watch: {
    // Si cambia la carrera, se recaluclan los filtros.
    async carrera() {
      if (!this.carrera) return;
      const careerData = await this.findCareerData(this.carrera);
      this.cleanFilters();
      this.setCareer(careerData.carrera);
      this.setCourses(careerData.ramos);
    },
  },

  data() {
    return {
      rememberCareer: false,
      loading: false,
      carrera: this.career,
      semestres: [],
      jornadas: [],
    };
  },

  methods: {
    ...mapActions(["findCareerData"]),
    ...mapMutations("courses", ["setCareer", "setCourses", "setFilters"]),

    cleanFilters() {
      this.semestres = [];
      this.jornadas = [];
    },

    applyFilters() {
      this.setFilters({
        semesters: this.semestres,
        times: this.jornadas,
      });
      if (this.rememberCareer) {
        localStorage.selectedCareer = this.carrera;
      }
      this.$emit("close");
    },
  },

  mounted() {
    this.carrera = this.career;
  },
};
</script>
