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

        <!-- Earnings Section -->
        <div class="mt-4">
          <h5>Earnings</h5>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="cash" class="form-label">เงินสด</label>
              <input
                type="number"
                id="cash"
                class="form-control"
                v-model.number="form.cash"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="transfer" class="form-label">โอนเข้าบัญชี</label>
              <input
                type="number"
                id="transfer"
                class="form-control"
                v-model.number="form.transfer"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="creditCard" class="form-label">บัตรเครดิต</label>
              <input
                type="number"
                id="creditCard"
                class="form-control"
                v-model.number="form.credit_card"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="voucher" class="form-label">บัตรกำนัล</label>
              <input
                type="number"
                id="voucher"
                class="form-control"
                v-model.number="form.voucher"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="otherIncome" class="form-label">รายได้อื่นๆ</label>
              <input
                type="number"
                id="otherIncome"
                class="form-control"
                v-model.number="form.other_income"
                required
              />
            </div>
          </div>
        </div>

        <!-- Expense Section -->
        <div class="mt-4">
          <h5>Expenses</h5>
          <div class="row g-3">
            <div class="col-md-6">
              <label for="expense" class="form-label">ค่าใช้จ่าย</label>
              <input
                type="number"
                id="expense"
                class="form-control"
                v-model.number="form.expense"
                required
              />
            </div>
            <div class="col-md-6">
              <label for="otherExpense" class="form-label">ค่าโอน</label>
              <input
                type="number"
                id="otherExpense"
                class="form-control"
                v-model.number="form.other_expense"
                required
              />
            </div>
        
          </div>
        </div>

            <div class="mt-4">
          <h5>คงเหลือเงินสด</h5>
          <div class="row g-3">
            <div class="col-md-6">
              <input
                type="number"
                id="cashInDrawer"
                class="form-control"
                v-model.number="form.cash_in_drawer"
                required
              />
            </div>
          </div>
        </div>

        <!-- Total Section -->
        <div class="mt-4">
          <h5>รวมยอดคงเหลือ</h5>
          <div class="row g-3">
            <div class="col-md-6">
  
              <input
                type="number"
                id="total"
                class="form-control"
                :value="total"
                readonly
              />
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="text-center mt-4">
          <button type="submit" class="btn btn-success btn-lg">
            Submit
          </button>
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
              <h5 class="modal-title" id="confirmationModalLabel">Confirm Sale Details</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
  <p><strong>สาขา:</strong> {{ form.branch }}</p>
  <p><strong>เงินสด:</strong> {{ formatNumber(form.cash) }}</p>
  <p><strong>เงินโอน:</strong> {{ formatNumber(form.transfer) }}</p>
  <p><strong>บัตรเครดิต:</strong> {{ formatNumber(form.credit_card) }}</p>
  <p><strong>บัตรกำนัล:</strong> {{ formatNumber(form.voucher) }}</p>
  <p><strong>รายได้อื่นๆ:</strong> {{ formatNumber(form.other_income) }}</p>
  <p><strong>ค่าใช้จ่าย:</strong> {{ formatNumber(form.expense) }}</p>
  <p><strong>ค่าโอน:</strong> {{ formatNumber(form.other_expense) }}</p>
  <h5 class="total-text"><strong>คงเหลือเงินสด:</strong> {{ formatNumber(form.cash_in_drawer) }}</h5>
  <h5 class="total-text"><strong>รวมยอดคงเหลือ:</strong> {{ formatNumber(total) }}</h5>
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
              <!-- Share and Save Buttons -->
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
  },
  watch: {
    // Watch cash, expense, and other_expense to recalculate cash_in_drawer
    form: {
      handler() {
        this.form.cash_in_drawer =
          this.form.cash - this.form.expense - this.form.other_expense;
      },
      deep: true,
    },
  },
  mounted() {
    const modalElement = document.getElementById("confirmationModal");
    modalElement.addEventListener("hidden.bs.modal", this.resetForm); // Reset form on modal close
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.branch) {
      this.form.branch = user.branch;
    } else {
      alert("You must log in first.");
      this.$router.push("/");
    }
  },
  methods: {
    formatNumber(value) {
      if (typeof value !== "number") return value; // Return the value if it's not a number
      return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
          this.showShareButtons = true; // Show Share and Save buttons
        } else {
          alert("Submission failed!");
        }
      } catch (error) {
        console.error("Error submitting sale:", error);
      }
    },
    resetForm() {
      this.form = {
        branch: this.form.branch, // Preserve branch
        cash: 0,
        transfer: 0,
        credit_card: 0,
        voucher: 0,
        other_income: 0,
        expense: 0,
        other_expense: 0,
        cash_in_drawer: 0,
      };
      this.showShareButtons = false;
    },
    shareModalToLine() {
      html2canvas(document.getElementById("modalContent")).then((canvas) => {
        const lineUrl = `https://line.me/R/share?text=${encodeURIComponent(
          canvas.toDataURL()
        )}`;
        window.open(lineUrl, "_blank");
      });
    },
    saveModalAsImage() {
      html2canvas(document.getElementById("modalContent")).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "sale_summary.png";
        link.click();
      });
    },
  },

};
</script>

<style scoped>
.total-text {
 text-align: end;
 text-decoration: underline;
}
.submit-sale {
  background-color: #f8f9fa;
  padding: 30px 0;
}

</style>
