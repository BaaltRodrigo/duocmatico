<template>
  <div class="text-center">
    <v-card>
      <v-card-text>
        {{ message }}
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="closeDialog">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    computed: {
      error() {
        return this.$store.state.calendars.error;
      },
      success() {
        return this.$store.state.calendars.success;
      },
      message() {
        return this.error || this.success;
      },
    },
    data() {
      return {};
    },
    methods: {
      closeDialog() {
        this.$emit("close");
      },
    },
  };
</script>
