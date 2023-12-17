import React from "react";
import Pdf from "../bill/Pdf";

const Cart = ({
  prodCart,
  deleteCart,
  grossAmount,
  gst,
  cdAmount,
  totalAmount,
  billNo,
  pdfDisabled,
}) => {
  return (
    <>
      <div>
        <div className="productListCart">
          <div className="productElements">
            <div>
              <b>Gross Amount : </b>
              {grossAmount}
              <br />
              <b>CD : </b>
              {cdAmount}
              <br />
              <b>Total GST : </b>
              {gst}
              <br />
              <b>Total Amount : </b> {totalAmount}
            </div>
          </div>
          <Pdf id={billNo} disabled={pdfDisabled()} />

          <table>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Product name </th>
                <th>Qty</th>
                <th>Scm</th>
                <th>Amount</th>
                <th>Gst</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {prodCart.map((prod, index) => {
                return (
                  <tr key={prod.cartKey}>
                    <td>{index + 1}</td>
                    <td>{prod.NAME}</td>
                    <td>{prod.qty}</td>
                    <td>{prod.scm}</td>
                    <td>{prod.amount}</td>
                    <td>{prod.gstAmount}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          deleteCart(prod.cartKey);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cart;
