<template>
  <v-container>
    <h2>Aqui es donde la magia ocurre</h2>
    <dm-drop-zone></dm-drop-zone>
    <h2 class="my-2">Archivos convertidos</h2>
    <v-card rounded="lg" outlined>
      <dm-uploaded-files></dm-uploaded-files>
    </v-card>
  </v-container>
</template>

<script>
import DmDropZone from "../components/fileUpload/DmDropZone.vue";
import DmUploadedFiles from "../components/fileUpload/DmUploadedFiles.vue";

export default {
  name: "FileConversion",

  components: {
    DmDropZone,
    DmUploadedFiles,
  },
};
</script>
