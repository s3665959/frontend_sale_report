<template>
  <div class="register-page d-flex align-items-center justify-content-center vh-100 bg-light">
    <div class="card shadow-sm p-4" style="max-width: 700px; width: 100%;">
      <h2 class="text-center mb-4">ลงทะเบียน</h2>

      <!-- Registration Form -->
      <form @submit.prevent="handleRegister">
        <div class="row">
          <!-- Username -->
          <div class="col-md-6 mb-3">
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
          <div class="col-md-6 mb-3">
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
          <div class="col-md-6 mb-3">
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
          <div class="col-md-6 mb-3">
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
        </div>

        <!-- Submit Button -->
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">{{ isEditing ? "Update User" : "ลงทะเบียน" }}</button>
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

      <!-- Users Table -->
      <div class="mt-5">
        <h3 class="text-center">User List</h3>
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Branch</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.branch }}</td>
                <td>
                  <button class="btn btn-warning btn-sm" @click="editUser(user)">Edit</button>
                  <button class="btn btn-danger btn-sm" @click="deleteUser(user.id)">Delete</button>
                </td>
              </tr>
              <tr v-if="users.length === 0">
                <td colspan="4" class="text-center">No users found.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
        confirmPassword: "",
        branch: "",
      },
      branches: [], // List of branches
      users: [], // List of users
      error: null,
      success: null,
      isEditing: false,
      editingUserId: null,
    };
  },
  async created() {
    await this.fetchBranches();
    await this.fetchUsers();
  },
  methods: {
    // Fetch branches
    async fetchBranches() {
      try {
        const response = await fetch(`${API_BASE_URL}/branches`);
        if (response.ok) {
          this.branches = await response.json();
        } else {
          console.error("Failed to fetch branches.");
        }
      } catch (err) {
        console.error("Error fetching branches:", err);
      }
    },

    // Fetch users
    async fetchUsers() {
      try {
        const response = await fetch(`${API_BASE_URL}/users`);
        if (response.ok) {
          this.users = await response.json();
        } else {
          console.error("Failed to fetch users.");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    },

    // Register or update user
    async handleRegister() {
      this.error = null;
      this.success = null;

      if (this.form.password !== this.form.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }

      try {
        const endpoint = this.isEditing
          ? `${API_BASE_URL}/users/${this.editingUserId}`
          : `${API_BASE_URL}/register`;
        const method = this.isEditing ? "PUT" : "POST";

        const response = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.form),
        });

        if (response.ok) {
          this.success = this.isEditing
            ? "User updated successfully!"
            : "Registration successful!";
          this.form = { username: "", password: "", confirmPassword: "", branch: "" };
          this.isEditing = false;
          this.editingUserId = null;
          await this.fetchUsers();
        } else {
          const data = await response.json();
          this.error = data.error || "Failed to register.";
        }
      } catch (err) {
        console.error(err);
        this.error = "An error occurred. Please try again later.";
      }
    },

    // Edit user
    editUser(user) {
      this.form = { username: user.username, password: "", confirmPassword: "", branch: user.branch };
      this.isEditing = true;
      this.editingUserId = user.id;
    },

    // Delete user
    async deleteUser(userId) {
      if (!confirm("Are you sure you want to delete this user?")) return;

      try {
        const response = await fetch(`${API_BASE_URL}/users/${userId}`, { method: "DELETE" });
        if (response.ok) {
          alert("User deleted successfully!");
          await this.fetchUsers();
        } else {
          console.error("Failed to delete user.");
        }
      } catch (err) {
        console.error("Error deleting user:", err);
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
