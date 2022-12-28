<template>
  <v-container>
    <h3 class="mb-2">Calendarios disponibles</h3>
    <v-row>
      <v-col cols="12" md="4">
        <v-card
          @click="newCalendar"
          outlined
          height="16vh"
          class="rounded-lg"
          style="border: 4px dashed lightgray; background-color: transparent"
        >
          <v-container class="text-center">
            <v-icon size="7vh">mdi-plus</v-icon>
            <h3>Nuevo calendario</h3>
          </v-container>
        </v-card>
      </v-col>
      <v-col
        v-for="(c, index) in all"
        :key="`calendar-${index}`"
        cols="12"
        md="4"
      >
        <dm-calendar-card
          :calendar="c"
          @showCalendar="showCalendar(index)"
          @deleteMe="deleteMe(index)"
        ></dm-calendar-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showCalendarForm" max-width="70vh">
      <dm-calendar-form></dm-calendar-form>
    </v-dialog>
  </v-container>
</template>

<script>
import DmCalendarForm from "../components/calendar/DmCalendarForm.vue";
import DmCalendarCard from "../components/calendar/DmCalendarCard.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "DmCalendarIndex",

  components: {
    DmCalendarForm,
    DmCalendarCard,
  },

  computed: {
    ...mapState("calendars", ["all"]),
  },

  data: () => ({
    showCalendarForm: false,
  }),

  methods: {
    ...mapMutations("calendars", ["deleteCalendar"]),
    newCalendar() {
      this.showCalendarForm = true;
    },

    showCalendar(index) {
      this.$router.push({
        name: "calendar.show",
        params: {
          id: index,
        },
      });
    },

    deleteMe(index) {
      this.deleteCalendar(index);
    },
  },
};
</script>
