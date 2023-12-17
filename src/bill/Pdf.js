import React from "react";
import jsPDF from "jspdf";
const Pdf = (props) => {
  const createPDF = async () => {
    const pdf = new jsPDF("landscape", "pt", "a4");
    const data = document.querySelector("#billpage");
    pdf.html(data).then(() => {
      pdf.save(`Bill${props.id}.pdf`);
    });
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
