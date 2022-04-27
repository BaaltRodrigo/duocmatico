<template>
  <div>
    <v-checkbox
      v-model="rememberFile"
      label="Usar este archivo y carrera al iniciar Duocmatico?"
    >
    </v-checkbox>
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
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

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
    ...mapMutations(["setCareersData"]),
    ...mapActions(["findCareerData"]),
    ...mapMutations("courses", ["setCareer", "setCourses"]),
    async showCourses() {
      // DISABLE BUTTON TO PREVENT EXECUTE THIS MULTIPLE TIMES
      this.disabledBtn = true;
      if (this.rememberFile) {
        localStorage.isRemembered = true;
        localStorage.xslxJsonData = JSON.stringify(this.temporaryData);
        localStorage.selectedCareer = this.carrera;
      }
      // Copy data from fileConverter store to general store
      this.setCareersData(this.temporaryData);
      const careerData = await this.findCareerData(this.carrera);
      this.setCareer(this.carrera);
      this.setCourses(careerData.ramos);
      this.disabledBtn = false;
      this.$emit("stop");
    },
  },
};
</script>
