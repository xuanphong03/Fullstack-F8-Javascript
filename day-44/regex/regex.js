// const str = "hoanganit19";
// const pattern = /i[abc]/;

// console.log(pattern.test(str));

// const pattern = /^(0|\+84)[0-9]{9}$/;
// const phone = "0865783359";
// console.log(pattern.test(phone));

// const str = "A";
// const pattern = /[^a-zA-Z0-9-_ ]/;
// console.log(pattern.test(str));

// Kiểm tra trong chuỗi có dấu chấm hay không?
// const pattern = /\./;
// const email = "xuanphong@gmail.com";
// console.log(pattern.test(email));

// ^[a-zA-Z](([a-zA-Z0-9-_])+|\.[^-_.])+[a-zA-Z0-9]*@(([a-zA-Z][a-zA-Z0-9-_]*[a-zA-Z0-9]|[a-zA-Z])\.)+[a-zA-Z]{2,}$

// Cắt chuỗi str
// const str = "Hello Anh em 0123456789 và 0987654321";
// const pattern = /(0|\+84)\d{9}/g;
// const result = str.match(pattern);
// console.log(result);

// const str = "xuanphong.web@gmail.com";
// const pattern =
//   /^([a-zA-Z][a-zA-Z0-9-_.]+[a-zA-Z0-9])@(?:(?:[a-zA-Z][a-zA-Z0-9-_]*[a-zA-Z0-9]|[a-zA-Z])\.)+[a-zA-Z]{2,}$/;
// const result = str.match(pattern);
// console.log(result);

// Situation in Regex

let content = `Lorem Ipsum is hoangan@fullstack.edu.vn simply dummy text of the printing and typesetting industry. Lorem Ipsum  hoangan.web@gmail.com has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
const pattern =
  /(^[a-zA-Z][a-zA-Z0-9-_.]+[a-zA-Z0-9]@(([a-zA-Z][a-zA-Z0-9-_]*[a-zA-Z0-9]|[a-zA-Z])\.)+[a-zA-Z]{2,}$)/g;
content = content.replace(pattern, `<a href="mailto $1">$1</a>`);
document.body.innerHTML = content;

/**
 * $1: Group 1
 * $2: Group 2
 */
