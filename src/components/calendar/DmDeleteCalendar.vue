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
        @click="confirmDelete"
      >
        Sí, eliminar este calendario
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DmDeleteCalendar",

  props: {
    calendar: Object,
  },

  methods: {
    ...mapActions("calendars", ["deleteCalendar"]),
    confirmDelete() {
      if (this.calendar) {
        this.deleteCalendar(this.calendar).then(() => {
          this.$store.dispatch("calendars/getApiCalendars");
          this.$emit("deleted-successfully");
        });
      }
    },
  },
};
</script>
