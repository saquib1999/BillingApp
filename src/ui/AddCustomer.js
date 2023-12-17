import React, { useContext, useEffect, useState } from "react";
import { getCustomer } from "../models/Products";
import DropDown from "./DropDown";
import MedicalContext from "../contextprovider/medicalcontext";

const AddCustomer = (props) => {
  const fixCustList = useContext(MedicalContext)?.map((data) => ({
    ...data,
    key: data.GST,
  }));

  const [customers, setCustomers] = useState(fixCustList);

  const onInputChange = (value) => {
    setCustomers(
      fixCustList.filter((c) => c.MEDICAL.includes(value.toLocaleUpperCase()))
    );
  };
  const onSelectCustomers = (customer) => {
    props.setCustomer(customer);
  };

  return (
    <div>
      <DropDown
        dropDownName="MEDICAL"
        onSelect={onSelectCustomers}
        onInputChange={onInputChange}
        options={customers}
        placeholder={"Select medical"}
      />
    </div>
  );
};

export default AddCustomer;
