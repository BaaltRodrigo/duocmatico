<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  keyActions: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <v-card class="text-center pa-4">
    <v-card-item class="mx-auto mb-4">
      <v-img :src="image" height="180" aspect-ratio="'16 / 9'"></v-img>
    </v-card-item>
    <v-card-text>
      <h4 class="text-h4">{{ title }}</h4>
    </v-card-text>
    <v-card-text style="height: 8rem">
      <p class="text-h6 font-weight-light">
        {{ description }}
      </p>
    </v-card-text>
    <v-card-text>
      <v-list-item
        class="text-left"
        v-for="item in keyActions"
        :key="`${title}-${item.title}`"
        :title="item.title"
        :prepend-icon="item.icon"
      >
        <template #prepend>
          <v-icon size="26">{{ item.icon }}</v-icon>
        </template>
      </v-list-item>
    </v-card-text>
  </v-card>
</template>
