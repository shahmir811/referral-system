<template>
  <div class="row">
    <div class="col-md-12">
      <h3 class="text-center">Referrals - ({{ pending_referrals_count }})</h3>

      <table class="table table-stripped table-hover table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Invitation Date</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="pending_referrals_count > 0">
            <tr v-for="(record, index) in pending_referrals" :key="record.id">
              <td>{{ ++index }}</td>
              <td>{{ record.email }}</td>
              <td>{{ record.created_at }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Pending-referrals",
  computed: {
    ...mapGetters({
      pending_referrals: "referrals/pending_referrals",
      pending_referrals_count: "referrals/pending_referrals_count"
    })
  }
};
</script>

<style lang="css">
</style>