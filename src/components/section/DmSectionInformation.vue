<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead></thead>
      <tbody>
        <tr>
          <th>Semestre</th>
          <td class="text-left">
            <v-chip outlined small label>
              {{ section.level ? `Semestre ${section.level}` : "Optativo" }}
            </v-chip>
          </td>
        </tr>
        <tr>
          <th>Modalidad</th>
          <td>
            <v-chip outlined label small v-if="section.isPresencial()"
              >Presencial</v-chip
            >
            <v-chip class="ml-2" outlined label small v-if="section.isOnline()"
              >Online</v-chip
            >
          </td>
        </tr>
        <tr>
          <th>Docente</th>
          <td class="text-capitalize">
            {{
              section.teacher ? section.teacher.toLowerCase() : "Sin Profesor"
            }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import Section from "@/models/section";
import Vue from "vue";
export default Vue.extend({
  name: "DmSubjectInformation",

  props: {
    section: {
      type: Object as () => Section,
      required: true,
    },
  },
});
</script>
