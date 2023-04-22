<template>
  <v-navigation-drawer app>
    <v-list density="compact" nav>
      <v-list-item
        v-for="item in items"
        :key="`sidebar-nav-${item.page}`"
        :prepend-icon="item.icon"
        :to="{ name: item.page }"
        :title="item.title"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "TheSidebar",

  data: () => ({
    items: [
      {
        page: "calendars.index",
        icon: "mdi-calendar",
        title: "Mis Calendarios",
      },
      { page: "About", icon: "mdi-help", title: "About" },
    ],
  }),
};
</script>
