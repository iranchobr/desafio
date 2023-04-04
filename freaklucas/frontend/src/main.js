import Vue from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import routes from './routes/'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
