import Vue from "vue";
import Router from "vue-router";
import beforeEach from "./beforeEach";

Vue.use(Router);

import Landing from "../pages/Guests/Landing.vue";
import AboutUs from "../pages/Guests/About-us.vue";
import ContactUs from "../pages/Guests/Contact-us.vue";
import FAQ from "../pages/Guests/FAQ.vue";
import HowItWorks from "../pages/Guests/How-it-works.vue";
import HowToPromote from "../pages/Guests/How-to-promote.vue";
import Login from "../pages/Login/Login.vue";
import Register from "../pages/Register/Register.vue";
import Home from "../pages/Home/Home.vue";
import PendingReferrals from "../pages/Home/Pending-referrals.vue";
import NotFound from "../pages/Error/NotFound.vue";
import Profile from "../pages/Profile/Profile.vue";

const router = new Router({
    routes: [
        {
            path: "/",
            component: Landing,
            name: "landing",
            meta: { guest: true, needsAuth: false }
        },
        {
            path: "/aboutUs",
            component: AboutUs,
            name: "aboutUs",
            meta: { guest: true, needsAuth: false }
        },
        {
            path: "/contactUs",
            component: ContactUs,
            name: "contactUs",
            meta: { guest: true, needsAuth: false }
        },
        {
            path: "/faq",
            component: FAQ,
            name: "faq",
            meta: { guest: true, needsAuth: false }
        },
        {
            path: "/how-it-works",
            component: HowItWorks,
            name: "how-it-works",
            meta: { guest: true, needsAuth: false }
        },
        {
            path: "/how-to-promote",
            component: HowToPromote,
            name: "how-to-promote",
            meta: { guest: true, needsAuth: false }
        },
        {
            path: "/login",
            component: Login,
            name: "login",
            meta: { guest: true, needsAuth: false }
        },
        {
            path: "/register",
            component: Register,
            name: "register",
            meta: { guest: true, needsAuth: false }
        },
        {
            path: "/home",
            component: Home,
            name: "home",
            meta: { guest: false, needsAuth: true }
        },
        {
            path: "/pending-referrals",
            component: PendingReferrals,
            name: "pending-referrals",
            meta: { guest: false, needsAuth: true }
        },
        {
            path: "/profile",
            component: Profile,
            name: "profile",
            meta: { guest: false, needsAuth: true }
        },
        {
            path: "*",
            component: NotFound
        }

        // { path: '/', component: , name: '', meta: { guest: true, needsAuth: false }},
    ]
});

// Registering beforeEach
router.beforeEach(beforeEach);

export default router;
