import PDFDocument from 'pdfkit';
import fs from 'node:fs';
import path from 'node:path';

export function generatePdf(data) {
    const doc = new PDFDocument();

    // Ensure safe timestamp for file names (remove colons, etc.)
    const safeTimestamp = data.timestamp.replace(/[:.]/g, '-');

    const receiptsDir = path.join(process.cwd(), 'receipts');

    // ✅ Ensure the receipts directory exists
    if (!fs.existsSync(receiptsDir)) {
        fs.mkdirSync(receiptsDir, { recursive: true });
    }

    const filePath = path.join(receiptsDir, `${safeTimestamp}-receipt.pdf`);
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);

    doc.fontSize(18).text('Gold Investment Summary', { underline: true });
    doc.moveDown();
    doc.fontSize(12).text(`Date: ${data.timestamp}`);
    doc.text(`Amount Invested: £${data.investmentAmount}`);
    doc.text(`Price per Oz: £${data.pricePerOz}`);
    doc.text(`Gold Purchased: ${data.goldSold} ozt`);

    doc.end();

    stream.on('finish', () => {
        console.log(`✅ PDF receipt generated: ${filePath}`);
    });

    stream.on('error', (err) => {
        console.error("❌ Error writing PDF:", err);
    });
}