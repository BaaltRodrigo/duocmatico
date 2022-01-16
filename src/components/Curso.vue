<template>
  <v-container>
    <h4 class="text-capitalize">{{curso.asignatura.toLowerCase()}}</h4>
  </v-container>
</template>

<script>
export default {
  name: "Curso",

  props: {
    curso: {
      type: Object,
      required: true
    }
  }
}
</script>