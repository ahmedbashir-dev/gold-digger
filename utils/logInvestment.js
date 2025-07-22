import fs from "node:fs/promises";
import path from "path";
export async function logInvestment(investmentObj){
    const logFilePath = path.join('investmentLogs', 'investmentLog.log');
    try{
        await fs.appendFile(logFilePath, `[${investmentObj.timestamp}], amount paid: ${investmentObj.investmentAmount}, price per Oz: ${investmentObj.pricePerOz}, gold sold: ${investmentObj.goldSold} Oz\n`);
    }
    catch(err){
        console.error('Error while writing log file: ', err);
    }
}