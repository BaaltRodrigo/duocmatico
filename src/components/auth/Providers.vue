<template>
  <v-btn
    @click="handleWithProvider('google')"
    size="x-large"
    variant="outlined"
    block
  >
    <v-icon class="mx-3">mdi-google</v-icon>
    <span class="text-body-1"> Ingresar con Google </span>
  </v-btn>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DmAuthProviders",

  computed: {
    ...mapState("auth", ["user"]),
  },

  methods: {
    ...mapActions("auth", ["loginWhitProvider"]),

    async handleWithProvider(provider) {
      await this.loginWhitProvider(provider);
      if (this.user) {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
