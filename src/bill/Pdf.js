import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const isMobile = () => window.innerWidth < 1000;

const downloadPdf = (data, props, viewPort) => {
  const pdf = new jsPDF({
    orientation: "l",
    unit: "mm",
    format: "a4",
    putOnlyUsedFonts: true,
    floatPrecision: 16, // or "smart", default is 16
  });
  html2canvas(data).then((canvas) => {
    const image = canvas.toDataURL("image/png");
    const imgProps = pdf.getImageProperties(image);
    const width = pdf.internal.pageSize.getWidth();
    const height = (imgProps.height * width) / imgProps.width;
    pdf.addImage(image, "PNG", 0, 0, width, height);
    pdf.save(`Bill${props.id}_${props.customer?.MEDICAL}.pdf`);
  });
  if (isMobile() && viewPort) {
    setTimeout(() => {
      viewPort.setAttribute("content", "width=device-width, initial-scale=1");
    }, 0);
  }
};

const Pdf = (props) => {
  const createPDF = async () => {
    const data = document.querySelector("#billpage");
    if (isMobile) {
      const viewPort = document.querySelector('meta[name="viewport"');
      viewPort.setAttribute("content", "");
      setTimeout(() => {
        downloadPdf(data, props, viewPort);
      }, 10);
    } else {
      downloadPdf(data, props);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={createPDF}
        disabled={props.disabled}
      >
        Download Bill
      </button>
    </div>
  );
};

export default Pdf;
