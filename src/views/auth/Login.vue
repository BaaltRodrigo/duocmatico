<template>
  <v-container>
    <dm-auth-in-progress></dm-auth-in-progress>
    <br />
    <v-container>
      <v-row justify="center">
        <v-card
          variant="outlined"
          :width="isMobile ? '100%' : '35%'"
          class="rounded-xl elevation-4"
        >
          <v-card-item class="text-center">
            <v-card-title>Iniciar sesion</v-card-title>
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
import DmAuthProviders from "../../components/auth/Providers.vue";
import DmAuthInProgress from "../../components/auth/WorkInProgressAlert.vue";
import { mapActions } from "vuex";

export default {
  name: "Login",

  components: {
    DmAuthInProgress,
    DmAuthProviders,
  },

  inject: ["isMobile"],

  data: () => ({
    showFields: false,
    email: null,
    password: null,
    showPassword: false,
    rules: {
      required: (value) => !!value || "Este campo es requerido",
      email: (value) =>
        /.+@.+\..+/.test(value) || "Debe ingresar un correo válido",
    },
  }),

  methods: {
    ...mapActions("auth", ["signWhitGoogle"]),
    async handleSignWhitGoogle() {
      await this.signWhitGoogle();
      // log the user from auth store
      console.log(this.$store.state.auth.user);
    },
  },
};
</script>
