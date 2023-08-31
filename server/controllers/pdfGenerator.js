const PDFDocument = require('pdfkit');
const fs = require('fs'); // Import the fs module

async function generateInvoicePdf(ad, winner) {
  const doc = new PDFDocument();

  // Pipe the PDF into a writable stream
  const stream = doc.pipe(fs.createWriteStream('invoice.pdf'));

  // Build your PDF content using doc functions
  doc.text('Invoice for Auction Winning', { align: 'center' });
  doc.text(`Product: ${ad.title}`);
  doc.text(`Price: ${ad.currentPrice}`);
  doc.text(`Winner: ${winner.name}`);
  // ... other content ...

  // Finalize PDF
  doc.end();

  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve('invoice.pdf'));
    stream.on('error', (error) => reject(error));
  });
}

module.exports = generateInvoicePdf;
