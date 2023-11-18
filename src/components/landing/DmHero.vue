<script setup>
import { inject } from "vue";
import undrawBooking from "../../assets/images/undraw_booking.svg";
import { useRouter } from "vue-router";

const router = useRouter();

const isMobile = inject("isMobile");
</script>

<template>
  <v-container style="max-width: 80rem">
    <v-row justify="space-between" align="center">
      <v-col cols="12" md="6">
        <h3 class="text-h3 font-weight-regular">
          <span class="text-amber"> Planifica </span>
          tu proximo semestre
          <span class="text-amber"> mas facil </span>
        </h3>
        <section class="my-6">
          <v-btn
            size="x-large"
            color="white"
            @click="router.push({ name: 'login' })"
            >Empieza ahora</v-btn
          >
          <v-btn
            variant="text"
            color="white"
            @click="router.push({ name: 'calendars.index' })"
          >
            Utilizar sin una cuenta
          </v-btn>
        </section>
        <p>
          Duocmatico es gratis y no es necesario tener una cuenta para
          utilizarlo
        </p>
      </v-col>
      <v-col v-if="!isMobile" cols="12" md="4">
        <v-img :src="undrawBooking" width="auto"></v-img>
      </v-col>
    </v-row>
  </v-container>
</template>
