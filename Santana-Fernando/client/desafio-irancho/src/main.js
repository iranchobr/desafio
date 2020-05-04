import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(require("vue-moment"));
new Vue({
  router,
  el: "#app",
  render: h => h(App)
});
