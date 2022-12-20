<template>
  <v-container>
    <h3>Calendarios disponibles</h3>
    <v-row>
      <v-col
        v-for="i in [1, 2, 3, 4, 5]"
        :key="`calendar-${i}`"
        cols="12"
        md="4"
      >
        <v-sheet height="15vh" color="grey" rounded="lg"></v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script></script>
