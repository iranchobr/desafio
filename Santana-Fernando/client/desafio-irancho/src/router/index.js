import Vue from "vue";
import Router from "vue-router";

import Home from "../components/Home";
import Pessoa from "../components/Pessoa";
import Animal from "../components/Animal";
import loteAnimal from "../components/AnimalLote";
import lote from "../components/Lote";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/pessoa",
    component: Pessoa
  },
  {
    path: "/animal",
    component: Animal
  },
  {
    path: "/loteAnimal",
    component: loteAnimal
  },
  {
    path: "/lote",
    component: lote
  }
];

const router = new Router({ routes });
export default router;
