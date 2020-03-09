<template>
  <div>
    <Navigation />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  name: "App",
  components: {
    Navigation
  }
};
</script>

<style lang="css">
</style>