import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserCircle,
  faHorseHead,
  faLayerGroup,
  faMap,
  faPlus,
  faHome,
  faSearch,
  faPowerOff,
  faPen,
  faTrash,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

library.add(
  faUserCircle,
  faHorseHead,
  faLayerGroup,
  faMap,
  faPlus,
  faHome,
  faSearch,
  faPowerOff,
  faPen,
  faTrash,
  faAngleLeft
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueSweetalert2);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
