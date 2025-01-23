<template>
  <div class="login-page d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow-sm p-4" style="max-width: 400px; width: 100%;">
      <h2 class="text-center mb-4">Login</h2>

      <!-- Login Form -->
      <form v-if="!store.user" @submit.prevent="handleLogin">
        <!-- Username -->
        <div class="mb-3">
          <label for="username" class="form-label">Username</label>
          <input
            type="text"
            id="username"
            class="form-control"
            v-model="form.username"
            placeholder="Enter your username"
            required
          />
        </div>
        <!-- Password -->
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            class="form-control"
            v-model="form.password"
            placeholder="Enter your password"
            required
          />
        </div>
        <!-- Submit Button -->
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Login</button>
        </div>
        <!-- Error Message -->
        <div v-if="error" class="text-danger text-center mt-3">
          {{ error }}
        </div>
      </form>

      <!-- Logout Button -->
      <div v-else class="text-center">
        <p>Welcome back, {{ store.user.username }}!</p>
        <button class="btn btn-danger" @click="handleLogout">Logout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../config";
import { store } from '../store';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      error: null,
      store, // Make the store globally accessible in this component
    };
  },
  methods: {
    async handleLogin() {
      this.error = null;

      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        });

        if (response.ok) {
          const data = await response.json();
          store.setUser(data); // Set user in the global store
          alert(`Login successful! Welcome, ${data.username}`);
          this.$router.push('/submit-sale');
        } else {
          const errorData = await response.json();
          this.error = errorData.error || 'Invalid username or password.';
        }
      } catch (err) {
        console.error(err);
        this.error = 'An error occurred. Please try again later.';
      }
    },
    handleLogout() {
      store.setUser(null); // Clear user in the global store
      alert('You have been logged out.');
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.login-page {
  background-color: #f8f9fa;
}
.card {
  border-radius: 8px;
}
</style>
