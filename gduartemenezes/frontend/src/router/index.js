import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Lists from "../views/Lists.vue";
import Create from "../views/Create.vue";
import Edit from "../views/Edit.vue";
import Detail from "../views/Detail.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/lists",
    name: "Lists",
    component: Lists,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
  },
  {
    path: "/edit",
    name: "Edit",
    component: Edit,
  },
  {
    path: "/detail",
    name: "Detail",
    component: Detail,
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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
