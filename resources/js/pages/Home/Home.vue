<template>
  <div v-if="isAuthenticated" class="container">
    <template v-if="role == 'free'">
      <p>
        <strong>WELCOME TO NETCONTACTS NIGERIA!</strong> You’re being referred to NetContacts Nigeria by
        <strong>{{ user.referral_name }}</strong>. Currently your account is a FREE MEMBERSHIP and you cannot carry out the below listed activities until your account is activated as Paid Membership:
      </p>
      <ul>
        <li>You cannot invite anyone to join NetContacts, which means you cannot get paid by anyone.</li>
        <li>You cannot have your unique Invitation Code (IC) to use to invite people.</li>
        <li>You cannot upload your Bank Account details for people to pay into your account.</li>
        <li>You cannot upload your Photo picture and Contact details.</li>
        <li>You cannot have access to promotional page.</li>
      </ul>
      <p>
        To have full access as PAID MEMBERSHIP, kindly activate your account by paying ₦ 2,500 (Two Thousand Five Hundred Naira only) into
        <strong>{{ user.referral_name }}</strong> bank account details.
      </p>
      <p>
        <a href="#" data-toggle="modal" data-target="#showDetails">CLICK HERE</a>
        to view details of {{ user.referral_name }}
      </p>
      <p>
        <strong>PLEASE NOTE:</strong>
        Only {{ user.referral_name }} can activate your account.
      </p>

      <!-- Modal -->
      <div
        class="modal fade"
        id="showDetails"
        tabindex="-1"
        role="dialog"
        aria-labelledby="showDetailsLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-center" id="exampleModalLabel">Referral Person details</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group row">
                    <label for="staticName" class="col-sm-4 col-form-label">Name</label>
                    <div class="col-sm-8">
                      <p class="form-control-plaintext" id="staticName">{{ ancestor.name }}</p>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="staticName" class="col-sm-4 col-form-label">Phone</label>
                    <div class="col-sm-8">
                      <p
                        class="form-control-plaintext"
                        id="staticName"
                      >{{ ancestor.contact_number }}</p>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="staticName" class="col-sm-4 col-form-label">Bank</label>
                    <div class="col-sm-8">
                      <p class="form-control-plaintext" id="staticName">{{ ancestor.bank }}</p>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="staticName" class="col-sm-4 col-form-label">Account Name</label>
                    <div class="col-sm-8">
                      <p class="form-control-plaintext" id="staticName">{{ ancestor.account_name }}</p>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="staticName" class="col-sm-4 col-form-label">Account Number</label>
                    <div class="col-sm-8">
                      <p
                        class="form-control-plaintext"
                        id="staticName"
                      >{{ ancestor.account_number }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal ends here -->
    </template>
    <template v-else>
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
                <th>Registration Date</th>
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
                  <td>{{ record.created_at }}</td>
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
      role: "auth/role",
      user: "auth/user",
      isAuthenticated: "auth/isAuthenticated"
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