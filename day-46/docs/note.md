## Chỉ cần cài đặt dependency phục vụ production

npm i --product

## Các loại package

- Global: npm i ten_package -g
- Local: npm i ten_package

npm root - g ==> Kiểm tra đường dẫn chứa các dependencies global
npm list - g ==> Liệt kê các dependencies được cài đặt global

## The number A.B.C

A: major change: Thay đổi API
B: new features: số lần thêm tính năng mới mà không ảnh hưởng tới tính năng cũ
C: patch: Số lần fix bug

Khi chạy lệnh update của npm ==> Chỉ update minor và patch
Khi cấu hình ^ ==> Thay đổi 2 số cuối
Khi cấu hình ~ ==> Thay đổi 1 số cuối

## Cập nhật phiên bản

npm update ten_package
npm update ==> Cập nhật tất cả package

## Cài dependency theo phiên bản

npm i ten_package@phien_ban hoặc npm install ten_package@phien_ban
Lưu ý: Tránh dùng @lastest khi cài package

## Package log và package

- package log: Khóa phiên bản và lưu các dependency
- nếu package log có (npm i cài theo package log) còn không thì cài theo package
