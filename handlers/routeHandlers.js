import { getGoldPrice } from "../data/getGoldPrice.js";
import { investmentEvent } from "../events/goldPriceEvent.js";
import { parseJsonBody } from "../utils/parseJsonBody.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function handleGet(res) {
    const goldPrice = await getGoldPrice();
    const payload = JSON.stringify(goldPrice);
    sendResponse(res, 200, 'application/json', payload);

}

export async function handleGoldPrice(req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    //Initial Push
    const initialPrice = await getGoldPrice();
    res.write(`data: ${JSON.stringify({ event: 'price-update', price: initialPrice })}\n\n`);

    const intervalId = setInterval(async () => {
        try {
            const price = await getGoldPrice();
            res.write(`data: ${JSON.stringify({ event: 'price-update', price: price })}\n\n`);
        }
        catch(err){
            console.error("Price fetch failed: ", err);

        }
    }, 20000);

    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    })
}

export async function handlePost(req, res){
    try{
        const parsedBody = await parseJsonBody(req);
        investmentEvent.emit('investment-added', parsedBody);
        sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody));
    }
    catch(err){
        sendResponse(res, 400, 'application/json', JSON.stringify({error:err}));
    }
}