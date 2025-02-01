// Quote array (will be updated with local storage)
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    { text: "Believe in yourself!", category: "Motivation" },
    { text: "Happiness depends upon ourselves.", category: "Happiness" },
    { text: "The only way to do great work is to love what you do.", category: "Work" }
];

// Load last selected category filter from local storage
let selectedCategory = localStorage.getItem("selectedCategory") || "all";

// Display a random quote
function showRandomQuote() {
    let filteredQuotes = selectedCategory === "all" 
        ? quotes 
        : quotes.filter(q => q.category === selectedCategory);
    
    if (filteredQuotes.length > 0) {
        let randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        document.getElementById("quoteDisplay").innerHTML = 
            `<p>${filteredQuotes[randomIndex].text}</p><small>(${filteredQuotes[randomIndex].category})</small>`;
    } else {
        document.getElementById("quoteDisplay").innerHTML = "<p>No quotes in this category.</p>";
    }
}

// Populate categories in dropdown
function populateCategories() {
    let categoryFilter = document.getElementById("categoryFilter");
    let categories = [...new Set(quotes.map(q => q.category))];
    
    categoryFilter.innerHTML = `<option value="all">All Categories</option>`;
    categories.forEach(category => {
        let option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    // Restore last selected category
    categoryFilter.value = selectedCategory;
}

// Filter quotes based on selected category
function filterQuotes() {
    selectedCategory = document.getElementById("categoryFilter").value;
    localStorage.setItem("selectedCategory", selectedCategory);
    showRandomQuote();
}

// Add a new quote
function addQuote() {
    let text = document.getElementById("newQuoteText").value.trim();
    let category = document.getElementById("newQuoteCategory").value.trim();

    if (text === "" || category === "") {
        alert("Please enter both quote text and category.");
        return;
    }

    quotes.push({ text, category });
    localStorage.setItem("quotes", JSON.stringify(quotes));
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
    
    populateCategories();
    showRandomQuote();
}

// JSON Import & Export
function exportToJsonFile() {
    let jsonString = JSON.stringify(quotes);
    let blob = new Blob([jsonString], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    
    let a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
        try {
            let importedQuotes = JSON.parse(event.target.result);
            quotes.push(...importedQuotes);
            localStorage.setItem("quotes", JSON.stringify(quotes));
            alert("Quotes imported successfully!");
            populateCategories();
            showRandomQuote();
        } catch (error) {
            alert("Invalid JSON file.");
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    populateCategories();
    showRandomQuote();
    
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
    document.getElementById("exportQuotes").addEventListener("click", exportToJsonFile);
});
