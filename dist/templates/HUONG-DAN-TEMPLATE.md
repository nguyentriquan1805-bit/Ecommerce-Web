# Template nhập dữ liệu Gói Thương

## 1. Danh mục sản phẩm

Dùng `mau-san-pham-goi-thuong.xlsx`. Bản demo có đúng 13 cột: SKU biến thể, tên, danh mục, giá, tồn, kích thước, gram, người nhận, dịp, sở thích, style, điều cần tránh và thuộc tính quà. Điền từ dòng 2 trở xuống và giữ nguyên tên cột ở dòng 1.

Mỗi màu hoặc hương dùng một SKU biến thể và một dòng riêng, ví dụ `TRA01-JAS`, `TRA01-OLO`. Cột kích thước nhập `Dài x Rộng x Cao` bằng mm. Cột Thuộc tính quà dùng dạng `gift:consumable|color:cream|age:12`.

Ảnh đặt trong một thư mục riêng. Tên ảnh phải dùng đúng SKU biến thể, ví dụ `TRA01-JAS_front.jpg`, `TRA01-JAS_main.webp` hoặc `TRA01-JAS_2.jpg`. Mỗi SKU nhận tối đa 5 ảnh; ảnh có `front` hoặc `main` được ưu tiên làm mặt chính.

## 2. Bộ prompt

Dùng `mau-bo-prompt.json`. Website chọn đúng một bộ có người nhận, dịp và style khớp questionnaire. Nếu nhiều bộ cùng khớp, trường `priority` lớn hơn được chọn.

`combinationPrompt` chỉ bổ sung tiêu chí ghép sản phẩm. `imagePrompt` chỉ bổ sung art direction. Chúng không được phép thay đổi hard filter, productId, số lượng, kích thước, hộp hoặc tọa độ đã kiểm tra.

## 3. Tổ hợp sản phẩm

Dùng `mau-to-hop-san-pham.csv`. Cột `productSkus` chứa 2–4 SKU, ngăn cách bằng dấu `|`. Tổ hợp mẫu chỉ được dùng khi tất cả SKU đang bán, còn hàng, không vi phạm điều cần tránh và vượt qua kiểm tra xếp hộp.
