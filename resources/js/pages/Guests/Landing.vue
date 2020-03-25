<template>
  <div class="container-fluid some-more">
    <!-- Masthead -->
    <header class="masthead bg-primary text-white text-center p-0 pb-5rem">
      <div class="container d-flex align-items-center flex-column">
        <!-- Masthead Avatar Image -->
        <img class="masthead-avatar mb-5" src="img/avataaars.svg" alt />

        <!-- Masthead Heading -->
        <h1 class="masthead-heading text-uppercase mb-0">Net Contacts</h1>

        <!-- Icon Divider -->
        <div class="divider-custom divider-light">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon">
            <i class="fas fa-star"></i>
          </div>
          <div class="divider-custom-line"></div>
        </div>

        <!-- Masthead Subheading -->
        <p class="masthead-subheading font-weight-light mb-0">
          Nigerian's one of the first and finest online money making
          platforms.
        </p>
      </div>
      <div>
        <router-link class="btn btn-xl btn-outline-light" to="login">
          <i class="fa fa-sign-in" aria-hidden="true"></i> Login
        </router-link>
        <router-link class="btn btn-xl btn-outline-light" to="register">
          <i class="fa fa-user-plus" aria-hidden="true"></i> Register
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "Landing"
};
</script>

<style lang="css" scoped>
@import "~/css/all.css";
/* @import "~/css/all.min.css"; */
@import "~/css/freelancer.min.css";

.some-more {
  margin-top: -50px;
  padding: 0;
}

.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.p-0 {
  padding: 0;
}

.pb-5rem {
  padding-bottom: 2rem !important;
}
</style>
