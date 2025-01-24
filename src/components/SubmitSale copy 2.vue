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
        <br>

         <!-- actual Sales -->
             <div class="mt-4">
          <h5>ยอดขายรวม</h5>
          <div class="row g-3">
            <div class="col-md-6 d-flex align-items-center">
              <label for="actualSales" class="form-label me-2 flex-label">รายได้สุทธิ:</label>
              <input
              type="number"
              id="actualSales"
              class="form-control"
              v-model.number="form.actual_sales"
              required
            />
            </div>



          </div>
        </div>

               <!-- Earnings Section -->
               <div class="mt-4">
          <h5>Earnings</h5>
          <div class="row g-3">
            <div class="col-md-6 d-flex align-items-center">
              <label for="cash" class="form-label me-2 flex-label">เงินสด:</label>
              <input
                type="number"
                id="cash"
                class="form-control flex-input"
                v-model.number="form.cash"
                required
              />
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <label for="transfer" class="form-label me-2 flex-label">โอนเข้าบัญชี:</label>
              <input
                type="number"
                id="transfer"
                class="form-control flex-input"
                v-model.number="form.transfer"
                required
              />
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <label for="creditCard" class="form-label me-2 flex-label">บัตรเครดิต:</label>
              <input
                type="number"
                id="creditCard"
                class="form-control flex-input"
                v-model.number="form.credit_card"
                required
              />
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <label for="voucher" class="form-label me-2 flex-label">บัตรกำนัล:</label>
              <input
                type="number"
                id="voucher"
                class="form-control flex-input"
                v-model.number="form.voucher"
                required
              />
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <label for="otherIncome" class="form-label me-2 flex-label">รายได้อื่นๆ:</label>
              <input
                type="number"
                id="otherIncome"
                class="form-control flex-input"
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
            <div class="col-md-6 d-flex align-items-center">
              <label for="expense" class="form-label me-2 flex-label">ค่าใช้จ่าย:</label>
              <input
                type="number"
                id="expense"
                class="form-control flex-input"
                v-model.number="form.expense"
                required
              />
            </div>
            <div class="col-md-6 d-flex align-items-center">
              <label for="otherExpense" class="form-label me-2 flex-label">ค่าโอน:</label>
              <input
                type="number"
                id="otherExpense"
                class="form-control flex-input"
                v-model.number="form.other_expense"
                required
              />
            </div>
          </div>
        </div>

              <!-- Remaining Cash -->
              <div class="mt-4">
          <h5>คงเหลือเงินสด</h5>
          <div class="row g-3">
            <div class="col-md-6 d-flex align-items-center">
              <label for="cashInDrawer" class="form-label me-2 flex-label">ส่งเงินสด:</label>
              <input
                type="number"
                id="cashInDrawer"
                class="form-control flex-input"
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
            <div class="col-md-6 d-flex align-items-center">
              <label for="total" class="form-label me-2 flex-label">รวมยอด:</label>
              <input
                type="number"
                id="total"
                class="form-control flex-input"
                :value="total"
                readonly
              />
            </div>
          </div>
        </div>

          <!-- Check Matching -->
          <div class="mt-4">
          <h5>Sales Check</h5>
          <p v-if="salesMatchStatus === 'matched'" class="text-success">
            Matched!
          </p>
          <p v-else-if="salesMatchStatus" class="text-danger">
            Not match by {{ formatNumber(salesDifference) }}
          </p>
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
             
              <p class="current_date"><strong>วันที่:</strong> {{ currentDateTime }}</p>
              <h4 class="centered-title"><strong>สาขา:</strong> {{ form.branch }}</h4>
<br>
              <p class="actual_sales text-end"><strong>ยอดขายรวม:</strong> {{ formatNumber(form.actual_sales) }}</p>
             
              <p v-if="salesMatchStatus === 'matched'" class="text-success text-end">
                ยอดตรง Matched!
              </p>
              <p v-else-if="salesMatchStatus" class="text-danger text-end">
                ยอดไม่ตรง ต่างกันที่: {{ formatNumber(salesDifference) }}
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
        cash_in_drawer: 0, // Computed dynamically
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

    currentDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${day}-${month}-${year} ${hours}:${minutes}`; // Format as DD-MM-YYYY HH:mm
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
          this.showShareButtons = true;
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
  background-color: #f7ddddd4; 

}

.total-text {
 text-align: end;
 color: rgb(15, 11, 236);
 font-weight: 600;

}

.cash-text {
 text-align: end;
color: red;
font-weight: 600;
}
.submit-sale {
  background-color: #f8f9fa;
  padding: 30px 0;
}
.current_date{
  font-size: medium;
  text-align: end;
}
.actual_sales{
  font-size: larger;
  color: rgb(0, 131, 41);
  font-weight: 600;
}

.modal-body{
  font-size: larger;
}
.centered-title {
  text-align: center;
  width: 100%; /* Ensures full-width alignment */
  margin: 0 auto; /* Centers the text horizontally */
}

.amount-column {
    width: 150px; /* Set a fixed width for the amount column */
    text-align: right; /* Align text to the right for decimal alignment */
    padding-right: 20px; /* Add padding to center the numbers visually */
    margin: 0 auto; /* Center the entire column in the table */
  }

  .table th.amount-column {
    text-align: center; /* Center header text */
  }

  .submit-sale {
  background-color: #f8f9fa;
  padding: 30px 0;
}

.flex-label {
  min-width: 100px; /* Minimum space for labels */
  text-align: right; /* Align label text to the right */
}

.flex-input {
  flex: 1; /* Let inputs fill the remaining space */
}


</style>
