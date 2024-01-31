import HomePage from '../pages/Home/HomePage.vue'
import AnimalPage from '../pages/Animal/AnimalPage.vue'
import LotePage from '../pages/Lote/LotePage.vue'
import PessoasPage from '../pages/Pessoas/PessoasPage.vue'
import AnimaisLotesPage from '../pages/AnimaisLotes/AnimaisLotesPage.vue'




export default [
  { path: '/', component: HomePage },
  { path: '/animais', component: AnimalPage },
  { path: '/lotes', component: LotePage },
  { path: '/pessoas', component: PessoasPage },
  { path: '/animais-lotes', component: AnimaisLotesPage },

]
