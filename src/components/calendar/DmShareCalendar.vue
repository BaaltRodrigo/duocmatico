<template>
  <v-card>
    <v-card-item>
      <v-card-title>Compartir: {{ calendar.name }}</v-card-title>
    </v-card-item>
    <v-card-text>
      <v-card
        @click=""
        v-ripple.stop
        class="d-flex flex-column justify-center align-center pt-4"
      >
        <v-icon size="77">mdi-lock</v-icon>
        <p>
          Hazme click para que este calendario sea
          {{ !isPublic ? "publico" : "privado" }}
        </p>
        <v-switch hide-details inset></v-switch>
      </v-card>
    </v-card-text>
    <v-card-text>
      <!-- Option to make the calendar public -->
      <v-btn block variant="tonal">
        <span class="text-body-1 float-left"> Hacer publico </span>
        <v-icon class="float-right">mdi-lock</v-icon>
      </v-btn>
      <v-list-item density="default" @click="" class="rounded-xl py-3">
        <v-list-item-content>
          <v-list-item-title> {{ url }} </v-list-item-title>
        </v-list-item-content>
        <template #append>
          <v-icon>mdi-content-copy</v-icon>
        </template>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DmShareCalendar",

  computed: {
    ...mapState("calendars", ["calendar"]),

    isPublic() {
      return this.calendar["is_public"];
    },

    url() {
      return `${window.location.origin}/c/${this.calendar.uuid}`;
    },
  },
};
</script>
