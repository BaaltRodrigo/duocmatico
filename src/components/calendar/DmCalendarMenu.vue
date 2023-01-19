<template>
  <v-list dense>
    <div
      v-for="(item, index) in menuItems"
      :key="`calendar-menu-item-${index}`"
    >
      <v-list-item v-if="item.title" @click="$emit(item.emit)">
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
      <v-divider v-else></v-divider>
    </div>
  </v-list>
</template>

<script>
export default {
  name: "DmCalendarMenu",

  data: () => ({
    menuItems: [
      { title: "Copiar", icon: "mdi-content-copy", emit: "copy" },
      { title: "Cambiar nombre", icon: "mdi-rename-outline", emit: "rename" },
      // {
      //   title: "Compartir calendario",
      //   icon: "mdi-share-variant",
      //   emit: "share",
      // },
      {}, // used to create a divider
      { title: "Borrar", icon: "mdi-trash-can-outline", emit: "delete" },
    ],
  }),
};
</script>
