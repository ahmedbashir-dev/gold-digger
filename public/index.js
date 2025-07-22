const eventSource = new EventSource("/api/live-price");

const livePriceElement = document.getElementById("price-display");
const connectionStatus = document.getElementById('connection-status');

// Handle live price updates
eventSource.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data);
        if (data.event === 'price-update') {
            const price = data.price;
            livePriceElement.textContent = price;
        }
    }
    catch (err) { 
        console.error('Invalid data format', err);
    }
}

eventSource.onopen = () => {
    connectionStatus.textContent = 'Live Prices 🟢';
}



// Handle connection loss
eventSource.onerror = () => {
    connectionStatus.textContent = "Offline 🔴";
    console.error("Connection lost. Attempting to reconnect...");
}