# Thiết kế CSDL

## Đối tượng

### Phim

- **ID**: String
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

- **ID**: String
- Tên rạp: String
- Thành phố: String
- Địa chỉ: String
- Số điện thoại: String
- Danh sách các phòng: [String]

### Suất chiếu

- **ID phim**: String
- **ID rạp**: String
- **Phòng**: String
- **Ngày chiếu**: Date
- **Giờ chiếu**: Date
- Loại (2D, 3D, Phụ đề, v.v.): String
- Tình trạng ghế ngồi (chỉ làm loại ghế đơn: đang chọn, đã bán, có thể chọn): [[String]]