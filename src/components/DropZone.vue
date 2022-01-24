<template>
  <v-card
    outlined
    min-height="16rem"
    :class="{ 'elevation-6': active}"
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent=""
    @drop.prevent="droppedFile"
    @click="$refs.fileInput.click()"
  >
    <v-container class="text-center">
      <v-icon size="8rem">mdi-cloud-upload</v-icon>
      <h3>Arrastra el archivo a esta caja o hazme click para buscar un archivo</h3>
    </v-container>
    <input @change="selectedFile" ref="fileInput" type="file" accept=".xlsx" v-show="false" />
  </v-card>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "DropZone",

  data() {
    return {
      active: false,
    }
  },

  methods: {
    ...mapMutations(['setArchivoCursos']),
    toggleActive() {
      this.active = !this.active;
    },

    selectedFile() {
      this.setArchivoCursos(this.$refs.fileInput.files[0]);
      // console.log("Selected file");
      this.active = false;
    },

    droppedFile(e) {
      this.setArchivoCursos(e.dataTransfer.files[0]);
      // console.log("Dropped file");
      this.active = false;
    }
  }
}
</script>