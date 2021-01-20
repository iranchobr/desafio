import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes';
import VueResource from 'vue-resource';
import { BootstrapVue, BootstrapVueIcons  } from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2';

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueSweetalert2);

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
