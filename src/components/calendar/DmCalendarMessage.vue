<template>
  <div class="text-center">
    <v-card>
      <v-card-text> Calendario guardado exitosamente. </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="closeDialog">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
