<template>
  <div>
    <Alert v-if="message" />
    <Navigation />
    <template v-if="user_verified">
      <router-view></router-view>
    </template>

    <template v-else>
      <NotVerified />
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
      user_verified: "auth/user_verified"
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