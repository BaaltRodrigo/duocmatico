<template>
  <v-card
    :variant="selected ? 'tonal' : 'outlined'"
    class="rounded-xl pl-2 py-1 elevation-4"
    :ripple="false"
    :color="selected ? 'primary' : 'black'"
    @click="me"
  >
    <v-list-item class="text-black">
      <v-list-item-title class="font-weight-bold">
        {{ calendar.name }}
      </v-list-item-title>
      <v-list-item-subtitle class="text-capitalize">
        {{ calendarSubtitle }}
      </v-list-item-subtitle>
      <!-- Api calendar indicator -->
      <template v-slot:prepend>
        <v-avatar>
          <v-icon size="large">{{ cloudIcon }}</v-icon>
        </v-avatar>
      </template>
      <!-- Item options action -->
      <template #append>
        <v-btn variant="text" icon @click.stop.prevent="true">
          <v-icon size="large">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "DmCalendarCard",

  props: {
    calendar: {
      type: Object,
      required: true,
    },

    selected: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    cloudIcon() {
      if (!this.calendar.fromApi) {
        return "mdi-web-off";
      }

      return this.calendar.is_public ? "mdi-lock-open" : "mdi-lock";
    },

    calendarSubtitle() {
      const { academic_charge, calendarable } = this.calendar;
      return `${academic_charge.season} -  ${calendarable.name}`.toLowerCase();
    },
  },

  methods: {
    me() {
      console.log(this.calendar);
      console.log(this.cloudIcon);
    },
    showMe() {
      this.$router.push({
        name: "calendars.show",
        params: { uuid: this.calendar.uuid },
      });
    },
  },
};
</script>
