const PDFDocument = require("pdfkit");
const fs = require("fs");

const generatePDFReport = async (users) => {
  const doc = new PDFDocument({ size: "A4"});
  doc.pipe(fs.createWriteStream("report.pdf"));

  doc.fontSize(12)

  doc.fontSize(20).text("Users Report", { align: "center" });

  const table = {
    headers: ["Name", "Email", "Level"],
    rows: users.map((user) => [user.name, user.email, user.level]),
  };

  doc.table(table, {
    prepareHeader: () => doc.font("Helvetica-Bold"),
    prepareRow: (row, i) => doc.font("Helvetica").fontSize(12),
  });
  doc.text(`Total users: ${users.length}`);
  doc.text(`Generated at: ${new Date().toLocaleString()}`);
  doc.text(tables.rows.join("\n"));
};


module.exports = { generatePDFReport };
