<template>
  <v-card class="rounded-xl" variant="outlined" style="background-color: #FFF7EA">
    <v-card-text class="text-subtitle-1">
      <v-alert class="rounded-lg" type="warning" variant="tonal" icon="mdi-alert-circle">
        Estas seguro que deseas eliminar este item?
      </v-alert>
      <div class="d-flex justify-space-between mt-4">
        <v-btn block color="#FF9C72" variant="flat" class="rounded-pill text-white" @click="confirmDelete">
          Si, eliminar este calendario
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DmDeleteCalendar",

  props: {
    calendar: Object,
  },

  methods: {
    ...mapActions("calendars", ["removeCalendar"]),
    confirmDelete() {
      if (this.calendar) {
        this.removeCalendar(this.calendar).then(() => {
          this.$emit("deleted");
        });
      }
    },
  },
};
</script>