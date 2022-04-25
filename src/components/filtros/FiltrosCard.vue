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
      <h2 class="text-h6 mb-2">Semestre</h2>
      <v-chip-group column multiple v-model="semestres">
        <v-chip
          v-for="semestre in semesters"
          :key="`semestre-${semestre}`"
          filter
          outlined
        >
          {{ semestre ? `Semestre ${semestre}` : "Optativo" }}
        </v-chip>
      </v-chip-group>
      <v-divider class="mx-4 my-4"></v-divider>

      <h2 class="text-h6 mb-2">Jornada</h2>
      <v-chip-group column multiple v-model="jornadas">
        <v-chip v-for="time in times" :key="`jornada-${time}`" filter outlined>
          {{ time }}
        </v-chip>
      </v-chip-group>
      <v-btn class="rounded-pill white--text mt-4" block color="purple">
        Aplicar Filtros
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "FiltrosCard",

  computed: {
    ...mapState(["career"]),
    ...mapGetters(["careers", "semesters", "times"]),
  },

  data() {
    return {
      carrera: this.career,
      semestres: [],
      jornadas: [],
    };
  },

  methods: {},

  mounted() {
    this.carrera = this.career;
    console.log(this.jornadas);
  },
};
</script>
