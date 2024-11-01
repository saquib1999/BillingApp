import React, { useContext } from "react";
import FileContext from "./contextprovider/fileContext";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const { setFile } = useContext(FileContext);
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <input
        type={"file"}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
