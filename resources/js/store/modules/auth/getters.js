import _ from "lodash";

export const loading = state => state.loading;

export const isAuthenticated = state => state.isAuthenticated;

export const user = state => state.user;

export const errors = state => state.errors;

// export const username = state => state.user.name;

export const username = state => {
    if (!_.isEmpty(state.user)) {
        console.log("NAME: ", state.user.name);
        return state.user.name;
    } else {
        return "Ahmed";
    }
};
