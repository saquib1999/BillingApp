import React, { useState } from "react";
import App from "./App";
import FileContext from "./contextprovider/fileContext";
import Input from "./Input";

const Wrapper = () => {
  const [file, setFile] = useState(null);

  return (
    <FileContext.Provider value={{ setFile, file }}>
      {file ? <App /> : <Input />}
    </FileContext.Provider>
  );
};

export default Wrapper;
