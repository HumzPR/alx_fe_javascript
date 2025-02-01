document.addEventListener('DOMContentLoaded', () => {
    const quoteDisplay = document.getElementById('quoteDisplay');
    const newQuoteButton = document.getElementById('newQuote');
    const addQuoteButton = document.getElementById('addQuote');
    const newQuoteText = document.getElementById('newQuoteText');
    const newQuoteCategory = document.getElementById('newQuoteCategory');

    // Predefined Quotes Array
    let quotes = [
        { text: "The best way to predict the future is to create it.", category: "Motivation" },
        { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Inspiration" },
        { text: "Believe you can and you're halfway there.", category: "Confidence" },
        { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Life" },
        { text: "Do what you can, with what you have, where you are.", category: "Wisdom" }
    ];

    // Function to Show a Random Quote
    function showRandomQuote() {
        if (quotes.length === 0) {
            quoteDisplay.textContent = "No quotes available.";
            return;
        }
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        quoteDisplay.textContent = `"${selectedQuote.text}" - [${selectedQuote.category}]`;
    }

    // Function to Add a New Quote
    function addQuote() {
        const quoteText = newQuoteText.value.trim();
        const quoteCategory = newQuoteCategory.value.trim();

        if (quoteText === "" || quoteCategory === "") {
            alert("Please enter both a quote and a category.");
            return;
        }

        // Add the new quote to the array
        quotes.push({ text: quoteText, category: quoteCategory });
        alert("New quote added successfully!");

        // Clear input fields
        newQuoteText.value = "";
        newQuoteCategory.value = "";
    }

    // Event Listeners
    newQuoteButton.addEventListener('click', showRandomQuote);
    addQuoteButton.addEventListener('click', addQuote);
});
