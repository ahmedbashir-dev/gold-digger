import { EventEmitter } from "node:events";
import { generatePdf } from "../utils/generatePdf.js";

export const generatePdfEvent = new EventEmitter();

generatePdfEvent.on('generate-pdf', generatePdf);