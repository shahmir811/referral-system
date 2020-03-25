export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, data) => (state.errors = data);

export const addNewReferral = (state, payload) => {
    state.pending_referrals.unshift(payload);
};

export const changeUserStatus = (state, userId) => {
    const index = state.users.findIndex(user => user.id === userId);
    state.users[index].role =
        state.users[index].role === "free" ? "active" : "free";
};

export const activateUser = (state, userId) => {
    const index = state.referrals.findIndex(referral => referral.id === userId);
    state.referrals[index].role = "active";
};

export const updateUsersList = (state, payload) => (state.users = payload);

export const setInitialRecord = (state, payload) => {
    state.ancestor = payload.ancestor;
    state.referrals = payload.current_referrals;
    state.pending_referrals = payload.pending_referrals;
};

export const clearAllReferrals = state => {
    state.ancestor = null;
    state.referrals = [];
    state.pending_referrals = [];
    state.errors = [];
};

export const clearSelectedUser = state => (state.selectedUser = null);

export const getSelectedUserProfile = (state, token) => {
    state.selectedUser = state.users.find(data => data.token === token);
};
