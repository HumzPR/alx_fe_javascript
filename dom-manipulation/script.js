const API_URL = "https://jsonplaceholder.typicode.com/posts"; // Mock API URL

// Load quotes from local storage or initialize an empty array
let quotes = JSON.parse(localStorage.getItem("quotes")) || [];
let lastSyncTime = localStorage.getItem("lastSyncTime") || 0;

// Show notification
function showNotification(message) {
    let notification = document.createElement("div");
    notification.textContent = message;
    notification.style.position = "fixed";
    notification.style.bottom = "10px";
    notification.style.right = "10px";
    notification.style.backgroundColor = "lightblue";
    notification.style.padding = "10px";
    notification.style.borderRadius = "5px";
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

// Fetch quotes from server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch(API_URL);
        const serverQuotes = await response.json();

        let newQuotes = serverQuotes.map(q => ({
            text: q.title,
            category: "General",
            timestamp: Date.now()
        }));

        return newQuotes;
    } catch (error) {
        console.error("Error fetching quotes from server:", error);
        return [];
    }
}

// Post a new quote to the server
async function postQuoteToServer(quote) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quote)
        });

        if (response.ok) {
            showNotification("Quote successfully posted to server!");
        } else {
            throw new Error("Failed to post quote");
        }
    } catch (error) {
        console.error("Error posting quote to server:", error);
    }
}

// Add a new quote
function addQuote() {
    const newQuoteText = document.getElementById("newQuoteText").value;
    const newQuoteCategory = document.getElementById("newQuoteCategory").value;

    if (newQuoteText.trim() === "" || newQuoteCategory.trim() === "") {
        alert("Both fields are required!");
        return;
    }

    const newQuote = {
        text: newQuoteText,
        category: newQuoteCategory,
        timestamp: Date.now()
    };

    quotes.push(newQuote);
    localStorage.setItem("quotes", JSON.stringify(quotes));

    // Post to server
    postQuoteToServer(newQuote);

    // Update UI
    populateCategories();
    showRandomQuote();
}

// Sync quotes with server
async function syncWithServer() {
    const serverQuotes = await fetchQuotesFromServer();

    let mergedQuotes = [...quotes];

    serverQuotes.forEach(serverQuote => {
        let exists = mergedQuotes.some(q => q.text === serverQuote.text);
        if (!exists) {
            mergedQuotes.push(serverQuote);
        }
    });

    quotes = mergedQuotes;
    localStorage.setItem("quotes", JSON.stringify(quotes));
    localStorage.setItem("lastSyncTime", Date.now());

    showNotification("Quotes synced with server!");
    populateCategories();
    showRandomQuote();
}

// Sync with server every 10 minutes
setInterval(syncWithServer, 10 * 60 * 1000);
document.addEventListener("DOMContentLoaded", syncWithServer);

// Manually trigger sync
document.getElementById("syncQuotes").addEventListener("click", syncWithServer);
