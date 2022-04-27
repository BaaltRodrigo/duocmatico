<template>
  <v-card flat class="rounded-lg">
    <v-card-title class="font-weight-h4">
      {{ titles[step - 1] }}
      <v-spacer></v-spacer>
      <v-btn icon @click="terminar">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-progress-linear
      :active="loading"
      :indeterminate="loading"
      absolute
      top
      color="deep-purple accent-4"
    ></v-progress-linear>
    <v-window v-model="step">
      <v-window-item :value="1">
        <v-card-text>
          <!-- Alerta en caso de no saber donde encontrar los archivos con los ramos -->
          <v-alert type="info" text>
            No sabes donde encontrar este archivo? Descarga
            <a
              target="none"
              href="https://inscripciones.duoc.cl/IA/#oferta-academica"
              >aqui</a
            >
            el que te corresponda.
          </v-alert>
          <v-alert type="error" text dismissible v-model="failedAttempt">
            Al parecer el archivo que subiste no es un excel con los ramos
            disponibles
          </v-alert>
          <drop-zone
            v-if="!attemptedFile"
            @uploadedFile="startFileConversion"
          ></drop-zone>
          <!-- Carga de algo para sensacion de progreso -->
          <loading-file v-else @done="step = 2" />
        </v-card-text>
      </v-window-item>
      <v-window-item :value="2">
        <v-card-text>
          <career-selection
            @loading="loading = true"
            @stop="terminar"
          ></career-selection>
        </v-card-text>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import {
  mapFileContent,
  groupBySections,
  groupByCareer,
} from "../../helpers/fileConverter";
import CareerSelection from "./CareerSelection.vue";
import DropZone from "./DropZone.vue";
import LoadingFile from "./LoadingFile.vue";

export default {
  name: "CargarArchivo",

  components: {
    DropZone,
    LoadingFile,
    CareerSelection,
  },

  computed: {
    ...mapState("fileUpload", ["attemptedFile"]),
  },

  data() {
    return {
      loading: false,
      failedAttempt: false,
      step: 1,
      titles: [
        "Sube tu excel con los ramos",
        "Un ultimo paso antes de ver tus ramos",
      ],
    };
  },

  watch: {},

  methods: {
    ...mapMutations("fileUpload", ["setTemporaryData", "setAttemptedFile"]),
    async startFileConversion() {
      // console.log(this.attemptedFile);
      const fileData = await mapFileContent(this.attemptedFile);
      // console.log(fileData);
      const dataBySections = groupBySections(fileData);
      // console.log(dataBySections);
      const dataByCareers = groupByCareer(dataBySections);
      // console.log(dataByCareers);
      if (dataByCareers.length > 0) {
        this.setTemporaryData(dataByCareers);
        this.step = 2;
      } else {
        this.failedAttempt = true;
        this.setAttemptedFile(null);
      }
    },

    terminar() {
      this.step = 1;
      this.failedAttempt = false;
      this.setAttemptedFile(null);
      this.$emit("done");
    },
  },

  created() {
    this.setAttemptedFile(null);
  },
};
</script>
