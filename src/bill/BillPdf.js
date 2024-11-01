import React from "react";
import "./BillPdf.css";
import CemachDtls from "./CemachDtls";
import * as numberToWords from "number-to-words";

const BillPdf = (props) => {
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

  const getGSTTable = (gstType) => {
    var gsttable = [];

    props.gstMap?.forEach((value, key) =>
      gsttable.push(
        <tr>
          <td>
            <b>
              {gstType + " "} {(Number.parseFloat(key) / 2).toFixed(2)}% :
            </b>
          </td>
          <td id="AlignRight2">{(value / 2).toFixed(2)}</td>
        </tr>
      )
    );
    return gsttable;
  };
  return (
    <div id="billpage">
      <div className="BillBox BorderClass">
        <div className="Header BorderClass">
          <div className="BorderClass PaddingClass">
            <CemachDtls />
          </div>
          <div className="BorderClass PaddingClass">
            <b>GST INVOICE</b>
            <br />
            Bill.No.: {props.billNo} <br /> Date :{props.billDate}
          </div>
          <div className="BorderClass PaddingClass">
            <b>{props.customer.MEDICAL} </b> <br />
            {props.customer.ADDRESS}
            <br />
            <b>DL NO :</b>
            {props.customer.DL_NO}
            <br /> <b>GST NO:</b> {props.customer.GST}
            <br /> <b>PAN :</b> {props.customer.PAN_NO}
          </div>
        </div>
        <div className="Body BorderClass">
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
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{prod.NAME} </td>
                      <td>{prod.PACK}</td>
                      <td>{prod.HSN}</td>
                      <td>{prod.BATCH_NO}</td>
                      <td>{prod.EXPIRY_DATE}</td>
                      <td>{prod.qty}</td>
                      <td>{prod.scm}</td>
                      <td>{prod.gst / 2}</td>
                      <td>{prod.gstAmount / 2}</td>
                      <td>{prod.gst / 2}</td>
                      <td>{prod.gstAmount / 2}</td>
                      <td>{Number.parseFloat(prod.MRP).toFixed(2)}</td>
                      <td>{Number.parseFloat(prod.PTR).toFixed(2)}</td>
                      <td>
                        {props.rate !== "PTR"
                          ? Number.parseFloat(prod.PTS).toFixed(2)
                          : ""}
                      </td>
                      <td>{Number.parseFloat(prod.amount).toFixed(2)}</td>
                    </tr>
                  );
                })}
              <tr className="LastRow">
                {tableRow.map((data, index) => {
                  return <td key={index} className={"col" + index}></td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
        <div className="calculation BorderClass">
          <div className="BorderClass">
            <span>
              <b>In Words : </b>
              {numberToWords
                .toWords(props.totalAmount?.toFixed(0))
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
          <div className="BorderClass">
            <div className="SGST">SGST</div>
            <table>{getGSTTable("SGST")}</table>
          </div>
          <div className="BorderClass">
            <div className="CGST">CGST</div>
            <table id="table3">{getGSTTable("CGST")}</table>
          </div>
          <div className="total">
            <table id="table2">
              <tbody>
                <tr>
                  <td>Gross Amount</td>
                  <td id="AlignRight">{props.grossAmount}</td>
                </tr>
                <tr>
                  <td>Less (-)</td>
                  <td id="AlignRight">{props.cdAmount}</td>
                </tr>
                <tr>
                  <td>Total Tax</td>
                  <td id="AlignRight">{props.gst}</td>
                </tr>
                <tr>
                  <td>Round</td>
                  <td id="AlignRight">
                    {(
                      Number(props.totalAmount?.toFixed(0)) - props.totalAmount
                    ).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>Net Amount</td>
                  <td id="AlignRight">
                    {Number.parseFloat(props.totalAmount?.toFixed(0)).toFixed(
                      2
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="Footer BorderClass">
          <div id="AlignRight">For CEMACH PHARMACEUTICALS PVT LTD</div>

          <span>CIN U74999PN2016PTC16586</span>

          <div id="AlignRight">
            <b>Authorised Signatory</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillPdf;
