<template>
  <v-card flat>
    <v-list-item @click="$emit('click')" two-line>
      <v-list-item-content>
        <v-list-item-title class="text-capitalize">
          {{ course.name.toLowerCase() }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Secciones disponibles: {{ course.sections.length }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "DmSectionGroup",

  props: {
    course: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    showSections: false,
  }),
};
</script>
