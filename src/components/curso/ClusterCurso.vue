<template>
  <v-card flat style="border-top: 1px">
    <v-list-item @click="showCourses = !showCourses" two-line>
      <v-list-item-content>
        <v-list-item-title class="text-capitalize">
          {{ cluster.asignatura.toLowerCase() }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Cantidad de secciones: {{ cluster.secciones.length }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-expand-transition>
      <v-card-text v-show="showCourses">
        <curso
          v-for="curso in cluster.secciones"
          :key="`seccion-${curso.seccion}`"
          :curso="curso"
          class="mb-2"
        ></curso>
      </v-card-text>
    </v-expand-transition>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
import Curso from "./Curso.vue";

export default {
  name: "ClusterCourse",

  components: {
    Curso,
  },

  props: {
    cluster: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      showCourses: false,
    };
  },
};
</script>
