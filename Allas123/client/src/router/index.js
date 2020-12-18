import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Pessoa from '@/components/Pessoa'
import Lote from '@/components/Lote'
import Animal from '@/components/Animal'
import AnimalLote from '@/components/AnimalLote'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Home', component: Home},
    {path: '/pessoa', name: 'Pessoa', component: Pessoa},
    {path: '/lote', name: 'Lote', component: Lote},
    {path: '/animal', name: 'Animal', component: Animal},
    {path: '/animal-lote', name: 'AnimalLote', component: AnimalLote}
  ]
})
