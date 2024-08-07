const getUser = (userId) => {
  const users = [
    {
      id: 1,
      name: "User 1",
      salary: 1000,
    },
    {
      id: 2,
      name: "User 2",
      salary: 2000,
    },
    {
      id: 3,
      name: "User 3",
      salary: 3000,
    },
    {
      id: 4,
      name: "User 4",
      salary: 4000,
    },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      const user = users.find(({ id }) => userId === id);
      resolve(user);
    }, Math.random * 1000);
  });
};

const ids = [1, 2, 3, 4];
const totalPromise = new Promise((resolve) => {
  let total = 0;
  let count = 0;
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    getUser(id).then((user) => {
      total += user.salary;
      count++;
      if (count === ids.length) {
        resolve(total);
      }
    });
  }
});
totalPromise.then((total) => {
  console.log(total);
});

// console.log(getSalary().then());
// Yêu cầu tính tổng thu nhập của các user trong ids
// Ràng buộc không dùng async await, PromiseAll, setTimeout

// Promise.all: Chạy đồng thời - áp dụng trong trường hợp
// Promise.all(arrayPromise)
const promiseArr = ids.map((id) => getUser(id));
// console.log(Promise.all(promiseArr).then((result) => console.log(result)));
Promise.all(promiseArr).then((users) => {
  const total = users.reduce((prev, cur) => prev + cur.salary, 0);
  console.log(total);
});

// promise microtask: ưu tiên trước
// macro task
// so sánh timer sau
