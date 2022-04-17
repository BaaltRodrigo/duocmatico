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
      <!-- Datos -->
      <tbody>
        <tr v-for="horario in horariosValidos" :key="horario.id">
          <td>{{ horario.horario }}</td>
          <td v-if="salaOnline(horario)">
            {{ horario.sala }}
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

<script>
export default {
  name: "CrusoHorario",

  props: {
    horarios: {
      type: Array,
      required: true,
    },
  },

  computed: {
    horariosValidos() {
      return this.horarios.filter((h) => h.horario != "0:00:00 - 0:00:00");
    },
  },

  methods: {
    salaOnline(horario) {
      return !!horario.sala;
    },
  },
};
</script>
