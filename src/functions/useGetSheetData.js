import { useContext } from "react";
import * as XLSX from "xlsx";
import FileContext from "../contextprovider/fileContext";

const createFileObj = async (file, name) => {
  // let response = await fetch(path);
  // let data = await response.blob();

  return new File([file], name);
};
const getDataArray = async (sheetName) => {
  const fileObj = await createFileObj("./detail/Data.xlsx", "Data.xlsx");
  console.log(fileObj);
  const data = await fileObj.arrayBuffer();
  const workbook = XLSX.read(data);
  const worksheet = workbook.Sheets[sheetName];
  const jsonDataArray = XLSX.utils.sheet_to_json(worksheet);
  console.log(jsonDataArray);
  return jsonDataArray;
};

const useGetDataArray = () => {
  const { file } = useContext(FileContext);
  console.log(file);

  const getDataArray = async (sheetName) => {
    const fileObj = createFileObj(file, "Data.xlsx");

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[sheetName];
    const jsonDataArray = XLSX.utils.sheet_to_json(worksheet);
    console.log(jsonDataArray);
    return jsonDataArray;
  };

  return { getDataArray };
};

export { useGetDataArray };
