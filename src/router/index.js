import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import AboutView from "../views/About.vue";
import CalendarIndex from "../views/CalendarIndex.vue";
import LoginView from "../views/Login.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/c",
    name: "calendars.index",
    component: CalendarIndex,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/signin",
    name: "signin",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
