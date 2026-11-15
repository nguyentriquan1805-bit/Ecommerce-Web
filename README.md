# Gói Thương — bản demo tương tác

Website thương mại điện tử tiếng Việt dành cho hộp quà tuyển chọn và hộp quà tự phối tại TP.HCM.

## Chạy tại máy

Chạy `node preview-server.mjs`, sau đó mở `http://127.0.0.1:4174`. Nếu cổng này đang bận, đặt biến `GOI_THUONG_PREVIEW_PORT` sang cổng khác trước khi chạy. Server preview có fallback về `index.html` cho các route SPA.

## Phần đang hoạt động trong demo

- Điều hướng SPA với trang chủ, bộ sưu tập, chi tiết hộp, Gift Finder, xác thực demo, builder năm bước, giỏ, checkout, xác nhận, theo dõi, tài khoản, hộp đã lưu và dịp quan trọng.
- Bước cuối của “Tự tạo hộp” là bàn xếp 3D tại `/tu-tao-hop/xep-3d`: mỗi đơn vị sản phẩm là một khối riêng, có kéo/thả, xoay/lật, bắt lưới, khóa vị trí, hoàn tác/làm lại, gợi ý bố cục, vật liệu chèn lót, thử đóng nắp và báo cáo độ ổn định.
- Bố cục 3D hợp lệ được lưu có cấu trúc cùng dòng giỏ hàng; khu vực người bán có thể xem lại mô hình và thứ tự đóng gói gợi ý trong chi tiết đơn.
- Dữ liệu mẫu dùng chung cho danh mục, Gift Finder, builder, giỏ và đơn.
- Giỏ khách, đăng nhập giả lập có returnTo, lưu nháp/dịp theo tài khoản demo bằng localStorage.
- Thanh toán thử nghiệm với ba trạng thái thành công, thất bại và chờ xử lý; không thu tiền.
- Bộ kiểm tra 3D dùng kích thước, khối lượng, collider đơn giản và quy tắc hỗ trợ minh họa. Đây là hỗ trợ xếp hộp, không thay thế bước kiểm tra vật lý của nhân viên đóng gói.
- Khu vực người bán tại `/quan-tri` gồm tổng quan, sản phẩm, tồn kho, tùy chọn hộp, đơn hàng, giao hàng và cài đặt.
- Sản phẩm đã đăng bán, tồn kho, bao bì, thiệp, ruy băng và lịch giao được đồng bộ sang cửa hàng, Gift Finder, Builder và checkout trong cùng trình duyệt.
- Ảnh sản phẩm có thể chọn trực tiếp từ thiết bị (JPG/PNG/WebP, tối đa 5MB/ảnh và 8 ảnh) và được lưu trong localStorage của trình duyệt demo.

## Phần chưa kết nối vận hành thật

- Không có backend, xác thực an toàn, cơ sở dữ liệu, giữ tồn đa người dùng, cổng thanh toán, đơn vị giao hàng, email hay tiến trình nhắc nền.
- Mô hình 3D hiện dùng hình học hộp/trụ nhẹ để chạy ngay trên trình duyệt. Trường GLB trong quản trị chỉ kiểm tra tên và dung lượng tệp ở bản demo; cần kho tệp, xử lý mô hình, collider và kiểm duyệt ở backend để vận hành thật.
- Ảnh đang là khung minh họa có tên sản phẩm theo yêu cầu hiện tại; cần thay bằng ảnh sản phẩm đã xác nhận trước khi vận hành.
- Giá, SKU, tồn kho, vùng và khung giao đều là dữ liệu minh họa.
- Bản thật cần kiểm tra quyền sở hữu, giá, tồn, suất giao và trạng thái thanh toán ở server.

## Tài khoản demo

Dùng mật khẩu `goithuong` cho tất cả tài khoản demo. Không nhập mật khẩu thật.

- Chủ cửa hàng: `owner@goithuong.test`
- Nhân viên sản phẩm: `sanpham@goithuong.test`
- Nhân viên đơn hàng: `donhang@goithuong.test`
- Khách hàng: email hợp lệ bất kỳ

Đăng ký công khai chỉ tạo tài khoản khách hàng. Phân quyền ở đây chỉ là mô phỏng giao diện; bản vận hành phải xác thực và kiểm tra quyền trên backend cho mọi yêu cầu.

## Quy tắc lịch nhắc

Múi giờ hiển thị: Asia/Ho_Chi_Minh. Dịp lặp hằng năm đã qua sẽ chuyển sang năm kế tiếp. Với 29/2, bản vận hành cần chính sách rõ; demo hiển thị ngày đã nhập và không tự gửi email.
