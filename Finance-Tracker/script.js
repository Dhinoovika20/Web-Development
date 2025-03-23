// Get Elements
const balanceElement = document.getElementById("balance");
const form = document.getElementById("transaction-form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const transactionList = document.getElementById("transaction-list");
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Get transactions from LocalStorage
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Function to update balance
function updateBalance() {
    let balance = transactions.reduce((acc, transaction) => {
        return transaction.type === "income" ? acc + transaction.amount : acc - transaction.amount;
    }, 0);

    balanceElement.textContent = balance.toFixed(2);
}

// Function to display transactions
function displayTransactions() {
    transactionList.innerHTML = "";
    transactions.forEach((transaction, index) => {
        const li = document.createElement("li");
        li.classList.add(transaction.type);
        li.innerHTML = `${transaction.description} - ₹${transaction.amount.toFixed(2)}
            <button onclick="deleteTransaction(${index})">❌</button>`;
        transactionList.appendChild(li);
    });
}

// Function to add a transaction
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (description === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details!");
        return;
    }

    const transaction = { description, amount, type };
    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    descriptionInput.value = "";
    amountInput.value = "";

    updateBalance();
    displayTransactions();
});

// Function to delete a transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateBalance();
    displayTransactions();
}

// Dark Mode Toggle
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Initialize App
updateBalance();
displayTransactions();