<script setup>
import { CALENDAR_SOURCES } from "../../helpers/constants";
import { useStore } from "vuex";
import { auth } from "../../config/firebase";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import DmCalendarCard from "../calendar/DmCalendarCard.vue";

const MAX_CALENDARS = 3;

const store = useStore();
const router = useRouter();

onMounted(async () => {
  await store.dispatch("calendars/getCalendars");
});

const localCalendars = computed(() =>
  store.state.calendars.localCalendars.splice(0, MAX_CALENDARS)
);

const apiCalendars = computed(() =>
  store.state.calendars.apiCalendars.reverse().splice(0, MAX_CALENDARS)
);

const email = computed(() => auth.currentUser?.email);

const panels = ref([
  email.value ? CALENDAR_SOURCES.API : CALENDAR_SOURCES.LOCAL,
]);
</script>

<template>
  <v-expansion-panels multiple v-model="panels">
    <!-- Account calendars -->
    <v-expansion-panel
      :value="CALENDAR_SOURCES.API"
      v-if="email"
      class="rounded-lg"
      :class="panels.length > 0 ? 'elevation-4' : ''"
    >
      <v-expansion-panel-title class="text-h6 font-weight-regular">
        {{ "Calendarios recientes de " + email }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <section v-for="calendar in apiCalendars" :key="calendar.uuid">
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

    <!-- Device calendars -->
    <v-expansion-panel
      :value="CALENDAR_SOURCES.LOCAL"
      class="rounded-lg"
      :class="panels.length > 0 ? 'elevation-4' : ''"
    >
      <v-expansion-panel-title class="text-h6 font-weight-regular">
        Ultimos calendarios en este dispositivo
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <section
          v-for="(calendar, index) in localCalendars"
          :key="calendar.uuid"
        >
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
