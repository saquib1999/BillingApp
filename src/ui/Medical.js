import React, { useContext, useEffect, useState } from "react";
import TableUI from "./TableUI";
import MedicalContext from "../contextprovider/medicalcontext";

const Medical = () => {
  const context = useContext(MedicalContext);
  const [medicals, setMedicals] = useState(null);
  const [headers, setHeaders] = useState(null);
  useEffect(() => {
    const getFile = async () => {
      const jsonDataArray = context;
      const jsonData2Array = jsonDataArray.map((data) => ({
        ...data,
        key: data.BATCH_NO,
      }));

      setMedicals(jsonData2Array);
      setHeaders(Object.keys(jsonDataArray[0]));
    };
    getFile();
  }, []);
  return (
    <div>
      <h1>Medical List</h1>
      {medicals && (
        <div>
          <TableUI headers={headers} contents={medicals} />
        </div>
      )}
    </div>
  );
};

export default Medical;
