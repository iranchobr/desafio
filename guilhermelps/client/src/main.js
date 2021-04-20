import App from './App.vue'
import Axios from 'axios'
import moment from 'moment'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSweetalert2 from 'vue-sweetalert2';
import { routes } from './routes'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import './theme/app.scss'
import 'sweetalert2/dist/sweetalert2.min.css';

const router = new VueRouter({
  routes,
  mode: 'history'
})

const axios = Axios.create({
  baseURL: 'http://localhost:3333'
})


Vue.prototype.$http = axios
Vue.prototype.moment = moment

Vue.use(VueRouter)
Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
