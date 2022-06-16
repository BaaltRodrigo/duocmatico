<template>
  <v-simple-table dense>
    <template v-slot:default>
      <!-- Headers -->
      <thead>
        <tr>
          <th class="text-left">Dia y Hora</th>
          <th class="text-left">Sala</th>
        </tr>
      </thead>
      <!-- Data -->
      <tbody>
        <tr v-for="schedule in schedules" :key="schedule.id">
          <td>{{ schedule.baseString }}</td>
          <td v-if="schedule.isEmptySchedule()">
            {{ schedule.classroom }}
          </td>
          <td v-else>
            <v-icon>mdi-remote-desktop</v-icon>
            <v-icon>mdi-information</v-icon>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Schedule from "@/models/schedule";
import Vue from "vue";

export default Vue.extend({
  name: "DmSectionTimetable",

  props: {
    schedules: {
      type: Array as () => Schedule[],
      required: true,
    },
  },
});
</script>
