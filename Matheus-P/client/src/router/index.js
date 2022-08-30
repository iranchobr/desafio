import Vue from 'vue'
import Router from 'vue-router'

import Index from '../components/Index.vue'

import CriarPessoa from '../components/Pessoa/CriarPessoa.vue'
import ListarPessoas from '../components/Pessoa/ListarPessoas.vue'
import AlterarPessoa from '../components/Pessoa/AlterarPessoa.vue'
import AnimaisPessoa from '../components/Pessoa/AnimaisPessoa.vue'

import CriarLote from '../components/Lote/CriarLote.vue'
import ListarLotes from '../components/Lote/ListarLotes.vue'
import AlterarLotes from '../components/Lote/AlterarLotes.vue'

import CriarAnimal from '../components/Animal/CriarAnimal.vue'
import ListarAnimais from '../components/Animal/ListarAnimais.vue'
import AlterarAnimal from '../components/Animal/AlterarAnimal.vue'

import CriarLoteAnimal from '../components/LoteAnimal/CriarLoteAnimal.vue'
import ListarLoteAnimal from '../components/LoteAnimal/ListarLoteAnimal.vue'
import AlterarLoteAnimal from '../components/LoteAnimal/AlterarLoteAnimal.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/cadastrar_pessoa',
      component: CriarPessoa
    },
    {
      path: '/listar_pessoas',
      component: ListarPessoas
    },
    {
      path: '/cadastrar_animal',
      component: CriarAnimal
    },
    {
      path: '/listar_animais',
      component: ListarAnimais
    },
    {
      path: '/cadastrar_lote',
      component: CriarLote
    },
    {
      path: '/listar_lotes',
      component: ListarLotes
    },
    {
      path: '/cadastrar_animal_lote',
      component: CriarLoteAnimal
    },
    {
      path: '/listar_animal_lote',
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
      component: AlterarLoteAnimal
    },
    {
      path: '/pessoas/animais',
      component: AnimaisPessoa
    }
  ]
})
