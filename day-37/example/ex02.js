// Class - OOP - SOLID
class Person {
  // Khởi tạo theo ES13
  name;
  email;
  #income = 100000; // Private property
  static message = "Oke chưa"; // Static property

  //Phương thức khởi tạo - Chạy đầu tiên
  constructor(name, email) {
    //Khởi tạo thuộc tính
    this.name = name;
    this.email = email;
    console.log(this.#income);
  }

  getIncome() {
    return this.#income;
  }
  #getName() {
    return this.name;
  }
  #getEmail() {
    return this.email;
  }
  getInfo() {
    return [this.#getName(), this.#getEmail()];
  }
  // Static method
  static getMessage() {
    return this.message;
  }
}

const person = new Person("Phong", "phong@gmail.com"); // instance
console.log(person.getInfo());
console.log(Person.message);
console.log(Person.getMessage());
