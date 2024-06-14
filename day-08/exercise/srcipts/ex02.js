const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

function customer(name, age, address) {
  return {
    name,
    age,
    address,
  };
}

function createCustomers(customers) {
  let newCustomers = [...customers];
  newCustomers.sort(function (cusA, cusB) {
    if (cusB.age > cusA.age) {
      return -1;
    }
  });

  newCustomers = newCustomers.map(function (customer) {
    return { ...customer, shortName: customer.name };
  });
  return newCustomers;
}

const result = createCustomers(customers);
console.log(result);
