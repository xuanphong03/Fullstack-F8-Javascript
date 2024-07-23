class Person {
  // Thuộc tính
  constructor(name, email) {
    this.name = name;
    this.email = email;
    console.log("Constructor của Person");
  }
  // Phương thức
  getName() {
    return this.name;
  }
  getEmail() {
    return this.email;
  }
}

class User extends Person {
  constructor(name, email) {
    console.log("Constructor của User");
    super(name, email);
  }

  getInfo() {
    return [this.getName(), this.getEmail()];
  }
}

var user = new User("Xuân Phong", "xuanphong@gmail.com");
console.log(user.getInfo());
