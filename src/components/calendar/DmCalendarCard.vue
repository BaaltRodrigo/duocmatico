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
                @click="handleMenuAction(item.event)"
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

  <!-- Dialogs related to a calendar actions -->
  <v-dialog v-model="showDialog" width="auto">
    <component
      :is="formComponent"
      :calendar="calendar"
      @done="showDialog = false"
    />
  </v-dialog>
</template>

<script>
import { CALENDAR_SOURCES } from "../../helpers/constants";
// components
import DmDeleteCalendar from "./DmDeleteCalendar.vue";
import DmEditCalendarName from "./DmEditCalendarName.vue";
import DmShareCalendar from "./DmShareCalendar.vue";

export default {
  name: "DmCalendarCard",

  components: {
    DmDeleteCalendar,
    DmEditCalendarName,
    DmShareCalendar,
  },

  computed: {
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

    menuOptions() {
      // remove synchronize option if calendar is from api
      if (this.calendar.source === CALENDAR_SOURCES.API) {
        return this.menuItems.filter((item) => item.event !== "synchronize");
      }

      return this.menuItems.filter((item) => item.event !== "share");
    },
  },

  data: () => ({
    showDialog: false,
    formComponent: null,
    /**
     * This array contain the items to show inside the menu.
     * Each item has the following properties:
     * - title: The text to show in the menu item
     * - icon: The icon to show in the menu item
     * - color: The color of the text in the menu item
     */
    menuItems: [
      {
        title: "Ver calendario",
        icon: "mdi-eye",
        event: "show",
      },
      {
        title: "Cambiar nombre",
        icon: "mdi-pencil",
        event: "rename",
      },
      {
        title: "Compartir",
        icon: "mdi-share-variant",
        event: "share",
      },
      // {
      //   title: "Agregar a la cuenta",
      //   icon: "mdi-account-plus",
      //   event: "synchronize",
      // },
      {
        title: "Eliminar",
        icon: "mdi-delete",
        event: "delete",
        color: "error",
      },
    ],
  }),

  methods: {
    selectDelete() {
      this.formComponent = "DmDeleteCalendar";
      this.showDialog = true;
    },

    selectRename() {
      this.formComponent = "DmEditCalendarName";
      this.showDialog = true;
    },

    selectShare() {
      this.formComponent = "DmShareCalendar";
      this.showDialog = true;
    },

    /**
     * This function wraps the possible actions that can be executed
     * from the menu. Each action is a function that can be called.
     *
     * @param {string} event
     */
    handleMenuAction(event) {
      // Without parenthesis to pass the method as a reference
      const actions = {
        show: this.showCalendar,
        rename: this.selectRename,
        share: this.selectShare,
        // synchronize: this.test,
        delete: this.selectDelete,
      };

      // With parenthesis to actually call the method
      return actions[event]();
    },

    handleDeleteCalendar() {
      store.dispatch("calendars/deleteCalendar", this.calendar);
      this.showDeleteForm = false;
    },

    showCalendar() {
      this.$router.push({
        name: "calendars.show",
        params: { uuid: this.calendar.uuid },
      });
    },
  },

  props: {
    calendar: {
      type: Object,
      required: true,
    },
  },
};
</script>
