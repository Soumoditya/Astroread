const { jsPDF } = window.jspdf;

function generatePDF() {
  const text = document.getElementById("textInput").value;

  const pdf = new jsPDF("p", "pt", "a4");

  // Page size
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // SAFE AREA based on your white marking
  const marginTop = 130;
  const marginBottom = 150;
  const marginLeft = 90;
  const marginRight = 90;

  const usableWidth = pageWidth - marginLeft - marginRight;
  const usableHeight = pageHeight - marginTop - marginBottom;

  // Background
  const bgPath = "background.jpg";

  // Text styling (vedic friendly)
  pdf.setFont("Times", "Normal");
  pdf.setFontSize(15);
  pdf.setTextColor(55, 45, 30); // soft brown-gold readable tone

  // Split text into lines
  const lines = pdf.splitTextToSize(text, usableWidth);
  let cursorY = marginTop;

  // Draw background on first page
  pdf.addImage(bgPath, "JPEG", 0, 0, pageWidth, pageHeight);

  lines.forEach((line) => {
    if (cursorY + 18 > marginTop + usableHeight) {
      pdf.addPage();
      pdf.addImage(bgPath, "JPEG", 0, 0, pageWidth, pageHeight);
      cursorY = marginTop;
    }

    pdf.text(line, marginLeft, cursorY, { align: "justify" });
    cursorY += 18;
  });

  pdf.save("Astrological_Reading.pdf");
}
