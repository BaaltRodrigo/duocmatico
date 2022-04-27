<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead></thead>
      <tbody>
        <tr>
          <th>Semestre</th>
          <td class="text-left">
            <v-chip outlined small label>
              {{ curso.nivel ? `Semestre ${curso.nivel}` : "Optativo" }}
            </v-chip>
          </td>
        </tr>
        <tr>
          <th>Modalidad</th>
          <td>
            <v-chip outlined label small v-if="isPresencial">Presencial</v-chip>
            <v-chip class="ml-2" outlined label small v-if="isOnline"
              >Online</v-chip
            >
          </td>
        </tr>
        <tr>
          <th>Docente</th>
          <td class="text-capitalize">
            {{ curso.docente ? curso.docente.toLowerCase() : "Sin Profesor" }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "CursoExtraInfo",

  props: {
    curso: {
      type: Object,
      required: true,
    },
  },

  computed: {
    diasCurso() {
      return this.curso.horarios.map((h) => h.dia);
    },

    isOnline() {
      return this.diasCurso.includes("En linea");
    },

    isPresencial() {
      const semana = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];
      return semana.some((d) => this.diasCurso.includes(d));
    },
  },
};
</script>
