// Async function
// Await Operator

// await func1()
// await func2()
// await func3()
// ===> Nằm trong hàm async

// Hàm async luôn trả về 1 promise

// const something = async () => {
//   const a = 1;
//   console.log(a);
// };
// something();

const getA = () =>
  new Promise((resolve, reject) => {
    return setTimeout(() => {
      //   resolve("Get A");
      reject("Lỗi get A");
    }, 1000);
  });

const getB = () =>
  new Promise((resolve) => {
    return setTimeout(() => {
      resolve("Get B");
    }, 2000);
  });

const getC = () =>
  new Promise((resolve) => {
    return setTimeout(() => {
      resolve("Get C");
    }, 1500);
  });

// (async () => {
//   //   const b = await getB();
//   //   console.log(b);
//   //   const c = await getC();
//   //   console.log(c);

//   try {
//     const a = await getA();
//     console.log(a);
//     if (!a) {
//       throw new Error("Không có kết quả");
//     }
//   } catch (error) {
//   } finally {
//     // console.log("ok chưa");
//   }
// })();

const getResult = async () => {
  //   return await getA(); Khác nhau: Không thể xử lý bắt lỗi ở ngoài
  //   return getA();
  try {
    return await getA();
  } catch (error) {}
};

// console.log(getResult());
getResult()
  .then((data) => console.log(data))
  .catch((e) => console.log(e));
