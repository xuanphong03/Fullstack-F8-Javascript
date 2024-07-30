# let, const

let, const chỉ hoạt động trong scope mà nó khai báo (cả với block scope)
let: - Được phép gán lại - Không được khai báo lại trong cùng 1 scope
const: - Không được gán lại - Khi khai báo phải gán luôn

# destructuring => áp dụng với Object / Array

- Đổi tên sau khi Destructuring
  const { name, email, shipping_address: shippingAddress } = user;

- Gán giá trị mặc định
  const { name, email, shipping_address: shippingAddress, age = 0 } = user;

- bỏ qua age
  const usersList = ["Hoàng An", "hoangan@gmail.com", 32, "Hà Nội"];
  const [fullName, email, , address] = usersList;

# spread operator
