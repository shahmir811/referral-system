<template>
  <div class="main">
    <h2>Landing Page</h2>
    <div>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque, ipsum voluptatum quisquam minima libero, accusamus magnam quod beatae, est dolores et eaque corrupti voluptas amet aliquid asperiores dicta harum sapiente!</p>
    </div>
    <div>
      <router-link class="btn btn-success btn-lg" to="login">
        <i class="fa fa-sign-in" aria-hidden="true"></i> Login
      </router-link>
      <router-link class="btn btn-secondary btn-lg" to="login">
        <i class="fa fa-user-plus" aria-hidden="true"></i> Register
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Landing"
};
</script>

<style lang="css" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>