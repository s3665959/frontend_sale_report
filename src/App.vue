<template>
  <div id="app">
    <!-- Navigation Bar -->
    <header class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <!-- Logo -->
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img
            src="https://www.nirashabu.com/wp-content/uploads/2024/07/Untitled-1.png"
            alt="Logo"
            class="logo me-2"
          />
          Sales Report
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <!-- Admin Links -->
            <template v-if="isAdmin">
              <li class="nav-item">
                <router-link to="/submit-sale" class="nav-link">Submit Sale</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link">Register</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/branch" class="nav-link">Branch</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/summary" class="nav-link">Summary</router-link>
              </li>
            </template>

            <!-- General Links -->
            <template v-else-if="isLoggedIn">
              <li class="nav-item">
                <router-link to="/submit-sale" class="nav-link">Submit Sale</router-link>
              </li>
            </template>

            <!-- Login Link (Visible Only When Logged Out) -->
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>

            <!-- Logout Button (Visible Only When Logged In) -->
            <li class="nav-item" v-if="isLoggedIn">
              <button class="btn btn-danger nav-link" @click="handleLogout">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mt-4">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3 mt-4">
      <div class="container">
        <p class="mb-0">© Power By APGEN </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { store } from './store';

export default {
  name: 'App',
  computed: {
    user() {
      return store.user;
    },
    isLoggedIn() {
      return !!this.user; // User is logged in if store.user exists
    },
    isAdmin() {
      return this.user?.branch === 'admin'; // User is an admin if branch is 'admin'
    },
  },
  methods: {
    handleLogout() {
      store.setUser(null); // Clear user state in the store
      alert('You have been logged out.');
      this.$router.push('/login'); // Redirect to the login page
    },
  },
};
</script>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f8f9fa;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  flex-shrink: 0;
}

.logo {
  width: 40px;
  height: auto;
}

main {
  flex-grow: 1;
}

footer {
  flex-shrink: 0;
}
</style>
