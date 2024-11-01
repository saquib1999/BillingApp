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

  const [products, setProducts] = useState(null);

  const [product, setProduct] = useState("");
  const [cartKey, setCartKey] = useState(0);
  const [mrp, setMrp] = useState("");
  const [ptr, setPtr] = useState(0);
  const [pts, setPts] = useState(0);
  const [qty, setQty] = useState(0);
  const [scm, setScm] = useState(0);
  const [gst, setGst] = useState("12");
  const [clr, setClr] = useState(true);
  const { rate } = props;
  const amount = () => {
    console.log(product, "+++++++++++++++");
    const cost = rate === "PTS" ? pts : ptr;
    return format2digit(qty * cost);
  };
  const gstAmount = () => 2 * format2digit((amount() * gst) / 2 / 100);

  const onInputChange = (value) => {
    setProducts(
      fixProdList.filter((c) =>
        c.NAME.toLocaleUpperCase().includes(value.toLocaleUpperCase())
      )
    );
  };
  const onSelectProducts = (prod) => {
    setProduct(prod);
    setMrp(prod.MRP);
    setPtr(prod.PTR);
    setPts(prod.PTS);
  };

  const onAdd = (e) => {
    console.log(gstAmount(), "gstAmount()******");
    e.preventDefault();
    var localProd = {
      ...product,
      PTR: ptr,
      PTS: pts,
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

    setProduct("");
    setClr(!clr);
  };

  const isValid = () => {
    console.log(qty, product[rate]);
    return rate && product && qty && !!+product[rate];
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
              clr={clr}
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
