import { regexPatterns } from "../constants/regex.js";
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

export const handleLoading = (isLoading = false) => {
  const loadingModalEl = document.querySelector(".modal-loading");
  if (!loadingModalEl) {
    return;
  }
  if (isLoading) {
    loadingModalEl.classList.replace("invisible", "visible");
    loadingModalEl.classList.replace("opacity-0", "opacity-100");
  } else {
    loadingModalEl.classList.replace("visible", "invisible");
    loadingModalEl.classList.replace("opacity-100", "opacity-0");
  }
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
  return hashtag.trim();
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
  return firstName.charAt(0).toUpperCase().trim();
};

export const showToast = (text = "", type = "success") => {
  let background;
  if (type === "success") {
    background = "green";
  } else if (type === "error") {
    background = "red";
  } else if (type === "warning") {
    background = "yellow";
  } else if (type === "info") {
    background = "blue";
  }

  Toastify({
    text,
    className: "info",
    style: {
      background,
    },
  }).showToast();
};

export const convertDateFormat = (dateString) => {
  // Split the date string into an array [mm, dd, yyyy]
  const [month, day, year] = dateString.split("/");

  // Return the date in dd/mm/yyyy format
  return `${day}/${month}/${year}`;
};

export const convertBlogContent = (content) => {
  content = content.replaceAll("<", "&lt;").replaceAll(">", "&gte;");
  const { telephonePattern, emailPattern, youtubePattern, normalLinkPattern } =
    regexPatterns;
  content = content.replaceAll(telephonePattern, (telephoneNumber) => {
    return `<a class='hover:text-[#6eeb83] transition-all underline' target='_blank' href='tel:${telephoneNumber}'>${telephoneNumber}</a>`;
  });
  content = content.replaceAll(emailPattern, (email) => {
    return `<a class='hover:text-[#6eeb83] transition-all underline' target='_blank' href='mailto:${email}'>${email}</a>`;
  });
  content = content.replaceAll(normalLinkPattern, (linkUrl) => {
    if (youtubePattern.test(linkUrl)) {
      youtubePattern.lastIndex = 0;
      return linkUrl;
    }
    return `<a class='hover:text-[#6eeb83] transition-all underline' target='_blank' href='${linkUrl}'>${linkUrl}</a>`;
  });
  content = content.replaceAll(youtubePattern, (youtubeUrl) => {
    youtubePattern.lastIndex = 0;
    let videoYoutubeId = youtubeUrl.split(
      /(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/
    )[2];
    if (videoYoutubeId) {
      videoYoutubeId = videoYoutubeId.split(/[^0-9a-z_-]/i)[0];
      return `
      <iframe
        class='my-2'
        width='400'
        height='250'
        src='https://www.youtube.com/embed/${videoYoutubeId}'
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen></iframe>
    `;
    }
  });

  return content;
};
