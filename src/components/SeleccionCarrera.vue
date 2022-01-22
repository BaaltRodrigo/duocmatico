<template>
  <v-container>
    <h2 class="mb-3 text-center text--secondary">Ahora selecciona la carrera a la que perteneces para mostrar los cursos disponibles</h2>
    <v-autocomplete
      outlined
      dense
      return-object
      v-model="carrera"
      placeholder="Buscar entre las carreras"
      :items="disponibles"
      item-text="carrera"
      hint="Podras podras cambiar la carrera si lo deseas mas adelante"
    ></v-autocomplete>
    <v-btn :disabled="!carrera" @click="confirmarCarrera" block depressed color="success">Ver los cursos de esta carrera</v-btn>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  name: "Filtros",

  computed: {
    ...mapState(['disponibles'])
  },

  data() {
    return {
      carrera: null
    }
  },

  methods: {
    ...mapMutations(['setCarrera']),

    confirmarCarrera() {
      this.setCarrera(this.carrera);
      this.$emit('done');
    },
  },
}
</script>