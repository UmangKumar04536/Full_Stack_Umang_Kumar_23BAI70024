import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function ExportButton({ theme }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    const preview = document.getElementById("preview");
    if (!preview) return alert("Preview not found!");

    try {
      setLoading(true);
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 300));

      // Background styling based on theme
      let backgroundStyle = {};
      if (theme === "dark") {
        backgroundStyle = { backgroundColor: "#1e1e1e" };
      } else if (theme === "gradient") {
        backgroundStyle = {
          backgroundImage:
            "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
        };
      } else {
        backgroundStyle = { backgroundColor: "#ffffff" };
      }

      // A4 wrapper, aligned top-left (no centering)
      const wrapper = document.createElement("div");
      wrapper.style.width = "210mm";
      wrapper.style.minHeight = "297mm";
      wrapper.style.padding = "10mm";
      wrapper.style.boxSizing = "border-box";
      wrapper.style.display = "block"; // ✅ not flex
      wrapper.style.position = "relative";
      wrapper.style.overflow = "hidden";

      Object.assign(wrapper.style, backgroundStyle);

      // Clone content into wrapper
      const cloned = preview.cloneNode(true);
      wrapper.appendChild(cloned);

      // Append wrapper to DOM temporarily for rendering
      document.body.appendChild(wrapper);

      // Capture to canvas
      const canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        scrollY: 0,
      });

      // Remove wrapper afterward
      document.body.removeChild(wrapper);

      // Generate PDF
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;
      const marginLeft = 10;
      const marginTop = 10;
      const imgWidth = pageWidth - marginLeft * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = marginTop;

      pdf.addImage(imgData, "PNG", marginLeft, position, imgWidth, imgHeight);
      heightLeft -= pageHeight - marginTop;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", marginLeft, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("portfolio.pdf");
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("❌ Failed to generate PDF. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      style={{
        background: "#003399",
        color: "white",
        padding: "10px 18px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
      }}
    >
      {loading ? "Generating..." : "Export as PDF"}
    </button>
  );
}

export default ExportButton;
