import axios from "axios";
import router from "../../../routes/router";

/////////////////////// Get initial record ///////////////////////
export const getRecords = async ({ commit, rootState }) => {
    try {
        commit("startLoading");
        const response = await axios.get(`${rootState.apiURL}/referral`);

        commit("setInitialRecord", response.data.data);
        commit("endLoading");
    } catch (error) {
        console.log(error);
        commit("setError", error.response.data.errors);
        commit("endLoading");
    }
};

/////////////////////// Send Invitation ///////////////////////

export const inviteFriend = async (
    { commit, dispatch, rootState },
    invitationEmail
) => {
    try {
        commit("clearErrors");
        commit("startLoading");

        const response = await axios.post(
            `${rootState.apiURL}/referral/sendReferral`,
            {
                email: invitationEmail
            }
        );

        commit("addNewReferral", response.data.data.referral);

        dispatch(
            "flashMessage",
            {
                message: "Inviation sent successfully",
                type: "success"
            },
            { root: true }
        );

        commit("endLoading");

        router.push("/pending-referrals");
    } catch (error) {
        console.log(error);
        commit("setError", error.response.data.errors);
        commit("endLoading");
    }
};

export const clearAllReferrals = ({ commit }) => {
    commit("clearAllReferrals");
};

/////////////////////// Activate User Account ///////////////////////
export const activateUserAccount = ({ commit, rootState }, userId) => {
    return axios
        .get(`${rootState.apiURL}/referral/activateUserAccount/${userId}`)
        .then(response => {
            commit("activateUser", userId);
        })
        .catch(error => console.log(error));
};

/////////////////////// Update User profile ///////////////////////
export const UpdateUserProfile = async (
    { commit, dispatch, rootState },
    data
) => {
    commit("clearErrors");
    commit("startLoading");

    try {
        await axios.post(
            `${rootState.apiURL}/referral/updateProfile/${data.id}`,
            {
                name: data.name,
                contact_number: data.contact_number,
                address: data.address
            }
        );

        dispatch(
            "auth/UpdateLoggedInUserProfile",
            {
                name: data.name,
                contact_number: data.contact_number,
                address: data.address
            },
            { root: true }
        );

        dispatch(
            "flashMessage",
            {
                message: "Profile updated successfully",
                type: "success"
            },
            { root: true }
        );

        commit("endLoading");

        router.push("/profile");
    } catch (error) {
        console.log(error);
        commit("setError", error.response.data.errors);
        commit("endLoading");
    }
};

/////////////////////// Update currently logged in user password ///////////////////////
export const currentlyLoggedInUser = async (
    { commit, dispatch, rootState },
    data
) => {
    commit("clearErrors");
    commit("startLoading");

    try {
        await axios.post(
            `${rootState.apiURL}/referral/updatePassword/${data.id}`,
            {
                old_password: data.old_password,
                new_password: data.new_password
            }
        );

        dispatch(
            "flashMessage",
            {
                message: "Password updated successfully",
                type: "success"
            },
            { root: true }
        );

        commit("endLoading");
        router.push("/profile");
    } catch (error) {
        console.log(error);
        commit("setError", error.response.data.errors);
        commit("endLoading");
    }
};
