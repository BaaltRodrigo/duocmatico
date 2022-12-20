<template>
  <v-container>
    <h3 class="my-2">Nombre del calendario</h3>
    <v-card class="elevation-0" height="75vh" rounded="lg">
      <vue-cal
        :time-from="8 * 60"
        :time-to="23 * 60"
        :time-step="30"
        :hide-weekdays="[7]"
        hide-view-selector
        hide-title-bar
        locale="es"
      >
      </vue-cal>
    </v-card>
    <v-btn block color="purple" class="mt-4" dark depressed>
      Agregar ramos
    </v-btn>
  </v-container>
</template>

<script>
import VueCal from "vue-cal";
import "vue-cal/dist/vuecal.css";

export default {
  name: "test",

  components: { VueCal },

  data: () => ({}),
};
</script>
