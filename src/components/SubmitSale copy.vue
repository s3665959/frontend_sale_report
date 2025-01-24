<template>
  <div class="submit-sale">
    <div class="container">
      <h2 class="text-center my-4">Submit Daily Sale</h2>
      <form @submit.prevent="showConfirmationModal" class="needs-validation">
        <!-- Branch Section -->
        <div class="row g-3">
          <div class="col-md-6">
            <label for="branch" class="form-label">สาขา</label>
            <input
              type="text"
              id="branch"
              class="form-control"
              v-model="form.branch"
              readonly
            />
          </div>
        </div>

        <!-- Sale Date Section -->
        <div class="row g-3 mt-4">
          <div class="col-md-6">
            <label for="saleDate" class="form-label">Sale Date</label>
            <input
              type="date"
              id="saleDate"
              class="form-control"
              v-model="form.sale_date"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="actualSales" class="form-label">Actual Sales</label>
            <input
              type="number"
              id="actualSales"
              class="form-control"
              v-model.number="form.actual_sales"
              required
            />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center mt-4">
          <button type="submit" class="btn btn-success btn-lg">Submit</button>
        </div>
      </form>

      <!-- Confirmation Modal -->
      <div
        class="modal fade"
        id="confirmationModal"
        tabindex="-1"
        aria-labelledby="confirmationModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content" id="modalContent">
            <div class="modal-header">
              <h5 class="modal-title centered-title" id="confirmationModalLabel">
                ส่งเงินสำหรับ วันที่ {{ formatDate(form.sale_date) }}
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p><strong>สาขา:</strong> {{ form.branch }}</p>
              <p><strong>Actual Sales:</strong> {{ formatNumber(form.actual_sales) }}</p>
              <p><strong>Total:</strong> {{ formatNumber(total) }}</p>
              <p v-if="salesMatchStatus === 'matched'" class="text-success">
                Sales Check: Matched!
              </p>
              <p v-else-if="salesMatchStatus" class="text-danger">
                Sales Check: Not matched by {{ formatNumber(salesDifference) }}
              </p>

              <!-- Table of Sales Details -->
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th class="bg-lightblue">รายได้</th>
                    <th class="bg-lightblue text-end">จำนวนเงิน</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>เงินสด</td>
                    <td class="text-end">{{ formatNumber(form.cash) }}</td>
                  </tr>
                  <tr>
                    <td>เงินโอน</td>
                    <td class="text-end">{{ formatNumber(form.transfer) }}</td>
                  </tr>
                  <tr>
                    <td>บัตรเครดิต</td>
                    <td class="text-end">{{ formatNumber(form.credit_card) }}</td>
                  </tr>
                  <tr>
                    <td>บัตรกำนัล</td>
                    <td class="text-end">{{ formatNumber(form.voucher) }}</td>
                  </tr>
                  <tr>
                    <td>รายได้อื่นๆ</td>
                    <td class="text-end">{{ formatNumber(form.other_income) }}</td>
                  </tr>
                  <tr>
                    <th class="bg-lightred">รายจ่าย</th>
                    <th class="bg-lightred text-end">จำนวนเงิน</th>
                  </tr>
                  <tr>
                    <td>ค่าใช้จ่าย</td>
                    <td class="text-end">{{ formatNumber(form.expense) }}</td>
                  </tr>
                  <tr>
                    <td>ค่าโอน</td>
                    <td class="text-end">{{ formatNumber(form.other_expense) }}</td>
                  </tr>
                </tbody>
              </table>

              <h5 class="cash-text">
                <strong>ส่งเงินสด:</strong> {{ formatNumber(form.cash_in_drawer) }}
              </h5>
              <h5 class="total-text">
                <strong>รายได้สุทธิ:</strong> {{ formatNumber(total) }}
              </h5>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                v-if="!showShareButtons"
                type="button"
                class="btn btn-success"
                @click="submitSale"
              >
                Confirm and Submit
              </button>
              <button
                v-if="showShareButtons"
                class="btn btn-primary me-2"
                @click="shareModalToLine"
              >
                Share to LINE
              </button>
              <button
                v-if="showShareButtons"
                class="btn btn-success"
                @click="saveModalAsImage"
              >
                Save to Phone
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API_BASE_URL } from "../config";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      form: {
        branch: "",
        cash: 0,
        transfer: 0,
        credit_card: 0,
        voucher: 0,
        other_income: 0,
        expense: 0,
        other_expense: 0,
        cash_in_drawer: 0, // Will be computed dynamically
        sale_date: new Date().toISOString().slice(0, 10), // Default to today
        actual_sales: 0,
      },
      showShareButtons: false,
    };
  },
  computed: {
    total() {
      return (
        this.form.cash +
        this.form.transfer +
        this.form.credit_card +
        this.form.voucher +
        this.form.other_income -
        this.form.expense -
        this.form.other_expense
      );
    },
    salesDifference() {
      return Math.abs(this.form.actual_sales - this.total);
    },
    salesMatchStatus() {
      if (this.form.actual_sales === 0) return null; // No input yet
      return this.form.actual_sales === this.total ? "matched" : "not_matched";
    },
  },
  methods: {
    formatNumber(value) {
      return value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    },
    formatDate(date) {
      if (!date) return ""; // Handle empty or undefined date
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    showConfirmationModal() {
      const modalElement = document.getElementById("confirmationModal");
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show();
    },
    async submitSale() {
      try {
        const response = await fetch(`${API_BASE_URL}/daily-sale`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...this.form, total: this.total }),
        });
        if (response.ok) {
          alert("Daily sale submitted successfully!");
          this.showShareButtons = true;
        } else {
          alert("Submission failed!");
        }
      } catch (error) {
        console.error("Error submitting sale:", error);
      }
    },
  },
};
</script>

<style scoped>
.bg-lightblue {
  background-color: #f0f8ff;
}
.bg-lightred {
  background-color: #f7ddddd4;
}
.text-success {
  font-weight: bold;
}
.text-danger {
  font-weight: bold;
}
.cash-text {
  text-align: end;
  color: red;
  font-weight: bold;
}
.total-text {
  text-align: end;
  color: rgb(15, 11, 236);
  font-weight: bold;
}
.amount-column {
  text-align: right;
}
</style>
