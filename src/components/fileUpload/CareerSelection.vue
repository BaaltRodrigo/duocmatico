<template>
  <div>
    <!-- <v-checkbox
      v-model="rememberFile"
      label="Usar este archivo y carrera al iniciar Duocmatico?"
    >
    </v-checkbox> -->
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
    <v-btn
      block
      class="rounded-pill white--text"
      color="deep-purple"
      :disabled="!carrera || disabledBtn"
      @click="showCourses"
    >
      Ver los ramos disponibles
    </v-btn>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "CareerSelection",

  computed: {
    ...mapGetters("fileUpload", ["careers"]),
    ...mapState("fileUpload", ["attemptedFile", "temporaryData"]),
  },

  data() {
    return {
      carrera: null,
      rememberFile: false,
      disabledBtn: false,
    };
  },

  methods: {
    ...mapMutations(["setCareersData", "setCareer"]),
    showCourses() {
      // DISABLE BUTTON TO PREVENT EXECUTE THIS MULTIPLE TIMES
      this.$emit("loading");
      this.disabledBtn = true;
      // if (this.rememberFile) {
      //   console.log("Guardar path en cookies");
      // }
      // Copy data from fileConverter store to general store
      this.setCareersData(this.temporaryData);
      this.setCareer(this.carrera);
      this.$emit("stop");
    },
  },
};
</script>
