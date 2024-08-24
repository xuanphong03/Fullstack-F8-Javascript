// Func: Xử lý XSS
export const escapeHTML = (str) => {
  return str.replace(/[&<>"'\/]/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      case "'":
        return "&#39;";
      case "/":
        return "&#x2F;";
      default:
        return char;
    }
  });
};

// Tạo hash tag cho blog
export const createHashtag = (name) => {
  const normalized = name
    .normalize("NFD") // Chuẩn hóa Unicode để tách các dấu khỏi ký tự
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu
    .replace(/đ/g, "d") // Thay thế chữ "đ" thành "d"
    .replace(/Đ/g, "D") // Thay thế chữ "Đ" thành "D"
    .toLowerCase(); // Chuyển thành chữ thường

  // Loại bỏ khoảng trắng giữa các từ và thêm dấu #
  const hashtag = `#${normalized.replace(/\s+/g, "")}`;
  return hashtag;
};

// Chuyển ISO 8601 về ngày giờ cụ thể
export const formatDateTime = (isoString) => {
  // Tạo đối tượng Date từ chuỗi ISO 8601
  const date = new Date(isoString);

  // Lấy các thành phần ngày, tháng, năm, giờ, phút, giây
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0, nên cần +1
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  // Ghép các thành phần lại thành chuỗi ngày giờ cụ thể
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  return {
    time: formattedTime,
    date: formattedDate,
  };
};

export const getFirstLetterOfName = (name) => {
  // Tách chuỗi họ tên thành mảng các từ
  const nameParts = name.trim().split(" ");
  // Lấy phần tử cuối cùng trong mảng (tên)
  const firstName = nameParts[nameParts.length - 1];
  // Lấy chữ cái đầu tiên của tên
  return firstName.charAt(0).toUpperCase();
};
