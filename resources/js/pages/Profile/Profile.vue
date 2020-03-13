<template>
  <div>
    <div class="row">
      <div class="col col-md">
        <h1 class="text-center">Profile</h1>
      </div>
    </div>

    <template v-if="user">
      <div class="row justify-content-md-center">
        <div class="col col-md-8">
          <div class="form-group row">
            <label for="staticEmail" class="col-sm-4 col-form-label">Email</label>
            <div class="col-sm-8">
              <p class="form-control-plaintext" id="staticEmail">{{ user.email }}</p>
            </div>
          </div>
          <div class="form-group row">
            <label for="staticName" class="col-sm-4 col-form-label">Name</label>
            <div class="col-sm-8">
              <p class="form-control-plaintext" id="staticName">{{ user.name }}</p>
            </div>
          </div>
          <div class="form-group row">
            <label for="staticContactNumber" class="col-sm-4 col-form-label">Contact Number</label>
            <div class="col-sm-8">
              <p class="form-control-plaintext" id="staticContactNumber">{{ user.contact_number }}</p>
            </div>
          </div>
          <div class="form-group row">
            <label for="staticAddress" class="col-sm-4 col-form-label">Address</label>
            <div class="col-sm-8">
              <p class="form-control-plaintext" id="staticAddress">{{ user.address }}</p>
            </div>
          </div>
        </div>

        <br />
      </div>
      <div class="row justify-content-md-center">
        <div class="col col-md-8">
          <router-link
            :to="{ name: 'update-profile', params: { token: user.token } }"
            class="btn btn-success"
          >Update Profile</router-link>
          <router-link
            :to="{ name: 'update-password', params: { token: user.token } }"
            class="btn btn-success"
          >Update Password</router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters({
      user: "auth/user"
    })
  },
  data() {
    return {
      modalShow: false
    };
  }
};
</script>

<style lang="css">
label {
  font-weight: bold;
}
</style>
