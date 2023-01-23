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
          @showMenu="showMenu($event, index)"
        ></dm-calendar-card>
      </v-col>
    </v-row>
    <!-- Remove menu min-width when more options are added -->
    <v-menu
      v-model="menu"
      :position-x="menuX"
      :position-y="menuY"
      absolute
      min-width="250px"
    >
      <dm-calendar-menu
        @delete="deleteCalendar()"
        @copy="copyCalendar()"
        @rename="renameCalendar()"
        @share="shareCalendar()"
      ></dm-calendar-menu>
    </v-menu>

    <v-dialog v-model="showCalendarForm" max-width="70vh">
      <dm-calendar-form
        @created="showCalendar(all.length - 1)"
      ></dm-calendar-form>
    </v-dialog>

    <v-dialog v-model="renameForm" max-width="70vh">
      <dm-calendar-rename
        :index="menuCalendarIndex"
        @update="updateName"
      ></dm-calendar-rename>
    </v-dialog>

    <v-dialog v-model="showShareOptions" max-width="70vh">
      <dm-share-menu :calendar="all[menuCalendarIndex]"></dm-share-menu>
    </v-dialog>
  </v-container>
</template>

<script>
import DmCalendarForm from "../components/calendar/DmCalendarForm.vue";
import DmCalendarCard from "../components/calendar/DmCalendarCard.vue";
import DmCalendarMenu from "../components/calendar/DmCalendarMenu.vue";
import DmCalendarRename from "../components/calendar/DmCalendarRename.vue";
import DmShareMenu from "../components/calendar/DmShareMenu.vue";
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "DmCalendarIndex",

  components: {
    DmCalendarCard,
    DmCalendarForm,
    DmCalendarMenu,
    DmCalendarRename,
    DmShareMenu,
  },

  computed: {
    ...mapState("calendars", ["all"]),
  },

  data: () => ({
    showCalendarForm: false,
    showShareOptions: false,
    renameForm: false,
    menu: false,
    menuX: null,
    menuY: null,
    menuCalendarIndex: -1,
  }),

  methods: {
    ...mapActions("calendars", [
      "deleteCalendarAction",
      "addCalendarAction",
      "updateCalendarName",
    ]),
    ...mapMutations("calendars", ["setSelected"]),
    newCalendar() {
      this.showCalendarForm = true;
    },

    showMenu(e, index) {
      e.preventDefault();
      this.menu = false;
      this.menuX = e.clientX;
      this.menuY = e.clientY;
      this.menuCalendarIndex = index;
      this.$nextTick(() => {
        this.menu = true;
      });
    },

    test(message) {
      console.log("event:", this.menuCalendarIndex, message);
    },

    copyCalendar() {
      const selected = this.all[this.menuCalendarIndex];
      const sameNameCount = this.all.filter((c) =>
        c.name.includes(selected.name)
      ).length;
      this.addCalendarAction({
        ...selected,
        name: `${selected.name} (${sameNameCount})`,
      });
    },

    renameCalendar() {
      console.log("rename", this.menuCalendarIndex);
      this.renameForm = true;
    },

    async updateName(newName) {
      // set selected calendar
      this.setSelected(this.menuCalendarIndex);
      // update name
      await this.updateCalendarName(newName);

      this.renameForm = false;
    },

    shareCalendar() {
      this.showShareOptions = true;
      console.log(this.all[this.menuCalendarIndex]);
    },

    deleteCalendar() {
      this.deleteCalendarAction(this.menuCalendarIndex);
    },

    showCalendar(index) {
      this.$router.push({
        name: "calendar.show",
        params: {
          id: index,
        },
      });
    },
  },
};
</script>
