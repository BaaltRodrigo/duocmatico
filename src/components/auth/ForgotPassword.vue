<template>
  <v-form ref="form">
    <v-text-field
      v-model="email"
      label="Email"
      :error-messages="v$.email.$errors.map((e) => e.$message)"
      variant="outlined"
    ></v-text-field>
    <!-- TODO: Put a captcha here -->
    <v-btn
      block
      variant="flat"
      rounded="xl"
      @click="submitForm"
      class="text-none mt-1"
      color="orange-darken-1"
    >
      Enviar instrucciones
    </v-btn>
  </v-form>
</template>

<script>
import { mapActions } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

export default {
  name: "ForgotPasswordForm",

  setup() {
    return { v$: useVuelidate() };
  },

  data: () => ({
    email: "",
  }),

  validations: () => ({
    email: {
      required: helpers.withMessage("El email es requerido", required),
      email: helpers.withMessage("El email no es válido", email),
    },
  }),

  methods: {
    ...mapActions("auth", ["requestPasswordReset"]),

    async submitForm() {
      const isValid = await this.v$.$validate();
      if (!isValid) return;
      await this.requestPasswordReset(this.email);
      this.$emit("sended");
    },
  },

  emits: ["sended"],
};
</script>
