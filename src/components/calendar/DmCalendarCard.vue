<template>
  <v-card height="15vh" rounded="lg">
    <v-card-title>{{ calendar.name }}</v-card-title>
    <v-card-subtitle>
      {{ calendar.carga }} - {{ calendar.carrera }}
    </v-card-subtitle>
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
