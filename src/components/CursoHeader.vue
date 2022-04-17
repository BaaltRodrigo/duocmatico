<template>
  <v-list-item two-line>
    <v-list-item-content>
      <v-list-item-subtitle>
        <small>{{ curso.seccion }}</small>
        <v-chip class="ml-2" x-small>Semestre {{ curso.nivel }}</v-chip>
      </v-list-item-subtitle>
      <v-list-item-title class="text-capitalize font-weight-bold">
        {{ curso.asignatura.toLowerCase() }}
      </v-list-item-title>
    </v-list-item-content>
    <!-- <v-list-item-action>
      <v-btn icon outlined @click="test">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-list-item-action> -->
  </v-list-item>
</template>

<script>
export default {
  name: "CursoHeader",

  props: {
    curso: {
      type: Object,
      required: true,
    },
  },

  methods: {
    test() {
      console.log(this.curso);
    },
  },
};
</script>
