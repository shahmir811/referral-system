import axios from "axios";

export const getRecords = async ({ commit, rootState }) => {
    try {
        commit("startLoading");
        const response = await axios.get(`${rootState.apiURL}/referral`);

        commit("setInitialRecord", response.data.data);
        commit("endLoading");
    } catch (error) {
        console.log(error);
        commit("setError", error.response.data.error);
        commit("endLoading");
    }
};

export const clearAllReferrals = ({ commit }) => {
    commit("clearAllReferrals");
};
