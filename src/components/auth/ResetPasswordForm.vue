<template>
  <v-form ref="form">
    <v-text-field
      :type="showPasswords ? '' : 'password'"
      label="Nueva Contraseña"
      v-model="password"
      :error-messages="v$.password.$errors.map((e) => e.$message)"
      @blur="v$.password.$touch()"
    ></v-text-field>
    <v-text-field
      class="my-1"
      :type="showPasswords ? '' : 'password'"
      label="Confirmar contraseña"
      v-model="passwordConfirmation"
      :error-messages="v$.passwordConfirmation.$errors.map((e) => e.$message)"
      @blur="v$.passwordConfirmation.$touch()"
    ></v-text-field>
    <v-checkbox
      v-model="showPasswords"
      class="mt-n2"
      color="primary"
      hide-details
      label="Mostrar contrasenas"
    ></v-checkbox>
    <v-btn block color="primary" @click="submitForm">Cambiar contraseña</v-btn>
  </v-form>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, helpers } from "@vuelidate/validators";
import { mapActions } from "vuex";

export default {
  name: "ResetPasswordForm",

  setup() {
    return { v$: useVuelidate() };
  },

  data: () => ({
    password: "",
    passwordConfirmation: "",
    showPasswords: false,
  }),

  validations() {
    return {
      password: {
        required: helpers.withMessage("La contraseña es requerida", required),
        minLength: helpers.withMessage(
          "La contraseña debe tener al menos 8 caracteres",
          (value) => value.length >= 8
        ),
      },
      passwordConfirmation: {
        required: helpers.withMessage(
          "La confirmación de la contraseña es requerida",
          required
        ),
        sameAs: helpers.withMessage(
          "La confirmación de la contraseña no coincide",
          sameAs(this.password)
        ),
      },
    };
  },

  methods: {
    ...mapActions("auth", ["sendPasswordResetConfirmation"]),

    async submitForm() {
      const isValid = await this.v$.$validate();
      if (!isValid) return; // Early return if the form is invalid

      await this.sendPasswordResetConfirmation({
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
      });

      this.$emit("done");
    },
  },

  emits: ["done"],
};
</script>
