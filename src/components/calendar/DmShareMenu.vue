<template>
  <v-card rounded="lg">
    <v-card-title>Compartir "{{ calendar.name }}"</v-card-title>
    <v-card-text>
      <v-alert text type="success" color="primary">
        El link de este calendario ya esta copiado en tu dispositivo! Ahora
        puedes compartirlo donde quieras!
      </v-alert>
      <v-img
        :ratio="16 / 9"
        height="200px"
        contain
        src="../../../public/images/undraw_share_link.svg"
      ></v-img>
    </v-card-text>
    <v-card-text>
      <v-btn block outlined class="text-capitalize" @click="copyToClipboard">
        <v-icon class="mr-2">mdi-link</v-icon> Copiar enlace
      </v-btn>
    </v-card-text>

    <v-snackbar
      app
      :value="showSnackbar"
      :timeout="2000"
      @input="showSnackbar = false"
    >
      Link copiado!
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="showSnackbar = false"> Ok </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: "DmShareMenu",

  props: {
    calendar: {
      type: Object,
      default: () => ({
        name: "",
        carga: "",
        carrera: "",
        sections: [],
      }),
    },
  },

  data: () => ({
    showSnackbar: false,
  }),

  methods: {
    generateLinkURL({ name, carga, carrera, sections }) {
      const sectionNames = sections.map((s) => s.seccion).join(",");
      const host = window.location.host;
      return `${host}/s?carrera=${carrera}&carga=${carga}&nombre=${name}&sections=${sectionNames}`;
    },

    copyToClipboard() {
      navigator.clipboard.writeText(this.generateLinkURL(this.calendar));
      this.showSnackbar = true;
    },
  },

  mounted() {
    navigator.clipboard.writeText(this.generateLinkURL(this.calendar));
  },
};
</script>
