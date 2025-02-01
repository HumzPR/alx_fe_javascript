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

// Fetch quotes from server and sync with local data
async function syncWithServer() {
    try {
        const response = await fetch(API_URL);
        const serverQuotes = await response.json();

        let newQuotes = serverQuotes.map(q => ({
            text: q.title,
            category: "General",
            timestamp: Date.now()
        }));

        // Merge quotes while avoiding duplicates
        let mergedQuotes = [...quotes];

        newQuotes.forEach(serverQuote => {
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
    } catch (error) {
        console.error("Error syncing with server:", error);
        showNotification("Failed to sync with server.");
    }
}

// Sync with server every 10 minutes
setInterval(syncWithServer, 10 * 60 * 1000);
document.addEventListener("DOMContentLoaded", syncWithServer);

// Manually trigger sync
document.getElementById("syncQuotes").addEventListener("click", syncWithServer);
