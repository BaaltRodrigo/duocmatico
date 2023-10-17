<template>
  <v-container class="fill-height">
    <!-- Double container to get the rounded edges separated from the top and bottom -->
    <v-container class="fill-height bg-grey-lighten-2 rounded-xl">
      <left-right-grid justify="space-around" :image="not_found_image" reversed>
        <v-card
          class="pa-4"
          title="No encontramos lo que estas buscando"
          text="Quizas alguna de estas opciones pueda ayudarte"
        >
          <v-card-actions>
            <v-btn
              variant="elevated"
              @click="$router.push({ name: 'calendars.index' })"
            >
              Ir a mis calendarios
            </v-btn>
          </v-card-actions>
        </v-card>
      </left-right-grid>
    </v-container>
  </v-container>
</template>

<script>
import undraw_void from "../../assets/images/undraw_void.svg";
import LeftRightGrid from "../../components/LeftRightGrid.vue";

export default {
  name: "NotFoundView",

  components: {
    LeftRightGrid,
  },

  data: () => ({
    not_found_image: undraw_void,
  }),
};
</script>
