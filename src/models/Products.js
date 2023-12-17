export const readFile = () => {
  const promise = new Promise((resolve, reject) => {
    const filereader = new FileReader();
  });
};

export const getProducts = () => {
  var productList = [];
  var product = {
    key: 1,
    name: "RABENOOR-DSR",
    pack: "10*10",
    hsn: "30049099",
    batchNo: "AC22005",
    expiry: " Dec-23",
    mrp: 99,
    ptr: 70.71,
    pts: 63.64,
  };
  var product2 = {
    key: 1,
    name: "SHINEFLAM-DSR",
    pack: "10*10",
    hsn: "30049099",
    batchNo: "AC22005",
    expiry: " Dec-23",
    mrp: 99,
    ptr: 70.71,
    pts: 63.64,
  };
  productList.push(product);
  productList.push(product2);

  return productList;
};

export const getCustomer = () => {
  var customerList = [];
  var customer = {
    key: 1,
    name: "INDIA PHARMA",
    address: "SHOP NO 6, PRESTIGE CLASSIC, DAWA BAZAR, CHINCHWAD",
    dlNo: " 20B-MH-PZ3-417692/ 21B-MH-PZ3-417693",
    gstNo: "AC22005",
    expiry: "27BMNPC1536P1ZO",
    panNo: "BMNPC1536P",
  };

  var customer2 = {
    key: 2,
    name: "INDIA PHARMA2",
    address: "SHOP NO 6, PRESTIGE CLASSIC, DAWA BAZAR, CHINCHWAD",
    dlNo: " 20B-MH-PZ3-417692/ 21B-MH-PZ3-417693",
    gstNo: "AC22005",
    expiry: "27BMNPC1536P1ZO",
    panNo: "BMNPC1536P",
  };

  var customer3 = {
    key: 3,
    name: "MAYUR PHARMA2",
    address: "SHOP NO 6, PRESTIGE CLASSIC, DAWA BAZAR, CHINCHWAD",
    dlNo: " 20B-MH-PZ3-417692/ 21B-MH-PZ3-417693",
    gstNo: "AC22005",
    expiry: "27BMNPC1536P1ZO",
    panNo: "BMNPC1536P",
  };

  customerList.push(customer);
  customerList.push(customer2);
  customerList.push(customer3);
  customerList.push(customer3);
  customerList.push(customer3);
  customerList.push(customer3);
  customerList.push(customer3);
  customerList.push(customer3);
  customerList.push(customer3);
  customerList.push(customer3);
  customerList.push(customer3);
  customerList.push(customer3);
  customerList.push(customer3);
  customerList.push(customer3);

  return customerList;
};
