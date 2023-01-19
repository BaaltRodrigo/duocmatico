<template>
  <v-card rounded="lg">
    <v-card-title>Cambiar nombre</v-card-title>
    <v-card-text class="mt-3">
      <v-form>
        <v-text-field v-model="formName" filled> </v-text-field>
      </v-form>
      <v-btn
        @click="$emit('update', formName)"
        block
        :disabled="emptyForm"
        class="primary"
      >
        Cambiar nombre
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DmCalendarRename",

  props: {
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    ...mapState("calendars", ["all"]),
    emptyForm() {
      return !this.formName;
    },
  },

  watch: {
    index() {
      if (this.index === -1) return;
      this.formName = this.all[this.index].name;
      console.log(this.formName);
    },
  },

  data: () => ({
    formName: null,
  }),

  mounted() {
    this.formName = this.all[this.index].name;
  },
};
</script>
