<template>
  <v-form ref="form">
    <v-text-field v-model="email" label="Email"></v-text-field>
    <v-text-field
      v-model="password"
      label="Contraseña"
      :type="showPassword ? 'text' : 'password'"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append-inner="showPassword = !showPassword"
    ></v-text-field>
    <v-btn @click="submitForm" variant="flat" block> Ingresar </v-btn>
  </v-form>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "LoginForm",

  computed: {
    ...mapState("auth", ["user"]),
  },

  data: () => ({
    email: null,
    password: null,
    showPassword: false,
  }),

  methods: {
    ...mapActions("auth", ["login"]),

    async submitForm() {
      try {
        await this.login({ email: this.email, password: this.password });

        if (this.user) return this.$router.push({ name: "home" });
      } catch (error) {
        // Do something when the form fails
        console.log(error);
      }
    },
  },
};
</script>
