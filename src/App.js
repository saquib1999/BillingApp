import { useEffect, useState } from "react";
import "./App.css";
import BillUi from "./bill/BillUi";
import Pdf from "./bill/Pdf";
import { getCustomer } from "./models/Products";
import AddCustomer from "./ui/AddCustomer";
import AddProducts from "./ui/AddProducts";
import NavbarComponent from "./ui/Navbar";
import Billing from "./ui/Billing";
import Medical from "./ui/Medical";
import Products from "./ui/Products";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import MedicalContext from "./contextprovider/medicalcontext";
import ProductContext from "./contextprovider/productcontext";
import { getDataArray } from "./functions/getSheetData";
import Footer from "./ui/Footer";

function App() {
  const MEDICAL_SHEET = "medical";
  const PRODUCT_SHEET = "product";
  const [medicalArray, setMedicalArray] = useState(null);
  const [productArray, setProductArray] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const jsonDataMedical = await getDataArray(MEDICAL_SHEET);
      setMedicalArray(jsonDataMedical);
      const jsonDataProduct = await getDataArray(PRODUCT_SHEET);
      setProductArray(jsonDataProduct);
    };
    getData();
  }, []);
  return (
    <div className="App">
      <Router>
        <div
          className="logo"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img src="./LOGO.png" />
        </div>

        <NavbarComponent />
        <ProductContext.Provider value={productArray}>
          <MedicalContext.Provider value={medicalArray}>
            <Routes>
              <Route exact path="/" element={<Billing />} />

              <Route exact path="/medicals" element={<Medical />} />

              <Route exact path="/products" element={<Products />} />
            </Routes>
          </MedicalContext.Provider>
        </ProductContext.Provider>
        <Footer />

        {/*  <Pdf />
      <BillUi
        billNo={billNo}
        billDate={billDate}
        cd={cd}
        customer={customer}
        products={prodCart}
        grossAmount={grossAmount}
        gstMap={gstMap}
      /> */}
        {/*       <Billing />
         */}
        {/* <Medical /> */}
      </Router>
    </div>
  );
}

export default App;
