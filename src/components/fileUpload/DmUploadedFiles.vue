<template>
  <v-list two-line>
    <div v-for="(file, index) in all" :key="`uploaded-file-${index}`">
      <v-list-item>
        <v-list-item-avatar v-if="!file.conversion">
          <v-icon dark class="grey lighten-1"> mdi-clock </v-icon>
        </v-list-item-avatar>
        <v-list-item-avatar v-else>
          <v-icon v-if="file.error" dark class="error lighten-1">
            mdi-alert-circle
          </v-icon>
          <v-icon v-else dark class="success lighten-1"> mdi-check </v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-text="file.fileData.name"></v-list-item-title>

          <v-list-item-subtitle
            v-text="file.fileData.size"
          ></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action class="d-flex flex-row">
          <v-btn icon class="mx-2"
            ><v-icon color="error">mdi-delete</v-icon></v-btn
          >
          <v-btn v-if="file.conversion" icon @click="downloadJson(file)">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider v-if="all.length > 1 && index < all.length - 1"></v-divider>
    </div>
  </v-list>
</template>

<script>
import { mapState } from "vuex";
import download from "downloadjs";

export default {
  name: "DmUploadedFiles",

  computed: {
    ...mapState("fileUpload", ["all"]),
  },

  methods: {
    downloadJson(file) {
      console.log(file);
      const data = JSON.stringify({
        carga: file.fileData.name.split(".")[0],
        carreras: file.conversion,
      });
      const filename = file.fileData.name.split(".")[0]; // Name without Extension
      download(data, `${filename}.json`, "text/json;charset=utf-8");
    },
  },
};
</script>
