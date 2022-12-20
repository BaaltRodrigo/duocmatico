<template>
  <v-card
    class="rounded-lg"
    style="border: 4px dashed lightgray; background-color: transparent"
    height="16rem"
    flat
    :class="{ 'elevation-6': active }"
    @dragenter.prevent="toggleActive"
    @dragleave.prevent="toggleActive"
    @dragover.prevent=""
    @drop.prevent="droppedFiles"
    @click="$refs.fileInput.click()"
  >
    <v-container class="text-center">
      <v-icon size="8rem">mdi-cloud-upload</v-icon>
      <h3>
        Arrastra el archivo a esta caja o hazme click para buscar un archivo
      </h3>
    </v-container>
    <input
      @change="selectedFiles"
      multiple
      ref="fileInput"
      type="file"
      accept=".xlsx"
      v-show="false"
    />
  </v-card>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
  name: "DmDropZone",

  data() {
    return {
      active: false,
    };
  },

  methods: {
    ...mapMutations("fileUpload", ["addFilesToConvert"]),
    ...mapActions("fileUpload", ["startFileConversion"]),

    toggleActive() {
      this.active = !this.active;
    },

    selectedFiles() {
      console.log(this.$refs.fileInput.files);
      this.startFileConversion([...this.$refs.fileInput.files]);
      this.$emit("uploadedFile");
      // console.log("Selected file");
      this.active = false;
    },

    droppedFiles(e) {
      // console.log(e.dataTransfer.files);
      this.startFileConversion([...e.dataTransfer.files]);
      this.$emit("uploadedFile");
      // console.log("Dropped file");
      this.active = false;
    },
  },
};
</script>
