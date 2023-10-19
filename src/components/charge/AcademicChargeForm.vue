<template>
  <v-form ref="form">
    <v-file-input
      variant="outlined"
      label="Archivo de carga academica"
      accept=".xlsx, .xls, .csv"
      v-model="uploadedFile"
      prepend-icon=""
      prepend-inner-icon="mdi-microsoft-excel"
      show-size
    ></v-file-input>
    <div class="d-flex justify-space-between">
      <v-btn @click="$emit('close')" color="error" variant="text">
        Cancelar
      </v-btn>
      <v-btn @click="handleSubmit">Subir carga academica</v-btn>
    </div>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import { read, utils } from "xlsx";
import ChargeFormHeadersTable from "./ChargeFormHeadersTable.vue";

export default {
  name: "AcademicChargeForm",

  components: {
    ChargeFormHeadersTable,
  },

  watch: {
    uploadedFile: "handleFileUpload",
  },

  data: () => ({
    uploadedFile: null,
    loading: false,
    csvData: null,
  }),

  methods: {
    ...mapActions("academicCharges", ["uploadAcademicChargeFile"]),

    /**
     * Reads the uploaded file and converts it to csv
     * TODO: When failed to convert. Show an error
     * TODO: When a required header is missing, notify the missing headers
     *
     * @returns {void}
     */
    handleFileUpload() {
      const file = this.uploadedFile[0];
      if (!file) {
        this.csvData = null;
        return;
      }
      // There is only one file, so we use the first element every time
      console.log("[File Form] File uploaded: ", {
        name: file.name,
        type: file.type,
        size: file.size + " bytes",
      });
      // Using XLSX library, read the file and convert it to csv
      const reader = new FileReader();
      reader.onload = (e) => {
        this.loading = true;
        console.log("[File Form] Reading file");
        const data = new Uint8Array(e.target.result);
        const workbook = read(data, { type: "array" });

        // First sheet is the one with the whole sections and information.
        const firstSheet = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheet];

        const csv = utils.sheet_to_csv(sheet);
        this.csvData = csv;
        this.loading = false;
        console.log("[File Form] CSV converted");
      };

      reader.readAsArrayBuffer(file);
    },

    // TODO: Send file to API
    handleSubmit() {
      if (!this.csvData) {
        console.log("[File Form] No csv data to send");
        return;
      }

      console.log("[File Form] Sending csv data to API");
    },
  },

  emits: ["close"],
};
</script>
