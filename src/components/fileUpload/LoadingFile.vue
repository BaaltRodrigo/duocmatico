<template>
  <v-card class="rounded-lg" outlined height="16rem">
    <v-row class="fill-height" justify="center" align-content="center">
      <v-col cols="12" class="text-subtitle-1 text-center">
        Leyendo el archivo cargado
        <br />
        <v-progress-circular
          class="mt-3"
          color="deep-purple accent-4"
          indeterminate
          :size="70"
          :width="7"
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "LoadingFile",
};
</script>
