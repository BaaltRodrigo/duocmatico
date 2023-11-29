<template>
  <v-card title="Editar nombre del calendario">
    <v-card-text>
      <v-text-field
        v-model="editedName"
        label="Nombre del calendario"
        required
        :error-messages="nameErrorMessages"
      >
      </v-text-field>
      <v-btn
        block
        variant="flat"
        class="rounded-pill"
        @click="updateCalendarName"
        :disabled="editedName.length === 0"
      >
        Cambiar nombre
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "DmEditCalendarName",

  props: {
    calendar: { type: Object, required: true },
  },

  data() {
    return {
      editedName: this.calendar.name,
      nameErrorMessages: [],
    };
  },

  methods: {
    async updateCalendarName() {
      if (this.editedName.length === 0) {
        this.nameErrorMessages = ["El nombre es obligatorio"];
        return;
      }

      await this.$store.dispatch("calendars/updateCalendar", {
        ...this.calendar,
        name: this.editedName,
      });

      this.$emit("done");
      this.nameErrorMessages = [];
    },
  },

  emits: ["done"],
};
</script>
