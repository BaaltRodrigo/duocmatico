<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import prototypingProcess from "../assets/images/undraw_prototyping_process.svg";
import DmCalendarPanels from "../components/home/DmCalendarPanels.vue";

const store = useStore();
const router = useRouter();
</script>

<template>
  <v-container fluid class="d-flex justify-center h-100">
    <!-- Section with the last calendars created -->
    <section style="max-width: 55rem">
      <h4 class="text-h4 mb-5">¡Hola otra vez!</h4>
      <dm-calendar-panels></dm-calendar-panels>
      <v-card
        class="my-6 pa-4 d-flex flex-wrap justify-space-around align-center"
      >
        <v-img :src="prototypingProcess" width="80" max-width="240"></v-img>
        <v-card-text class="text-h6 text-center">
          ¿Tienes planificar tu proximo semestre?
        </v-card-text>
        <v-card-text>
          <v-btn variant="outlined" block size="large">
            Crea otro calendario
          </v-btn>
        </v-card-text>
      </v-card>
      <section class="my-8">
        <p class="text-center text-h6">
          ¿Tus calendarios estan en otra cuenta?
          <v-btn
            variant="outlined"
            color="white"
            size="large"
            class="mx-2 text-h6"
          >
            Prueba ingresando con una cuenta distinta
          </v-btn>
        </p>
        <p class="text-center text-caption">
          Esta accion cerrara la cuenta actual
        </p>
      </section>
    </section>
  </v-container>
</template>
