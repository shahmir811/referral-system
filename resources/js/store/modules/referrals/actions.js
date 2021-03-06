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
                email: invitationEmail,
            }
        );

        commit("addNewReferral", response.data.data.referral);

        dispatch(
            "flashMessage",
            {
                message: "Inviation sent successfully",
                type: "success",
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
        .then((response) => {
            commit("activateUser", userId);
        })
        .catch((error) => console.log(error));
};

/////////////////////// Change User status ///////////////////////
export const changeUserStatus = ({ commit, dispatch, rootState }, userId) => {
    return axios
        .get(`${rootState.apiURL}/referral/changeUserStatusByAdmin/${userId}`)
        .then((response) => {
            commit("changeUserStatus", userId);
        })
        .catch((error) => console.log(error));
};

/////////////////////// Update User profile ///////////////////////
export const UpdateUserProfile = async (
    { commit, dispatch, rootState },
    data
) => {
    commit("clearErrors");
    commit("startLoading");
    let config = {
        header: {
            "Content-Type": "multipart/form-data",
        },
    };

    try {
        const response = await axios.post(
            `${rootState.apiURL}/referral/updateProfile/${rootState.auth.user.id}`,
            data,
            config
        );

        dispatch("auth/UpdateLoggedInUserProfile", response.data.data.user, {
            root: true,
        });

        dispatch(
            "flashMessage",
            {
                message: "Profile updated successfully",
                type: "success",
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
                new_password: data.new_password,
            }
        );

        dispatch(
            "flashMessage",
            {
                message: "Password updated successfully",
                type: "success",
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

/////////////////////// fetch currently logged in user //////////////////
export const getAllSystemUsers = async ({ commit, rootState }) => {
    commit("startLoading");

    try {
        const response = await axios.get(
            `${rootState.apiURL}/referral/allSystemUsers`
        );

        commit("updateUsersList", response.data.data);

        commit("endLoading");
    } catch (error) {
        console.log(error);
        commit("endLoading");
    }
};

/////////////////////// change user password by admin  //////////////////
export const changePassword = async ({ commit, dispatch, rootState }, data) => {
    commit("clearErrors");
    commit("startLoading");

    try {
        await axios.post(
            `${rootState.apiURL}/referral/changePasswordByAdmin/${data.id}`,
            {
                new_password: data.new_password,
            }
        );

        dispatch(
            "flashMessage",
            {
                message: "Password updated successfully",
                type: "success",
            },
            { root: true }
        );

        commit("endLoading");
        router.push("/all-users");
    } catch (error) {
        console.log(error);
        commit("setError", error.response.data.errors);
        commit("endLoading");
    }
};

/////////////////////// Remove errors //////////////////
export const removeAllErrors = ({ commit }) => {
    commit("clearErrors");
};

/////////////////////// Get User profile //////////////////
export const userRecord = ({ commit }, id) => {
    commit("clearSelectedUser");
    commit("getSelectedUserProfile", id);
};

/////////////////////// Delete User  //////////////////
export const deleteUser = ({ commit, dispatch, rootState }, userId) => {
    return axios
        .delete(`${rootState.apiURL}/auth/deleteUser/${userId}`)
        .then(() => {
            commit("removeUserRecord", userId);
        })
        .catch((error) => console.log(error));
};
