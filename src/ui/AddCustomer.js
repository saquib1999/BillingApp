import React, { useContext, useEffect, useState } from "react";
import { getCustomer } from "../models/Products";
import DropDown from "./DropDown";
import MedicalContext from "../contextprovider/medicalcontext";

const AddCustomer = (props) => {
  const fixCustList = useContext(MedicalContext)?.map((data) => ({
    ...data,
    key: data.GST,
  }));
  const { customer } = props;
  const [customers, setCustomers] = useState(fixCustList);
  const [newM, setNewM] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pan, setPan] = useState("");
  const [gst, setGst] = useState("");
  const [dlNo, setDlNo] = useState("");

  const onInputChange = (value) => {
    setCustomers(
      fixCustList.filter((c) =>
        c.MEDICAL.toLocaleUpperCase().includes(value.toLocaleUpperCase())
      )
    );
  };
  const onSelectCustomers = (customer) => {
    props.setCustomer(customer);
  };
  const [addc, setAddc] = useState(true);

  const onAddEdit = () => {
    if (addc) return;
    onSelectCustomers({
      MEDICAL: name,
      ADDRESS: address,
      DL_NO: dlNo,
      GST: gst,
      PAN_NO: pan,
    });
    console.log("object");
  };
  return (
    <div>
      <button className="btn btn-primary" onClick={() => setNewM(!newM)}>
        {!newM ? "New Medical" : "Existing Medical"}
      </button>
      <br />
      {!newM ? (
        <>
          <label>Medical Name</label>

          <DropDown
            dropDownName="MEDICAL"
            onSelect={onSelectCustomers}
            onInputChange={onInputChange}
            options={customers}
            placeholder={"Select medical"}
          />
        </>
      ) : (
        <>
          <label>Medical Name</label>
          <br />
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <br />
          {!addc && (
            <>
              <label>Address </label> <br />
              <input
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <br />
              <label>GST No </label> <br />
              <input
                value={gst}
                onChange={(e) => {
                  setGst(e.target.value);
                }}
              />
              <br />
              <label>DL No </label> <br />
              <input
                value={dlNo}
                onChange={(e) => {
                  setDlNo(e.target.value);
                }}
              />
              <br />
              <label>Pan </label> <br />
              <input
                value={pan}
                onChange={(e) => {
                  setPan(e.target.value);
                }}
              />
              <br />
            </>
          )}
          <button
            className="btn btn-primary"
            onClick={() => {
              onAddEdit();
              setAddc(!addc);
            }}
          >
            {!addc ? "Add" : "Edit"}
          </button>
        </>
      )}
    </div>
  );
};

export default AddCustomer;
