<template>
  <v-app-bar app fixed flat>
    <v-app-bar-title @click="goToHome">
      Duocmatico
      <v-chip variant="outlined" size="x-small" label color="primary">
        Beta
      </v-chip>
    </v-app-bar-title>
    <template #append>
      <span v-if="user && user.email">{{ user.email }}</span>
      <v-btn v-if="!!user" icon>
        <v-avatar>
          <v-img
            v-if="user && user.photoURL"
            :src="user.photoURL"
            alt="user-profile-picture"
          ></v-img>
          <v-img
            v-else
            :src="defaultImage"
            alt="default-profile-picture"
          ></v-img>
          <v-menu activator="parent" min-width="120px">
            <v-list>
              <v-list-item @click="handleLogout">
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
          color="orange"
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
import defaultImage from "../assets/images/avatar.svg";
import { mapState } from "vuex";

export default {
  name: "TheHeader",
  data: () => ({
    defaultImage,
  }),

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

    async handleLogout() {
      await this.$store.dispatch("auth/logout");
    },
  },
};
</script>
