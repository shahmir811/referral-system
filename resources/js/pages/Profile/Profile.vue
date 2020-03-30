<template>
  <div class="container">
    <div class="row">
      <template v-if="!userHasImage">
        <div class="col col-md">
          <h1 class="text-center">Profile</h1>
        </div>
      </template>
      <template v-else>
        <div class="col col-md-10">
          <h1 class="text-center">Profile</h1>
        </div>
        <div class="col col-md-2">
          <img :src="`${imageURL}public/${user.image}`" class="make-round" alt="profile" />
        </div>
      </template>
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
            <label for="staticName" class="col-sm-4 col-form-label">Referral Code</label>
            <div class="col-sm-8">
              <p class="form-control-plaintext" id="staticName">{{ user.token }}</p>
            </div>
          </div>
          <div class="form-group row">
            <label for="staticContactNumber" class="col-sm-4 col-form-label">Contact Number</label>
            <div class="col-sm-8">
              <p
                v-if="user.contact_number"
                class="form-control-plaintext"
                id="staticContactNumber"
              >{{ user.contact_number }}</p>
            </div>
          </div>
          <div class="form-group row">
            <label for="staticAddress" class="col-sm-4 col-form-label">Address</label>
            <div class="col-sm-8">
              <p class="form-control-plaintext" id="staticAddress">{{ user.address }}</p>
            </div>
          </div>
          <div class="form-group row">
            <label for="staticState" class="col-sm-4 col-form-label">State</label>
            <div class="col-sm-8">
              <p class="form-control-plaintext" id="staticState">{{ user.state }}</p>
            </div>
          </div>
          <template v-if="role !== 'free'">
            <div class="form-group row">
              <label for="staticAccountNumber" class="col-sm-4 col-form-label">Account Number</label>
              <div class="col-sm-8">
                <p class="form-control-plaintext" id="staticAccountNumber">{{ user.account_number }}</p>
              </div>
            </div>
            <div class="form-group row">
              <label for="staticBank" class="col-sm-4 col-form-label">Bank</label>
              <div class="col-sm-8">
                <p class="form-control-plaintext" id="staticBank">{{ user.bank }}</p>
              </div>
            </div>
          </template>
        </div>

        <br />
      </div>
      <div class="row justify-content-md-center">
        <div class="col col-md-8">
          <router-link
            :to="{ name: 'update-profile', params: { id: user.id } }"
            class="btn btn-success"
          >Update Profile</router-link>
          <router-link
            :to="{ name: 'update-password', params: { id: user.id } }"
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
      user: "auth/user",
      role: "auth/role",
      userHasImage: "auth/userHasImage",
      imageURL: "imageURL"
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

.make-round {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
</style>
