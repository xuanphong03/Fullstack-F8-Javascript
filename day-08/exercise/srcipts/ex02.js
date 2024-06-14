const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

function createCustomers(customers) {
  const sortedCustomersList = [...customers].map(function (customer) {
    if (!customer.shortName) {
      let positionFirstWhiteSpace = customer.name.indexOf(" ");
      let positionLastWhiteSpace = customer.name.lastIndexOf(" ");
      let shortName =
        customer.name.slice(0, positionFirstWhiteSpace) +
        customer.name.slice(positionLastWhiteSpace);
      customer.shortName = shortName;
    }
    return customer;
  });

  sortedCustomersList.sort(function (cusNext, cusPrev) {
    if (cusPrev.age > cusNext.age) {
      return -1;
    }
  });
  return sortedCustomersList;
}

const result = createCustomers(customers); // Tạo hàm createCustomers này.

let ex02_input = document.querySelector(".ex02_input");
let ex02_output = document.querySelector(".ex02_output");
ex02_input.innerHTML = `Input: customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];`;
ex02_output.innerHTML = `Output: result= ${JSON.stringify(result)}`;
