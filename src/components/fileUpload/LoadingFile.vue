<template>
  <v-card class="rounded-lg" outlined height="16rem">
    <v-row class="fill-height" justify="center" align-content="center">
      <v-col cols="12" class="text-subtitle-1 text-center">
        Leyendo el archivo cargado
      </v-col>
      <v-col cols="9">
        <v-progress-linear
          color="deep-purple accent-4"
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "LoadingFile",
};
</script>
