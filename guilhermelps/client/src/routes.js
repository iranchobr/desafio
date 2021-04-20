import People from './pages/people/People.vue';
import Animal from './pages/animal/Animal.vue';
import Batch from './pages/batch/Batch.vue';
import AnimalBatch from './pages/animal_batch/AnimalBatch.vue';

export const routes = [
  { path: '/', component: People, label: 'Pessoa' },
  { path: '/animal', component: Animal, label: 'Animal' },
  { path: '/batch', component: Batch, label: 'Lote' },
  { path: '/animal-batch', component: AnimalBatch, label: 'Movimentação' },
]