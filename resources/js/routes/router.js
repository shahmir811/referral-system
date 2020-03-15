import Vue from "vue";
import Router from "vue-router";
import beforeEach from "./beforeEach";

Vue.use(Router);

import Landing from "../pages/Guests/Landing.vue";
import AboutUs from "../pages/Guests/About-us.vue";
import ContactUs from "../pages/Guests/Contact-us.vue";
import ForgotPassword from "../pages/Guests/Forgot-password.vue";
import PasswordReset from "../pages/Guests/Password-reset.vue";
import FAQ from "../pages/Guests/FAQ.vue";
import HowItWorks from "../pages/Guests/How-it-works.vue";
import HowToPromote from "../pages/Guests/How-to-promote.vue";
import Login from "../pages/Login/Login.vue";
import Register from "../pages/Register/Register.vue";
import Home from "../pages/Home/Home.vue";
import PendingReferrals from "../pages/Home/Pending-referrals.vue";
import NewPassword from "../pages/Home/New-Password.vue";
import AllUsers from "../pages/Home/AllUsers.vue";
import NotFound from "../pages/Error/NotFound.vue";
import Profile from "../pages/Profile/Profile.vue";
import UpdateProfile from "../pages/Profile/UpdateProfile.vue";
import UpdatePassword from "../pages/Profile/UpdatePassword.vue";
import SendInvitation from "../pages/Home/Send-Invitation.vue";

const router = new Router({
    mode: "history",
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
            path: "/forgot-password",
            component: ForgotPassword,
            name: "forgot-password",
            meta: { guest: true, needsAuth: false }
        },
        {
            path: "/password-reset",
            component: PasswordReset,
            name: "password-reset",
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
            path: "/sending-inviation",
            component: SendInvitation,
            name: "sending-inviation",
            meta: { guest: false, needsAuth: true }
        },
        {
            path: "/profile",
            component: Profile,
            name: "profile",
            meta: { guest: false, needsAuth: true }
        },
        {
            path: "/update-profile/:token",
            component: UpdateProfile,
            name: "update-profile",
            meta: { guest: false, needsAuth: true }
        },
        {
            path: "/update-password/:token",
            component: UpdatePassword,
            name: "update-password",
            meta: { guest: false, needsAuth: true }
        },
        {
            path: "/all-users",
            component: AllUsers,
            name: "all-users",
            meta: { guest: false, needsAuth: true }
        },
        {
            path: "/new-password/:token",
            component: NewPassword,
            name: "new-password",
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
