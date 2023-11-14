<template>
  <v-card class="py-1" :ripple="false" @click="$emit('show', calendar)">
    <v-list-item>
      <v-list-item-title class="font-weight-bold">
        {{ calendar.name }}
      </v-list-item-title>
      <v-list-item-title
        class="text-capitalize text-medium-emphasis text-body-2"
      >
        {{ calendarSubtitle }}
      </v-list-item-title>
      <!-- Api calendar indicator -->
      <template v-slot:prepend>
        <v-avatar>
          <v-icon size="large">{{ cloudIcon }}</v-icon>
        </v-avatar>
      </template>
      <!-- Item options action -->
      <template #append>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              variant="text"
              v-bind="props"
              icon
              @click.stop.prevent="true"
            >
              <v-icon size="large">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list density="compact">
              <v-list-item
                v-for="item in menuOptions"
                :key="item.id"
                @click="$emit(item.event, calendar)"
                :class="item.color ? `text-${item.color}` : ''"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                <template v-slot:prepend>
                  <v-icon :icon="item.icon"></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </template>
    </v-list-item>
  </v-card>
</template>

<script>
import { CALENDAR_SOURCES } from "../../helpers/constants";

export default {
  name: "DmCalendarCard",

  props: {
    calendar: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    menuItems: [
      { title: "Ver calendario", icon: "mdi-eye", event: "show" },
      { title: "Cambiar nombre", icon: "mdi-pencil", event: "rename" },
      { title: "Compartir", icon: "mdi-share-variant", event: "share" },
      // {
      //   title: "Agregar a la cuenta",
      //   icon: "mdi-account-plus",
      //   event: "synchronize",
      // },
      { title: "Eliminar", icon: "mdi-delete", event: "delete", color: "red" },
    ],
  }),

  computed: {
    menuOptions() {
      // remove synchronize option if calendar is from api
      if (this.calendar.source === CALENDAR_SOURCES.API) {
        return this.menuItems.filter((item) => item.event !== "synchronize");
      }

      return this.menuItems.filter((item) => item.event !== "share");
    },

    cloudIcon() {
      if (this.calendar.source === CALENDAR_SOURCES.LOCAL) {
        return "mdi-earth-off";
      }

      return this.calendar.is_public ? "mdi-earth" : "mdi-lock";
    },

    calendarSubtitle() {
      const { academic_charge, calendarable } = this.calendar;
      return `${academic_charge.season} -  ${calendarable.name}`.toLowerCase();
    },
  },

  methods: {
    showMe() {
      this.$router.push({
        name: "calendars.show",
        params: { uuid: this.calendar.uuid },
      });
    },
  },

  emits: ["show", "rename", "share", "synchronize", "delete"],
};
</script>
