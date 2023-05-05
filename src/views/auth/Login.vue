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
    <v-card variant="outlined" max-width="35%" class="rounded-xl">
      <v-card-item class="text-center">
        <v-card-title>Iniciar sesion</v-card-title>
      </v-card-item>
      <v-card-text>
        <dm-auth-providers class="my-3"></dm-auth-providers>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import DmAuthProviders from "../../components/auth/Providers.vue";
import { mapActions } from "vuex";

export default {
  name: "Login",

  components: {
    DmAuthProviders,
  },

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
