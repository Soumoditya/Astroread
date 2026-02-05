const { jsPDF } = window.jspdf;

function generatePDF() {
  const text = document.getElementById("textInput").value.trim();
  if (!text) {
    alert("Please paste the reading text.");
    return;
  }

  const pdf = new jsPDF("p", "pt", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // ===== SAFE AREA (inside inner frame, mandala allowed) =====
  const marginTop = 120;
  const marginBottom = 90;   // allow mandala overlap
  const marginLeft = 105;
  const marginRight = 105;

  const usableWidth = pageWidth - marginLeft - marginRight;
  const usableHeight = pageHeight - marginTop - marginBottom;

  // ===== TEXT STYLE =====
  pdf.setFont("Times", "Normal");
  pdf.setFontSize(15);
  pdf.setTextColor(60, 50, 34); // parchment-friendly brown
  const lineHeight = 19;

  // ===== LOAD BACKGROUND =====
  const bgImg = new Image();
  bgImg.src = "background.png";

  bgImg.onload = () => {
    const imgRatio = bgImg.width / bgImg.height;

    // FILL HEIGHT (9:16 image)
    const drawHeight = pageHeight;
    const drawWidth = drawHeight * imgRatio;

    // Crop equally from left/right
    const x = (pageWidth - drawWidth) / 2;
    const y = 0;

    const lines = pdf.splitTextToSize(text, usableWidth);
    let cursorY = marginTop;

    // First page
    pdf.addImage(bgImg, "PNG", x, y, drawWidth, drawHeight);

    lines.forEach(line => {
      if (cursorY + lineHeight > marginTop + usableHeight) {
        pdf.addPage();
        pdf.addImage(bgImg, "PNG", x, y, drawWidth, drawHeight);
        cursorY = marginTop;
      }

      pdf.text(line, marginLeft, cursorY, {
        maxWidth: usableWidth,
        align: "justify"
      });

      cursorY += lineHeight;
    });

    pdf.save("Astrological_Reading.pdf");
  };

  bgImg.onerror = () => {
    alert("background.png not found. Check filename and path.");
  };
}
