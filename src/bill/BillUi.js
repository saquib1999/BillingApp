import React, { useEffect, useState } from "react";
import CemachDtls from "./CemachDtls";
var numberToWords = require("number-to-words");

function BillUi(props) {
  const [amountInWords, setAmountInWords] = useState("");
  const tableRow = [
    "S.No.",
    "Product",
    "Pack",
    "HSN Code",
    "Batch No.",
    "Expiry",
    "Qty",
    "Scm",
    "Sgst %",
    "Sgst A",
    "Cgst %",
    "Cgst A",
    "M.R.P",
    "PTR",
    "PTS",
    "Amount",
  ];

  const format2digit = (x) => Number.parseFloat(x).toFixed(2);

  const getNetAmount = () => {
    return Number(props.grossAmount) - Number(getCD()) + Number(getTotalTax());
  };

  const getCD = () => {
    return format2digit(
      (Number(props.grossAmount) *
        (props.cd && Number(props.cd) > 0 ? Number(props.cd) : 0)) /
        100
    );
  };

  const getTotalTax = () => {
    var totalTax = Number(0);
    props.gstMap.forEach((value) => {
      totalTax = totalTax + value;
    });
    return totalTax.toFixed(2);
  };
  const getGSTTable = (gstType) => {
    var gsttable = [];
    var totalTax;
    props.gstMap.forEach((value, key) =>
      gsttable.push(
        <tr>
          <td>
            <b>{gstType}</b> {(Number.parseFloat(key) / 2).toFixed(2)} %
          </td>
          <td>{(value / 2).toFixed(2)}</td>
        </tr>
      )
    );
    return gsttable;
  };

  return (
    <div className="billpage" id="billpage">
      <div className="header">
        <div className="box">
          <CemachDtls />
        </div>
        <div className="box">
          <b>GST INVOICE</b>
          <br />
          Bill.No.: {props.billNo} <br /> Date :{props.billDate}
        </div>
        <div className="box">
          <b>{props.customer.name} </b> <br />
          {props.customer.address}
          <br />
          <b>DL NO :</b>
          {props.customer.dlNo}
          <br /> <b>GST NO:</b> {props.customer.gstNo}
          <br /> <b>PAN :</b> {props.customer.gstNo}
        </div>
      </div>
      <div className="content">
        <table id="table1">
          <thead>
            <tr>
              {tableRow.map((data, index) => {
                return (
                  <th key={index} className={"col" + index}>
                    {data}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {props.products &&
              props.products.map((prod, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{prod.name} </td>
                    <td>{prod.pack}</td>
                    <td>{prod.hsn}</td>
                    <td>{prod.batchNo}</td>
                    <td>{prod.expiry}</td>
                    <td>{prod.qty}</td>
                    <td>{prod.scm}</td>
                    <td>{prod.gst / 2}</td>
                    <td>{prod.gstAmount / 2}</td>
                    <td>{prod.gst / 2}</td>
                    <td>{prod.gstAmount / 2}</td>
                    <td>{prod.mrp}</td>
                    <td>{prod.ptr}</td>
                    <td>{prod.pts}</td>
                    <td>{prod.amount}</td>
                  </tr>
                );
              })}

            <tr>
              {tableRow.map((data) => {
                return <td className="emptyRows"></td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="calculation">
        <div className="box">
          <span>
            <b>In Words : </b>
            {numberToWords
              .toWords(getNetAmount().toFixed(0))
              .toLocaleUpperCase() + " ONLY"}
            <br />
            <b>
              Remarks :{" "}
              {props.cd && Number(props.cd) > 0 ? (
                <span>CD {props.cd}%</span>
              ) : (
                ""
              )}
            </b>
          </span>
        </div>
        <div className="box2">
          <div className="SGST">SGST</div>
          <table>{getGSTTable("SGST")}</table>
        </div>
        <div className="box2">
          <div className="CGST">CGST</div>
          <table>{getGSTTable("CGST")}</table>
        </div>
        <div className="total">
          <table>
            <tbody>
              <tr>
                <td>Gross Amount</td>
                <td>{props.grossAmount}</td>
              </tr>
              <tr>
                <td>Less (-)</td>
                <td>{getCD()}</td>
              </tr>
              <tr>
                <td>Total Tax</td>
                <td>{getTotalTax()}</td>
              </tr>
              <tr>
                <td>Round</td>
                <td>
                  {(Number(getNetAmount().toFixed(0)) - getNetAmount()).toFixed(
                    2
                  )}
                </td>
              </tr>
              <tr>
                <td>Net Amount</td>
                <td>{getNetAmount().toFixed(0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="footer">
        <div className="right">For CEMACH PHARMACEUTICALS PVT LTD</div>

        <span>CIN U74999PN2016PTC16586</span>

        <div className="AlignRight">
          <b>Authorised Signatory</b>
        </div>
      </div>
    </div>
  );
}

export default BillUi;
