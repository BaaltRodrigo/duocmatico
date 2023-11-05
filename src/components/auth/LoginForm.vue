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

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const email = ref(null);
const password = ref(null);
const showPassword = ref(false);

const store = useStore();
const router = useRouter();

const submitForm = async () => {
  try {
    await store.dispatch("auth/login", {
      email: email.value,
      password: password.value,
    });

    const { user } = store.state.auth;

    if (user) return router.push({ name: "home" });
  } catch (error) {
    console.log(error);
  }
};
</script>
