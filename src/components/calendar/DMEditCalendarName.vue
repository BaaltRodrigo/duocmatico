<template>
  <v-card class="rounded-xl" title="Editar nombre del calendario" variant="outlined" style="background-color: #FFF7EA">
    <v-card-text>
      <v-text-field 
        v-model="editedName" 
        label="Nombre del calendario"
        filled
        variant="outlined"
        bg-color="white" 
        required
        :error-messages="nameErrorMessages"
      >
      </v-text-field>
      <div class="d-flex justify-space-between ">
        <v-btn
          block
          color="#FF9C72"
          variant="flat"
          class="rounded-pill text-white"
          @click="updateCalendarName"
          :disabled="editedName.length === 0"
        >
          Cambiar nombre
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    calendar: Object,
  },
  data() {
    return {
      editedName: this.calendar.name,
      nameErrorMessages: [],
    };
  },
  methods: {
    updateCalendarName() {
      if (this.editedName.length === 0) {
        this.nameErrorMessages = ['El nombre es obligatorio'];
      } else {
        this.$store.dispatch("calendars/updateCalendar", {
          ...this.calendar,
          name: this.editedName,
        });

        this.$emit("name-updated");
        this.$emit("close-card");
        this.nameErrorMessages = [];
      }
    },
  },
};
</script>
