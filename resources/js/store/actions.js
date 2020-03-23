import axios from "axios";
import router from "../routes/router";

export const flashMessage = ({ commit }, alert) => {
    commit("setMessage", alert);

    setTimeout(() => {
        commit("clearMessage");
    }, 3000);
};

/////////////////////// User Forgot password email ///////////////////////
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

/////////////////////// Reset Forgot password  ///////////////////////
export const resetPassword = async ({ state, commit, dispatch }, data) => {
    commit("clearErrors");
    commit("startLoading");

    try {
        await axios.post(`${state.apiURL}/resetPassword/${data.token}`, {
            new_password: data.password
        });

        dispatch("flashMessage", {
            message: "Password updated successfully",
            type: "success"
        });

        commit("endLoading");
        router.push("/login");
    } catch (error) {
        console.log(error.response.data.errors);
        commit("setError", error.response.data.errors);
        commit("endLoading");
    }
};

/////////////////////// Contact Us form ///////////////////////
export const contactUsRequest = ({ state, commit, dispatch }, data) => {
    commit("clearErrors");
    commit("startLoading");

    return axios
        .post(`${state.apiURL}/contact-us`, data)
        .then(response => {
            console.log(response.data);

            dispatch("flashMessage", {
                message: "Your request has been sent successfully",
                type: "success"
            });

            commit("endLoading");
        })
        .catch(error => {
            console.log(error.response.data.errors);
            commit("setError", error.response.data.errors);
            commit("endLoading");
        });
};
