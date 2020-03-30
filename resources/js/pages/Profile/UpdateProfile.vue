<template>
  <div class="container">
    <div class="row">
      <div class="col col-md">
        <h1 class="text-center">Update Profile</h1>
      </div>
    </div>
    <template v-if="loggedInUser">
      <div class="form-group row">
        <label for="staticReferID" class="col-sm-2 col-form-label">Referral Code</label>
        <div class="col-sm-8">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            id="staticReferID"
            v-model="loggedInUser.token"
          />
        </div>
      </div>
      <div>
        <div class="form-group row">
          <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col-sm-8">
            <input
              type="email"
              class="form-control"
              id="staticEmail"
              v-model="loggedInUser.email"
              :class="{'is-invalid': errors.email }"
            />
            <span class="invalid-feedback" v-if="errors.email">{{ errors.email[0] }}</span>
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
          <div class="form-group row">
            <label for="inputState" class="col-sm-2 col-form-label">State</label>
            <div class="col-sm-8">
              <input
                type="text"
                class="form-control"
                id="inputState"
                v-model="loggedInUser.state"
                :class="{'is-invalid': errors.state }"
              />
              <span class="invalid-feedback" v-if="errors.state">{{ errors.state[0] }}</span>
            </div>
          </div>

          <template v-if="role !== 'free'">
            <div class="form-group row">
              <label for="inputAccountNumber" class="col-sm-2 col-form-label">Account Number</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputAccountNumber"
                  v-model="loggedInUser.account_number"
                  :class="{'is-invalid': errors.account_number }"
                />
                <span
                  class="invalid-feedback"
                  v-if="errors.account_number"
                >{{ errors.account_number[0] }}</span>
              </div>
            </div>

            <div class="form-group row">
              <label for="inputAccountName" class="col-sm-2 col-form-label">Account Name</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputAccountName"
                  v-model="loggedInUser.account_name"
                  :class="{'is-invalid': errors.account_name }"
                />
                <span
                  class="invalid-feedback"
                  v-if="errors.account_name"
                >{{ errors.account_name[0] }}</span>
              </div>
            </div>

            <div class="form-group row">
              <label for="inputBank" class="col-sm-2 col-form-label">Bank</label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputBank"
                  v-model="loggedInUser.bank"
                  :class="{'is-invalid': errors.bank }"
                />
                <span class="invalid-feedback" v-if="errors.bank">{{ errors.bank[0] }}</span>
              </div>
            </div>

            <div class="form-group row">
              <label for="inputImage" class="col-sm-2 col-form-label">Image</label>
              <div class="col-sm-8">
                <input
                  type="file"
                  accept="image/*"
                  class="form-control"
                  id="inputImage"
                  :class="{'is-invalid': errors.image }"
                  @change="imageUpload"
                />
                <span class="invalid-feedback" v-if="errors.image">{{ errors.image[0] }}</span>
              </div>
            </div>
          </template>
          <template v-else></template>

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
    this.removeAllErrors();
    this.loggedInUser = { ...this.user };
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
      role: "auth/role",
      errors: "referrals/errors",
      loading: "referrals/loading"
    })
  },
  data() {
    return {
      loggedInUser: null,
      image: null,
      record: null,
      containsImage: false
    };
  },
  methods: {
    ...mapActions({
      UpdateUserProfile: "referrals/UpdateUserProfile",
      removeAllErrors: "referrals/removeAllErrors"
    }),
    imageUpload(e) {
      this.containsImage = true;
      let image = e.target.files[0];
      this.saveRecords(image);
    },
    saveRecords(comingImage) {
      this.record = new FormData();
      this.record.append("name", this.loggedInUser.name);
      this.record.append("email", this.loggedInUser.email);
      this.record.append(
        "contact_number",
        this.loggedInUser.contact_number ? this.loggedInUser.contact_number : ""
      );
      this.record.append(
        "address",
        this.loggedInUser.address ? this.loggedInUser.address : ""
      );
      this.record.append(
        "state",
        this.loggedInUser.state ? this.loggedInUser.state : ""
      );
      this.record.append(
        "account_number",
        this.loggedInUser.account_number ? this.loggedInUser.account_number : ""
      );
      this.record.append(
        "account_name",
        this.loggedInUser.account_name ? this.loggedInUser.account_name : ""
      );
      this.record.append(
        "bank",
        this.loggedInUser.bank ? this.loggedInUser.bank : ""
      );
      if (this.containsImage) {
        this.record.append("image", comingImage);
      }
    },
    onSubmitHandler() {
      if (!this.containsImage) {
        this.saveRecords(null);
      }
      this.UpdateUserProfile(this.record);
    }
  }
};
</script>

<style lang="css">
form {
  display: inline;
}
</style>
