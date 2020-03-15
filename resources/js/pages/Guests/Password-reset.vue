<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Forgot Password</div>

          <div class="card-body">
            <form @submit.prevent="onSubmitHandler">
              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">New Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    autocomplete="new-password"
                    v-model="user.password"
                    :class="{'is-invalid': errors.new_password }"
                  />
                  <span
                    class="invalid-feedback"
                    v-if="errors.new_password"
                  >{{ errors.new_password[0] }}</span>
                </div>
              </div>

              <div class="form-group row">
                <label
                  for="password-confirm"
                  class="col-md-4 col-form-label text-md-right"
                >Confirm Password</label>

                <div class="col-md-6">
                  <input
                    id="password-confirm"
                    type="password"
                    class="form-control"
                    autocomplete="new-password"
                    v-model="user.password_confirmation"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <template v-if="loading">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </template>
                    <template v-else>Submit</template>
                  </button>

                  <router-link class="btn btn-link" to="/login">Cancel</router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Password-reset",
  mounted() {},
  computed: {
    ...mapGetters({
      loading: "loading",
      errors: "errors"
    })
  },
  data() {
    return {
      user: {
        password: "",
        password_confirmation: "",
        token: this.$route.query.referral
      }
    };
  },
  methods: {
    ...mapActions({
      resetPassword: "resetPassword",
      flashMessage: "flashMessage"
    }),
    onSubmitHandler() {
      if (this.user.password !== this.user.password_confirmation) {
        this.flashMessage({
          message: "New password must match with confirm password",
          type: "danger"
        });
        return false;
      }
      this.resetPassword(this.user);
    }
  }
};
</script>

<style lang="css">
</style>