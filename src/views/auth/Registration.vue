<template>
  <v-container>
    <dm-work-in-progress-alert></dm-work-in-progress-alert>
    <br />
    <v-container>
      <v-row justify="center">
        <v-card
          variant="outlined"
          class="rounded-xl elevation-4"
          :width="isMobile ? '100%' : '35%'"
        >
          <v-card-item class="text-center">
            <v-card-title>Registrate</v-card-title>
          </v-card-item>
          <v-card-text>
            <dm-auth-providers class="my-3"></dm-auth-providers>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import DmWorkInProgressAlert from "../../components/auth/WorkInProgressAlert.vue";
import DmAuthProviders from "../../components/auth/Providers.vue";

export default {
  name: "Registration",

  components: {
    DmAuthProviders,
    DmWorkInProgressAlert,
  },

  inject: ["isMobile"],
};
</script>
