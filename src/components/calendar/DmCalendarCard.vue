<template>
  <v-card @click="$emit('showCalendar')" rounded="lg">
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title v-text="calendar.name"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click.stop="$emit('deleteMe')">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-simple-table dense>
      <template v-slot:default>
        <thead></thead>
        <tbody>
          <tr>
            <th>Carrera</th>
            <td class="text-capitalize text-right">
              {{ calendar.carrera.toLowerCase() }}
            </td>
          </tr>
          <tr>
            <th>Ramos</th>
            <td class="text-right">
              {{ calendar.sections.length }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
export default {
  name: "DmCalendarCard",

  props: {
    calendar: {
      type: Object,
      required: true,
    },
  },
};
</script>
