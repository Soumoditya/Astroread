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
    pdf.addImage(bgImg, "PNG", 0, 0, pageWidth, pageHeight);

    lines.forEach((line) => {
      if (cursorY + 18 > marginTop + usableHeight) {
        pdf.addPage();
        pdf.addImage(bgImg, "PNG", 0, 0, pageWidth, pageHeight);
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
