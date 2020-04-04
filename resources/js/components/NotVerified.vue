<template>
  <div class="container">
    <div class="card">
      <div class="card-header">Verify your email address</div>
      <div class="card-body">
        <h5 class="card-title">Verification needed</h5>
        <p class="card-text">
          Before proceeding, please check your email for a verification link. If you did not receive the email,
          <a
            href="#"
            v-if="!loading"
            @click.prevent="sendVerificationCode"
          >
            <strong>click here to request another</strong>
          </a>
        </p>
        <div class="spinner-border" role="status" v-if="loading">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NotVerified",
  computed: {
    ...mapGetters({
      loading: "auth/loading"
    })
  },
  methods: {
    ...mapActions({
      sendVerificationCode: "auth/sendVerificationCode"
    })
  }
};
</script>

<style lang="css" scoped>
</style>