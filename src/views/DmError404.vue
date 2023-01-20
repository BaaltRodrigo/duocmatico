<template>
  <v-container fill-height>
    <v-card rounded="lg" outlined>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" align-self="center">
            <v-img src="../../public/images/undraw_page_not_found.svg"></v-img>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-title class="text-center text-h2">
              Nada por aqui!
            </v-card-title>
            <v-card-text class="mt-2">
              Lamentablemente, lo que estas buscando no existe.
              <br />
              Quizas en algun momento si existio, eso no lo negaremos. Pero
              ahora no.
            </v-card-text>
            <v-card-text>
              Lo bueno, es que podemos ofrecerte varias cosas ;)
            </v-card-text>
            <v-card-actions>
              <v-btn
                class="teal lighten-4"
                @click="$router.push({ name: 'calendar.index' })"
                >Ir a tus calendarios</v-btn
              >
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "DmError404",
};
</script>
