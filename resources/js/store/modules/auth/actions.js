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

        commit("endLoading");

        dispatch(
            "flashMessage",
            {
                message: "Login successfully",
                type: "success"
            },
            { root: true }
        );

        router.push("/home");
    } catch (error) {
        console.log(error);
        if (error.response.status === 422) {
            commit("setError", error.response.data.errors);
        }
        if (error.response.status === 401) {
            dispatch(
                "flashMessage",
                {
                    message: "Could not sign you in",
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
