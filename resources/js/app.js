import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import localForage from "localforage";
import VueSweetalert2 from "vue-sweetalert2";

import "sweetalert2/dist/sweetalert2.min.css";
import App from "./App.vue";
import router from "./routes/router.js";
import store from "./store";

localForage.config({
    driver: localForage.LOCALSTORAGE,
    storeName: "Connect_People"
});

Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);

// Following code is used for persistent login
localForage.getItem("authtoken", (err, token) => {
    store.dispatch("auth/attempt", token).then(() => {
        new Vue({
            el: "#app",
            router,
            store,
            render: h => h(App)
        });
    });
});
