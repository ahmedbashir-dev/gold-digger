const eventSource = new EventSource("/api/live-price");

const livePriceElement = document.getElementById("price-display");

// Handle live price updates
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const price = data.price;
    livePriceElement.textContent = price; 
}

// Handle connection loss
eventSource.onerror = () =>{
    console.error("Connection lost. Attempting to reconnect...");
}