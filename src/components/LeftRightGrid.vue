<template>
  <v-row :justify="justify" align="center">
    <v-col cols="12" md="6">
      <slot>
        <!-- Default slot can be changed in need to render another title type, like h4 -->
        <h3 class="text-h3">{{ title }}</h3>
        <br />
        <p class="text-h5 font-weight-light">{{ description }}</p>
      </slot>
    </v-col>
    <v-col cols="12" md="4" :order="reversed ? 'first' : 'last'">
      <slot name="media">
        <!-- The slot can be changed in need to render another media type, like video -->
        <v-img :src="image" aspect-ratio="16/9" max-height="250"></v-img>
      </slot>
    </v-col>
  </v-row>
</template>

<script>
import defaultImage from "../assets/images/undraw_default.svg";

export default {
  name: "LeftRightGrid",

  props: {
    title: {
      type: String,
      default: "Title",
    },
    description: {
      type: String,
      default: "Description",
    },
    image: {
      type: String,
      default: defaultImage,
    },
    reversed: {
      type: Boolean,
      default: false,
    },
    justify: {
      type: String,
      default: "space-between",
    },
  },
};
</script>
