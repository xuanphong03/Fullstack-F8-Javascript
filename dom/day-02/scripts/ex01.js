var linkEl = document.querySelector("a");
console.log(linkEl.href);
console.log(linkEl.className);
console.log(linkEl.id);
console.log(linkEl.target);
linkEl.href = "https://google.com";
// Lưu ý: Chỉ khả dụng với các thuộc tính hợp lệ của thẻ html

// getAttribute(tenthuoctinh)
console.log(linkEl.getAttribute("data-width"));

// setAttribute
linkEl.setAttribute("data-width", "300");
console.log(linkEl.getAttribute("data-width"));

// removeAttribute(tenthuoctinh)
// linkEl.removeAttribute("data-width");
linkEl.removeAttribute("target");

// Trong HTML, có 1 loại thuộc tính do dev tự thêm và xử lý bằng JS ==> data attribute (data-*)

// Ngoài ra có thể truy cập vào data-attribute bằng dataset object
console.log(linkEl.dataset);
linkEl.dataset.height = 500;
linkEl.dataset.animationDuration = "1s";
console.log(linkEl.dataset);

delete linkEl.dataset.width;
console.log(linkEl.dataset);

// Classlist

//add
linkEl.classList.add("text-1", "text-2");
//remove
linkEl.classList.remove("text-1");
//update
linkEl.classList.replace("text-2", "text-12");
// toggle
linkEl.classList.toggle("content");
linkEl.classList.toggle("content");
// kiểm tra
console.log(linkEl.classList.contains("text-12"));
console.log(linkEl.classList.contains("text-1"));

console.log(linkEl.classList);
