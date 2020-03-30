import localForage from "localforage";
import { isEmpty } from "lodash";

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => (state.errors = payload);

export const errors = state => state.errors;

export const updateLoggedInUserProfile = (state, payload) => {
    state.user.name = payload.name;
    state.user.contact_number = payload.contact_number;
    state.user.address = payload.address;
    state.user.state = payload.state;
    state.user.account_number = payload.account_number;
    state.user.account_name = payload.account_name;
    state.user.bank = payload.bank;
    state.user.image = payload.image;
};

export const setIsAuthenticated = (state, trueOrFalse) =>
    (state.isAuthenticated = trueOrFalse);

export const setUserData = (state, data) => (state.user = data);

export const setToken = (state, token) => {
    // check empty and remove token
    if (isEmpty(token)) {
        localForage.removeItem("authtoken");
        return;
    }
    localForage.setItem("authtoken", token);
};
