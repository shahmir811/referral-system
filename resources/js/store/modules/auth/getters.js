import _ from "lodash";

export const loading = (state) => state.loading;

export const isAuthenticated = (state) => state.isAuthenticated;

export const user = (state) => state.user;

export const errors = (state) => state.errors;

export const invitationLink = (state) => {
    if (state.user) {
        // return `register?email=${state.user.email}&referral=${state.user.token}`;
        return `invitation?invitationcode=${state.user.token}`;
    }

    return null;
};

export const username = (state) => {
    if (!_.isEmpty(state.user)) {
        return state.user.name;
    }
};

export const user_verified = (state) => {
    if (!_.isEmpty(state.user)) {
        return state.user.is_verified;
    }
};

export const role = (state) => {
    if (!_.isEmpty(state.user)) {
        return state.user.role;
    }
};

export const userHasImage = (state) => {
    if (!_.isEmpty(state.user)) {
        return state.user.image ? true : false;
    } else {
        return false;
    }
};
