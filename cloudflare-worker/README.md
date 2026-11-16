# Worker tạo ảnh cho Gói Thương

`worker.js` là Worker tương thích với payload hiện tại của website:

- nhận `multipart/form-data` với `prompt`, `width`, `height`, `seed` và tối đa bốn ảnh `input_image_0..3`;
- gọi `@cf/black-forest-labs/flux-2-klein-4b` bằng Workers AI binding;
- trả JSON `{ "image": "<base64>" }` mà frontend đọc trực tiếp;
- hỗ trợ CORS và trả chi tiết lỗi để chẩn đoán.

Trong Cloudflare Worker cần có:

1. Secret `API_KEY`.
2. Workers AI binding có tên chính xác là `AI`.
3. Dán nội dung `worker.js`, lưu và Deploy.

Ảnh tham chiếu do website tự thu xuống tối đa 500 px mỗi cạnh, thấp hơn giới hạn 512 px của FLUX.
