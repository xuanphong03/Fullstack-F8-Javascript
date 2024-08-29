# Regular Expression (Regex):

- Biểu thức chính quy
- Biểu thức để xử lý chuỗi nâng cao

* So khớp
* Cắt chuỗi
* Thay thế

Khi làm việc với Regex, xây dựng lên 1 pattern

Cấu tạo pattern
/regex/modifier

Website test Regex: https://regex101.com/

## Các ký hiệu cơ bản

string ==> So khớp chuỗi string trong biểu thức có nằm trong chuỗi cần kiểm tra không
^ (Đặt ở đầu biểu thức, sau dấu phân cách /) ==> Kiểm tra biểu thức nằm ở đầu chuỗi
$ (Đặt ở cuối biểu thức, trước dấu phân cách /) ==> Kiểm tra biểu thức nằm ở cuối chuỗi

[min-max] ==> Kiểm tra các ký tự từ min đến max (A-Z, a-z, 0-9)

[char_list] ==> Kiểm tra các ký tự ([abc])

Lưu ý: Các biểu thức trong cặp ngoặc vuông sẽ kết hợp với nhau theo điều kiện OR
Lưu ý: Nếu các biểu thức không cùng nằm trong 1 cặp ngoặc vuông nó sẽ kết hợp với nhau theo điều kiện AND và phải đúng thứ tự

- {min,} ==> Độ dài của biểu thức lớn hoặc bằng min
- {value} ==> Độ dài của biểu thức bằng value
- {min, max} ==> Độ dài của biểu thức từ min đến max

Ký hiệu viết tắt của độ dài

```
+ ==> {1,}
* ==> {0,}
? ==> {0,1}
```
