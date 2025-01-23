<template>
    <div class="summary-page">
      <div class="container">
        <h2 class="text-center my-4">Sales Summary</h2>
  
        <!-- Filters -->
        <div class="row mb-4">
          <!-- Branch Filter -->
          <div class="col-md-6">
            <label for="branchFilter" class="form-label">Filter by Branch</label>
            <select
              id="branchFilter"
              class="form-select"
              v-model="selectedBranch"
              @change="filterSales"
            >
              <option value="">All Branches</option>
              <option v-for="branch in branches" :key="branch" :value="branch">
                {{ branch }}
              </option>
            </select>
          </div>
  
          <!-- Date Filter -->
          <div class="col-md-6">
            <label for="dateFilter" class="form-label">Filter by Date</label>
            <input
              type="date"
              id="dateFilter"
              class="form-control"
              v-model="selectedDate"
              @change="filterSales"
            />
          </div>
        </div>
  
        <!-- Sales Table -->
        <div class="table-responsive">
          <table class="table table-striped table-bordered">
            <thead class="table-dark">
              <tr>
                <th>ID</th>
                <th>สาขา</th>
                <th>Time and Date</th>
                <th>เงินสด</th>
                <th>เงินโอน</th>
                <th>บัตรเครดิต</th>
                <th>บัตรกำนัล</th>
                <th>รายได้อื่นๆ</th>
                <th>ค่าใช้จ่าย</th>
                <th>ค่าโอน</th>
                <th>คงเหลือเงินสด</th>
                <th>รวมยอดคงเหลือ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="sale in filteredSales" :key="sale.id">
                <td>{{ sale.id }}</td>
                <td>{{ sale.branch }}</td>
                <td>{{ formatTimeDate(sale.time_date) }}</td>
                <td>{{ sale.cash }}</td>
                <td>{{ sale.transfer }}</td>
                <td>{{ sale.credit_card }}</td>
                <td>{{ sale.voucher }}</td>
                <td>{{ sale.other_income }}</td>
                <td>{{ sale.expense }}</td>
                <td>{{ sale.other_expense }}</td>
                <td>{{ sale.cash_in_drawer }}</td>
                <td>{{ sale.total }}</td>
              </tr>
              <tr v-if="filteredSales.length === 0">
                <td colspan="12" class="text-center">No sales found.</td>
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
        sales: [], // All sales data
        branches: [], // Unique branches for the filter
        selectedBranch: '', // Selected branch for filtering
        selectedDate: '', // Selected date for filtering
        filteredSales: [], // Filtered sales based on branch and date
      };
    },
    async created() {
      await this.fetchSales();
    },
    methods: {
      // Fetch sales data from the backend
      async fetchSales() {
  try {
    const response = await fetch(`${API_BASE_URL}/sales`);
    if (response.ok) {
      const data = await response.json();
      console.log('Fetched sales:', data); // Log the sales data for debugging
      this.sales = data;
      this.filteredSales = data; // Initialize filteredSales with all data
      this.branches = [...new Set(data.map((sale) => sale.branch))]; // Extract unique branches
    } else {
      console.error('Failed to fetch sales.');
    }
  } catch (error) {
    console.error('Error fetching sales:', error);
  }
},

      // Filter sales based on branch and date
      filterSales() {
        this.filteredSales = this.sales.filter((sale) => {
          const matchesBranch =
            !this.selectedBranch || sale.branch === this.selectedBranch;
          const matchesDate =
            !this.selectedDate ||
            sale.time_date.startsWith(this.selectedDate); // Match date prefix
          return matchesBranch && matchesDate;
        });
      },
      // Format time_date as dd/MM/YYYY HH:mm
      formatTimeDate(datetime) {
  if (!datetime) {
    return 'N/A'; // Return a fallback if `time_date` is missing
  }
  try {
    const dateObj = new Date(datetime); // Parse the ISO string
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, '0');
    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch (error) {
    console.error('Error formatting time_date:', datetime, error);
    return 'Invalid Date'; // Fallback if parsing fails
  }
},

    },
  };
  </script>
  
  <style scoped>
  .summary-page {
    background-color: #f8f9fa;
    padding: 30px 0;
  }
  
  h2 {
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
  