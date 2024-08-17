# 1. Khái niệm

Bình thường, Các API sẽ ở trạng thái public
Tuy nhiên, muốn bảo vệ API ==> Cần phải thông qua các hình thức xác thực

- API key
- Basic Auth
- Bearer
- OAuth 2.0

# 2. Authentication và Authorization

1.  Authentication: Xác thực danh tính => Trả lời câu hỏi bạn là ai?
    Đăng nhập => Trả về thông tin
2.  Authorization: Sau khi xác minh danh tính xong
    => Kiểm tra quyền của user (được phép làm gì và không được phép làm gì) - Ủy quyền
    Kiểm tra quyền hạn => Trả về thông tin

# 3. Hình thức xác thực

- Cookies

# JWT

- Gồm 3 phần:

* Header: chứa tên thuật toán mã hóa và type (mặc định là JWT)
* Payload: Dữ liệu gồm thông tin bắt buộc (sub, iat, exp) và tự thêm
* Signature(Chữ ký): Sử dụng 1 hàm tương ứng với thuật toán mã hóa. Bên trong tiến hành nối base64(header).base64(payload)
  và chứa 1 mã số bí mật

+Khi jwt được tạo ra => Không hủy được trừ khi nó hết hạn
//openssl rand -hex 32

- refresh token: dùng để cấp lại access token mới
  Khi đăng xuất => Lưu token vào black list
  Mỗi ngày sẽ check xem token nào hết hạn => Xóa
