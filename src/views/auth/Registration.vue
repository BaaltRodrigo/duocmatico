<template>
  <v-container fluid class="fill-height">
    <v-row no-gutters class="fill-height">
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column justify-center align-center"
      >
        <v-card class="mb-9 card-width">
          <v-card-item class="text-center">
            <v-card-title>Registrate</v-card-title>
          </v-card-item>
          <v-card-text>
            <auth-providers buttonText="Registrar con Google" />
            <v-container class="text-center">O también</v-container>
            <registration-form />
          </v-card-text>
        </v-card>
        <v-card class="text-center card-width">
          <v-card-text>
            ¿Ya tienes cuenta?
            <v-btn
              @click="$router.push({ name: 'login' })"
              variant="flat"
              class="mx-2"
            >
              Ingresa a tu cuenta
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <div class="aspect-ratio">
          <img :src="registrationImage" alt="Descripción del SVG" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthProviders from "../../components/auth/Providers.vue";
import RegistrationForm from "../../components/auth/RegistrationForm.vue";
import registrationImage from "../../assets/images/registration.svg";

export default {
  name: "RegistrationView",
  components: {
    AuthProviders,
    RegistrationForm,
  },
  data() {
    return {
      registrationImage,
    };
  },
};
</script>

<style scoped>
.aspect-ratio {
  width: 100%;
  padding-bottom: 56.25%;
  position: relative;
}
.aspect-ratio img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.card-width {
  width: 100%;
}

@media (min-width: 992px) {
  .card-width {
    width: 450px !important;
  }
}
</style>
