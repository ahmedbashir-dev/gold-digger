
const eventSource = new EventSource("/api/live-price");

const livePriceElement = document.getElementById("price-display");
const connectionStatus = document.getElementById('connection-status');
const pricePerOunceHiddenEl = document.getElementById('price-per-oz');
// Handle live price updates
eventSource.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data);
        if (data.event === 'price-update') {
            const price = data.price;
            livePriceElement.textContent = price;
            pricePerOunceHiddenEl.value = price;
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

const form = document.getElementById("investForm");
const button = document.getElementById('invest-btn');
//Dialog references
const dialog = document.querySelector('dialog.outputs');
const dialogSummary = document.getElementById('investment-summary');
const okButton = dialog.querySelector('button');

function showPurchaseSummary(ounces, amount){
    dialogSummary.textContent = `You just bought ${ounces} ounces (Oz) for £${amount}. You will receive documentation shortly.`;
    dialog.showModal();
}

okButton.addEventListener('click', ()=> dialog.close());


form.addEventListener('submit', async function(event){
    
    event.preventDefault();
    const investmentAmount = document.getElementById('investment-amount').value;
    const dateTime = new Date().toISOString();
    const pricePerOz = pricePerOunceHiddenEl.value;
    if(!investmentAmount || parseFloat(investmentAmount) < 0.0 ){
        return;
    }
    const goldSold = (parseFloat(investmentAmount)/parseFloat(pricePerOz)).toFixed(4);

    const formData = {
        timestamp:dateTime,
        investmentAmount: investmentAmount,
        pricePerOz:pricePerOz,
        goldSold:goldSold
    }

    try{
        const response = await fetch("./api", {
            method:'POST',
            headers:{
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if(response.ok){
            form.reset();
            showPurchaseSummary(goldSold,investmentAmount);
        }
        else{
            console.error(response.statusText);
        }
    }
    catch(err){
        console.error("Error", err);
    }

});

