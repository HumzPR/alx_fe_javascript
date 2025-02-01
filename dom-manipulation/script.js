// Array to store quotes
const quotes = [
    { text: "The best way to predict the future is to invent it.", category: "Motivation" },
    { text: "Life is what happens when you’re busy making other plans.", category: "Life" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" }
];

// Selecting elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteContainer = document.getElementById("addQuoteContainer");

// Function to display a random quote
function showRandomQuote() {
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "<p>No quotes available.</p>";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const selectedQuote = quotes[randomIndex];

    // Clear previous content
    quoteDisplay.innerHTML = "";

    // Create elements dynamically
    const quoteText = document.createElement("p");
    quoteText.textContent = `"${selectedQuote.text}"`;

    const quoteCategory = document.createElement("strong");
    quoteCategory.textContent = ` [${selectedQuote.category}]`;

    // Append elements
    quoteText.appendChild(quoteCategory);
    quoteDisplay.appendChild(quoteText);
}

// Function to create and display the add-quote form dynamically
function createAddQuoteForm() {
    // Create form container
    const formDiv = document.createElement("div");

    // Create input fields
    const inputText = document.createElement("input");
    inputText.setAttribute("id", "newQuoteText");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("placeholder", "Enter a new quote");

    const inputCategory = document.createElement("input");
    inputCategory.setAttribute("id", "newQuoteCategory");
    inputCategory.setAttribute("type", "text");
    inputCategory.setAttribute("placeholder", "Enter quote category");

    // Create Add Quote button
    const addButton = document.createElement("button");
    addButton.setAttribute("id", "addQuoteBtn");
    addButton.textContent = "Add Quote";

    // Append elements
    formDiv.appendChild(inputText);
    formDiv.appendChild(inputCategory);
    formDiv.appendChild(addButton);

    // Append form to container
    addQuoteContainer.appendChild(formDiv);

    // Add event listener for adding quotes
    addButton.addEventListener("click", addQuote);
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document.getElementById("newQuoteCategory").value.trim();

    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }

    // Add new quote to the array
    quotes.push({ text: newQuoteText, category: newQuoteCategory });

    // Clear input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Update DOM with confirmation message
    quoteDisplay.innerHTML = "";

    const successMessage = document.createElement("p");
    successMessage.textContent = "New quote added! Click 'Show New Quote' to see it.";
    quoteDisplay.appendChild(successMessage);
}

// Event Listeners
newQuoteBtn.addEventListener("click", showRandomQuote);

// Initialize the dynamic form on page load
document.addEventListener("DOMContentLoaded", createAddQuoteForm);
