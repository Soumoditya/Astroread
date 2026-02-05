const { jsPDF } = window.jspdf;

function generatePDF() {
  const text = document.getElementById("readingText").value;
  const contentDiv = document.getElementById("content");

  // Basic professional formatting
  const formatted = text
    .replace(/\n{2,}/g, "\n\n")
    .replace(/•/g, "✦");

  contentDiv.innerText = formatted;

  html2canvas(document.getElementById("pdfPage"), {
    scale: 2,
    useCORS: true
  }).then(canvas => {
    const imgData = canvas.toDataURL("image/jpeg", 1.0);

    const pdf = new jsPDF("p", "pt", "a4");
    pdf.addImage(imgData, "JPEG", 0, 0, 595, 842);

    pdf.save("vedic-astrology-reading.pdf");
  });
}
