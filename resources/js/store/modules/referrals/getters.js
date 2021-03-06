import { sortBy } from "lodash";

export const loading = state => state.loading;

export const errors = state => state.errors;

export const ancestor = state => state.ancestor;

export const referrals = state => sortBy(state.referrals, ["name"]);

export const pending_referrals = state => state.pending_referrals;

export const users_count = state => state.users.length;

export const users = state => state.users;

export const referrals_count = state => state.referrals.length;

export const pending_referrals_count = state => state.pending_referrals.length;

export const selectedUser = state => state.selectedUser;
