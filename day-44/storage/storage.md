Các bộ nhớ trình duyệt

# 1. Local storage

- Dung lượng lưu trữ lớn: 10Mb
- Chỉ lưu trữ text
- Thời gian lưu trữ không giới hạn
- Server không thể can thiệp (chỉ xử lý ở phía trình duyệt)
- Dễ bị tấn công XSS
- Phân biệt theo origin: scheme + hostname + port

Code:

- localStorage.getItem(key);
- localStorage.setItem(key, value);
- localStorage.removeItem(key);
- localStorage.clear()
  Thao tác như 1 giống object

# 2. Session storage

- Dung lượng lưu trữ lớn: 10Mb
- Chỉ lưu trữ text
- Thời gian lưu trữ theo phiên (Tắt trình duyệt là mất)
- Server không thể can thiệp (chỉ xử lý ở phía trình duyệt)
- Dễ bị tấn công XSS

Code:

- sessionStorage.getItem(key);
- sessionStorage.setItem(key, value);
- sessionStorage.removeItem(key);
- sessionStorage.clear()
  Thao tác như 1 giống object

# 3. Cookie

- Dung lượng lưu trữ thấp: (Khoảng 4kb)
- Chia sẻ dữ liệu tới các subdomain
- Chỉ lưu trữ được text
- Phân biệt theo path
- Server có thể đọc được cookie và set cookie
- Có chế độ bảo mật:

* HttpOnly: Chỉ server mới đọc được và set cookie
* Secure: Hoạt động trong https

- Dễ bị tấn công CSRF
- Có thể quy định được thời gian lưu trữ:

* session cookie
* persistent cookies

Cấu tạo cookie
key=value;path=/;expire=thoi-han|max-age=thoi-han;domain=ten-mien;httpOnly
// Để thời gian ở múi giờ UTC
