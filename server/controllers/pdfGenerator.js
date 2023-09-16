const PDFDocument = require('pdfkit');
const fs = require('fs');

async function generateInvoicePdf(ad, winner) {
  const doc = new PDFDocument();

  // Pipe the PDF into a writable stream
  const stream = doc.pipe(fs.createWriteStream('invoice.pdf'));

  // Build your PDF content using doc functions
  doc.text('Invoice for Auction Winning', { align: 'center' });

  // Create a table-like structure using manual positioning and formatting
  const tableData = [
    ['Item', ad.productName],
    ['Description', ad.description],
    ['Category', ad.category],
    ['Price', `${ad.currentPrice} INR`],
    ['Winner', winner.name], // Replace with the actual winner's name
    // Add more rows as needed
  ];

  let startX = 100; // Use 'let' instead of 'const' to allow reassignment
  let startY = 250; // Use 'let' instead of 'const' to allow reassignment
  const rowHeight = 20; // Adjust the row height as needed

  for (const [label, value] of tableData) {
    doc.text(label, startX, startY, { width: 100 });
    doc.text(value, startX + 120, startY, { width: 300 });
    startY += rowHeight;
  }

  // ... other content ...

  // Finalize PDF
  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve('invoice.pdf'));
    stream.on('error', (error) => reject(error));
  });
}

module.exports = generateInvoicePdf;
