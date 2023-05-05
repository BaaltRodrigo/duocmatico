<template>
  <v-app-bar app fixed flat>
    <v-app-bar-title @click="goToHome">
      Duocmatico
      <v-chip variant="outlined" size="x-small" label color="primary">
        Beta
      </v-chip>
    </v-app-bar-title>
    <template #append>
      <v-btn v-if="!!user" icon>
        <v-avatar>
          <v-img :src="user.photoURL" alt="user-profile-picture"></v-img>
          <v-menu activator="parent" min-width="120px">
            <v-list>
              <v-list-item>
                <template v-slot:prepend>
                  <v-icon icon="mdi-logout"></v-icon>
                </template>
                <v-list-item-title>Cerrar sesion</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-avatar>
      </v-btn>
      <div v-else>
        <v-btn
          @click="goToLogin"
          size="small"
          variant="outlined"
          class="text-capitalize mr-2"
          color="primary"
        >
          Iniciar sesion
        </v-btn>
        <v-btn
          @click="goToSignUp"
          size="small"
          variant="outlined"
          class="text-capitalize"
        >
          Registrarse</v-btn
        >
      </div>
    </template>
    <!-- <v-btn icon href="https://github.com/BaaltRodrigo/duocmatico" target="none">
      <v-icon size="x-large">{{ "mdi-github" }}</v-icon>
    </v-btn> -->
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TheHeader",

  computed: {
    ...mapState("auth", ["user"]),
  },

  methods: {
    goToHome() {
      this.$router.push({ name: "home" });
    },

    goToLogin() {
      this.$router.push({ name: "login" });
    },

    goToSignUp() {
      this.$router.push({ name: "registration" });
    },
  },
};
</script>
