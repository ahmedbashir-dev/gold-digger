import { getGoldPrice } from "../data/getGoldPrice.js";
import { sendResponse } from "../utils/sendResponse.js";

export async function handleGet(res){
    const goldPrice = await getGoldPrice();
    const payload = JSON.stringify(goldPrice);
    sendResponse(res, 200, 'application/json', payload);

}