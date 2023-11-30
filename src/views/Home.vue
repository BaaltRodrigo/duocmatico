<script>
import { mapState, mapGetters } from "vuex";
import { auth } from "../config/firebase";
import { CALENDAR_SOURCES } from "../helpers/constants";
// Components
import DmCalendarPanels from "../components/home/DmCalendarPanels.vue";
import DmHero from "../components/landing/DmHero.vue";
import DmFeatureCard from "../components/home/DmFeatureCard.vue";
import DmCalendarForm from "../components/calendar/DmCalendarForm.vue";
// Images
import prototypingProcess from "../assets/images/undraw_prototyping_process.svg";
import undrawCloudFiles from "../assets/images/undraw_cloud_files.svg";
import undrawShareLink from "../assets/images/undraw_share_link.svg";
import undrawPortfolio from "../assets/images/undraw_portfolio_update.svg";

const MAX_CALENDARS = 3;

export default {
  name: "HomeView",

  data: () => ({
    images: {
      prototypingProcess,
      undrawCloudFiles,
      undrawShareLink,
      undrawPortfolio,
    },
    calendarForm: false,
    features: [
      {
        icon: "mdi-calendar-month",
        image: undrawPortfolio,
        title: "Planifica",
        description:
          "¿Para que quedarte con una sola opcion si puedes tener mas?",
        keyActions: [
          {
            icon: "mdi-calendar-multiple",
            title: "Crea varios calendarios",
          },
          {
            icon: "mdi-calendar-check",
            title: "Ve topes de horario",
          },
          {
            icon: "mdi-note-search",
            title: "Busca tus asignaturas",
          },
        ],
      },
      {
        icon: "mdi-share-variant",
        image: undrawShareLink,
        title: "Comparte",
        description:
          "Pasale tu horario a tus amigos y companeros de una manera mas sencilla",
        keyActions: [
          {
            icon: "mdi-link",
            title: "Comparte con un click",
          },
          {
            icon: "mdi-calendar-plus",
            title: "Guarda tus horarios favoritos",
          },
        ],
      },
      {
        icon: "mdi-cloud",
        image: undrawCloudFiles,
        title: "En la nube",
        description:
          "Manten tus calenddarios sincronizados en todos tus dispositivos",
        keyActions: [
          {
            icon: "mdi-account-plus",
            title: "Crea tu cuenta gratis",
          },
          {
            icon: "mdi-cloud",
            title: "Ten tus horarios en la nube",
          },
          {
            icon: "mdi-cellphone-link",
            title: "Multiplataforma",
          },
        ],
      },
    ],
  }),

  components: {
    DmCalendarPanels,
    DmHero,
    DmFeatureCard,
    DmCalendarForm,
  },

  computed: {
    ...mapState("calendars", ["localCalendars", "apiCalendars"]),
    ...mapGetters("calendars", ["lastCalendars"]),

    loggedIn() {
      return !!auth.currentUser;
    },

    // As splice is a mutable method, we need to create a copy of the array
    // This is done for local and api calendars
    lastLocalCalendars() {
      return this.lastCalendars({
        source: CALENDAR_SOURCES.LOCAL,
        limit: MAX_CALENDARS,
      });
    },

    lastApiCalendars() {
      return this.lastCalendars({
        source: CALENDAR_SOURCES.API,
        limit: MAX_CALENDARS,
      });
    },
  },

  methods: {
    handleCreateCalendar() {
      if (!auth.currentUser) {
        return router.push({ name: "auth.login" });
      }

      this.calendarForm = true;
    },
  },

  async mounted() {
    await Promise.all([
      this.$store.dispatch("calendars/getCalendars", {
        source: CALENDAR_SOURCES.LOCAL,
      }),
      this.$store.dispatch("calendars/getCalendars", {
        source: CALENDAR_SOURCES.API,
      }),
    ]);
  },
};
</script>

<template>
  <!-- Render this when there is no account -->
  <div v-if="!loggedIn">
    <v-container class="d-flex align-center" style="height: 50vh">
      <dm-hero></dm-hero>
    </v-container>

    <!-- Some of the Features -->
    <v-container class="bg-white rounded-xl pa-10" style="min-height: 50vh">
      <h4 class="text-h4 text-center mb-8">
        Descubre lo que puedes hacer con Duocmatico
      </h4>
      <v-row>
        <v-col v-for="feature in features" :key="feature.title">
          <dm-feature-card
            class="h-100"
            :icon="feature.icon"
            :image="feature.image"
            :title="feature.title"
            :description="feature.description"
            :key-actions="feature.keyActions"
          ></dm-feature-card>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <!-- To render when there is an account -->
  <div v-else>
    <!-- Section with the last calendars created -->
    <v-container style="max-width: 55rem">
      <h4 class="text-h4 mb-4">Acceso rapido</h4>
      <!-- Api calendars -->
      <dm-calendar-panels
        v-if="loggedIn"
        title="Calendarios en tu cuenta"
        :calendars="lastApiCalendars"
        class="mb-6"
        :start-open="!!loggedIn"
      />

      <!-- Local Calendars -->
      <dm-calendar-panels
        v-if="localCalendars.length"
        :start-open="!loggedIn"
        title="Calendarios en este dispositivo"
        :calendars="localCalendars"
      />
    </v-container>
  </div>

  <!-- This always renders -->
  <v-container style="max-width: 55rem">
    <v-card class="pa-4 d-flex flex-wrap justify-space-around align-center">
      <v-img
        :src="images.prototypingProcess"
        width="80"
        max-width="240"
      ></v-img>
      <v-card-text class="text-h6 text-center">
        ¿Tienes planificar tu proximo semestre?
      </v-card-text>
      <v-card-text>
        <v-btn
          @click="handleCreateCalendar"
          variant="outlined"
          block
          size="large"
        >
          Crea un calendario
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>

  <v-dialog v-model="calendarForm">
    <dm-calendar-form @created="calendarForm = false" />
  </v-dialog>
</template>
