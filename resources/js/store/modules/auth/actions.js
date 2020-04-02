import axios from "axios";
import router from "../../../routes/router";
import { isEmpty } from "lodash";
import localForage from "localforage";

import { setHttpToken } from "../../../helpers/index";

/////////////////////// Register new user ///////////////////////

export const registerNewUser = async (
    { state, commit, rootState, dispatch },
    newUser
) => {
    commit("startLoading");
    commit("clearErrors");
    try {
        await axios.post(`${rootState.apiURL}/auth/register`, newUser);

        dispatch(
            "flashMessage",
            {
                message: "User registered successfully",
                type: "success"
            },
            { root: true }
        );
        commit("endLoading");
        router.push("/login");
    } catch (error) {
        commit("setError", error.response.data.errors);
        let comingErrors = error.response.data.errors;
        if (_.has(comingErrors, "token")) {
            dispatch(
                "flashMessage",
                {
                    message:
                        "Oops! It seems that your referral is incorrect. Kindly contact your friend",
                    type: "danger"
                },
                { root: true }
            );
        }
        commit("endLoading");
    }
};

/////////////////////// Login user ///////////////////////
export const loginUser = async (
    { state, commit, rootState, dispatch },
    user
) => {
    commit("startLoading");
    commit("clearErrors");

    try {
        const response = await axios.post(
            `${rootState.apiURL}/auth/login`,
            user
        );

        // set token to localStorage and axios header
        await dispatch("setToken", response.data.access_token);

        // send request to fetch user
        await dispatch("fetchUser");

        await dispatch("referrals/getRecords", null, { root: true });

        commit("endLoading");

        dispatch(
            "flashMessage",
            {
                message: "Login successfully",
                type: "success"
            },
            { root: true }
        );

        // Below code redirects user to intended page after login
        localForage.getItem("intended").then(name => {
            if (isEmpty(name)) {
                router.push("/home");
                return;
            }

            router.push({ name });
        });
    } catch (error) {
        console.log(error);
        if (error.response.status === 422) {
            commit("setError", error.response.data.errors);
        }
        if (error.response.status === 401) {
            dispatch(
                "flashMessage",
                {
                    message: "Could not sign you in with those credentials",
                    type: "danger"
                },
                { root: true }
            );
        }
        commit("endLoading");
    }
};

/////////////////////// fetch currently logged in user //////////////////
export const fetchUser = ({ commit, dispatch, rootState }) => {
    return axios.get(`${rootState.apiURL}/auth/me`).then(response => {
        commit("setIsAuthenticated", true);
        commit("setUserData", response.data.data.user);
    });
};

/////////////////////// Logout user //////////////////
export const logout = async ({ dispatch, rootState }) => {
    try {
        await axios.post(`${rootState.apiURL}/auth/logout`);

        dispatch("referrals/clearAllReferrals", null, { root: true });
        dispatch("clearAuth");

        dispatch(
            "flashMessage",
            {
                message: "Logout successfully",
                type: "success"
            },
            { root: true }
        );
        router.push({ name: "landing" });
    } catch (error) {
        console.log(error);
    }
};

/////////////////////// set token to localStorage ///////////////////////
export const setToken = ({ commit, dispatch }, token) => {
    // if no token is passed
    if (isEmpty(token)) {
        // When application first starts we need to check whether there is a token in localStorage or not
        return dispatch("checkTokenExists").then(token => {
            setHttpToken(token);
        });
    }

    commit("setToken", token); // payload is token
    // set http token in axios header
    setHttpToken(token);
};

/////////////////////// check token exists in localStorage or not ///////////////////////
export const checkTokenExists = ({ commit }) => {
    return localForage.getItem("authtoken").then(token => {
        if (isEmpty(token)) {
            return Promise.reject("NO_LOCALSTORAGE_TOKEN");
        }
        return Promise.resolve(token);
    });
};

/////////////////////// fetch currently logged in user //////////////////
export const clearAuth = ({ commit }) => {
    commit("setIsAuthenticated", false);
    commit("setUserData", null);
    commit("setToken", null);
    setHttpToken(null);
};

/////////////////////// Update currently logged in user profile //////////////////
export const UpdateLoggedInUserProfile = ({ commit }, paylaod) => {
    commit("updateLoggedInUserProfile", paylaod);
};

/////////////////////// Remove errors //////////////////
export const removeAllErrors = ({ commit }) => {
    commit("clearErrors");
};

/////////////////////// Attempt function execute at first //////////////////
export const attempt = async (
    { commit, state, dispatch, rootState },
    token
) => {
    console.log("ACTION Attempt function");
    console.log("TOKEN: ", token);

    if (token) {
        commit("setToken", token);
        setHttpToken(token);
    }

    // if (!state.token) {
    //     return;
    // }

    try {
        const response = await axios.get(`${rootState.apiURL}/auth/me`);
        commit("setIsAuthenticated", true);
        commit("setUserData", response.data.data.user);

        await dispatch("referrals/getRecords", null, { root: true });
    } catch (error) {
        dispatch("clearAuth");
    }
};
