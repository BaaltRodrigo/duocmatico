<template>
  <v-card variant="outlined" class="rounded-xl">
    <v-list-item class="mt-2">
      <v-list-item-title>{{ section.seccion }}</v-list-item-title>
      <template #append>
        <v-btn
          variant="outlined"
          class="rounded-pill text-capitalize"
          size="small"
          @click="!isAdded ? addSection(section) : removeSection(section)"
        >
          {{ !isAdded ? "Agregar" : "Quitar" }}
        </v-btn>
      </template>
    </v-list-item>
    <v-card-text>
      <v-table density="compact">
        <thead>
          <tr>
            <th>Dia y Hora</th>
            <th>Sala</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(schedule, index) in validSchedules" :key="index">
            <td>
              {{ schedule.horario }}
            </td>
            <td>{{ schedule.sala }}</td>
          </tr>
        </tbody>
      </v-table>
      <v-btn variant="tonal" block class="rounded-pill">Ver mas</v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DmSectionCard",

  props: {
    section: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapState("calendars", ["selectedCalendar"]),
    validSchedules() {
      return this.section.horarios.filter(
        (h) => h.horario != "0:00:00 - 0:00:00"
      );
    },

    isAdded() {
      const { section } = this;
      const { sections } = this.selectedCalendar;
      return sections.some((s) => s.seccion === section.seccion);
    },
  },

  methods: {
    ...mapActions("calendars", ["addSection", "removeSection"]),
  },
};
</script>
