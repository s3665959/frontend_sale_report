<template>
  <div class="manage-branch">
    <div class="container">
      <h2 class="text-center my-4">Manage Branches</h2>
      
      <!-- Add New Branch Form -->
      <form @submit.prevent="submitBranch" class="needs-validation mb-5">
        <div class="row g-3">
          <!-- Name -->
          <div class="col-md-4">
            <label for="name" class="form-label">ชื่อสาขา</label>
            <input
              type="text"
              id="name"
              class="form-control"
              v-model="newBranch.name"
              placeholder="Enter branch name"
              required
            />
          </div>
          
          <!-- Address -->
          <div class="col-md-4">
            <label for="address" class="form-label">ที่อยู่</label>
            <input
              type="text"
              id="address"
              class="form-control"
              v-model="newBranch.address"
              placeholder="Enter branch address"
              required
            />
          </div>
          
          <!-- Phone -->
          <div class="col-md-4">
            <label for="phone" class="form-label">เบอร์โทร</label>
            <input
              type="tel"
              id="phone"
              class="form-control"
              v-model="newBranch.phone_number"
              placeholder="Enter phone number"
              required
            />
          </div>
        </div>
        
        <!-- Submit Button -->
        <div class="text-center mt-4">
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? "Update Branch" : "Add Branch" }}
          </button>
        </div>
      </form>
      
      <!-- Branch List -->
      <h3 class="mb-4">Branch List</h3>
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>ชื่อสาขา</th>
              <th>ที่อยู่</th>
              <th>เบอร์โทร</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="branch in branches" :key="branch.id">
              <td>{{ branch.id }}</td>
              <td>{{ branch.name }}</td>
              <td>{{ branch.address }}</td>
              <td>{{ branch.phone_number }}</td>
              <td>
                <button class="btn btn-warning btn-sm" @click="editBranch(branch)">Edit</button>
                <button class="btn btn-danger btn-sm" @click="deleteBranch(branch.id)">Delete</button>
              </td>
            </tr>
            <tr v-if="branches.length === 0">
              <td colspan="5" class="text-center">No branches found.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../config";

export default {
  data() {
    return {
      branches: [],
      newBranch: {
        name: "",
        address: "",
        phone_number: "",
      },
      isEditing: false,
      editingBranchId: null,
    };
  },
  async created() {
    await this.fetchBranches();
  },
  methods: {
    // Fetch all branches
    async fetchBranches() {
      try {
        const response = await fetch(`${API_BASE_URL}/branches`);
        if (response.ok) {
          this.branches = await response.json();
        } else {
          console.error("Failed to fetch branches.");
        }
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    },
    
    // Add or update a branch
    async submitBranch() {
      if (!this.newBranch.name || !this.newBranch.address || !this.newBranch.phone_number) {
        alert("All fields are required.");
        return;
      }

      try {
        const endpoint = this.isEditing
          ? `${API_BASE_URL}/branches/${this.editingBranchId}`
          : `${API_BASE_URL}/branches`;
        const method = this.isEditing ? "PUT" : "POST";

        const response = await fetch(endpoint, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(this.newBranch),
        });

        if (response.ok) {
          alert(this.isEditing ? "Branch updated successfully!" : "Branch added successfully!");
          this.newBranch = { name: "", address: "", phone_number: "" };
          this.isEditing = false;
          this.editingBranchId = null;
          await this.fetchBranches();
        } else {
          const errorData = await response.json();
          alert(`Failed to ${this.isEditing ? "update" : "add"} branch: ${errorData.error || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error submitting branch:", error);
        alert("Error submitting branch. Please try again.");
      }
    },

    // Populate form for editing
    editBranch(branch) {
      this.newBranch = { ...branch };
      this.isEditing = true;
      this.editingBranchId = branch.id;
    },

    // Delete a branch
    async deleteBranch(branchId) {
      if (!confirm("Are you sure you want to delete this branch?")) return;

      try {
        const response = await fetch(`${API_BASE_URL}/branches/${branchId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Branch deleted successfully!");
          await this.fetchBranches();
        } else {
          const errorData = await response.json();
          alert(`Failed to delete branch: ${errorData.error || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error deleting branch:", error);
        alert("Error deleting branch. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
.manage-branch {
  background-color: #f8f9fa;
  padding: 30px 0;
}

h2,
h3 {
  color: #343a40;
}

.table {
  font-size: 0.9rem;
}

.table th,
.table td {
  text-align: center;
}
</style>
