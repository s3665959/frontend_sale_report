<template>
    <div class="add-branch">
      <div class="container">
        <h2 class="text-center my-4">Add New Branch</h2>
        <form @submit.prevent="submitBranch" class="needs-validation">
          <!-- Name -->
          <div class="mb-3">
            <label for="name" class="form-label">ชื่อสาขา</label>
            <input
              type="text"
              id="name"
              class="form-control"
              v-model="branch.name"
              placeholder="Enter branch name"
              required
            />
          </div>
  
          <!-- Address -->
          <div class="mb-3">
            <label for="address" class="form-label">ที่อยู่</label>
            <textarea
              id="address"
              class="form-control"
              v-model="branch.address"
              placeholder="Enter branch address"
              rows="3"
              required
            ></textarea>
          </div>
  
          <!-- Phone Number -->
          <div class="mb-3">
            <label for="phone" class="form-label">เบอร์โทร</label>
            <input
              type="tel"
              id="phone"
              class="form-control"
              v-model="branch.phone_number"
              placeholder="Enter phone number"
              required
            />
          </div>
  
          <!-- Submit Button -->
          <div class="text-center mt-4">
            <button type="submit" class="btn btn-primary btn-lg">
              เพิ่มสาขา
            </button>
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
        branch: {
          name: '',
          address: '',
          phone_number: '',
        },
      };
    },
    methods: {
      async submitBranch() {
        // Validate form data
        if (!this.branch.name || !this.branch.address || !this.branch.phone_number) {
          alert('All fields are required.');
          return;
        }
  
        try {
          // Submit data to the backend
          
          const response = await fetch(`${API_BASE_URL}/branches`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.branch),
          });
  
          if (response.ok) {
            alert('Branch added successfully!');
            // Reset the form
            this.branch = {
              name: '',
              address: '',
              phone_number: '',
            };
          } else {
            const errorData = await response.json();
            alert(`Failed to add branch: ${errorData.error || 'Unknown error'}`);
          }
        } catch (error) {
          console.error('Error adding branch:', error);
          alert('Error adding branch. Please try again.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .add-branch {
    background-color: #f8f9fa;
    padding: 30px 0;
  }
  
  h2 {
    color: #343a40;
  }
  
  form {
    max-width: 600px;
    margin: auto;
  }
  </style>
  