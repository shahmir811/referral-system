<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm mb-50">
      <router-link class="navbar-brand" :to="{ name: 'landing' }">Connect People</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Left Side Of Navbar -->
        <ul class="navbar-nav mr-auto"></ul>

        <!-- Right Side Of Navbar -->
        <ul class="navbar-nav ml-auto">
          <!-- Authentication Links -->

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'how-it-works' }">How It Woks</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'aboutUs' }">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'faq' }">FAQ</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'how-to-promote' }">How to Promote</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'contactUs' }">Contact Us</router-link>
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
          </li>

          <template v-if="isAuthenticated">
            <li class="nav-item dropdown">
              <a
                id="navbarDropdown"
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                v-pre
              >
                Shahmir
                <span class="caret"></span>
              </a>

              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Logout</a>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapGetters({
      isAuthenticated: "auth/isAuthenticated"
    })
  }
};
</script>

<style lang="css">
.dropdown-menu {
  left: -61px;
}

.mb-50 {
  margin-bottom: 50px;
}
</style>