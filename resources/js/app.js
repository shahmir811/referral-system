import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

import App from "./App.vue";
import router from "./routes/router.js";
import store from "./store";

Vue.use(BootstrapVue);

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});
