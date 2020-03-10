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
                <td>{{ record.role }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      loading: "referrals/loading",
      ancestor: "referrals/ancestor",
      referrals_count: "referrals/referrals_count",
      referrals: "referrals/referrals"
    })
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