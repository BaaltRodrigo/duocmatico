import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Home.vue";
import CalendarIndex from "../views/CalendarIndex.vue";
import checkIfCalendarIndexExists from "./middlewares/checkCalendarExists";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    redirect: "/c",
  },
  {
    path: "/c",
    name: "calendars.index",
    component: CalendarIndex,
  },
  {
    path: "/c/:id",
    name: "calendars.show",
    component: () => import("../views/CalendarShow.vue"),
    beforeEnter: [checkIfCalendarIndexExists],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
