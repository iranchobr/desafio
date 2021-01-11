import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/PageHome";
import CreateAnimal from "../pages/pageAnimal/CreateAnimal";
import ListAnimal from "../pages/pageAnimal/ListAnimal";
import CreatePerson from "../pages/pagePerson/CreatePerson";
import ListPerson from "../pages/pagePerson/ListPerson";
import CreateBatch from "../pages/pageBatch/CreateBatch";
import ListBatch from "../pages/pageBatch/ListBatch";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/animals/create",
    name: "CreateAnimal",
    component: CreateAnimal,
  },
  {
    path: "/animals/list",
    name: "ListAnimal",
    component: ListAnimal,
  },
  {
    path: "/people/create",
    name: "CreatePerson",
    component: CreatePerson,
  },
  {
    path: "/people/list",
    name: "ListPerson",
    component: ListPerson,
  },
  {
    path: "/batches/create",
    name: "CreateBatch",
    component: CreateBatch,
  },
  {
    path: "/batches/list",
    name: "ListBatch",
    component: ListBatch,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
