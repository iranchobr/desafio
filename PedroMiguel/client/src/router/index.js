import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Pessoa from '@/components/Pessoa'
import Animal from '@/components/Animal'
import Lote from '@/components/Lote'
import LoteAnimal from '@/components/LoteAnimal'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/pessoa', name: 'Pessoa', component: Pessoa },
    { path: '/animal', name: 'Animal', component: Animal },
    { path: '/lote', name: 'Lote', component: Lote },
    { path: '/loteAnimal', name: 'LoteAnimal', component: LoteAnimal }
  ]
})
