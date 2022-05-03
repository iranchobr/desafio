import { createApp, h } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp({
  render: () => h(App),
});
const options = {
  // You can set your default options here
};

import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./assets/styles/global.styles.sass";

app.use(Toast, options);
app.use(store);
app.use(router);
app.mount("#app");
