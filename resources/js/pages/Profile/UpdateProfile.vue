<template>
  <div>
    <div class="row">
      <div class="col col-md">
        <h1 class="text-center">Update Profile</h1>
      </div>
    </div>
    <template v-if="loggedInUser">
      <div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-10">
            <input
              type="text"
              readonly
              class="form-control-plaintext"
              id="staticEmail"
              v-model="loggedInUser.email"
            />
          </div>
        </div>
        <Form @submit.prevent="onSubmitHandler">
          <div class="form-group row">
            <label for="inputName" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                id="inputName"
                v-model="loggedInUser.name"
                :class="{'is-invalid': errors.name }"
              />
              <span class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</span>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputContactNumber" class="col-sm-2 col-form-label">Contact Number</label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                id="inputContactNumber"
                v-model="loggedInUser.contact_number"
                :class="{'is-invalid': errors.contact_number }"
              />
              <span
                class="invalid-feedback"
                v-if="errors.contact_number"
              >{{ errors.contact_number[0] }}</span>
            </div>
          </div>
          <div class="form-group row">
            <label for="inputAddress" class="col-sm-2 col-form-label">Address</label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                v-model="loggedInUser.address"
                :class="{'is-invalid': errors.address }"
              />
              <span class="invalid-feedback" v-if="errors.address">{{ errors.address[0] }}</span>
            </div>
          </div>

          <div class="form-group row mb-0">
            <div class="col-md-8 offset-md-2">
              <button type="submit" class="btn btn-primary" :disabled="loading">
                <template v-if="loading">
                  <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </template>
                <template v-else>Submit</template>
              </button>
              <router-link :to="{ name: 'profile' }" class="btn btn-danger">Cancel</router-link>
            </div>
          </div>
        </Form>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "UpdateProfile",
  mounted() {
    this.loggedInUser = { ...this.user };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      errors: "referrals/errors",
      loading: "referrals/loading"
    })
  },
  data() {
    return {
      loggedInUser: null
    };
  },
  methods: {
    ...mapActions({
      UpdateUserProfile: "referrals/UpdateUserProfile"
    }),
    onSubmitHandler() {
      this.UpdateUserProfile(this.loggedInUser);
    }
  }
};
</script>

<style lang="css">
form {
  display: inline;
}
</style>
