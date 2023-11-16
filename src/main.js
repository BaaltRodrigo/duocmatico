import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import store from "./store";

loadFonts();

// This is not when the app is mounted because the user could be logged in
// but the page could be refreshed and the state would be lost.
store.dispatch("auth/checkUser").then(() => {
  createApp(App).use(router).use(store).use(vuetify).mount("#app");
});
