# Thiết kế CSDL

## Đối tượng

### Phim

- <u>ID</u>: String
- Tên phim gốc: String
- Tên phim tiếng Việt: String
- Đạo diễn: String
- Thể loại: [String]
- Nhà sản xuất: String
- Diễn viên: [String]
- Quốc gia: String
- Ngày công chiếu: Date
- Nội dung phim (tóm tắt): String
- Loại nhãn: String
- Thời lượng (phút): Number (int)
- Điểm đánh giá (sao): Number (float)
- Số lượng đánh giá: Number (int)

### Rạp

- <u>ID</u>: String
- Tên rạp: String
- Thành phố: String
- Địa chỉ: String
- Số điện thoại: String
- Danh sách các phòng: [String]

### Suất chiếu

- <u>ID phim</u>: String
- <u>ID rạp</u>: String
- <u>Phòng</u>: String
- <u>Ngày chiếu</u>: Date
- <u>Giờ chiếu</u>: Date
- Loại (2D, 3D, Phụ đề, v.v.): String
- Tình trạng ghế ngồi (chỉ làm loại ghế đơn: đang chọn, đã bán, có thể chọn): [[String]]