import React, { useContext, useEffect, useState } from "react";
import { getProducts } from "../models/Products";
import DropDown from "./DropDown";
import ProductContext from "../contextprovider/productcontext";

const AddProducts = (props) => {
  const format2digit = (x) => Number.parseFloat(x).toFixed(2);

  const fixProdList = useContext(ProductContext)?.map((data) => ({
    ...data,
    key: data.BATCH_NO,
  }));

  console.log("addcustomers" + JSON.stringify(fixProdList));

  const [products, setProducts] = useState(null);

  const [product, setProduct] = useState("");
  const [cartKey, setCartKey] = useState(0);
  const [mrp, setMrp] = useState("");
  const [ptr, setPtr] = useState("0");
  const [pts, setPts] = useState("0");
  const [qty, setQty] = useState("0");
  const [scm, setScm] = useState("0");
  const [gst, setGst] = useState("12");
  const [rate, setRate] = useState("PTR");
  const amount = () => format2digit(qty * product[rate]);
  const gstAmount = () => 2 * format2digit((amount() * gst) / 2 / 100);

  const onInputChange = (value) => {
    setProducts(
      fixProdList.filter((c) => c.NAME.includes(value.toLocaleUpperCase()))
    );
  };
  const onSelectProducts = (prod) => {
    setProduct(prod);
    setMrp(prod.MRP);
    setPtr(prod.PTR);
    setPts(prod.PTS);
  };

  const onAdd = (e) => {
    e.preventDefault();
    var localProd = {
      ...product,
      qty: qty,
      scm: scm,
      amount: amount(),
      gstAmount: gstAmount(),
      cartKey: cartKey + 1,
      gst: gst,
    };

    setProduct(localProd);
    setCartKey(cartKey + 1);
    props.addProd2Cart(localProd);

    console.log(product);
  };

  const isValid = () => {
    console.log(qty, product[rate]);
    return !!+qty && !!+product[rate];
  };
  return (
    <>
      <form onSubmit={onAdd}>
        <div className="productElements">
          <div>
            <label>Products </label>

            <DropDown
              dropDownName="NAME"
              onSelect={onSelectProducts}
              onInputChange={onInputChange}
              options={products}
              placeholder={"Select products"}
            />
          </div>
          <div className="productValues">
            <label>Quantity</label>
            <div>
              <input
                type="number"
                min="0"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </div>
          </div>
          <div className="productValues">
            <label>Scheme</label>
            <div>
              <input
                type="number"
                min="0"
                value={scm}
                onChange={(e) => setScm(e.target.value)}
              />
            </div>
          </div>
          <div className="productValues">
            <label>PTR</label>
            <div>
              <input
                type="number"
                min="0"
                value={ptr}
                onChange={(e) => setPtr(e.target.value)}
                step="any"
              />
            </div>
          </div>
          <div className="productValues">
            <label>PTS</label>
            <div>
              <input
                type="number"
                min="0"
                value={pts}
                onChange={(e) => setPts(e.target.value)}
                step="any"
              />
            </div>
          </div>
          <div className="productValues">
            <label>GST</label>
            <div>
              <input
                type="number"
                value={gst}
                onChange={(e) => setGst(e.target.value)}
              />
            </div>
          </div>
          <div>
            <input
              checked
              type="radio"
              name="cost"
              value="PTR"
              onChange={(e) => setRate(e.target.value)}
            />
            <label htmlFor="ptr" value="PTR">
              PTR
            </label>{" "}
            <input
              type="radio"
              name="cost"
              value="PTS"
              onChange={(e) => setRate(e.target.value)}
            />
            <label value="PTS">PTS</label>
          </div>
          <br />
          <div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={!isValid()}
            >
              Add
            </button>
          </div>
        </div>
        <br />
        <div className="productElements">
          {Boolean(+qty) && Boolean(+rate) && (
            <div>
              <b>Amount : </b>
              {amount()}
              <tr />
              <b>GST : </b> {gstAmount()}
            </div>
          )}
        </div>
      </form>
    </>
  );
};

export default AddProducts;
