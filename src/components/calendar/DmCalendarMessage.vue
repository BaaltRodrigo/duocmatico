<template>
  <v-card class="text-center">
    <v-card-text>Calendario guardado exitosamente </v-card-text>
    <v-card-text>
      <v-btn variant="flat" color="primary" block @click="$emit('close')">
        Aceptar
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  emits: ["close"],
};
</script>
