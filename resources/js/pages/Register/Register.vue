<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register Account</div>

          <div class="card-body">
            <form @submit="onSubmitHandler">
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>

                <div class="col-md-6">
                  <input
                    id="name"
                    type="text"
                    class="form-control"
                    autocomplete="name"
                    autofocus
                    v-model="user.name"
                    :class="{'is-invalid': errors.name }"
                  />
                  <span class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</span>
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>

                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    autocomplete="email"
                    v-model="user.email"
                    :disabled="user.token"
                    :class="{'is-invalid': errors.email }"
                  />
                  <span class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</span>
                </div>
              </div>

              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    autocomplete="new-password"
                    v-model="user.password"
                    :class="{'is-invalid': errors.password }"
                  />
                  <span class="invalid-feedback" v-if="errors.password">{{ errors.password[0] }}</span>
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
                <div class="col-md-6 offset-md-4">
                  <button type="submit" class="btn btn-primary" :disabled="loading">
                    <template v-if="loading">
                      <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </template>
                    <template v-else>Register</template>
                  </button>
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
  name: "Register",
  mounted() {
    this.user.email = this.$route.query.email ? this.$route.query.email : "";
    this.user.token = this.$route.query.referral
      ? this.$route.query.referral
      : null;
  },
  computed: {
    ...mapGetters({
      loading: "auth/loading",
      errors: "auth/errors"
    })
  },
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        token: null
      }
    };
  },
  methods: {
    ...mapActions({
      flashMessage: "flashMessage",
      registerNewUser: "auth/registerNewUser"
    }),
    onSubmitHandler(e) {
      e.preventDefault();
      if (this.user.password !== this.user.password_confirmation) {
        this.flashMessage({
          message: "Password mismatch error",
          type: "danger"
        });

        return false;
      }

      let newUser = null;

      // Referral register
      if (this.user.token) {
        newUser = this.user;
      } else {
        newUser = _.omit(this.user, ["token"]);
      }

      this.registerNewUser(newUser);
    }
  }
};
</script>

<style lang="css">
</style>