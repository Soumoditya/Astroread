function drawBackground(pdf, img, pageWidth, pageHeight) {
  const imgWidth = img.width;
  const imgHeight = img.height;

  const imgRatio = imgWidth / imgHeight;
  const pageRatio = pageWidth / pageHeight;

  let drawWidth, drawHeight;

  if (imgRatio > pageRatio) {
    // Image is wider than page
    drawWidth = pageWidth;
    drawHeight = pageWidth / imgRatio;
  } else {
    // Image is taller than page
    drawHeight = pageHeight;
    drawWidth = pageHeight * imgRatio;
  }

  const x = (pageWidth - drawWidth) / 2;
  const y = (pageHeight - drawHeight) / 2;

  pdf.addImage(img, "PNG", x, y, drawWidth, drawHeight);
}
const { jsPDF } = window.jspdf;

function generatePDF() {
  const text = document.getElementById("textInput").value;
  const pdf = new jsPDF("p", "pt", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // SAFE AREA (your white-marked zone)
  const marginTop = 130;
  const marginBottom = 150;
  const marginLeft = 90;
  const marginRight = 90;

  const usableWidth = pageWidth - marginLeft - marginRight;
  const usableHeight = pageHeight - marginTop - marginBottom;

  // Text style
  pdf.setFont("Times", "Normal");
  pdf.setFontSize(15);
  pdf.setTextColor(55, 45, 30);

  const lines = pdf.splitTextToSize(text, usableWidth);
  let cursorY = marginTop;

  // LOAD BACKGROUND IMAGE PROPERLY
  const bgImg = new Image();
  bgImg.src = "background.png";

  bgImg.onload = () => {
  drawBackground(pdf, bgImg, pageWidth, pageHeight);

  lines.forEach((line) => {
    if (cursorY + 18 > marginTop + usableHeight) {
      pdf.addPage();
      drawBackground(pdf, bgImg, pageWidth, pageHeight);
      cursorY = marginTop;
    }

    pdf.text(line, marginLeft, cursorY, { align: "justify" });
    cursorY += 18;
  });

  pdf.save("Astrological_Reading.pdf");
};

  bgImg.onerror = () => {
    alert("Background image not found. Check filename & path.");
  };
}
