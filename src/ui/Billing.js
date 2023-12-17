import React, { useContext, useEffect, useState } from "react";
import AddCustomer from "./AddCustomer";
import AddProducts from "./AddProducts";
import Cart from "./Cart";
import MedicalContext from "../contextprovider/medicalcontext";
import ProductContext from "../contextprovider/productcontext";
import Pdf from "../bill/Pdf";
import BillUi from "../bill/BillUi";
import BillPdf from "../bill/BillPdf";
const Billing = () => {
  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }
  const formatDate = (date = new Date()) => {
    return [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("-");
  };

  const [grossAmount, setGrossAmount] = useState(Number(0));
  const [billNo, setBillNo] = useState("");
  const [billDate, setbillDate] = useState(formatDate());
  const [cd, setCd] = useState(0);

  const [cdAmount, setCdAmount] = useState(format2digit(0));

  const [gstMap, setGstMap] = useState(new Map());
  const [gst, setGst] = useState(0);

  const [prodCart, setProdCart] = useState([]);
  const [customer, setCustomer] = useState("");
  var totalAmount = format2digit(grossAmount - cdAmount + Number(gst));

  const addProd2Cart = (value) => {
    setProdCart([...prodCart, value]);
  };
  function format2digit(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  useEffect(() => {
    const map = new Map();
    var value = Number(0);
    prodCart.forEach((prod) => {
      value = value + Number(prod.amount);
      setGst((preValue) => format2digit(preValue + prod.gstAmount));
      const gstAmount = map.get(prod.gst);
      if (!gstAmount) {
        map.set(prod.gst, Number(prod.gstAmount));
      } else {
        map.set(prod.gst, Number(prod.gstAmount) + gstAmount);
      }
    });

    setGstMap(map);
    setGrossAmount(format2digit(value));
  }, [prodCart]);

  useEffect(() => {
    setCdAmount(
      format2digit((Number(grossAmount) * (cd ? Number(cd) : 0)) / 100)
    );
  }, [cd]);
  const deleteCart = (value) => {
    setProdCart(prodCart.filter((prod) => prod.cartKey !== value));
  };

  const pdfDisabled = () => {
    console.log("pdfdisabled", billNo, customer.MEDICAL);
    return !billNo || !customer.MEDICAL || prodCart.length == 0;
  };
  return (
    <>
      <div
        className="BillingSection"
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: " 20px 0px",
        }}
      >
        <div className="BillingForm">
          <div>
            <label>Bill No.</label>
            <input
              type="number"
              min="0"
              value={billNo}
              pattern="[0-9]+"
              onChange={(e) => setBillNo(e.target.value)}
            />
          </div>
          <div>
            <label>Bill Date</label>
            <input
              type="date"
              value={billDate}
              onChange={(e) => {
                setbillDate(e.target.value);
              }}
            />
          </div>
          <div>
            <label>Medical Name</label>
            <AddCustomer customer={customer} setCustomer={setCustomer} />
          </div>
          <AddProducts addProd2Cart={addProd2Cart} />
          <label>CD </label>{" "}
          <input
            min="0"
            type="number"
            value={cd}
            onChange={(e) => {
              setCd(e.target.value);
            }}
          />
          <br />
        </div>
        <div className="AppCart">
          <h2>Product List</h2>
          {(prodCart.length !== 0 && (
            <Cart
              billNo={billNo}
              pdfDisabled={pdfDisabled}
              totalAmount={totalAmount}
              cdAmount={cdAmount}
              gst={gst}
              grossAmount={grossAmount}
              prodCart={prodCart}
              deleteCart={deleteCart}
            />
          )) || <h3>Cart is Empty</h3>}
        </div>
      </div>

      {!pdfDisabled() && (
        <BillPdf
          totalAmount={Number(totalAmount)}
          cdAmount={cdAmount}
          gst={gst}
          grossAmount={grossAmount}
          billNo={billNo}
          billDate={billDate}
          cd={cd}
          customer={customer}
          products={prodCart}
          gstMap={gstMap}
        />
      )}
    </>
  );
};

export default Billing;
