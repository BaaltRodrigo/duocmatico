<script setup>
import { auth } from "../../config/firebase";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import DmCalendarCard from "../calendar/DmCalendarCard.vue";

const router = useRouter();

const props = defineProps({
  calendars: {
    type: Array,
    required: true,
  },

  startOpen: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: "Tus calendarios",
  },
});

const email = computed(() => {
  return auth.currentUser?.email;
});

const panels = ref(props.startOpen ? [0] : []);
</script>

<template>
  <v-expansion-panels v-model="panels">
    <v-expansion-panel class="rounded-lg elevation-4">
      <v-expansion-panel-title class="text-h6 font-weight-regular">
        {{ title }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <section v-for="calendar in calendars" :key="calendar.uuid">
          <dm-calendar-card :calendar="calendar" class="my-4">
          </dm-calendar-card>
        </section>
        <section class="text-center">
          <v-btn size="large" @click="router.push({ name: 'calendars.index' })"
            >Ver mas calendarios</v-btn
          >
        </section>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
