import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    dark: false,
    themes: {
      dark: {
        background: colors.grey.darken4,
        primary: colors.cyan.darken2,
        success: colors.green.darken3,
        warning: colors.orange,
        error: colors.red.accent3,
        secondary: colors.grey.darken2,
      },
      light: {
        background: colors.grey.lighten5,
        primary: colors.cyan.darken2,
        success: colors.green,
        warning: colors.orange,
        error: colors.red,
        secondary: colors.grey.darken2,
      },
    },
  },
});
