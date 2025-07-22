import { EventEmitter } from "node:events";
import { logInvestment } from "../utils/logInvestment.js";

export const investmentEvent = new EventEmitter();

investmentEvent.on('investment-added', logInvestment)