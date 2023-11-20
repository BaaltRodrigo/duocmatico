<template>
  <v-toolbar color="transparent" scroll-behavior="elevate">
    <template #prepend>
      <v-avatar image="logo.png"></v-avatar>
    </template>
    <v-toolbar-title @click="changeRoute('home')">
      Duocmatico
      <v-chip variant="flat" size="small" color="primary"> Beta </v-chip>
    </v-toolbar-title>
    <template #append>
      <v-btn v-if="!!user" icon class="rounded-pill">
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
          <v-menu activator="parent">
            <v-card>
              <v-list>
                <v-list-item @click="handleLogout">
                  <template v-slot:prepend>
                    <v-icon icon="mdi-logout"></v-icon>
                  </template>
                  <v-list-item-title>Cerrar sesion</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </v-avatar>
      </v-btn>

      <div v-else>
        <v-btn
          @click="changeRoute('login')"
          size="small"
          class="mr-2"
          color="white"
          variant="outlined"
        >
          Iniciar sesion
        </v-btn>
        <v-btn
          @click="changeRoute('registration')"
          size="small"
          color="white"
          variant="flat"
          class="text-capitalize"
        >
          Registrarse</v-btn
        >
      </div>
    </template>
    <!-- <v-btn icon href="https://github.com/BaaltRodrigo/duocmatico" target="none">
      <v-icon size="x-large">{{ "mdi-github" }}</v-icon>
    </v-btn> -->
  </v-toolbar>
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
    changeRoute(route) {
      this.$router.push({ name: route });
    },

    async handleLogout() {
      await this.$store.dispatch("auth/logout");
      window.location.reload();
    },
  },
};
</script>
