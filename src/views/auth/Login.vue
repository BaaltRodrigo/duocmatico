<template>
  <v-container fluid class="fill-height">
    <v-row no-gutters class="fill-height">
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column justify-center align-center"
      >
        <v-card variant="outlined" class="mb-9 card-width bg-white">
          <v-card-title class="text-center my-2"> Iniciar Sesión </v-card-title>
          <v-card-text>
            <auth-providers buttonText="Ingresar con Google" />
            <v-container class="text-center">O también</v-container>
            <login-form />

            <v-container class="text-center mb-n1 mt-2">
              <router-link to="/password-recovery" :style="{ color: 'orange' }">
                Olvide mi contraseña
              </router-link>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card
          variant="outlined"
          class="text-center rounded-lg bg-white card-width"
        >
          <v-card-text>
            ¿No tienes cuenta?
            <v-btn
              @click="$router.push({ name: 'registration' })"
              variant="text"
              class="text-none mx-2"
              color="orange"
            >
              Regístrate
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center align-center">
        <div class="aspect-ratio">
          <img :src="loginImage" alt="login image" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthProviders from "../../components/auth/Providers.vue";
import LoginForm from "../../components/auth/LoginForm.vue";
import loginImage from "../../assets/images/login.svg";

export default {
  name: "LoginView",
  components: {
    AuthProviders,
    LoginForm,
  },
  data() {
    return {
      loginImage,
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
