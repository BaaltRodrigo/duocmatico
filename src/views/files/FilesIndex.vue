<template>
  <v-container>
    <v-card :loading="loading">
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
            <th class="text-left">Disponible para los alumnos</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="charge in academicCharges" :key="charge.id">
            <td class="text-capitalize">{{ charge.name.toLowerCase() }}</td>
            <td>{{ charge.season }}</td>
            <td>
              <v-checkbox
                :model-value="!charge['is_hidden']"
                color="info"
                @click="handleUpdate(charge)"
              ></v-checkbox>
            </td>
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
import { mapActions, mapState } from "vuex";
import AcademicChargeForm from "../../components/charge/AcademicChargeForm.vue";

export default {
  name: "FilesIndex",

  components: {
    AcademicChargeForm,
  },

  data: () => ({
    showForm: false,
    loading: false,
  }),

  computed: {
    ...mapState("academicCharges", ["academicCharges"]),
  },

  methods: {
    ...mapActions("academicCharges", ["updateAcademicCharge"]),

    async handleUpdate(charge) {
      this.loading = true;

      await this.updateAcademicCharge({
        ...charge,
        is_hidden: !charge.is_hidden,
      });

      this.loading = false;
    },
  },

  mounted() {
    this.$store.dispatch("academicCharges/getAcademicCharges", {
      showHidden: true,
    });
    console.table(this.academicCharges);
  },
};
</script>
