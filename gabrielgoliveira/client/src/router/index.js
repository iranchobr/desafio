import Vue from 'vue';
import Router from 'vue-router';
import Index from '../Pages/Index.vue';

import PessoaCreate from '../Pages/Pessoa/PessoaCreate.vue';
import ListarPessoas from '../Pages/Pessoa/PessoaList.vue';
import AlterarPessoa from '../Pages/Pessoa/AlterarPessoa.vue';
import AnimaisPessoa from '../Pages/Pessoa/AnimaisPessoa.vue';


import LoteCreate from '../Pages/Lote/LoteCreate.vue';
import ListarLotes from '../Pages/Lote/LoteList.vue';
import AlterarLotes from '../Pages/Lote/AlterarLote.vue';

import AnimalCreate from '../Pages/Animal/AnimalCreate.vue';
import ListarAnimais from '../Pages/Animal/AnimalList.vue';
import AlterarAnimal from '../Pages/Animal/AlterarAnimal.vue'

import LoteAnimalCreate from '../Pages/LoteAnimal/LoteAnimalCreate.vue';
import ListarLoteAnimal from '../Pages/LoteAnimal/LoteAnimalList.vue';
import LoteAnimalAlterar from '../Pages/LoteAnimal/LoteAnimalAlterar.vue';


Vue.use(Router)


export default new Router({
  mode: 'history',
  base: 'http://localhost:8080',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/cadastrar_pessoa',
      component: PessoaCreate
    },
    {
      path: '/listar_pessoas',
      component: ListarPessoas
    },
    {
      path: '/cadastrar_animal',
      component: AnimalCreate
    },
    {
      path: '/listar_animais',
      component: ListarAnimais
    },
    {
      path: '/cadastrar_lote',
      component: LoteCreate
    },
    {
      path: '/listar_lotes',
      component: ListarLotes
    },
    {
      path: '/cadastrar_loteanimal',
      component: LoteAnimalCreate
    },
    {
      path: '/listar_loteanimal',
      component: ListarLoteAnimal
    },
    {
      path: '/alterar_lote',
      component: AlterarLotes
    },
    {
      path: '/alterar_pessoa',
      component: AlterarPessoa
    },
    {
      path: '/alterar_animal',
      component: AlterarAnimal
    },
    {
      path: '/alterar_animal_lote',
      component: LoteAnimalAlterar
    },
    {
      path: '/pessoas/animais',
      component: AnimaisPessoa
    }
  ]
})
