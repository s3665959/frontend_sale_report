<template>
  <div class="register-page d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow-sm p-4" style="max-width: 500px; width: 100%;">
      <h2 class="text-center mb-4">ลงทะเบียน</h2>
      <form @submit.prevent="handleRegister">
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
        <!-- Confirm Password -->
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            class="form-control"
            v-model="form.confirmPassword"
            placeholder="Confirm your password"
            required
          />
        </div>
        <!-- Branch Selection -->
        <div class="mb-3">
          <label for="branch" class="form-label">สาขา</label>
          <select
            id="branch"
            class="form-select"
            v-model="form.branch"
            required
          >
            <option disabled value="">เลือกสาขา</option>
            <option v-for="branch in branches" :key="branch.id" :value="branch.name">
              {{ branch.name }}
            </option>
          </select>
        </div>
        <!-- Submit Button -->
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">ลงทะเบียน</button>
        </div>
        <!-- Error Message -->
        <div v-if="error" class="text-danger text-center mt-3">
          {{ error }}
        </div>
        <!-- Success Message -->
        <div v-if="success" class="text-success text-center mt-3">
          {{ success }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../config";
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        branch: '',
      },
      branches: [], // Updated to dynamically fetch from backend
      error: null,
      success: null,
    };
  },
  async created() {
    try {
      // Fetch branches from the backend
      const response = await fetch(`${API_BASE_URL}/branches`);
      if (response.ok) {
        const data = await response.json();
        this.branches = data;
      } else {
        console.error('Failed to fetch branches.');
      }
    } catch (err) {
      console.error('Error fetching branches:', err);
    }
  },
  methods: {
    async handleRegister() {
      this.error = null;
      this.success = null;

      // Validate form
      if (this.form.password !== this.form.confirmPassword) {
        this.error = 'Passwords do not match.';
        return;
      }

      try {
        // Submit registration data to backend
        const response = await fetch(`${API_BASE_URL}/register`, {
  

          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form),
        });

        if (response.ok) {
          this.success = 'Registration successful!';
          this.form = {
            username: '',
            password: '',
            confirmPassword: '',
            branch: '',
          };
        } else {
          const data = await response.json();
          this.error = data.error || 'Failed to register.';
        }
      } catch (err) {
        console.error(err);
        this.error = 'An error occurred. Please try again later.';
      }
    },
  },
};
</script>

<style scoped>
.register-page {
  background-color: #f8f9fa;
}
.card {
  border-radius: 8px;
}
</style>
