import React, { useContext, useEffect, useState } from "react";
import { getDataArray } from "../functions/getSheetData";
import TableUI from "./TableUI";
import ProductContext from "../contextprovider/productcontext";

const Products = () => {
  const context = useContext(ProductContext);

  const [headers, setHeaders] = useState(null);
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const getFile = async () => {
      const jsonDataArray = context;
      const jsonData2Array = jsonDataArray.map((data) => ({
        ...data,
        key: data.BATCH_NO,
      }));

      setProducts(jsonData2Array);
      setHeaders(Object.keys(jsonDataArray[0]));
    };
    getFile();
  }, []);
  return (
    <div>
      <h1>Product List</h1>
      {products && (
        <div>
          <TableUI headers={headers} contents={products} />
        </div>
      )}
    </div>
  );
};

export default Products;
