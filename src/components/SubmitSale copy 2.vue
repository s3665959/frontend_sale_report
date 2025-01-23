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
              <h5 class="modal-title centered-title" id="confirmationModalLabel">
  ส่งเงินสำหรับ วันที่ {{ formatDate(form.sale_date) }}</h5>


              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p class="current_date"><strong>วันที่:</strong> {{ currentDate }}</p>      
              <h4 class="centered-title"><strong>สาขา:</strong> {{ form.branch }}</h4>
   <br>

   
   <table class="table table-bordered table-hover">
    <thead>
        <tr>
          <th style="text-align: center" class="bg-lightblue">รายได้</th>
          <th style="text-align: center" class="bg-lightblue">จำนวนเงิน</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td style="text-align: center">เงินสด</td>
            <td style="text-align: right; padding-right: 150px;">{{ formatNumber(form.cash) }}</td>
        </tr>
        <tr>
            <td style="text-align: center">เงินโอน</td>
            <td style="text-align: right; padding-right: 150px;">{{ formatNumber(form.transfer) }}</td>
        </tr>
        <tr>
            <td style="text-align: center">บัตรเครดิต</td>
            <td style="text-align: right; padding-right: 150px;">{{ formatNumber(form.credit_card) }}</td>
        </tr>
        <tr>
            <td style="text-align: center">บัตรกำนัล</td>
            <td style="text-align: right; padding-right: 150px;">{{ formatNumber(form.voucher) }}</td>
        </tr>
        <tr>
            <td style="text-align: center">รายได้อื่นๆ</td>
            <td style="text-align: right; padding-right: 150px;">{{ formatNumber(form.other_income) }}</td>
        </tr>
        <tr>
          <th style="text-align: center" class="bg-lightred">รายจ่าย</th>
          <th style="text-align: center" class="bg-lightred">จำนวนเงิน</th>
        </tr>
        <tr>
            <td style="text-align: center">ค่าใช้จ่าย</td>
            <td style="text-align: right; padding-right: 150px;">{{ formatNumber(form.expense) }}</td>
        </tr>
        <tr>
            <td style="text-align: center">ค่าโอน</td>
            <td style="text-align: right; padding-right: 150px;" >{{ formatNumber(form.other_expense) }}</td>
        </tr>
    </tbody>
</table>
  <h5 class="cash-text"><strong>ส่งเงินสด:</strong> {{ formatNumber(form.cash_in_drawer) }}</h5>
  <h5 class="total-text"><strong>รายได้สุทธิ:</strong> {{ formatNumber(total) }}</h5>
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
        sale_date: new Date().toISOString().slice(0, 10), // Default to today

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
    currentDate() {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, "0");
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const year = today.getFullYear();
      return `${day}-${month}-${year}`; // Format as DD-MM-YYYY
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
    formatDate(date) {
    if (!date) return ""; // Handle empty or undefined date
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  },
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

.bg-lightblue {
    background-color: #F0F8FF; /* เปลี่ยนสีตามต้องการ */
  }

.bg-lightred{
  background-color: #fee4e4d4; 

}

.total-text {
 text-align: end;
 color: rgb(15, 11, 236);
 font-weight: 700;

}

.cash-text {
 text-align: end;
color: red;
font-weight: 700;
}
.submit-sale {
  background-color: #f8f9fa;
  padding: 30px 0;
}
.current_date{

  text-align: end;
}


.modal-body{
  font-size: larger;
}
.centered-title {
  text-align: center;
  width: 100%; /* Ensures full-width alignment */
  margin: 0 auto; /* Centers the text horizontally */
}

</style>
