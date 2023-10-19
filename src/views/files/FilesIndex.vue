<template>
  <v-container>
    <v-card>
      <v-toolbar color="transparent">
        <v-toolbar-title>Cargas academicas</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="showForm = true" variant="flat">
          Agregar carga academica
        </v-btn>
      </v-toolbar>
      <!-- a table to show all the academic charges -->
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Sede</th>
            <th class="text-left">Temporada academica</th>
            <th class="text-left">Visible</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="charge in academicCharges" :key="charge.id">
            <td class="text-capitalize">{{ charge.name.toLowerCase() }}</td>
            <td>{{ charge.season }}</td>
            <td>{{ charge["is_hidden"] }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card>

    <!-- Dialogs and forms -->
    <v-dialog v-model="showForm" min-width="680">
      <v-card>
        <v-alert type="info" class="rounded-0" color="primary">
          Los datos como sede y temporada academica son asignados
          automaticamente dependiendo de los datos entregados por el archivo
          entregado
        </v-alert>
        <v-card-text>
          <academic-charge-form></academic-charge-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import AcademicChargeForm from "../../components/charge/AcademicChargeForm.vue";

export default {
  name: "FilesIndex",

  components: {
    AcademicChargeForm,
  },

  data: () => ({
    showForm: false,
  }),

  computed: {
    ...mapState("academicCharges", ["academicCharges"]),
  },

  mounted() {
    this.$store.dispatch("academicCharges/getAcademicCharges");
  },
};
</script>
