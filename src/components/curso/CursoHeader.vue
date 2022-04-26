<template>
  <v-list-item>
    <v-list-item-content>
      <v-list-item-title>
        {{ curso.seccion }}
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
