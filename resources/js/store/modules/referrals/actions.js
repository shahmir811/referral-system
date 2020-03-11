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

        console.log("REFERRAL: ", response.data.data);

        console.log("REFERRAL: ", response.data.data.referral);

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
