<template>
  <div>
    <Alert v-if="message" />
    <Navigation />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

import Navigation from "./components/Navigation.vue";
import Alert from "./components/Alert.vue";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      message: "message"
    })
  },
  components: {
    Alert,
    Navigation
  }
};
</script>

<style lang="css">
</style>