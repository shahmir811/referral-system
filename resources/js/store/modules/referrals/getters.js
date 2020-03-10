import { sortBy } from "lodash";

export const loading = state => state.loading;

export const errors = state => state.errors;

export const ancestor = state => state.ancestor;

export const referrals = state => sortBy(state.referrals, ["name"]);

export const pending_referrals = state => state.pending_referrals;

// export const pending_referrals = state =>
// sortBy(state.pending_referrals, ["created_at"]).reverse();

export const referrals_count = state => state.referrals.length;

export const pending_referrals_count = state => state.pending_referrals.length;
