import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: { name: "calendar.index" },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/f",
    name: "file.converter",
    component: () => import("../views/FileConversion.vue"),
  },
  {
    path: "/c",
    name: "calendar.index",
    component: () => import("../views/CalendarIndex.vue"),
  },
  {
    path: "/c/:id",
    name: "calendar.show",
    component: () => import("../views/CalendarShow.vue"),
  },
  {
    path: "/**",
    name: "error.404",
    component: () => import("../views/DmError404.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  store.commit("setDisplay404", false);
  next();
});

export default router;
