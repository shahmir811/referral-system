export const setMessage = (state, { message, type }) => {
    state.message = message;
    state.type = type;
};

export const clearMessage = state => {
    state.message = null;
    state.type = null;
};

export const startLoading = state => (state.loading = true);

export const endLoading = state => (state.loading = false);

export const clearErrors = state => (state.errors = []);

export const setError = (state, payload) => {
    state.errors = payload;
};
