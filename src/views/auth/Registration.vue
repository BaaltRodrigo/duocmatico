<template>
  <v-container>
    <v-alert
      type="info"
      variant="tonal"
      color="primary"
      class="text-justify rounded-xl"
    >
      Por el momento solo disponemos de autenticacion con Google, pero
      proximamente podras registrarte con tu correo y contraseña, entre otros.
    </v-alert>
    <br />
    <v-card variant="outlined" class="rounded-xl" width="35%">
      <v-card-item class="text-center">
        <v-card-title>Registrate</v-card-title>
      </v-card-item>
      <v-card-text>
        <dm-auth-providers class="my-3"></dm-auth-providers>
      </v-card-text>
      <!-- <v-card-text class="text-center"> O tambien </v-card-text>
      <v-card-text>
        <v-text-field variant="outlined" label="Email"></v-text-field>
        <v-text-field variant="outlined" label="Contrasena"></v-text-field>
        <v-btn block variant="tonal" color="primary">Ingresar</v-btn>
      </v-card-text> -->
    </v-card>
  </v-container>
</template>

<script>
import DmAuthProviders from "../../components/auth/Providers.vue";

export default {
  name: "Registration",

  components: {
    DmAuthProviders,
  },
};
</script>
