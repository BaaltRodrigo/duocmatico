<template>
  <v-container class>
    <h4 class="text-h4 mb-2">Mis calendarios</h4>
    <v-row>
      <v-col cols="12" md="4">
        <v-card
          @click="newCalendarForm = true"
          variant="flat"
          height="150px"
          class="rounded-xl"
          style="border: 4px dashed lightgray; background-color: transparent"
        >
          <v-container class="text-center mt-4">
            <v-icon size="7vh">mdi-plus</v-icon>
            <h3>Nuevo calendario</h3>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        md="4"
        v-for="calendar in [...localCalendars, ...apiCalendars]"
        :key="`calendar-${calendar.uuid}`"
      >
        <v-card
          class="rounded-xl elevation-4"
          variant="outlined"
          @click="
            $router.push({
              name: 'calendars.show',
              params: { uuid: calendar.uuid },
            })
          "
          :title="calendar.name"
        >
          <v-card-text>
            <v-row dense>
              <v-col cols="auto">
                <v-chip size="small" label
                  >{{ calendar.academic_charge.season }}
                </v-chip>
              </v-col>
              <v-col cols="auto">
                <v-chip size="small" label class="text-capitalize">
                  {{ calendar.academic_charge.name.toLowerCase() }}
                </v-chip>
              </v-col>
              <v-col cols="auto">
                <v-chip size="small" label>
                  {{ calendar.calendarable.name.toLowerCase() }}
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-text class="d-flex justify-space-between">
            <v-btn
              class="elevation-2"
              size="small"
              variant="outlined"
              @click.stop.prevent="true"
            >
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
            <v-btn
              class="text-none elevation-2"
              size="small"
              color="error"
              variant="outlined"
              @click.stop.prevent="
                calendarToDelete = calendar;
                deleteCalendar = true;
              "
            >
              <v-icon>mdi-delete</v-icon>
              Eliminar
            </v-btn>
            <v-btn
              size="small"
              variant="outlined"
              class="text-none elevation-2"
              @click.stop.prevent="openEditCalendarNameCard(calendar)"
            >
              <v-icon>mdi-pencil</v-icon>
              Cambiar nombre
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog
    v-model="newCalendarForm"
    max-width="480px"
    content-class="elevation-0"
    hide-overlay
  >
    <dm-calendar-form @created="handleCreated"></dm-calendar-form>
  </v-dialog>

  <v-dialog
    v-model="deleteCalendar"
    max-width="530px"
    content-class="elevation-0"
    hide-overlay
  >
    <dm-delete-calendar
      @deleted-successfully="deleteCalendar = false"
      :calendar="calendarToDelete"
    ></dm-delete-calendar>
  </v-dialog>

  <v-dialog
    v-model="editCalendarName"
    max-width="480px"
    content-class="elevation-0"
    hide-overlay
  >
    <DmEditCalendarName :calendar="calendarEditName" @updated="nameUpdated" />
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import DmCalendarForm from "../components/calendar/DmCalendarForm.vue";
import DmDeleteCalendar from "../components/calendar/DmDeleteCalendar.vue";
import DmEditCalendarName from "../components/calendar/DmEditCalendarName.vue";

export default {
  name: "CalendarIndexView",

  components: {
    DmCalendarForm,
    DmDeleteCalendar,
    DmEditCalendarName,
  },

  data: () => ({
    newCalendarForm: false,
    deleteCalendar: false,
    editCalendarName: false,
    calendarToEditName: null,
  }),

  computed: {
    ...mapState("calendars", ["localCalendars", "apiCalendars"]),
    ...mapState("auth", ["token"]),
    calendarEditName() {
      return this.localCalendars.find((c) => c === this.calendarToEditName);
    },
  },

  methods: {
    openEditCalendarNameCard(calendar) {
      this.calendarToEditName = calendar;
      this.editCalendarName = true;
    },

    nameUpdated() {
      this.editCalendarName = false;
    },

    handleCreated() {
      this.newCalendarForm = false;
      this.$store.dispatch("calendars/getApiCalendars");
    },
  },

  created() {
    if (!this.token) return;

    this.$store.dispatch("calendars/getApiCalendars");
  },
};
</script>
