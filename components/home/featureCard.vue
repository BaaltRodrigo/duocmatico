<template>
  <v-card class="rounded-xl bg-white" variant="outlined" height="100%">
    <v-card-text>
      <v-card
        height="200"
        variant="tonal"
        color="grey"
        class="rounded-xl pa-2 d-flex align-center"
      >
        <v-img :src="feature.image" alt="feature image"></v-img>
      </v-card>
      <v-card-title class="px-1"> {{ feature.title }} </v-card-title>
      <v-list-item v-for="item in feature.items" :key="item.title" class="mt-2">
        <template #prepend>
          <v-avatar color="purple" size="small">
            <v-icon> {{ item.icon }} </v-icon>
          </v-avatar>
        </template>
        {{ item.title }}
      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
defineProps({
  feature: {
    type: Object,
    required: true,
  },
});
</script>
