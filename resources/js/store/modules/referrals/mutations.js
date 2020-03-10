export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, data) => (state.errors = data);

export const setAncestor = (state, data) => (state.ancestor = data);

export const setCurrentReferrals = (state, data) => (state.referrals = data);

export const setPendingReferrals = (state, data) =>
    (state.pending_referrals = data);

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
