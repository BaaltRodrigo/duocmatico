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
      :items="getCareers"
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
import { version } from "../../../package";

export default {
  name: "CareerSelection",

  computed: {
    ...mapGetters("sections", ["getCareers"]),
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
    ...mapMutations("sections", ["setCareer"]),

    setPersistentData() {
      localStorage.lastVersion = version;
      localStorage.selectedCareer = this.carrera;
    },

    async showCourses() {
      // DISABLE BUTTON TO PREVENT EXECUTE THIS MULTIPLE TIMES
      this.disabledBtn = true;
      if (this.rememberFile) this.setPersistentData();
      // Copy data from fileConverter store to general store
      this.setCareer(this.carrera);
      this.disabledBtn = false;
      this.$emit("stop");
    },
  },
  mounted() {
    console.log(this.getCareers);
  },
};
</script>
