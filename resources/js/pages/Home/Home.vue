<template>
  <div>
    <div class="jumbotron no-padding">
      <h1 class="display-4 text-center">Ancestor</h1>
      <table class="table table-stripped table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="ancestor">
            <tr>
              <td>{{ ancestor.name }}</td>
              <td>{{ ancestor.email }}</td>
              <td>{{ ancestor.contact_number }}</td>
              <td>{{ ancestor.address }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <template v-if="role == 'free'">
      <p>
        You account is curretly
        <strong>free</strong>. Kindly contact your ancestor to activate your account.
      </p>
      <p>Once you activate your account, you are allowed to send invitations to your friends to join use</p>
    </template>
    <template v-else>
      <div class="row">
        <div class="col-md-12">
          <h3 class="text-center">Referrals - ({{ referrals_count }})</h3>

          <table class="table table-stripped table-hover table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="referrals_count > 0">
                <tr v-for="(record, index) in referrals" :key="record.id">
                  <td>{{ ++index }}</td>
                  <td>{{ record.name }}</td>
                  <td>{{ record.email }}</td>
                  <td>{{ record.contact_number }}</td>
                  <td>{{ record.address }}</td>
                  <td>
                    <template v-if="record.role == 'free'">
                      <a
                        href="#"
                        class="btn btn-sm btn-success"
                        @click.prevent="activateUser(record.id)"
                      >Free</a>
                    </template>
                    <template
                      v-else
                    >{{ record.role.charAt(0).toUpperCase() + record.role.slice(1) }}</template>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      loading: "referrals/loading",
      ancestor: "referrals/ancestor",
      referrals_count: "referrals/referrals_count",
      referrals: "referrals/referrals",
      role: "auth/role"
    })
  },
  methods: {
    ...mapActions({
      activateUserAccount: "referrals/activateUserAccount"
    }),
    activateUser(userId) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, activate it!"
        })
        .then(result => {
          if (result.value) {
            this.activateUserAccount(userId).then(() => {
              this.$swal.fire(
                "Activated!",
                "User has been activated.",
                "success"
              );
            });
          }
        });
    }
  }
};
</script>

<style lang="css">
.no-padding {
  padding: 0;
}

thead th,
tbody td {
  text-align: center;
}
</style>