import * as XLSX from "xlsx";

const createFileObj = async (path, name) => {
  let response = await fetch(path);
  let data = await response.blob();

  return new File([data], name);
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

export { getDataArray };
