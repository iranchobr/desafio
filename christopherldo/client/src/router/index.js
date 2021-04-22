import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";

import PessoaIndex from "../views/Pessoa/Index";
import PessoaAdd from "../views/Pessoa/Add";
import PessoaEdit from "../views/Pessoa/Edit";

import AnimalIndex from "../views/Animal/Index";
import AnimalAdd from "../views/Animal/Add";
import AnimalEdit from "../views/Animal/Edit";

import LoteIndex from "../views/Lote/Index";
import LoteAdd from "../views/Lote/Add";
import LoteEdit from "../views/Lote/Edit";

import AlocacaoIndex from "../views/Alocacao/Index";
import AlocacaoAdd from "../views/Alocacao/Add";
import AlocacaoEdit from "../views/Alocacao/Edit";

import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/pessoa", name: "Pessoa", component: PessoaIndex },
  { path: "/pessoa/add", component: PessoaAdd },
  { path: "/pessoa/edit/:id", component: PessoaEdit },
  { path: "/animal", name: "Animal", component: AnimalIndex },
  { path: "/animal/add", component: AnimalAdd },
  { path: "/animal/edit/:id", component: AnimalEdit },
  { path: "/lote", name: "Lote", component: LoteIndex },
  { path: "/lote/add", component: LoteAdd },
  { path: "/lote/edit/:id", component: LoteEdit },
  { path: "/alocacao", name: "Alocação", component: AlocacaoIndex },
  { path: "/alocacao/add", component: AlocacaoAdd },
  { path: "/alocacao/edit/:id", component: AlocacaoEdit },
  { path: "*", component: NotFound },
];

const router = new VueRouter({
  routes,
  linkActiveClass: "active",
});

export default router;
