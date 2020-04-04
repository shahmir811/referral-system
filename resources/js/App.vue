<template>
  <div>
    <Alert v-if="message" />
    <Navigation />

    <!-- For Guest routes -->
    <template v-if="!user">
      <router-view></router-view>
    </template>

    <!-- For LoggedIn routes -->
    <template v-else>
      <!-- If user email is verified -->
      <template v-if="user_verified == 1">
        <router-view></router-view>
      </template>

      <!-- If user email is not verified -->
      <template v-else>
        <NotVerified />
      </template>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Navigation from "./components/Navigation.vue";
import Alert from "./components/Alert.vue";
import NotVerified from "./components/NotVerified";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      message: "message",
      user_verified: "auth/user_verified",
      user: "auth/user"
    })
  },
  components: {
    Alert,
    Navigation,
    NotVerified
  }
};
</script>

<style lang="css">
</style>