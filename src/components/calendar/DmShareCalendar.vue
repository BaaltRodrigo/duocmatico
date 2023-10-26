<template>
  <v-card :loading="loading">
    <v-card-item>
      <v-card-title>Compartir: {{ calendar.name }}</v-card-title>
    </v-card-item>
    <!-- Sharing status for the calendar -->
    <v-list>
      <p class="mx-6 font-weight-medium">Acceso general</p>
      <v-list-item
        @click="togglePrivacy"
        class="px-6 py-3"
        value="sharing-status"
      >
        <template v-slot:prepend>
          <v-avatar :color="isPublic ? 'primary' : 'grey-lighten-1'">
            <v-icon>{{ isPublic ? "mdi-earth" : "mdi-lock-outline" }}</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title>{{
          isPublic ? "Publico" : "Privado"
        }}</v-list-item-title>
        <v-list-item-subtitle>
          {{
            isPublic
              ? "Cualquiera puede ver este calendario"
              : "Solo tu tienes acceso a este calendario"
          }}
        </v-list-item-subtitle>
        <template v-slot:append>
          <p
            class="text-subtitle-1 px-4 font-weight-medium"
            :icon="false"
            variant="text"
          >
            Cambiar
          </p>
        </template>
      </v-list-item>
    </v-list>
    <v-alert
      v-if="isPublic"
      density="compact"
      icon="mdi-information-outline"
      color="#D3E3FE"
      class="mx-6 rounded-lg"
    >
      Otras personas podran ver este calendario
    </v-alert>

    <v-card-text class="d-flex justify-space-between">
      <v-btn variant="outlined" color="black" @click="test">
        <v-icon class="mr-3">mdi-link</v-icon>
        Copiar enlace
      </v-btn>
      <v-btn @click="$emit('close')">Listo</v-btn>
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

  data: () => ({
    loading: false,
  }),

  methods: {
    test() {
      console.log(this.calendar);
    },

    async togglePrivacy() {
      this.loading = true;

      const response = await this.$store.dispatch(
        "calendars/togglePrivacy",
        this.calendar.uuid
      );

      this.loading = false;
    },
  },

  emits: ["close"],
};
</script>
