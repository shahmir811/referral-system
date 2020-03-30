<template>
  <div class="container" v-if="user">
    <div class="row">
      <template v-if="!user.image">
        <div class="col col-md">
          <h1 class="text-center">Profile</h1>
        </div>
      </template>
      <template v-else>
        <div class="col col-md-10">
          <h1 class="text-center">Profile</h1>
        </div>
        <div class="col col-md-2">
          <img :src="`${imageURL}profile/${user.image}`" class="make-round" alt="profile" />
        </div>
      </template>
    </div>

    <br />

    <div class="row justify-content-md-center">
      <div class="col col-md-10">
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
          <label for="staticInvitedBy" class="col-sm-4 col-form-label">Invited By</label>
          <div class="col-sm-8">
            <p class="form-control-plaintext" id="staticInvitedBy">{{ user.referral_name }}</p>
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
        <div class="form-group row">
          <label for="staticAccountNumber" class="col-sm-4 col-form-label">Account Number</label>
          <div class="col-sm-8">
            <p class="form-control-plaintext" id="staticAccountNumber">{{ user.account_number }}</p>
          </div>
        </div>
        <div class="form-group row">
          <label for="staticAccountName" class="col-sm-4 col-form-label">Account Name</label>
          <div class="col-sm-8">
            <p class="form-control-plaintext" id="staticAccountName">{{ user.account_name }}</p>
          </div>
        </div>
        <div class="form-group row">
          <label for="staticBank" class="col-sm-4 col-form-label">Bank</label>
          <div class="col-sm-8">
            <p class="form-control-plaintext" id="staticBank">{{ user.bank }}</p>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-8">
            <router-link :to="{ name: 'all-users' }" class="btn btn-success btn-lg">
              <i class="fa fa-users" aria-hidden="true"></i> All Users
            </router-link>
          </div>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "User-Profile",
  mounted() {
    this.getUserRecord(this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      user: "referrals/selectedUser",
      imageURL: "imageURL"
    })
  },
  methods: {
    ...mapActions({
      userRecord: "referrals/userRecord"
    }),
    getUserRecord(id) {
      this.userRecord(id);
    }
  }
};
</script>

<style lang="css" scoped>
.make-round {
  height: 100px;
  width: 100px;
  border-radius: 50%;
}
</style>
