import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Pessoa from '@/components/pessoa/Main'
import PessoaListar from '@/components/pessoa/List'
import PessoaCriar from '@/components/pessoa/Create'
import PessoaEditar from '@/components/pessoa/Edit'

import Lote from '@/components/lote/Main'
import LoteListar from '@/components/lote/List'
import LoteCriar from '@/components/lote/Create'
import LoteEditar from '@/components/lote/Edit'

import Animal from '@/components/animal/Main'
import AnimalListar from '@/components/animal/List'
import AnimalCriar from '@/components/animal/Create'
import AnimalEditar from '@/components/animal/Edit'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home },
    {
      path: '/pessoa',
      component: Pessoa,
      children: [
        { path: '', component: PessoaListar },
        { path: 'criar', component: PessoaCriar },
        { path: 'editar/:id', component: PessoaEditar }
      ]
    },
    {
      path: '/lote',
      component: Lote,
      children: [
        { path: '', component: LoteListar },
        { path: 'criar', component: LoteCriar },
        { path: 'editar/:id', component: LoteEditar }
      ]
    },
    {
      path: '/animal',
      component: Animal,
      children: [
        { path: '', component: AnimalListar },
        { path: 'criar', component: AnimalCriar },
        { path: 'editar/:id', component: AnimalEditar }
      ]
    }
  ]
})
