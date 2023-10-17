<template>
  <v-container fluid class="fill-height">
    <v-row no-gutters class="fill-height">
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column justify-center align-center"
      >
        <v-card class="mb-6 card-width text-center" :title="'Iniciar Sesión'">
          <v-card-text>
            <auth-providers />
            <v-container>O también</v-container>
            <login-form />

            <p class="mt-4">
              <router-link to="/password-recovery">
                Olvide mi contraseña
              </router-link>
            </p>
          </v-card-text>
        </v-card>
        <v-card class="text-center card-width">
          <v-card-text>
            ¿No tienes cuenta?
            <v-btn
              class="mx-2"
              variant="flat"
              @click="$router.push({ name: 'registration' })"
            >
              Crea una aqui
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
