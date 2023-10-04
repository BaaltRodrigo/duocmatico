<template>
  <v-container fluid class="fill-height">
    <v-row no-gutters class="fill-height">
      <v-col
        cols="12"
        md="6"
        class="d-flex justify-center align-center order-2 order-md-1"
      >
        <div class="aspect-ratio">
          <img
            src="../../assets/images/forgot_password.svg"
            alt="Descripción del SVG"
          />
        </div>
      </v-col>
      <v-col
        cols="12"
        md="6"
        class="d-flex flex-column justify-center align-center order-1 order-md-2"
      >
        <v-card
          variant="outlined"
          v-if="!emailSent"
          class="mb-9 card-width bg-white"
        >
          <v-card-title class="text-center my-2">
            Recuperar contraseña
          </v-card-title>
          <v-card-text>
            <forgot-password-form @sended="emailSent = true" />
            <v-alert
              class="text-caption mt-8"
              variant="tonal"
              type="info"
              color="orange"
            >
              Te enviaremos las instrucciones a tu correo electrónico. Si no lo
              recibes en unos minutos, revisa tu carpeta de spam.
            </v-alert>
          </v-card-text>
        </v-card>
        <v-card variant="outlined" v-if="emailSent" class="card-width bg-white">
          <v-card-item>
            <v-img :src="emailSentImage" height="200"></v-img>
            <v-card-text>
              <v-card-title class="text-center my-2">
                Correo enviado
              </v-card-title>
              Te hemos enviado un correo con las instrucciones para recuperar tu
              contraseña.
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ForgotPasswordForm from "../../components/auth/ForgotPassword.vue";
import emailSentImage from "../../assets/images/undraw_mail_sent.svg";

export default {
  name: "ForgotPasswordView",
  components: {
    ForgotPasswordForm,
  },
  data: () => ({
    emailSentImage,
    emailSent: false,
  }),
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
    width: 450px;
  }
}
</style>
