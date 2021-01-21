import Pessoa from './pages/pessoa/Pessoa.vue';
import Animal from './pages/animal/Animal.vue';
import Lote from './pages/lote/Lote.vue';
import AnimalXLote from './pages/animal_x_lote/AnimalXLote.vue';

export const routes = [
  { path: '/', component: Pessoa },
  { path: '/animal', component: Animal },
  { path: '/lote', component: Lote },
  { path: '/animal_lote', component: AnimalXLote },
];
