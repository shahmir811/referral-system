import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import localForage from "localforage";

import App from "./App.vue";
import router from "./routes/router.js";
import store from "./store";

localForage.config({
    driver: localForage.LOCALSTORAGE,
    storeName: "Connect_People"
});

Vue.use(BootstrapVue);

// Following code is used for persistent login
store
    .dispatch("auth/setToken")
    .then(() => {
        store
            .dispatch("auth/fetchUser")
            .then(() => {
                store.dispatch("referrals/getRecords");
            })
            .catch(() => {
                store.dispatch("auth/clearAuth");
                router.replace({ name: "login" }).catch(err => {});
            });
    })
    .catch(() => {
        store.dispatch("auth/clearAuth");
    });

new Vue({
    el: "#app",
    router,
    store,
    render: h => h(App)
});
