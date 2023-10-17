<template>
  <v-form ref="form">
    <v-text-field
      class="my-1"
      v-model="email"
      :error-messages="v$.email.$errors.map((e) => e.$message)"
      density="comfortable"
      label="Email"
      @blur="v$.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="password"
      class="my-1"
      :error-messages="v$.password.$errors.map((e) => e.$message)"
      density="comfortable"
      label="Contraseña"
      :type="showPasswords ? 'text' : 'password'"
      @blur="v$.password.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="passwordConfirmation"
      :error-messages="v$.passwordConfirmation.$errors.map((e) => e.$message)"
      class="my-1"
      density="comfortable"
      label="Confirmar contraseña"
      :type="showPasswords ? 'text' : 'password'"
      @blur="v$.passwordConfirmation.$touch()"
    ></v-text-field>
    <v-checkbox
      v-model="showPasswords"
      density="compact"
      class="my-n2"
      label="Mostrar contraseñas"
    ></v-checkbox>
  </v-form>
  <v-btn @click="submitForm" block color="orange-darken-1" variant="flat"
    >Crear cuenta</v-btn
  >
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, sameAs, helpers } from "@vuelidate/validators";
import { mapActions, mapState } from "vuex";

export default {
  name: "RegistrationForm",

  setup() {
    return { v$: useVuelidate() };
  },

  computed: {
    ...mapState("auth", ["user"]),
  },

  data: () => ({
    email: "",
    password: "",
    passwordConfirmation: "",
    showPasswords: false,
  }),

  validations() {
    return {
      email: {
        required: helpers.withMessage("Este campo es obligatorio", required),
        email: helpers.withMessage("Debe ser un email valido", email),
      },
      password: {
        required: helpers.withMessage("Este campo es obligatorio", required),
      },
      passwordConfirmation: {
        required: helpers.withMessage("Este campo es obligatorio", required),
        sameAsPassword: helpers.withMessage(
          "Las contrasenas deben ser iguales",
          sameAs(this.password)
        ),
      },
    };
  },

  methods: {
    ...mapActions("auth", ["registration"]),

    async submitForm() {
      const isValid = await this.v$.$validate();
      if (!isValid) return;
      try {
        await this.registration({
          email: this.email,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
        });

        if (this.user) {
          this.$router.push({ name: "login" });
        }
      } catch (error) {}
    },
  },
};
</script>
