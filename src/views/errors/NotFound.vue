<template>
  <v-container class="fill-height">
    <!-- Double container to get the rounded edges separated from the top and bottom -->
    <v-container class="fill-height bg-grey-lighten-2 rounded-xl">
      <left-right-grid justify="space-around" :image="not_found_image" reversed>
        <v-card
          class="rounded-lg pa-4 bg-white"
          title="No encontramos lo que estas buscando"
          text="Quizas alguna de estas opciones pueda ayudarte"
        >
          <v-card-actions>
            <v-btn
              class="text-none"
              variant="elevated"
              color="green-accent-1"
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
