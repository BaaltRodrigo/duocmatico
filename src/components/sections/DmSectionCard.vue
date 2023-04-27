<template>
  <v-card variant="outlined" class="rounded-xl">
    <v-card-title>
      {{ section.seccion }}
    </v-card-title>
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
export default {
  name: "DmSectionCard",

  props: {
    section: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    validSchedules() {
      return this.section.horarios.filter(
        (h) => h.horario != "0:00:00 - 0:00:00"
      );
    },
  },

  mounted() {
    console.log(this.section);
  },
};
</script>
