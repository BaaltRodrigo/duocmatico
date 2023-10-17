// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Providers and Themes
import { base } from "./providers/defaults";
import { customLightTheme } from "./providers/themes";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components,
  directives,
  defaults: {
    ...base,
  },
  theme: {
    themes: {
      light: customLightTheme,
    },
  },
});
