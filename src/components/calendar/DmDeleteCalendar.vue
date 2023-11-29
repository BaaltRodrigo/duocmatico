<template>
  <v-card class="rounded-xl">
    <v-card-text>
      <v-alert
        class="rounded-lg"
        type="warning"
        variant="tonal"
        icon="mdi-alert-circle"
      >
        ¿Estás seguro de que deseas eliminar este item?
      </v-alert>
      <v-btn
        block
        color="error"
        variant="flat"
        class="rounded-pill mt-3"
        @click="$emit('delete')"
      >
        Sí, eliminar este calendario
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DmDeleteCalendar",

  props: {
    calendar: { type: Object, required: true },
  },

  methods: {
    async deleteCalendar() {
      await this.$store.dispatch("calendars/deleteCalendar", this.calendar);
      this.$emit("done");
    },
  },

  emits: ["done"],
};
</script>
