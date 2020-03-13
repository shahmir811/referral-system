import axios from "axios";
import router from "../routes/router";

export const flashMessage = ({ commit }, alert) => {
    commit("setMessage", alert);

    setTimeout(() => {
        commit("clearMessage");
    }, 3000);
};

export const userForgotPassword = ({ state, commit, dispatch }, email) => {
    commit("clearErrors");
    commit("startLoading");

    return axios
        .post(`${state.apiURL}/userForgotPassword`, { email })
        .then(() => {
            dispatch("flashMessage", {
                message: "Password reset link has been sent to your email",
                type: "success"
            });

            commit("endLoading");
        })
        .catch(error => {
            console.log(error);
            commit("setError", error.response.data);
            commit("endLoading");
        });
};
