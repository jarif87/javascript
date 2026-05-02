const Storage = {
  get() {
    const data = localStorage.getItem("expenseTracker");
    return data ? JSON.parse(data) : [];
  },
  set(transactions) {
    localStorage.setItem("expenseTracker", JSON.stringify(transactions));
  },
};

let transactions = Storage.get();
let monthlyChart = null;
let categoryChart = null;

const $ = (id) => document.getElementById(id);
const balanceDisplay = $("balanceDisplay");
const incomeDisplay = $("incomeDisplay");
const expenseDisplay = $("expenseDisplay");
const savingsDisplay = $("savingsDisplay");
const transactionList = $("transactionList");
const emptyMessage = $("emptyMessage");
const transactionCount = $("transactionCount");
const insightText = $("insightText");
const form = $("transactionForm");
const descInput = $("description");
const amountInput = $("amount");
const categorySelect = $("category");
const dateInput = $("date");
const typeRadios = document.querySelectorAll('input[name="type"]');

const filterType = $("filterType");
const filterCategory = $("filterCategory");
const filterDateFrom = $("filterDateFrom");
const filterDateTo = $("filterDateTo");
const filterSearch = $("filterSearch");

function formatCurrency(amount) {
  return "$" + amount.toFixed(2);
}

function formatDate(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getMonthLabel(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function renderStats() {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;
  const savings = totalIncome - totalExpense;

  balanceDisplay.textContent = formatCurrency(balance);
  incomeDisplay.textContent = formatCurrency(totalIncome);
  expenseDisplay.textContent = formatCurrency(totalExpense);
  savingsDisplay.textContent = formatCurrency(savings);
}

function renderList(filteredTransactions) {
  const list = filteredTransactions || transactions;
  if (list.length === 0) {
    transactionList.innerHTML = "";
    emptyMessage.style.display = "block";
    transactionCount.textContent = "0";
    return;
  }
  emptyMessage.style.display = "none";
  transactionCount.textContent = list.length;

  transactionList.innerHTML = "";
  [...list].reverse().forEach((t) => {
    const li = document.createElement("li");
    li.className = "transaction-item";
    const sign = t.type === "income" ? "+" : "-";
    const amountClass =
      t.type === "income" ? "income-amount" : "expense-amount";
    li.innerHTML = `
            <div class="trans-info">
                <div class="desc">${t.description}</div>
                <div class="meta">
                    <span>${t.category}</span>
                    <span>${formatDate(t.date)}</span>
                </div>
            </div>
            <div class="trans-actions">
                <span class="amount ${amountClass}">${sign}${formatCurrency(t.amount)}</span>
                <button class="btn-sm btn-edit" data-id="${t.id}">✏️</button>
                <button class="btn-sm btn-delete" data-id="${t.id}">✕</button>
            </div>
        `;
    transactionList.appendChild(li);
  });

  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      deleteTransaction(id);
    });
  });

  document.querySelectorAll(".btn-edit").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      openEditModal(id);
    });
  });
}

function getFilteredTransactions() {
  return transactions.filter((t) => {
    if (filterType.value !== "all" && t.type !== filterType.value) return false;
    if (filterCategory.value !== "all" && t.category !== filterCategory.value)
      return false;
    if (filterDateFrom.value && t.date < filterDateFrom.value) return false;
    if (filterDateTo.value && t.date > filterDateTo.value) return false;
    if (
      filterSearch.value &&
      !t.description.toLowerCase().includes(filterSearch.value.toLowerCase())
    )
      return false;
    return true;
  });
}

function applyFilters() {
  const filtered = getFilteredTransactions();
  renderList(filtered);
  renderCharts(filtered);
  renderInsights(filtered);
}

function renderInsights(filtered) {
  const list = filtered || transactions;
  if (list.length === 0) {
    insightText.textContent = "✨ Add transactions to see smart insights";
    return;
  }

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();

  const currentMonthExpenses = list.filter(
    (t) =>
      t.type === "expense" &&
      new Date(t.date + "T00:00:00").getMonth() === thisMonth &&
      new Date(t.date + "T00:00:00").getFullYear() === thisYear,
  );
  const currentTotal = currentMonthExpenses.reduce(
    (sum, t) => sum + t.amount,
    0,
  );

  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const lastYear = thisMonth === 0 ? thisYear - 1 : thisYear;
  const lastMonthExpenses = list.filter(
    (t) =>
      t.type === "expense" &&
      new Date(t.date + "T00:00:00").getMonth() === lastMonth &&
      new Date(t.date + "T00:00:00").getFullYear() === lastYear,
  );
  const lastTotal = lastMonthExpenses.reduce((sum, t) => sum + t.amount, 0);

  const categoryTotals = {};
  list
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });
  let highestCategory = "None";
  let highestAmount = 0;
  for (const [cat, amt] of Object.entries(categoryTotals)) {
    if (amt > highestAmount) {
      highestAmount = amt;
      highestCategory = cat;
    }
  }

  let insights = [];
  if (currentTotal > 0 && lastTotal > 0) {
    const diff = ((currentTotal - lastTotal) / lastTotal) * 100;
    if (diff > 0) {
      insights.push(`📈 You spent ${diff.toFixed(1)}% more than last month`);
    } else if (diff < 0) {
      insights.push(
        `📉 You spent ${Math.abs(diff).toFixed(1)}% less than last month`,
      );
    } else {
      insights.push(`➖ Spending same as last month`);
    }
  } else if (currentTotal > 0 && lastTotal === 0) {
    insights.push(`📈 No spending last month, started this month`);
  } else {
    insights.push(`📊 No expense data for comparison`);
  }

  if (highestAmount > 0) {
    insights.push(
      `🏷️ Highest spending category: ${highestCategory} (${formatCurrency(highestAmount)})`,
    );
  }

  const totalIncome = list
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = list
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  const savings = totalIncome - totalExpense;
  insights.push(`💾 Total savings: ${formatCurrency(savings)}`);

  insightText.textContent = insights.join(" · ");
}

function renderCharts(filtered) {
  const list = filtered || transactions;
  renderMonthlyChart(list);
  renderCategoryChart(list);
}

function renderMonthlyChart(list) {
  const ctx = document.getElementById("monthlyChart").getContext("2d");
  if (monthlyChart) monthlyChart.destroy();

  const monthlyData = {};
  list.forEach((t) => {
    const key = getMonthLabel(t.date);
    if (!monthlyData[key]) {
      monthlyData[key] = { income: 0, expense: 0 };
    }
    if (t.type === "income") monthlyData[key].income += t.amount;
    else monthlyData[key].expense += t.amount;
  });

  const labels = Object.keys(monthlyData).sort((a, b) => {
    const [mA, yA] = a.split(" ");
    const [mB, yB] = b.split(" ");
    const dA = new Date(`${mA} 1, ${yA}`);
    const dB = new Date(`${mB} 1, ${yB}`);
    return dA - dB;
  });

  const incomeData = labels.map((l) => monthlyData[l].income);
  const expenseData = labels.map((l) => monthlyData[l].expense);

  monthlyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels.length ? labels : ["No data"],
      datasets: [
        {
          label: "Income",
          data: labels.length ? incomeData : [0],
          backgroundColor: "#2b7a4b",
          borderRadius: 4,
        },
        {
          label: "Expense",
          data: labels.length ? expenseData : [0],
          backgroundColor: "#b13e4b",
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: { boxWidth: 12, padding: 12 },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: (v) => "$" + v },
        },
      },
    },
  });
}

function renderCategoryChart(list) {
  const ctx = document.getElementById("categoryChart").getContext("2d");
  if (categoryChart) categoryChart.destroy();

  const categoryData = {};
  list
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryData[t.category] = (categoryData[t.category] || 0) + t.amount;
    });

  const labels = Object.keys(categoryData);
  const data = Object.values(categoryData);

  const colors = [
    "#2b7a4b",
    "#b13e4b",
    "#2c7ab1",
    "#e6a817",
    "#8e44ad",
    "#d35400",
    "#1abc9c",
    "#7f8c8d",
  ];

  categoryChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels.length ? labels : ["No expenses"],
      datasets: [
        {
          label: "Spending by Category",
          data: labels.length ? data : [0],
          backgroundColor: labels.length
            ? colors.slice(0, labels.length)
            : ["#ccc"],
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { callback: (v) => "$" + v },
        },
      },
    },
  });
}

function addTransaction(description, amount, category, date, type) {
  const newTransaction = {
    id: Date.now(),
    description: description.trim(),
    amount: parseFloat(amount),
    category: category,
    date: date,
    type: type,
  };
  transactions.push(newTransaction);
  Storage.set(transactions);
  applyFilters();
  renderStats();
}

function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  Storage.set(transactions);
  applyFilters();
  renderStats();
}

function updateTransaction(id, description, amount, category, date, type) {
  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) return;
  transactions[index] = {
    ...transactions[index],
    description: description.trim(),
    amount: parseFloat(amount),
    category: category,
    date: date,
    type: type,
  };
  Storage.set(transactions);
  applyFilters();
  renderStats();
  closeEditModal();
}

let editId = null;
const modalOverlay = document.createElement("div");
modalOverlay.className = "modal-overlay";
modalOverlay.innerHTML = `
    <div class="modal">
        <h3>✏️ Edit Transaction</h3>
        <form id="editForm">
            <div class="form-row">
                <div class="input-group">
                    <label>Description</label>
                    <input type="text" id="editDescription" required />
                </div>
                <div class="input-group">
                    <label>Amount ($)</label>
                    <input type="number" id="editAmount" step="0.01" required />
                </div>
            </div>
            <div class="form-row">
                <div class="input-group">
                    <label>Category</label>
                    <select id="editCategory">
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Salary">Salary</option>
                        <option value="Bills">Bills</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Health">Health</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Date</label>
                    <input type="date" id="editDate" required />
                </div>
            </div>
            <div class="form-row type-row">
                <div class="type-options">
                    <label class="radio-label">
                        <input type="radio" name="editType" value="income" /> Income
                    </label>
                    <label class="radio-label expense-label">
                        <input type="radio" name="editType" value="expense" /> Expense
                    </label>
                </div>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn-secondary" id="editCancel">Cancel</button>
                <button type="submit" class="btn-primary">💾 Save</button>
            </div>
        </form>
    </div>
`;
document.body.appendChild(modalOverlay);

function openEditModal(id) {
  const t = transactions.find((t) => t.id === id);
  if (!t) return;
  editId = id;
  document.getElementById("editDescription").value = t.description;
  document.getElementById("editAmount").value = t.amount;
  document.getElementById("editCategory").value = t.category;
  document.getElementById("editDate").value = t.date;
  document.querySelectorAll('input[name="editType"]').forEach((r) => {
    r.checked = r.value === t.type;
  });
  modalOverlay.classList.add("active");
}

function closeEditModal() {
  modalOverlay.classList.remove("active");
  editId = null;
}

document.getElementById("editCancel").addEventListener("click", closeEditModal);
modalOverlay.addEventListener("click", function (e) {
  if (e.target === this) closeEditModal();
});

document.getElementById("editForm").addEventListener("submit", function (e) {
  e.preventDefault();
  if (editId === null) return;
  const description = document.getElementById("editDescription").value;
  const amount = document.getElementById("editAmount").value;
  const category = document.getElementById("editCategory").value;
  const date = document.getElementById("editDate").value;
  let type = "income";
  document.querySelectorAll('input[name="editType"]').forEach((r) => {
    if (r.checked) type = r.value;
  });
  if (!description || !amount || parseFloat(amount) <= 0) {
    alert("Please fill in all fields correctly.");
    return;
  }
  updateTransaction(editId, description, amount, category, date, type);
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const description = descInput.value.trim();
  const amount = amountInput.value.trim();
  const category = categorySelect.value;
  const date = dateInput.value;
  let type = "income";
  for (const radio of typeRadios) {
    if (radio.checked) {
      type = radio.value;
      break;
    }
  }
  if (!description) {
    alert("Please enter a description.");
    return;
  }
  if (!amount || parseFloat(amount) <= 0) {
    alert("Please enter a positive amount.");
    return;
  }
  if (!date) {
    alert("Please select a date.");
    return;
  }
  addTransaction(description, amount, category, date, type);
  form.reset();
  document.querySelector('input[name="type"][value="income"]').checked = true;
  dateInput.value = new Date().toISOString().split("T")[0];
});

const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  this.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});

document.getElementById("exportPdfBtn").addEventListener("click", function () {
  if (transactions.length === 0) {
    alert("No transactions to export.");
    return;
  }

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Expense Tracker Report", 14, 22);

  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 30);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  doc.text(`Total Income: $${totalIncome.toFixed(2)}`, 14, 40);
  doc.text(`Total Expense: $${totalExpense.toFixed(2)}`, 14, 48);
  doc.text(`Balance: $${balance.toFixed(2)}`, 14, 56);

  const tableData = transactions.map((t) => [
    t.description,
    t.category,
    t.date,
    t.type === "income"
      ? `+$${t.amount.toFixed(2)}`
      : `-$${t.amount.toFixed(2)}`,
  ]);

  doc.autoTable({
    head: [["Description", "Category", "Date", "Amount"]],
    body: tableData,
    startY: 65,
    theme: "striped",
    styles: { fontSize: 8 },
    headStyles: { fillColor: [26, 38, 57] },
  });

  doc.save(`expenses_${new Date().toISOString().split("T")[0]}.pdf`);
});

[
  filterType,
  filterCategory,
  filterDateFrom,
  filterDateTo,
  filterSearch,
].forEach((el) => {
  el.addEventListener("change", applyFilters);
  el.addEventListener("input", applyFilters);
});

function init() {
  dateInput.value = new Date().toISOString().split("T")[0];
  filterDateFrom.value = "";
  filterDateTo.value = "";
  applyFilters();
  renderStats();
}

init();
