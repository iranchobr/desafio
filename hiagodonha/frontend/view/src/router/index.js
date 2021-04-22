import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Pessoa from '../components/Pessoa'
import Animal from '../components/Animal'
import Lote from '../components/Lote'
import AnimalLote from '../components/AnimalLote'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pessoa',
      name: 'Pessoa',
      component: Pessoa
    },
    {
      path: '/animal',
      name: 'Animal',
      component: Animal
    },
    {
      path: '/lote',
      name: 'Lote',
      component: Lote
    },
    {
      path: '/animalLote',
      name: 'AnimalLote',
      component: AnimalLote
    }
  ]
})
