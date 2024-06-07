# Vòng lặp

# 1. forEach(callback): Lặp từ đầu mảng đến cuối mảng và không dừng được

# 2. map(callback): Duyệt qua từng phần tử của mảng ban đầu.

- Trả về một mảng mới có số phần tử bằng số phần tử của mảng ban đầu và giá trị các phần từ của mảng mới là giá trị của callback (callback return về giá trị gì, lưu vào mảng mới)

# 3. filter(callback)

- Duyệt qua từng phần tử của mảng ban đầu
- Trả về 1 mảng mới, giá trị phần tử của mảng mới sẽ là giá trị của mảng ban đầu nếu callback trả về truthy

# 4. some(callback): Duyệt qua từng phần tử của mảng ban đầu

- Trả về giá trị true / false
- Trả về true nếu có ít nhất 1 lần return trong callback là truthy

# 5. splice(index, number) Xóa phần tử trong mảng

- index: Vị trị cần xóa
- number: số phần tử muốn xóa kể từ index
- Thay đổi mảng ban đầu

# 6. every(callback): Duyệt qua từng phần tử của mảng ban đầu

- Trả về giá trị true / false
- Trả về true nếu tất cả các phần tử đều return trong callback là truthy

# 7. find(callback):

- Cách hoạt động giống filter
- Trả về phần tử đầu tiên tìm được

# 8. findLast(callback):

- Cách hoạt động giống filter
- Trả về phần tử cuối cùng tìm được
