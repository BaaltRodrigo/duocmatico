<template>
  <div class="text-center py-6">
    <h1 class="text-h4 text-white font-weight-regular text-wrap-balance">
      Te ayudamos a planificar mejor tu proximo semestre sin importar la sede en
      la que te encuentres
    </h1>
    <v-btn
      class="rounded-lg text-none mt-6"
      size="x-large"
      color="white"
      @click="$router.push({ name: 'login' })"
    >
      Empieza ahora
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useDisplay } from "vuetify";
</script>

<style scoped>
.text-wrap-balance {
  text-wrap: balance;
}
</style>
