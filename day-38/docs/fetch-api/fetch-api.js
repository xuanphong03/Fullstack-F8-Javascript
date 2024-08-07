/**
 * API: 3 loại:
 * - Web API
 * - OS API
 * - Library API
 *
 * Client (Front-end) => API => Server (Back-end)
 * Để giao tiếp giữa Client và Server có 2 cách:
 * - XHR
 * - Fetch: Trả về 1 promise
 */

/**
 * HTTP REQUEST
 * - url
 * - method
 * - header
 * - body
 *
 * HTTP RESPONSE
 * - body
 * - status (code, text)
 * - header
 */

const url = "http://localhost:3001/posts";
const response = fetch(url, {
  method: "GET",
  headers: {
    "x-api-key": "ahihi",
  },
})
  .then((res) => {
    return res.json();
  })
  .then((data) => console.log(data));
// console.log(response);
