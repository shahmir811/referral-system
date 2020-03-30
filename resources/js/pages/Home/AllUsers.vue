<template>
  <div class="container">
    <div class="row">
      <template v-if="!loading">
        <div class="col-md-12">
          <h3 class="text-center">All Users - ({{ users_count }})</h3>

          <table class="table table-stripped table-hover table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Address</th>
                <th>Status</th>
                <th>Referred By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <template v-if="users_count > 0">
                <tr v-for="(record, index) in users" :key="record.id">
                  <td>{{ ++index }}</td>
                  <td>{{ record.name }}</td>
                  <td>{{ record.email }}</td>
                  <td>{{ record.contact_number }}</td>
                  <td>{{ record.address }}</td>
                  <td>{{ record.role.charAt(0).toUpperCase() + record.role.slice(1) }}</td>
                  <td>{{ record.referral_name }}</td>
                  <td v-if="record.role != 'admin' ">
                    <router-link
                      :to="{ name: 'user-profile', params: { id: record.id } }"
                      class="btn btn-sm btn-warning"
                    >
                      <i class="fa fa-eye" aria-hidden="true"></i>
                      <span class="white-color">View</span>
                    </router-link>
                    <a
                      href="#"
                      class="btn btn-sm btn-primary"
                      @click.prevent="onClickHandler(record.id)"
                    >
                      <i class="fa fa-caret-square-o-right"></i> Status
                    </a>
                    <router-link
                      :to="{ name: 'new-password', params: { id: record.id } }"
                      class="btn btn-sm btn-secondary"
                    >
                      <i class="fa fa-key"></i> Password
                    </router-link>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AllUsers",
  mounted() {
    this.getAllSystemUsers();
  },
  computed: {
    ...mapGetters({
      users: "referrals/users",
      users_count: "referrals/users_count",
      loading: "referrals/loading"
    })
  },
  methods: {
    ...mapActions({
      getAllSystemUsers: "referrals/getAllSystemUsers",
      changeUserStatus: "referrals/changeUserStatus"
    }),
    onClickHandler(userId) {
      // this.changeUserStatus(id)
      this.$swal
        .fire({
          title: "Are you sure?",
          // text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, change it!"
        })
        .then(result => {
          if (result.value) {
            this.changeUserStatus(userId).then(() => {
              this.$swal.fire(
                "Activated!",
                "User status has been changed.",
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
a.btn-warning i,
.white-color {
  color: white;
}
</style>