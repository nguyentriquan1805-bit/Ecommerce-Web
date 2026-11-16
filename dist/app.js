import { syncPackingConfiguration, validatePackingConfiguration } from "/packing3d.js?v=20261115-8";

const BRAND = {
  name: "Gói Thương",
  tagline: "Gói một chút thương, gửi một người quý.",
};

const boxes = [
  { id:"box-01", slug:"mot-ngay-cua-ban", sku:"GT-B01", name:"Một Ngày Của Bạn", price:349000, occasions:["Sinh nhật"], recipients:["Bạn thân","Người yêu"], style:"Ấm áp", items:["Nến thơm nhỏ 80g","Trà ô long 6 gói","Socola đen 50g"], stock:8, lead:1, tone:"blush", meaning:"Một lời chúc dịu dàng cho ngày của riêng ai đó." },
  { id:"box-02", slug:"hen-mot-chieu-tra", sku:"GT-B02", name:"Hẹn Một Chiều Trà", price:429000, occasions:["Sinh nhật","Kỷ niệm"], recipients:["Bạn thân","Người yêu"], style:"Thư giãn", items:["Trà lài 50g","Mật ong nhỏ 100ml","Bánh quy bơ 80g"], stock:10, lead:1, tone:"sage", meaning:"Một buổi chiều chậm rãi được gói lại thật vừa vặn." },
  { id:"box-03", slug:"minh-lam-hoa-nhe", sku:"GT-B03", name:"Mình Làm Hòa Nhé", price:299000, occasions:["Làm hòa"], recipients:["Người yêu","Bạn thân"], style:"Chân thành", items:["Socola sữa 50g","Trà hoa cúc 6 gói","Thiệp Làm hòa"], stock:6, lead:1, tone:"cream", meaning:"Khi một lời xin lỗi cần thêm chút dịu dàng để bắt đầu." },
  { id:"box-04", slug:"mot-chut-diu-em", sku:"GT-B04", name:"Một Chút Dịu Êm", price:479000, occasions:["Self-care","Sinh nhật"], recipients:["Chính mình","Bạn thân"], style:"Self-care", items:["Nến gỗ tuyết tùng 120g","Muối tắm 150g","Trà bạc hà 6 gói"], stock:7, lead:1, tone:"sage", meaning:"Một khoảng nghỉ nhỏ cho những ngày đã cố gắng rất nhiều." },
  { id:"box-05", slug:"thuong-nhu-lan-dau", sku:"GT-B05", name:"Thương Như Lần Đầu", price:599000, occasions:["Kỷ niệm","Valentine / White Day"], recipients:["Người yêu"], style:"Lãng mạn", items:["Nến hoa hồng 120g","Socola hạnh nhân 90g","Trà hoa hồng 50g","Hoa khô"], stock:5, lead:2, tone:"blush", meaning:"Cho những điều vẫn làm mình mỉm cười như ngày đầu." },
  { id:"box-06", slug:"mua-am-ap", sku:"GT-B06", name:"Mùa Ấm Áp", price:549000, occasions:["Giáng sinh"], recipients:["Bạn thân","Người yêu"], style:"Ấm áp", items:["Nến quế 120g","Cacao 100g","Socola cam 70g","Thiệp mùa lễ"], stock:0, lead:2, tone:"wine", meaning:"Mùi quế, cacao và một lời chúc cho mùa ở cạnh nhau." },
  { id:"box-07", slug:"ban-rat-xung-dang", sku:"GT-B07", name:"Bạn Rất Xứng Đáng", price:249000, occasions:["Self-care","8/3 & 20/10"], recipients:["Chính mình","Bạn thân"], style:"Tươi sáng", items:["Trà berry 6 gói","Socola dâu 50g","Hoa khô"], stock:12, lead:1, tone:"blush", meaning:"Một món nhỏ để nhắc rằng bạn cũng cần được yêu chiều." },
  { id:"box-08", slug:"chuyen-minh-ke", sku:"GT-B08", name:"Chuyện Mình Kể", price:649000, occasions:["Kỷ niệm"], recipients:["Người yêu"], style:"Kỷ niệm", items:["Sổ vải nhỏ","Bút mực gel","Nến trà trắng 120g","Socola 70g"], stock:4, lead:2, tone:"cream", meaning:"Để những chuyện của hai người còn có chỗ được viết tiếp." },
  { id:"box-09", slug:"ngay-nang-nhe", sku:"GT-B09", name:"Ngày Nắng Nhẹ", price:389000, occasions:["Sinh nhật","8/3 & 20/10"], recipients:["Bạn thân"], style:"Tươi sáng", items:["Trà đào 6 gói","Mứt cam 100g","Nến cam ngọt 80g"], stock:9, lead:1, tone:"cream", meaning:"Một chút rực rỡ vừa đủ cho ngày cần thêm niềm vui." },
  { id:"box-10", slug:"o-day-co-minh", sku:"GT-B10", name:"Ở Đây Có Mình", price:519000, occasions:["Làm hòa","Sinh nhật"], recipients:["Bạn thân","Người yêu"], style:"Chân thành", items:["Trà ô long 50g","Nến linen 120g","Sổ nhỏ","Socola 50g"], stock:5, lead:2, tone:"sage", meaning:"Một lời ở cạnh không ồn ào, nhưng đủ để người kia biết." },
  { id:"box-11", slug:"mot-doi-hoa", sku:"GT-B11", name:"Một Đời Hoa", price:799000, occasions:["Valentine / White Day","Kỷ niệm"], recipients:["Người yêu"], style:"Lãng mạn", items:["Nến hoa hồng 180g","Trà hoa 80g","Socola hạnh nhân 120g","Hoa khô tuyển chọn"], stock:3, lead:3, tone:"wine", meaning:"Một hộp đầy đặn cho cột mốc thật sự đáng nhớ." },
  { id:"box-12", slug:"cham-mot-ngay", sku:"GT-B12", name:"Chậm Một Ngày", price:329000, occasions:["Self-care"], recipients:["Chính mình"], style:"Thư giãn", items:["Nến lavender 80g","Trà bạc hà 6 gói","Sổ ghi chú"], stock:11, lead:1, tone:"sage", meaning:"Cho phép mình chậm lại, chỉ trong một ngày thôi cũng được." },
];

const PEXELS_LICENSE="https://www.pexels.com/license/";
const demoImage=(id,file,source,alt)=>({id:`img-${id}`,data:`/assets/products/${file}`,cover:true,alt,source,license:"Pexels"});
const giftItems = [
  {id:"tea-oolong",sku:"GT-I01",name:"Trà ô long rang 50g",category:"Trà",price:99000,size:1,stock:24,lead:1,short:"Ô long rang thơm dịu, vị tròn và hậu ngọt.",long:"Gói trà lá rời 50g dành cho những buổi chiều chậm rãi. Dữ liệu và giá chỉ dùng cho bản demo.",tags:["thư giãn","thanh lịch","không đường"],occasions:["Sinh nhật","Cảm ơn","Self-care"],recipients:["Bạn thân","Đồng nghiệp","Gia đình"],storage:"Khô ráo, tránh nắng",shelfLife:"12 tháng",allergens:[],variants:["Ô long rang"],images:[demoImage("tea-oolong","tea-oolong.jpg","https://www.pexels.com/photo/close-up-of-dry-herb-leaves-16586298/","Lá trà ô long khô")],imageLicense:PEXELS_LICENSE},
  {id:"tea-jasmine",sku:"GT-I02",name:"Trà lài an nhiên 50g",category:"Trà",price:109000,size:1,stock:18,lead:1,short:"Trà lài hương hoa nhẹ, phù hợp hộp quà tinh tế.",long:"Trà lá rời hương lài, đóng gói dạng hộp đứng. Sản phẩm và thông số đang được mô phỏng.",tags:["hương hoa","nhẹ nhàng","không đường"],occasions:["8/3 & 20/10","Sinh nhật","Cảm ơn"],recipients:["Mẹ","Bạn thân","Đồng nghiệp"],storage:"Khô ráo, kín mùi",shelfLife:"12 tháng",allergens:[],variants:["Lài nguyên bản"],images:[demoImage("tea-jasmine","tea-jasmine.jpg","https://www.pexels.com/photo/healthy-products-on-a-zip-lock-containers-9952779/","Các gói trà thảo mộc")],imageLicense:PEXELS_LICENSE},
  {id:"tea-mint",sku:"GT-I03",name:"Trà bạc hà 6 gói",category:"Trà",price:69000,size:1,stock:30,lead:1,short:"Sáu túi trà bạc hà mát dịu, dễ dùng.",long:"Hộp trà túi lọc nhỏ gọn, phù hợp với các hộp quà thư giãn và chăm sóc bản thân.",tags:["thanh mát","self-care","nhẹ"],occasions:["Self-care","Sinh nhật"],recipients:["Bạn thân","Chính mình"],storage:"Khô ráo, kín mùi",shelfLife:"10 tháng",allergens:[],variants:["6 túi lọc"],images:[demoImage("tea-mint","tea-mint.jpg","https://www.pexels.com/photo/black-tea-in-glass-cup-7565516/","Tách trà túi lọc")],imageLicense:PEXELS_LICENSE},
  {id:"candle-ivory",sku:"GT-I04",name:"Nến linen nhỏ 80g",category:"Nến",price:129000,size:2,stock:16,lead:1,short:"Hương vải sạch dịu, đựng trong hũ thủy tinh nhỏ.",long:"Nến thơm hũ 80g, tông kem tối giản. Cần chèn lót và không đặt vật nặng lên trên.",tags:["tối giản","thư giãn","hương sạch"],occasions:["Tân gia","Sinh nhật","Self-care"],recipients:["Bạn thân","Đồng nghiệp","Chính mình"],storage:"Tránh nhiệt và nắng",shelfLife:"24 tháng",allergens:[],variants:["Linen"],images:[demoImage("candle-ivory","candle-linen.jpg","https://www.pexels.com/photo/close-up-shot-of-a-scented-candle-11145797/","Nến thơm trong bát gỗ")],imageLicense:PEXELS_LICENSE},
  {id:"candle-rose",sku:"GT-I05",name:"Nến hoa hồng 120g",category:"Nến",price:169000,size:3,stock:12,lead:1,short:"Nến hũ hương hoa hồng dành cho hộp quà lãng mạn.",long:"Hũ nến 120g có mặt nhãn chính hướng lên khi mở hộp. Cần bọc chống va đập.",tags:["lãng mạn","hương hoa","cao cấp"],occasions:["Kỷ niệm","Valentine / White Day","Sinh nhật"],recipients:["Người yêu","Bạn thân"],storage:"Tránh nhiệt và nắng",shelfLife:"24 tháng",allergens:[],variants:["Hoa hồng"],images:[demoImage("candle-rose","candle-rose.jpg","https://www.pexels.com/photo/romantic-scented-candle-with-red-roses-35532443/","Nến thơm bên hoa hồng")],imageLicense:PEXELS_LICENSE},
  {id:"candle-lavender",sku:"GT-I06",name:"Nến lavender 120g",category:"Nến",price:179000,size:3,stock:10,lead:1,short:"Hương lavender êm, phù hợp quà nghỉ ngơi.",long:"Nến thơm hũ 120g với tông tím nhẹ. Sản phẩm dễ vỡ và phải được giữ ổn định trong hộp.",tags:["lavender","ngủ ngon","self-care"],occasions:["Self-care","Sinh nhật","Cảm ơn"],recipients:["Bạn thân","Chính mình","Mẹ"],storage:"Tránh nhiệt và nắng",shelfLife:"24 tháng",allergens:[],variants:["Lavender"],images:[demoImage("candle-lavender","candle-lavender.jpg","https://www.pexels.com/photo/elegant-cbd-infused-candle-on-lavender-background-30676123/","Nến hũ trên nền lavender")],imageLicense:PEXELS_LICENSE},
  {id:"choco-dark",sku:"GT-I07",name:"Socola đen 70g",category:"Socola",price:89000,size:1,stock:28,lead:1,short:"Thanh socola đen vị đậm, dáng hộp mỏng.",long:"Thanh socola 70g dành cho hộp quà gọn. Không đặt gần nguồn nhiệt và tránh đè nặng.",tags:["vị đậm","tối giản","dễ tặng"],occasions:["Sinh nhật","Cảm ơn","Kỷ niệm"],recipients:["Bạn thân","Đồng nghiệp","Người yêu"],storage:"18–22°C, tránh nắng",shelfLife:"9 tháng",allergens:["Sữa","Có thể chứa hạt"],variants:["70% cacao"],images:[demoImage("choco-dark","choco-dark.jpg","https://www.pexels.com/photo/chocolate-bar-placed-near-carton-in-studio-7260258/","Thanh socola và hộp giấy")],imageLicense:PEXELS_LICENSE},
  {id:"choco-almond",sku:"GT-I08",name:"Socola hạnh nhân 90g",category:"Socola",price:119000,size:1,stock:20,lead:1,short:"Socola hạnh nhân giòn, hợp hộp quà ấm áp.",long:"Thanh socola 90g có hạt hạnh nhân. Cần hiển thị cảnh báo dị ứng trong thông tin đơn.",tags:["hạnh nhân","ngọt vừa","cao cấp"],occasions:["Kỷ niệm","Valentine / White Day","Sinh nhật"],recipients:["Người yêu","Bạn thân"],storage:"18–22°C, tránh nắng",shelfLife:"9 tháng",allergens:["Sữa","Hạnh nhân"],variants:["Hạnh nhân"],images:[demoImage("choco-almond","choco-almond.jpg","https://www.pexels.com/photo/brown-and-white-chocolate-bars-8987040/","Socola hạt xếp chồng")],imageLicense:PEXELS_LICENSE},
  {id:"choco-floral",sku:"GT-I09",name:"Socola hoa 80g",category:"Socola",price:129000,size:1,stock:14,lead:1,short:"Socola trang trí hoa khô cho hộp quà nổi bật.",long:"Thanh socola 80g có bề mặt trang trí. Dễ gãy, không được chịu tải của món khác.",tags:["hoa khô","lãng mạn","trình bày đẹp"],occasions:["8/3 & 20/10","Kỷ niệm","Valentine / White Day"],recipients:["Người yêu","Bạn thân","Mẹ"],storage:"18–22°C, tránh nắng",shelfLife:"6 tháng",allergens:["Sữa","Có thể chứa hạt"],variants:["Hoa trang trí"],images:[demoImage("choco-floral","choco-floral.jpg","https://www.pexels.com/photo/chocolate-and-flowers-14750356/","Socola cùng hoa trắng")],imageLicense:PEXELS_LICENSE},
  {id:"honey",sku:"GT-I10",name:"Mật ong hoa 100ml",category:"Đồ uống",price:89000,size:1,stock:15,lead:1,short:"Hũ mật ong nhỏ dùng kèm trà.",long:"Hũ thủy tinh 100ml có nắp kín. Bắt buộc giữ đứng và bọc chống va đập khi đóng gói.",tags:["tự nhiên","dùng với trà","ấm áp"],occasions:["Cảm ơn","Tân gia","Sinh nhật"],recipients:["Gia đình","Đồng nghiệp","Bạn thân"],storage:"Nơi mát, đậy kín",shelfLife:"18 tháng",allergens:[],variants:["Mật ong hoa"],images:[demoImage("honey","honey-flower.jpg","https://www.pexels.com/photo/shelf-display-of-honey-jars-in-rustic-setting-38164883/","Các hũ mật ong trên kệ")],imageLicense:PEXELS_LICENSE},
  {id:"jam",sku:"GT-I11",name:"Mứt cam 100g",category:"Đồ ăn",price:99000,size:1,stock:13,lead:1,short:"Mứt cam hũ nhỏ cho hộp trà và bánh.",long:"Hũ thủy tinh 100g, cần giữ đứng và tránh va đập. Giá và nhãn hàng là dữ liệu minh họa.",tags:["vị cam","ăn sáng","dùng với bánh"],occasions:["Tân gia","Cảm ơn","Sinh nhật"],recipients:["Gia đình","Bạn thân","Đồng nghiệp"],storage:"Nơi mát; bảo quản lạnh sau mở",shelfLife:"9 tháng",allergens:[],variants:["Cam vàng"],images:[demoImage("jam","jam-orange.jpg","https://www.pexels.com/photo/shelves-with-jars-of-jam-and-marmalade-8441091/","Các hũ mứt trên kệ")],imageLicense:PEXELS_LICENSE},
  {id:"cookies-butter",sku:"GT-I12",name:"Bánh quy bơ 90g",category:"Đồ ăn",price:79000,size:2,stock:22,lead:1,short:"Bánh quy bơ gói nhỏ, hợp dùng cùng trà.",long:"Gói bánh quy 90g dễ vỡ, không chịu tải. Cần giữ phẳng và chừa khoảng đệm quanh hộp.",tags:["bánh ngọt","dùng với trà","dễ tặng"],occasions:["Sinh nhật","Cảm ơn","Giáng sinh"],recipients:["Bạn thân","Đồng nghiệp","Gia đình"],storage:"Khô ráo, đậy kín",shelfLife:"4 tháng",allergens:["Sữa","Gluten","Trứng"],variants:["Bơ nguyên bản"],images:[demoImage("cookies-butter","cookies-butter.jpg","https://www.pexels.com/photo/delicious-homemade-cookies-gift-wrapped-30668209/","Bánh quy gói quà")],imageLicense:PEXELS_LICENSE},
  {id:"coffee-arabica",sku:"GT-I13",name:"Cà phê Arabica 100g",category:"Cà phê",price:129000,size:2,stock:17,lead:1,short:"Cà phê rang xay túi 100g, hương dịu.",long:"Túi cà phê 100g có van một chiều, có thể đặt nằm ngang và không nên bị ép mạnh.",tags:["cà phê","tỉnh táo","thanh lịch"],occasions:["Cảm ơn","Sinh nhật","Tân gia"],recipients:["Đồng nghiệp","Bạn thân","Gia đình"],storage:"Khô ráo, kín khí",shelfLife:"6 tháng",allergens:[],variants:["Xay pha phin"],images:[demoImage("coffee-arabica","coffee-arabica.jpg","https://www.pexels.com/photo/a-pack-of-espresso-on-a-white-surface-13549432/","Túi cà phê trên nền trắng")],imageLicense:PEXELS_LICENSE},
  {id:"cocoa-hot",sku:"GT-I14",name:"Cacao nóng 100g",category:"Đồ uống",price:109000,size:2,stock:19,lead:1,short:"Bột cacao nguyên chất cho một ly ấm.",long:"Hũ bột cacao 100g, cần giữ nắp kín và tránh ẩm. Thông tin chỉ dùng để mô phỏng danh mục.",tags:["ấm áp","không caffeine cao","mùa lễ"],occasions:["Giáng sinh","Sinh nhật","Self-care"],recipients:["Bạn thân","Gia đình","Chính mình"],storage:"Khô ráo, tránh ẩm",shelfLife:"12 tháng",allergens:[],variants:["Cacao nguyên chất"],images:[demoImage("cocoa-hot","cocoa-hot.jpg","https://www.pexels.com/photo/selective-photo-of-brown-powder-on-stainless-spoon-1212845/","Bột cacao và muỗng")],imageLicense:PEXELS_LICENSE},
  {id:"bath-salt",sku:"GT-I15",name:"Muối tắm Himalayan 150g",category:"Self-care",price:119000,size:2,stock:14,lead:1,short:"Muối tắm hồng trong hũ nhỏ thư giãn.",long:"Hũ muối tắm 150g, không dùng làm thực phẩm. Bắt buộc đóng nắp chắc trước khi đặt vào hộp quà.",tags:["spa","thư giãn","màu hồng"],occasions:["Self-care","Sinh nhật","8/3 & 20/10"],recipients:["Bạn thân","Chính mình","Mẹ"],storage:"Khô ráo, tránh ẩm",shelfLife:"24 tháng",allergens:[],variants:["Himalayan"],images:[demoImage("bath-salt","bath-salt-himalayan.jpg","https://www.pexels.com/photo/open-jar-of-bath-salts-18083317/","Hũ muối tắm màu hồng")],imageLicense:PEXELS_LICENSE},
  {id:"bath-salt-herbal",sku:"GT-I16",name:"Muối tắm thảo mộc 150g",category:"Self-care",price:139000,size:2,stock:11,lead:1,short:"Muối tắm phối thảo mộc khô, tông tự nhiên.",long:"Hũ muối tắm 150g có thành phần thảo mộc. Không dùng làm thực phẩm và cần tránh ẩm.",tags:["thảo mộc","spa","tự nhiên"],occasions:["Self-care","Sinh nhật","Cảm ơn"],recipients:["Bạn thân","Chính mình","Mẹ"],storage:"Khô ráo, tránh ẩm",shelfLife:"18 tháng",allergens:[],variants:["Thảo mộc"],images:[demoImage("bath-salt-herbal","bath-salt-herbal.jpg","https://www.pexels.com/photo/crystals-and-herbs-in-glass-jar-20862392/","Hũ muối và thảo mộc")],imageLicense:PEXELS_LICENSE},
  {id:"lip-balm",sku:"GT-I17",name:"Son dưỡng tự nhiên 15g",category:"Self-care",price:79000,size:1,stock:25,lead:1,short:"Hũ son dưỡng nhỏ, dễ thêm vào mọi hộp quà.",long:"Son dưỡng dạng hũ 15g với bao bì nhỏ gọn. Không dùng ảnh để đại diện cho thương hiệu thật.",tags:["chăm sóc môi","nhỏ gọn","dễ thương"],occasions:["Sinh nhật","8/3 & 20/10","Self-care"],recipients:["Bạn thân","Người yêu","Chính mình"],storage:"Nơi mát, tránh nắng",shelfLife:"18 tháng",allergens:[],variants:["Không màu"],images:[demoImage("lip-balm","lip-balm.jpg","https://www.pexels.com/photo/choice-of-lip-balms-20382237/","Các hũ son dưỡng")],imageLicense:PEXELS_LICENSE},
  {id:"notebook",sku:"GT-I18",name:"Sổ tay vải A6",category:"Văn phòng phẩm",price:139000,size:2,stock:16,lead:1,short:"Sổ A6 bìa vải cho lời nhắn và kế hoạch nhỏ.",long:"Sổ tay 96 trang, kích thước A6. Có thể chịu một món nhẹ nhưng cần giữ mặt bìa hướng lên.",tags:["ghi chép","tối giản","cá nhân hóa"],occasions:["Sinh nhật","Cảm ơn","Tốt nghiệp"],recipients:["Bạn thân","Đồng nghiệp","Người yêu"],storage:"Khô ráo",shelfLife:"Không áp dụng",allergens:[],variants:["Bìa hồng đất"],images:[demoImage("notebook","notebook-a6.jpg","https://www.pexels.com/photo/notebook-on-pink-background-5417687/","Sổ tay và bút trên nền hồng")],imageLicense:PEXELS_LICENSE},
  {id:"flower-dry",sku:"GT-I19",name:"Hoa khô mini",category:"Trang trí",price:59000,size:1,stock:32,lead:1,short:"Bó hoa khô nhỏ làm điểm nhấn khi mở hộp.",long:"Bó hoa khô mini nhẹ và dễ móp. Chỉ đặt ở lớp trên cùng, không chịu tải của sản phẩm khác.",tags:["hoa khô","trang trí","lãng mạn"],occasions:["Sinh nhật","Kỷ niệm","8/3 & 20/10"],recipients:["Người yêu","Bạn thân","Mẹ"],storage:"Khô ráo, tránh ép",shelfLife:"12 tháng trưng bày",allergens:[],variants:["Tông pastel"],images:[demoImage("flower-dry","dried-flowers.jpg","https://www.pexels.com/photo/beautifully-wrapped-dried-flower-bouquets-in-basket-31044545/","Các bó hoa khô gói giấy")],imageLicense:PEXELS_LICENSE},
  {id:"ceramic-mug",sku:"GT-I20",name:"Ly gốm kem 300ml",category:"Đồ dùng",price:159000,size:4,stock:9,lead:2,short:"Ly gốm màu kem dành cho hộp trà hoặc cà phê.",long:"Ly gốm 300ml là món dễ vỡ, cần hộp vừa hoặc lớn, mút định hình và vách ngăn khi đi cùng hũ thủy tinh.",tags:["gốm","tân gia","trà cà phê"],occasions:["Tân gia","Sinh nhật","Cảm ơn"],recipients:["Bạn thân","Đồng nghiệp","Gia đình"],storage:"Tránh va đập",shelfLife:"Không áp dụng",allergens:[],variants:["Kem ngà"],images:[demoImage("ceramic-mug","ceramic-mug.jpg","https://www.pexels.com/photo/plain-white-mugs-on-a-white-surface-6312177/","Hai ly gốm tối giản")],imageLicense:PEXELS_LICENSE},
].map(product=>({...product,slug:product.id,brand:"Gói Thương Demo",seller:"Gói Thương",cost:Math.round(product.price*.55),threshold:5,status:"published",kind:"item",capacity:product.size,builderEnabled:true,categories:[product.category],imageSource:product.images[0].source}));

const packaging = [
  {id:"small",name:"Hộp kraft nắp gập · Nhỏ",capacity:5,price:39000,color:"Kraft tự nhiên",finish:"Carton kraft 1.5 mm",assetTexture:"/assets/textures/cardboard_box_01_diff_1k.jpg",assetLicense:"CC0"},
  {id:"medium",name:"Hộp cứng nam châm · Vừa",capacity:8,price:59000,color:"Kem ngà",finish:"Giấy mỹ thuật phủ mờ",assetTexture:"/assets/textures/cardboard_box_01_diff_1k.jpg",assetLicense:"CC0"},
  {id:"large",name:"Hộp cứng nắp rời · Lớn",capacity:12,price:89000,color:"Đỏ rượu",finish:"Giấy mỹ thuật ép nhám",assetTexture:"/assets/textures/cardboard_box_01_diff_1k.jpg",assetLicense:"CC0"},
];
const cards = [
  {id:"simple",name:"Thiệp kem tối giản",price:0,assetTexture:"/assets/textures/cardboard_box_01_diff_1k.jpg",assetLicense:"CC0"},
  {id:"blush",name:"Thiệp hồng phấn",price:19000,assetTexture:"/assets/textures/cardboard_box_01_diff_1k.jpg",assetLicense:"CC0"},
  {id:"botanical",name:"Thiệp hoa ép",price:39000,assetTexture:"/assets/textures/cardboard_box_01_diff_1k.jpg",assetLicense:"CC0"},
  {id:"photo",name:"Thiệp ảnh minh họa",price:49000,assetTexture:"/assets/textures/cardboard_box_01_diff_1k.jpg",assetLicense:"CC0"},
];
const ribbons = [
  {id:"wine",name:"Ruy băng đỏ rượu",price:0,assetTexture:"/assets/textures/fabric_pattern_07_col_1_1k.jpg",assetLicense:"CC0"},
  {id:"blush",name:"Ruy băng hồng trầm",price:10000,assetTexture:"/assets/textures/fabric_pattern_07_col_1_1k.jpg",assetLicense:"CC0"},
  {id:"sage",name:"Dây vải sage",price:15000,assetTexture:"/assets/textures/fabric_pattern_07_col_1_1k.jpg",assetLicense:"CC0"},
];

const PACKAGING_ASSET_DEFAULTS = Object.fromEntries(packaging.map(x=>[x.id,{assetModel:x.assetModel,assetTexture:x.assetTexture,assetLicense:x.assetLicense}]));
const CARD_ASSET_DEFAULTS = Object.fromEntries(cards.map(x=>[x.id,{assetTexture:x.assetTexture,assetLicense:x.assetLicense}]));
const RIBBON_ASSET_DEFAULTS = Object.fromEntries(ribbons.map(x=>[x.id,{assetTexture:x.assetTexture,assetLicense:x.assetLicense}]));

const PACKAGING_3D_DEFAULTS = {
  small:{innerLength:260,innerWidth:180,innerHeight:100,wall:4,bottom:4,maxWeight:1500,lidClearance:6,lidType:"Nắp rời"},
  medium:{innerLength:330,innerWidth:230,innerHeight:125,wall:4,bottom:4,maxWeight:2500,lidClearance:7,lidType:"Nắp rời"},
  large:{innerLength:400,innerWidth:300,innerHeight:155,wall:5,bottom:5,maxWeight:4000,lidClearance:8,lidType:"Nắp rời"},
};
const ITEM_3D_DEFAULTS = {
  "tea-oolong":{shape:"box",length:105,width:65,height:55,weight:90,upright:false,fragile:false,canSupport:true,maxLoad:350,padding:3,color:"#859477"},
  "tea-jasmine":{shape:"box",length:105,width:65,height:55,weight:90,upright:false,fragile:false,canSupport:true,maxLoad:350,padding:3,color:"#9bab8e"},
  "tea-mint":{shape:"box",length:105,width:75,height:35,weight:70,upright:false,fragile:false,canSupport:true,maxLoad:220,padding:3,color:"#71968b"},
  "candle-ivory":{shape:"cylinder",length:68,width:68,height:82,weight:210,upright:true,fragile:true,canSupport:false,maxLoad:0,padding:5,color:"#d9c7a8"},
  "candle-rose":{shape:"cylinder",length:72,width:72,height:92,weight:265,upright:true,fragile:true,canSupport:false,maxLoad:0,padding:5,color:"#c98791"},
  "candle-lavender":{shape:"cylinder",length:72,width:72,height:92,weight:265,upright:true,fragile:true,canSupport:false,maxLoad:0,padding:5,color:"#a58ca8"},
  "choco-dark":{shape:"box",length:125,width:78,height:18,weight:85,upright:false,fragile:true,canSupport:false,maxLoad:0,padding:4,color:"#593f3a"},
  "choco-almond":{shape:"box",length:135,width:88,height:24,weight:110,upright:false,fragile:true,canSupport:false,maxLoad:0,padding:4,color:"#8f5f4a"},
  "choco-floral":{shape:"box",length:130,width:82,height:20,weight:95,upright:false,fragile:true,canSupport:false,maxLoad:0,padding:5,color:"#b06b78"},
  "honey":{shape:"cylinder",length:58,width:58,height:92,weight:155,upright:true,fragile:true,canSupport:false,maxLoad:0,padding:5,color:"#c89238"},
  "jam":{shape:"cylinder",length:62,width:62,height:78,weight:170,upright:true,fragile:true,canSupport:false,maxLoad:0,padding:5,color:"#b96243"},
  "cookies-butter":{shape:"box",length:125,width:95,height:42,weight:115,upright:false,fragile:true,canSupport:false,maxLoad:0,padding:5,color:"#d5ac6f"},
  "coffee-arabica":{shape:"box",length:145,width:90,height:45,weight:115,upright:false,fragile:false,compressible:true,canSupport:false,maxLoad:0,padding:4,color:"#6f513f"},
  "cocoa-hot":{shape:"cylinder",length:68,width:68,height:102,weight:150,upright:true,fragile:false,canSupport:false,maxLoad:0,padding:4,color:"#765247"},
  "bath-salt":{shape:"cylinder",length:72,width:72,height:105,weight:205,upright:true,fragile:true,canSupport:false,maxLoad:0,padding:5,color:"#c5a9a2"},
  "bath-salt-herbal":{shape:"cylinder",length:72,width:72,height:105,weight:205,upright:true,fragile:true,canSupport:false,maxLoad:0,padding:5,color:"#9eaa88"},
  "lip-balm":{shape:"cylinder",length:42,width:42,height:28,weight:35,upright:false,fragile:false,canSupport:true,maxLoad:80,padding:2,color:"#d49a9f"},
  "notebook":{shape:"box",length:145,width:105,height:18,weight:185,upright:false,fragile:false,canSupport:true,maxLoad:300,padding:3,color:"#b98286"},
  "flower-dry":{shape:"box",length:135,width:90,height:35,weight:35,upright:false,fragile:true,compressible:true,canSupport:false,maxLoad:0,padding:7,color:"#b78b91"},
  "ceramic-mug":{shape:"box",length:120,width:92,height:95,weight:340,upright:true,fragile:true,canSupport:false,maxLoad:0,padding:10,color:"#d8d0bd"},
};

function defaultModel3d(product){
  const preset=ITEM_3D_DEFAULTS[product.id]||{};
  const category=String(product.category||product.categories?.[0]||"").toLowerCase();
  const cylinder=/nến|mật ong|mứt|muối/.test(category+" "+product.name);
  return {
    sourceType:"dimensions",sourceName:"Ảnh chính và kích thước đóng gói",shape:preset.shape||(cylinder?"cylinder":"box"),
    length:Number(preset.length||100),width:Number(preset.width||70),height:Number(preset.height||45),weight:Number(preset.weight||120),
    upright:false,fragile:!!preset.fragile,compressible:!!preset.compressible,allowedRotations:"y",
    stackable:preset.stackable!==false,canSupport:!!preset.canSupport,maxLoad:Number(preset.maxLoad||0),padding:Number(preset.padding||3),
    collider:preset.shape==="cylinder"?"cylinder":"box",modelStatus:"checked",modelVersion:"dimensions-1",colliderVersion:"simple-1",color:preset.color||"#a98372",fileName:"",textureData:"",primaryFace:"top",labelFacing:"up"
  };
}

function seededItemProduct(product){
  return {
    ...structuredClone(product),kind:"item",status:"published",
    cost:Number(product.cost||Math.round(product.price*.55)),threshold:Number(product.threshold||5),
    short:product.short||`${product.category} dành cho hộp quà tự chọn.`,
    long:product.long||`${product.name} được cấu hình làm món thành phần trong Builder.`,
    categories:Array.isArray(product.categories)?product.categories:[product.category],
    tags:Array.isArray(product.tags)?product.tags:[],capacity:Number(product.size||1),builderEnabled:true,
    model3d:defaultModel3d(product),
  };
}

const DEFAULT_AI_RECOMMENDATION_PROMPT=`Bạn là chuyên gia tư vấn quà tặng của Gói Thương. Từ hồ sơ người nhận, dịp tặng, ngân sách và danh mục đang còn hàng, hãy chọn đúng 5 hộp quà KHÁC NHAU.

YÊU CẦU
- Không đề xuất sản phẩm hết hàng hoặc vượt ngân sách đã xác nhận.
- Ưu tiên sự phù hợp với người nhận, dịp tặng, phong cách và điều cần tránh.
- Năm hộp phải có sự khác biệt rõ về thành phần hoặc cảm xúc.
- Chỉ dùng boxId có trong danh mục đầu vào, không bịa sản phẩm.
- Mỗi hộp chỉ cần một lý do ngắn, cụ thể và dễ hiểu.

CHỈ TRẢ VỀ JSON HỢP LỆ, KHÔNG THÊM MARKDOWN:
{"recommendations":[{"boxId":"box-01","reason":"Phù hợp vì..."},{"boxId":"box-02","reason":"Phù hợp vì..."},{"boxId":"box-03","reason":"Phù hợp vì..."},{"boxId":"box-04","reason":"Phù hợp vì..."},{"boxId":"box-05","reason":"Phù hợp vì..."}]}`;

const TEXT_MODEL_PACKING_PROMPT=`Bạn là kỹ sư bố trí hộp quà. Hãy tạo đúng một phương án xếp sản phẩm dựa trên kích thước millimet thật.

Quy tắc bắt buộc:

1. Giữ chính xác productId và số lượng.
2. Không thêm, bỏ, thay thế hoặc nhân đôi sản phẩm.
3. Mọi sản phẩm phải nằm hoàn toàn trong lòng hộp.
4. Các khối sản phẩm không được giao nhau.
5. Phải tính độ dày của giấy lót và vật liệu chèn.
6. Phải còn đủ khoảng trống để đóng nắp.
7. Mặt chính của tất cả sản phẩm phải hướng lên.
8. Chỉ xoay sản phẩm trên mặt đáy theo 0 hoặc 90 độ.
9. Không lật úp, dựng nghiêng hoặc thu nhỏ sản phẩm.
10. Món nặng ưu tiên gần tâm và gần đáy.
11. Món dễ vỡ không được chịu tải.
12. Nếu không thể xếp hợp lệ, trả status="impossible".

Chỉ trả JSON hợp lệ, không thêm Markdown hoặc lời giải thích bên ngoài JSON.

Định dạng bắt buộc:

{
  "status": "ok",
  "layout": {
    "strategy": "balanced",
    "placements": [
      {
        "productId": "product-id",
        "quantityIndex": 0,
        "xMm": 0,
        "zMm": 0,
        "rotationYDeg": 0,
        "mainFace": "up"
      }
    ],
    "packingOrder": [
      {
        "productId": "product-id",
        "quantityIndex": 0,
        "order": 1
      }
    ],
    "estimatedLidClearanceMm": 20
  }
}

Nếu không thể xếp:

{
  "status": "impossible",
  "reason": "..."
}`;

const TEXT_MODEL_REPAIR_PROMPT=`Phương án trước không vượt qua kiểm tra hình học của hệ thống.

Các lỗi chính xác:
{{VALIDATION_ERRORS}}

Dữ liệu hộp và sản phẩm:
{{INPUT_DATA}}

Phương án cũ:
{{INVALID_LAYOUT}}

Hãy sửa đúng một phương án. Không thay đổi sản phẩm, số lượng hoặc kích thước. Chỉ trả JSON theo schema đã yêu cầu.`;

const DEFAULT_AI_PACKING_PROMPT=TEXT_MODEL_PACKING_PROMPT;

const DEFAULT_AI_IMAGE_PROMPT=`Tạo đúng 1 ẢNH CHỤP SẢN PHẨM HOÀN THIỆN của hộp quà đang mở, nhìn từ trên xuống hơi chếch nhẹ, phong cách thương mại điện tử cao cấp, ánh sáng studio mềm và chất liệu chân thật.

ẢNH THAM CHIẾU SẢN PHẨM
- Mỗi ảnh đính kèm là ảnh nhận diện bắt buộc của đúng một sản phẩm được ghi tên ngay trước ảnh đó.
- Giữ đúng hình dáng bao bì, màu sắc, nhãn chính và đặc điểm nhận diện từ từng ảnh; không thay thế bằng món tương tự.
- Mặt chính/nhãn chính của TẤT CẢ sản phẩm phải hướng lên phía người mở hộp và nhìn thấy rõ.

RÀNG BUỘC BẮT BUỘC
1. Giữ chính xác tên, loại và số lượng sản phẩm trong dữ liệu. Không thêm, bỏ, nhân đôi hoặc biến sản phẩm thành hộp quà bọc kín.
2. Dùng đúng kiểu hộp, màu hộp, giấy lót, vật liệu chèn lót, thiệp và ruy băng khách đã chọn.
3. Xếp các món theo bố cục đã kiểm tra kích thước: không chồng xuyên nhau, không nổi lơ lửng, không che kín mặt chính và không vượt khỏi lòng hộp.
4. Giữ đúng TỈ LỆ KÍCH THƯỚC TƯƠNG ĐỐI giữa từng món và lòng hộp theo số đo millimet được cung cấp; món lớn phải trông lớn hơn món nhỏ đúng tương quan, không tự co giãn để làm ảnh đẹp.
5. Cho thấy đây là một hộp quà thật đã được nhân viên chuẩn bị: vật liệu chèn nằm tự nhiên quanh món, nắp hộp mở hoặc đặt cạnh hộp, nền gỗ/vải trung tính gọn gàng.
6. Không tạo sơ đồ, collage, wireframe, mô hình 3D thô, nhãn số, chú thích, mũi tên, chữ phủ trên ảnh, bàn tay, kéo hoặc vật thể trang trí không được chọn.
7. Không bịa logo hoặc chữ mới. Chỉ giữ chữ/nhãn vốn có trong ảnh sản phẩm tham chiếu nếu có thể tái hiện chính xác.

Kết quả phải là một ảnh duy nhất tỉ lệ ngang 4:3, đủ chân thật để khách dùng làm ảnh xem trước thành phẩm trước khi thêm vào giỏ.`;

const DEFAULT_STATE = {
  user: null,
  cart: [],
  drafts: [],
  occasions: [],
  orders: [],
  finder: {step:1, recipient:null, occasion:null, budget:null, recommendations:[], aiError:""},
  builder: {step:1, items:{}, budget:600000, packaging:null, materials:{"liner-paper":true,"fiber":true}, card:"simple", ribbon:"wine", recipient:"", sender:"", anonymous:false, message:"", draftName:"Hộp quà của mình", layout3d:null, aiLayouts:[], aiLayoutId:null, aiSessionId:null, aiSeed:1},
  personalize: {card:"simple", ribbon:"wine", recipient:"", sender:"", anonymous:false, message:""},
  accountTab: "overview",
  checkout: {buyerName:"",buyerEmail:"",buyerPhone:"",receiverName:"",receiverPhone:"",address:"",date:"",slot:"",note:"",payment:"success",same:false},
  lastRemoved: null,
};

function loadState(){
  try { return {...structuredClone(DEFAULT_STATE), ...JSON.parse(localStorage.getItem("goiThuongState")||"{}")}; }
  catch { return structuredClone(DEFAULT_STATE); }
}
let state = loadState();
let aiSessionKey="", aiImageSessionKey="", aiRequestBusy=false, aiFinderBusy=false, aiFinderImages={}, aiPackingImage="", aiPackingImageBusy=false, aiPackingImageMeta=null;
let aiPipelineProgress = { active: false, step: "idle", stepNumber: 0, message: "", repairAttempt: 0, maxRepairs: 2, errors: [], source: "" };
function clearPackingImage(){aiPackingImage="";aiPackingImageMeta=null;}
function save(){
  try { localStorage.setItem("goiThuongState", JSON.stringify(state)); return true; }
  catch (error) { console.warn("Không thể lưu dữ liệu demo", error); return false; }
}
const money = n => new Intl.NumberFormat("vi-VN").format(Math.round(n||0)) + " ₫";
const esc = s => String(s??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const q = (k) => new URL(location.href).searchParams.get(k);
const owner = () => state.user?.email || "guest";
const byOwner = xs => xs.filter(x=>x.owner===owner());
const cartCount = () => state.cart.reduce((n,l)=>n+(l.qty||1),0);
const cartSubtotal = () => state.cart.reduce((n,l)=>n+l.unitPrice*(l.qty||1),0);
const safeReturnTo = value => value && value.startsWith("/") && !value.startsWith("//") && !value.includes("\\") ? value : "/tai-khoan";
const currentPath = () => location.pathname.replace(/\/+$/,"") || "/";

const ADMIN_ROLES = {
  "owner@goithuong.test": {role:"owner",name:"Chủ cửa hàng"},
  "sanpham@goithuong.test": {role:"product",name:"Nhân viên sản phẩm"},
  "donhang@goithuong.test": {role:"orders",name:"Nhân viên đơn hàng"},
};
const ROLE_LABELS = {owner:"Chủ cửa hàng",product:"Nhân viên sản phẩm",orders:"Nhân viên đơn hàng",customer:"Khách hàng"};
const ADMIN_ACCESS = {
  owner:["overview","products","inventory","options","library","orders","delivery","settings"],
  product:["overview","products","inventory","options","library"],
  orders:["overview","orders","delivery"],
};
function isSeller(){ return ["owner","product","orders"].includes(state.user?.role); }
function canAdmin(section){ return !!state.user && (ADMIN_ACCESS[state.user.role]||[]).includes(section); }
function audit(action,detail){ state.admin.audit.unshift({id:crypto.randomUUID(),at:new Date().toISOString(),by:state.user?.email||"demo",action,detail}); state.admin.audit=state.admin.audit.slice(0,80); }

function ensureAdminState(){
  if(!state.admin){
    const boxProducts=boxes.map(b=>({...structuredClone(b),kind:"box",status:"published",cost:Math.round(b.price*.55),threshold:4,short:b.meaning,long:b.meaning,categories:b.occasions,tags:[b.style],capacity:0,builderEnabled:false,images:[]}));
    const itemProducts=giftItems.map(seededItemProduct);
    state.admin={
      products:[...boxProducts,...itemProducts],
      packaging:structuredClone(packaging).map(x=>({...x,active:true})),
      cards:structuredClone(cards).map(x=>({...x,active:true})),
      ribbons:structuredClone(ribbons).map(x=>({...x,active:true})),
      delivery:{zone:"TP.HCM",fee:45000,capacity:12,slots:[{id:"morning",label:"9–12h",active:true,full:false},{id:"afternoon",label:"14–17h",active:true,full:true},{id:"evening",label:"18–21h",active:true,full:false}],holidays:""},
      banner:"Giao trong vùng phục vụ tại TP.HCM",
      campaign:"THUONG10",
      reminderDays:7,
      staff:[{email:"owner@goithuong.test",name:"Chủ cửa hàng",role:"owner",active:true},{email:"sanpham@goithuong.test",name:"Nhân viên sản phẩm",role:"product",active:true},{email:"donhang@goithuong.test",name:"Nhân viên đơn hàng",role:"orders",active:true}],
      demoCatalogVersion:2,
      inventoryLog:[],audit:[{id:crypto.randomUUID(),at:new Date().toISOString(),by:"hệ thống",action:"Khởi tạo",detail:"Đã tạo dữ liệu quản trị từ danh mục cửa hàng hiện có."}],uploads:{},
    };
    save();
  }
  if(!state.admin.uploads) state.admin.uploads={};
  if(!state.admin.modelPhotos) state.admin.modelPhotos={};
  if(!state.admin.audit) state.admin.audit=[];
  if(!state.admin.inventoryLog) state.admin.inventoryLog=[];
  if(!state.admin.delivery?.slots?.length) state.admin.delivery={zone:"TP.HCM",fee:45000,capacity:12,slots:[{id:"morning",label:"9–12h",active:true,full:false},{id:"afternoon",label:"14–17h",active:true,full:true},{id:"evening",label:"18–21h",active:true,full:false}],holidays:""};
  const savedAi=state.admin.ai||{}, legacyPrompt=String(savedAi.packingPrompt||savedAi.prompt||"");
  state.admin.ai={
    enabled:true,endpoint:"",model:"",imageProvider:"cloudflare",imageEndpoint:"https://goithuong-ai-image.nguyentriquan1805.workers.dev/",imageModel:"@cf/black-forest-labs/flux-2-klein-4b",imageSize:"1024x768",imagePromptVersion:3,
    temperature:0.15,
    recommendationPrompt:DEFAULT_AI_RECOMMENDATION_PROMPT,
    textModelPrompt:TEXT_MODEL_PACKING_PROMPT,
    repairPrompt:TEXT_MODEL_REPAIR_PROMPT,
    packingPrompt:TEXT_MODEL_PACKING_PROMPT,
    imagePrompt:DEFAULT_AI_IMAGE_PROMPT,
    ...savedAi,
  };
  if(!state.admin.ai.imageProvider) state.admin.ai.imageProvider="cloudflare";
  if(!state.admin.ai.imageEndpoint) state.admin.ai.imageEndpoint="https://goithuong-ai-image.nguyentriquan1805.workers.dev/";
  if(!state.admin.ai.imageModel) state.admin.ai.imageModel="@cf/black-forest-labs/flux-2-klein-4b";
  if(!state.admin.ai.textModelPrompt) state.admin.ai.textModelPrompt=TEXT_MODEL_PACKING_PROMPT;
  if(!state.admin.ai.repairPrompt) state.admin.ai.repairPrompt=TEXT_MODEL_REPAIR_PROMPT;
  if(state.admin.ai.temperature===undefined) state.admin.ai.temperature=0.15;
  state.admin.ai.enabled=true;
  if(!state.admin.ai.recommendationPrompt)state.admin.ai.recommendationPrompt=DEFAULT_AI_RECOMMENDATION_PROMPT;
  if(!state.admin.ai.packingPrompt||/đúng 5 phương án|five layouts|năm phương án/i.test(state.admin.ai.packingPrompt))state.admin.ai.packingPrompt=TEXT_MODEL_PACKING_PROMPT;
  if(!state.admin.ai.imagePrompt||Number(savedAi.imagePromptVersion||0)<2){state.admin.ai.imagePrompt=DEFAULT_AI_IMAGE_PROMPT;state.admin.ai.imagePromptVersion=3;}
  if(!Array.isArray(state.admin.aiReferences))state.admin.aiReferences=[];
  state.finder={...structuredClone(DEFAULT_STATE.finder),...(state.finder||{})};
  if(state.user&&!state.user.role) state.user.role=ADMIN_ROLES[state.user.email]?.role||"customer";
  if(Number(state.admin.demoCatalogVersion||0)<2){
    const customProducts=state.admin.products.filter(product=>product.kind!=="item"||!/^(GT-I\d+|GT-DEMO-)/i.test(String(product.sku||"")));
    state.admin.products=[...customProducts,...giftItems.map(seededItemProduct)];
    state.admin.demoCatalogVersion=2;
    state.admin.audit.unshift({id:crypto.randomUUID(),at:new Date().toISOString(),by:"hệ thống",action:"Cập nhật danh mục demo",detail:"Đã bổ sung 20 sản phẩm có ảnh, kích thước và quy tắc đóng gói."});
    save();
  }
  state.admin.products.forEach(p=>{if(p.kind==="item"){if(!p.model3d)p.model3d=defaultModel3d(p);Object.assign(p.model3d,{fileName:"",sourceType:p.model3d.textureData?"photo-dimensions":"dimensions",sourceName:p.model3d.textureData?"Ảnh chính và kích thước thật":"Kích thước đóng gói",upright:false,allowedRotations:"y",primaryFace:"top",labelFacing:"up"});}});
  state.admin.packaging.forEach(p=>{
    const catalog=packaging.find(x=>x.id===p.id);
    Object.assign(p,{...(PACKAGING_3D_DEFAULTS[p.id]||PACKAGING_3D_DEFAULTS.medium),...(PACKAGING_ASSET_DEFAULTS[p.id]||{}),...p,...(catalog?{name:catalog.name,color:catalog.color,finish:catalog.finish}: {})});
    delete p.assetModel;
  });
  state.admin.cards.forEach(x=>Object.assign(x,{...(CARD_ASSET_DEFAULTS[x.id]||{}),...x}));
  state.admin.ribbons.forEach(x=>Object.assign(x,{...(RIBBON_ASSET_DEFAULTS[x.id]||{}),...x}));
  const materialDefaults=[
    {id:"liner-paper",name:"Giấy lót đáy kraft",kind:"liner",thickness:3,price:12000,support:false,active:true,color:"#d9bd91",description:"Lớp giấy phẳng bảo vệ đáy hộp",assetTexture:"/assets/textures/cardboard_box_01_diff_1k.jpg",assetLicense:"CC0"},
    {id:"fiber",name:"Sợi giấy xoắn màu kem",kind:"fiber",thickness:10,price:18000,support:false,active:true,color:"#dfc7a3",description:"Lấp khoảng trống và giữ món không xê dịch",assetTexture:"/assets/textures/fabric_pattern_07_col_1_1k.jpg",assetLicense:"CC0"},
    {id:"honeycomb",name:"Giấy tổ ong bọc món",kind:"fiber",thickness:6,price:22000,support:false,active:true,color:"#c99f6a",description:"Bọc riêng đồ thủy tinh và món dễ trầy",assetTexture:"/assets/textures/cardboard_box_01_diff_1k.jpg",assetLicense:"CC0"},
    {id:"foam",name:"Tấm đệm mút định hình",kind:"liner",thickness:8,price:28000,support:true,active:true,color:"#efe7da",description:"Đỡ sản phẩm nặng hoặc dễ vỡ",assetTexture:"/assets/textures/fabric_pattern_07_col_1_1k.jpg",assetLicense:"CC0"},
    {id:"divider",name:"Vách ngăn carton",kind:"divider",thickness:6,price:25000,support:true,active:true,color:"#b89d72",description:"Chia lòng hộp thành hai khoang độc lập",assetTexture:"/assets/textures/cardboard_box_01_diff_1k.jpg",assetLicense:"CC0"},
    {id:"top-paper",name:"Giấy lụa phủ trên cùng",kind:"top",thickness:3,price:15000,support:false,active:true,color:"#ead2d6",description:"Lớp giấy mỏng hoàn thiện trước khi đóng nắp",assetTexture:"/assets/textures/fabric_pattern_07_col_1_1k.jpg",assetLicense:"CC0"},
  ];
  if(!state.admin.materials3d) state.admin.materials3d=structuredClone(materialDefaults);
  else materialDefaults.forEach(material=>{
    const existing=state.admin.materials3d.find(x=>x.id===material.id);
    if(existing) Object.assign(existing,material,{active:existing.active!==false});
    else state.admin.materials3d.push(structuredClone(material));
  });
  if(!state.builder.materials) state.builder.materials=state.builder.layout3d?.materials?structuredClone(state.builder.layout3d.materials):{"liner-paper":true,"fiber":true};
  if(!Array.isArray(state.builder.aiLayouts)) state.builder.aiLayouts=[];
  if(!Object.prototype.hasOwnProperty.call(state.builder,"aiLayoutId")) state.builder.aiLayoutId=null;
  if(!state.builder.aiSeed) state.builder.aiSeed=1;
  state.admin.materials3d.forEach(x=>{
    if(!x.assetTexture) x.assetTexture=x.kind==="divider"||x.id==="liner-paper"?"/assets/textures/cardboard_box_01_diff_1k.jpg":"/assets/textures/fabric_pattern_07_col_1_1k.jpg";
    if(!x.assetLicense) x.assetLicense="CC0";
  });
  syncStorefront();
}

function syncStorefront(){
  if(!state.admin) return;
  const publicProducts=state.admin.products.filter(p=>p.status==="published");
  boxes.splice(0,boxes.length,...publicProducts.filter(p=>p.kind==="box").map(p=>({...structuredClone(p),items:Array.isArray(p.items)?p.items:[],occasions:Array.isArray(p.occasions)?p.occasions:(p.categories||[]),recipients:Array.isArray(p.recipients)?p.recipients:["Bạn thân"],style:p.style||(p.tags?.[0]||"Ấm áp"),meaning:p.meaning||p.short||p.long||"Một hộp quà được chuẩn bị bằng sự để tâm."})));
  giftItems.splice(0,giftItems.length,...publicProducts.filter(p=>p.kind==="item"&&p.builderEnabled!==false).map(p=>({...structuredClone(p),size:Number(p.size||p.capacity||1),category:p.category||(p.categories?.[0]||"Món thêm")})));
  packaging.splice(0,packaging.length,...state.admin.packaging.filter(x=>x.active!==false).map(x=>structuredClone(x)));
  cards.splice(0,cards.length,...state.admin.cards.filter(x=>x.active!==false).map(x=>structuredClone(x)));
  ribbons.splice(0,ribbons.length,...state.admin.ribbons.filter(x=>x.active!==false).map(x=>structuredClone(x)));
}

ensureAdminState();

function navigate(path, replace=false){
  if (!path.startsWith("/")) path = "/";
  history[replace?"replaceState":"pushState"]({},"",path);
  render();
  requestAnimationFrame(()=>document.querySelector("#main")?.focus({preventScroll:true}));
  scrollTo({top:0,behavior: matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
}
function toast(message, action){
  const node=document.createElement("div"); node.className="toast"; node.innerHTML=esc(message)+(action?` <button class="link" data-action="${action}">Hoàn tác</button>`:"");
  document.querySelector("#toast-region")?.append(node); setTimeout(()=>node.remove(),4200);
}
function pageTitle(title){ document.title = title ? `${title} — ${BRAND.name}` : `${BRAND.name} — ${BRAND.tagline}`; }

function assetThumb(type,item,compact=false){
  const texture=item?.assetTexture||"/assets/textures/cardboard_box_01_diff_1k.jpg";
  return `<span class="asset-thumb asset-${type} ${compact?"compact":""}"><img src="${esc(texture)}" alt="" loading="lazy"><i aria-hidden="true"></i><small>${type==="packaging"?"Kích thước":item?.assetLicense||"CC0"}</small></span>`;
}

function choicePreview(type,item){
  if(!item) return "";
  return `<article class="choice-preview ${type}-${esc(item.id)}">${assetThumb(type,item)}<div><span class="eyebrow">${type==="cards"?"Thiệp đang chọn":"Ruy băng đang chọn"}</span><strong>${esc(item.name)}</strong><small>Ảnh chất liệu CC0 đã lưu trong website</small></div></article>`;
}

function shell(content){
  const p=currentPath();
  const nav=[
    ["/hop-qua","Hộp quà có sẵn"],["/tim-qua","Tìm quà nhanh"],["/tu-tao-hop","Tự tạo hộp"],["/dip-cua-toi","Nhắc dịp"],["/ve-chung-toi","Về Gói Thương"]
  ];
  return `
    <div class="top-strip"><div class="container">${esc(state.admin?.banner||"Giao trong vùng phục vụ tại TP.HCM")} <span>·</span> <a href="/chinh-sach-giao-hang" data-route>Chọn lịch giao phù hợp</a></div></div>
    <header class="site-header">
      <div class="container header-inner">
        <a class="wordmark" href="/" data-route>${BRAND.name}</a>
        <nav class="main-nav" aria-label="Điều hướng chính">${nav.map(([u,n])=>`<a href="${u}" data-route ${p===u||p.startsWith(u+"/")?'aria-current="page"':""}>${n}</a>`).join("")}</nav>
        <div class="header-tools">
          <a href="/hop-qua?search=1" data-route>Tìm kiếm</a>
          <a class="account-link" href="${state.user?(isSeller()?'/quan-tri':'/tai-khoan'):'/dang-nhap'}" data-route>${state.user?(isSeller()?"Quản trị":"Tài khoản"):"Đăng nhập"}</a>
          <a class="cart-link" href="/gio-hang" data-route>Giỏ <span class="cart-count">${cartCount()}</span></a>
          <button class="menu-button" data-action="open-menu" aria-label="Mở menu">Menu</button>
        </div>
      </div>
    </header>
    <main id="main" tabindex="-1">${content}</main>
    ${footer()}
  `;
}

function footer(){
  return `<footer class="site-footer"><div class="container">
    <div class="footer-grid">
      <div><a class="wordmark" href="/" data-route style="color:var(--paper)">${BRAND.name}</a><p>${BRAND.tagline}</p><p class="small">Bản mẫu thương mại điện tử · Dữ liệu và hình ảnh minh họa cần được xác nhận trước khi vận hành.</p></div>
      <div><strong>Mua quà</strong><a href="/hop-qua" data-route>Hộp có sẵn</a><a href="/tim-qua" data-route>Tìm quà nhanh</a><a href="/tu-tao-hop" data-route>Tự tạo hộp</a></div>
      <div><strong>Hỗ trợ</strong><a href="/ho-tro" data-route>Trung tâm hỗ trợ</a><a href="/chinh-sach-giao-hang" data-route>Chính sách giao hàng</a><a href="/doi-tra-huy-don" data-route>Đổi trả & hủy đơn</a></div>
      <div><strong>Thông tin</strong><a href="/ve-chung-toi" data-route>Về chúng tôi</a><a href="/bao-mat" data-route>Bảo mật</a><a href="/dieu-khoan" data-route>Điều khoản</a></div>
    </div>
    <div class="footer-bottom"><span>© 2026 Gói Thương — bản demo.</span><span>Chưa kết nối mạng xã hội, thanh toán hay đơn vị giao hàng.</span></div>
  </div></footer>`;
}

function visual(name, cls="product-visual", image="") { return image?`<div class="${cls} has-image"><img src="${esc(image)}" alt="${esc(name)}"></div>`:`<div class="${cls}" role="img" aria-label="Khung ảnh minh họa cho ${esc(name)}"><span>${esc(name)}</span><small>Ảnh minh họa · cần thay ảnh thật</small></div>`; }
function itemArt(item){const image=item.images?.find(x=>x.cover)?.data||item.images?.[0]?.data;return image?`<div class="item-art has-image"><img src="${esc(image)}" alt="${esc(item.images?.find(x=>x.cover)?.alt||item.name)}"><small>Ảnh demo · Pexels</small></div>`:`<div class="item-art"><span>${esc(item.name)}</span></div>`;}
function productTile(b, reason=""){
  return `<article class="product-tile">${visual(b.name,"product-visual",b.images?.find(x=>x.cover)?.data||b.images?.[0]?.data)}<div class="product-info"><h3><a href="/hop-qua/${b.slug}" data-route>${b.name}</a></h3><p>${esc((b.items||[]).slice(0,3).join(" · "))}</p><div class="row spaced"><span class="price">${money(b.price)}</span>${b.stock===0?'<span class="small muted">Tạm hết</span>':`<a class="link small" href="/hop-qua/${b.slug}" data-route>Xem hộp</a>`}</div>${reason?`<p class="reason">${esc(reason)}</p>`:""}</div></article>`;
}

function homePage(){ pageTitle(""); return `
  <section class="hero"><div class="hero-copy"><span class="eyebrow">Quà được chọn bằng sự để tâm</span><h1>Có những điều, mình gửi bằng một <em>hộp quà.</em></h1><p>Chọn một hộp có sẵn, để chúng mình gợi ý, hoặc tự phối từng món theo cách của bạn.</p><div class="hero-actions"><a class="button" href="/hop-qua" data-route>Chọn hộp quà</a><a class="button ghost" href="/tu-tao-hop" data-route>Tự tạo một hộp</a></div></div><div class="hero-visual"><div class="box-art"></div><span class="image-note">Khung ảnh demo · Một Ngày Của Bạn</span></div></section>
  <section class="section"><div class="container"><span class="eyebrow">Chọn theo dịp</span><h2>Bạn đang muốn gửi quà dịp nào?</h2><div class="occasion-grid">${[["Sinh nhật","Một ngày thật riêng"],["Kỷ niệm","Nhắc lại điều đáng nhớ"],["Làm hòa","Nói điều khó nói"],["Self-care","Dành cho chính mình"]].map(([n,d])=>`<a class="occasion-link" href="/hop-qua?occasion=${encodeURIComponent(n)}" data-route><div class="occasion-art"></div><strong>${n}</strong><span>${d}</span></a>`).join("")}</div></div></section>
  <section class="section divider"><div class="container"><div class="row spaced wrap"><div><span class="eyebrow">Bộ sưu tập quanh năm</span><h2>Những hộp dễ thương để bắt đầu</h2></div><a class="link" href="/hop-qua" data-route>Xem tất cả hộp</a></div><div class="product-grid">${boxes.slice(0,4).map(b=>productTile(b)).join("")}</div></div></section>
  <section class="split-story"><div class="story-art" aria-label="Khung minh họa các món tự chọn"><div>Nến thơm</div><div>Trà & món ngọt</div><div>Thiệp & trang trí</div></div><div class="story-copy"><span class="eyebrow" style="color:#f0c5cd">Tự tạo hộp</span><h2>Mỗi món một chút, thành một hộp rất riêng.</h2><p>Chọn từng món, tìm cỡ hộp phù hợp rồi viết lời chúc. Tổng tiền và khả năng chứa được cập nhật trong từng bước.</p><a class="button" href="/tu-tao-hop" data-route>Bắt đầu tạo hộp</a></div></section>
  <section class="section finder-band"><div class="container"><span class="eyebrow">Gift Finder</span><h2>Tặng ai, dịp gì, khoảng bao nhiêu?</h2><p class="kicker" style="margin-inline:auto">Ba câu hỏi ngắn, không cần tài khoản. Kết quả chỉ lấy từ những hộp đang có trong dữ liệu.</p><a class="button" href="/tim-qua" data-route>Tìm quà nhanh</a></div></section>
  <section class="section sage-band"><div class="container reminder-layout"><div><span class="eyebrow">Nhắc dịp</span><h2>Đừng để một ngày quan trọng lướt qua.</h2><p class="kicker">Lưu ngày, chọn nhắc trước 3, 7 hoặc 14 ngày và xem trước email nhắc. Bản demo chưa gửi email thật.</p><a class="button secondary" href="/dip-cua-toi" data-route>Lưu một dịp quan trọng</a></div><div class="calendar-art"><div class="calendar-head">Tháng của những điều đáng nhớ</div><div class="calendar-days">${["T2","T3","T4","T5","T6","T7","CN","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"].map((x,i)=>i===17?`<b>${x}</b>`:`<span>${x}</span>`).join("")}</div></div></div></section>
  <section class="section"><div class="container split-story" style="grid-template-columns:.9fr 1.1fr"><div class="story-copy" style="background:var(--stone);color:var(--ink)"><span class="eyebrow">Cách chúng mình gói</span><h2>Đẹp vừa đủ, chắc chắn và có chỗ cho lời thật lòng.</h2><p style="color:var(--muted)">Mỗi cấu hình được kiểm tra lại trước khi đóng gói. Ảnh thành phẩm sẽ được bổ sung khi có dữ liệu sản phẩm thật.</p><a class="link" href="/ve-chung-toi" data-route>Đọc câu chuyện Gói Thương</a></div><div class="story-art" style="min-height:420px"><div>Chọn món</div><div>Viết thiệp</div><div>Buộc ruy băng</div></div></div></section>`; }

function catalogPage(){
  pageTitle("Hộp quà có sẵn");
  const url=new URL(location.href), occasion=url.searchParams.get("occasion"), recipient=url.searchParams.get("recipient"), style=url.searchParams.get("style"), max=Number(url.searchParams.get("max"))||Infinity, sort=url.searchParams.get("sort")||"new";
  let list=boxes.filter(b=>(!occasion||b.occasions.includes(occasion))&&(!recipient||b.recipients.includes(recipient))&&(!style||b.style===style)&&b.price<=max);
  if(sort==="asc") list.sort((a,b)=>a.price-b.price); if(sort==="desc") list.sort((a,b)=>b.price-a.price);
  const checks=(name,values,current)=>values.map(v=>`<label class="checkline"><input type="radio" name="${name}" value="${esc(v)}" ${current===v?"checked":""}> ${esc(v)}</label>`).join("");
  return `<section class="page-hero"><div class="container"><span class="eyebrow">Hộp quà tuyển chọn</span><h1>Chọn một hộp đã được phối vừa vặn.</h1><p>Mỗi hộp có danh sách món, giá và thời gian chuẩn bị rõ ràng. Giá chưa gồm phí giao.</p></div></section><div class="container shop-layout">
    <aside class="filters" id="filters"><div class="row spaced"><strong>Bộ lọc</strong><button class="link" data-action="clear-filters">Xóa tất cả</button></div><div class="filter-group"><strong>Dịp</strong>${checks("occasion",["Sinh nhật","Kỷ niệm","Làm hòa","Self-care","Valentine / White Day","Giáng sinh","8/3 & 20/10"],occasion)}</div><div class="filter-group"><strong>Người nhận</strong>${checks("recipient",["Người yêu","Bạn thân","Chính mình"],recipient)}</div><div class="filter-group"><strong>Phong cách</strong>${checks("style",[...new Set(boxes.map(b=>b.style))],style)}</div><div class="filter-group"><strong>Giá hộp</strong>${[[300000,"Đến 300K"],[500000,"Đến 500K"],[800000,"Đến 800K"]].map(([v,label])=>`<label class="checkline"><input type="radio" name="max" value="${v}" ${max===v?"checked":""}> ${label}</label>`).join("")}</div><p class="fine-print">Các mức giá là dữ liệu minh họa. Chưa gồm phí giao.</p></aside>
    <section><div class="shop-topline"><div><button class="button secondary small-btn filter-toggle" data-action="toggle-filters">Lọc sản phẩm</button><span class="muted small">${list.length} kết quả</span></div><label class="small">Sắp xếp <select id="sort-select"><option value="new">Mới thêm</option><option value="asc" ${sort==="asc"?"selected":""}>Giá tăng dần</option><option value="desc" ${sort==="desc"?"selected":""}>Giá giảm dần</option></select></label></div>${list.length?`<div class="product-grid shop-grid">${list.map(b=>productTile(b)).join("")}</div>`:`<div class="empty-state"><h2>Chưa có hộp vừa tiêu chí này.</h2><p>Thử nới khoảng giá hoặc bỏ bớt một bộ lọc nhé.</p><button class="button secondary" data-action="clear-filters">Xóa bộ lọc</button></div>`}</section>
  </div>`;
}

function detailPage(slug){
  const b=boxes.find(x=>x.slug===slug); if(!b) return notFound(); pageTitle(b.name);
  const customize=q("customize")==="1";
  const p=state.personalize, extras=cards.find(x=>x.id===p.card).price+ribbons.find(x=>x.id===p.ribbon).price;
  return `<section class="detail-layout"><div class="detail-gallery">${visual(b.name,"product-visual",b.images?.find(x=>x.cover)?.data||b.images?.[0]?.data)}</div><div class="detail-info"><span class="eyebrow">${esc(b.occasions.join(" · "))}</span><h1>${b.name}</h1><p class="detail-price price">${money(b.price + (customize?extras:0))}</p><p>${b.meaning}</p><ul class="feature-list">${b.items.map(i=>`<li><span>${esc(i)}</span><span>1</span></li>`).join("")}<li><span>Hộp và ruy băng chuẩn</span><span>Đã gồm</span></li><li><span>Chuẩn bị</span><span>${b.lead}–${b.lead+1} ngày</span></li></ul><p class="fine-print">Thiệp mặc định chưa có lời chúc. Bảo quản nơi khô ráo, tránh nhiệt trực tiếp.</p><div class="row wrap"><button class="button" data-action="add-curated" data-id="${b.id}" ${b.stock===0?"disabled":""}>${b.stock===0?"Tạm hết hàng":"Thêm hộp nguyên mẫu"}</button><button class="button secondary" data-action="customize" data-id="${b.id}" ${b.stock===0?"disabled":""}>Cá nhân hóa hộp này</button></div>${customize?personalizer(b):""}</div></section><section class="section"><div class="container"><span class="eyebrow">Gợi ý liên quan</span><h2>Vì bạn đang xem một món quà ${esc(b.style.toLowerCase())}</h2><div class="product-grid">${boxes.filter(x=>x.id!==b.id&&x.recipients.some(r=>b.recipients.includes(r))).slice(0,3).map(x=>productTile(x)).join("")}</div></div></section>`;
}
function personalizer(b){
  const p=state.personalize;
  return `<div class="personalizer"><h2 style="font-size:1.55rem">Cá nhân hóa</h2><p class="notice">Bạn đang chỉnh hộp <strong>${b.name}</strong>. Mọi phụ phí được cộng ngay vào tổng.</p><div class="form-grid"><div class="field"><label for="p-card">Mẫu thiệp</label><select id="p-card">${cards.map(x=>`<option value="${x.id}" ${p.card===x.id?"selected":""}>${x.name} ${x.price?"+ "+money(x.price):"· đã gồm"}</option>`).join("")}</select></div><div class="field"><label for="p-ribbon">Trang trí</label><select id="p-ribbon">${ribbons.map(x=>`<option value="${x.id}" ${p.ribbon===x.id?"selected":""}>${x.name} ${x.price?"+ "+money(x.price):"· đã gồm"}</option>`).join("")}</select></div></div><div class="field"><label for="p-recipient">Tên người nhận trên thiệp</label><input id="p-recipient" maxlength="40" value="${esc(p.recipient)}"></div><div class="field"><label for="p-message">Lời chúc <span class="muted">(<span id="p-count">${p.message.length}</span>/250)</span></label><textarea id="p-message" maxlength="250" placeholder="Mong những ngày tới đều dịu dàng với bạn.">${esc(p.message)}</textarea></div><label class="checkline"><input id="p-anonymous" type="checkbox" ${p.anonymous?"checked":""}> Không ghi tên người gửi trên thiệp</label><div class="card-preview" id="card-preview">${p.message?esc(p.message):"Lời chúc của bạn sẽ hiện ở đây."}</div><p class="fine-print">Bản xem trước chỉ mô phỏng bố cục chữ, không phải bản in chính xác.</p><button class="button" data-action="add-custom" data-id="${b.id}">Thêm hộp đã cá nhân hóa</button></div>`;
}

function finderBudgetRange(value){return ({"Dưới 300K":[0,299999],"300–500K":[300000,500000],"500–800K":[500001,800000],"Trên 800K":[800001,Infinity]})[value]||[0,Infinity];}
function localGiftRecommendations(){
  const f=state.finder,[min,max]=finderBudgetRange(f.budget),mid=Number.isFinite(max)?(min+max)/2:900000;
  return boxes.filter(box=>box.stock>0).map(box=>{
    const recipient=box.recipients.includes(f.recipient),occasion=box.occasions.includes(f.occasion),inBudget=box.price>=min&&box.price<=max;
    const score=(recipient?45:0)+(occasion?55:0)+(inBudget?35:Math.max(0,18-Math.abs(box.price-mid)/25000))+Math.min(8,box.stock);
    const reason=recipient&&occasion&&inBudget?`Đúng dịp ${f.occasion.toLowerCase()}, hợp với ${f.recipient.toLowerCase()} và nằm trong ngân sách.`:occasion&&inBudget?`Đúng dịp và ngân sách; phong cách ${box.style.toLowerCase()} tạo thêm một lựa chọn khác biệt.`:recipient&&inBudget?`Hợp người nhận và ngân sách; thành phần mang phong cách ${box.style.toLowerCase()}.`:`Một phương án ${box.style.toLowerCase()} gần nhất với các tiêu chí đã chọn.`;
    return {box,score,reason,source:"local"};
  }).sort((a,b)=>b.score-a.score||a.box.price-b.box.price).slice(0,5);
}
function finderRecommendations(){
  const local=localGiftRecommendations(),byId=new Map(local.map(x=>[x.box.id,x])),fromAi=(state.finder.recommendations||[]).map(item=>{
    const box=boxes.find(x=>x.id===item.boxId&&x.stock>0);return box?{box,reason:item.reason||byId.get(box.id)?.reason||"AI chọn theo hồ sơ người nhận.",source:"api"}:null;
  }).filter(Boolean),used=new Set(fromAi.map(x=>x.box.id));
  return [...fromAi,...local.filter(x=>!used.has(x.box.id))].slice(0,5);
}
function referenceForRecommendation(box,index){
  const refs=(state.admin.aiReferences||[]).filter(x=>x.active!==false&&x.data),occasion=state.finder.occasion;
  return refs.find(x=>x.occasion===occasion&&(!x.style||box.style.toLowerCase().includes(x.style.toLowerCase())))||refs.find(x=>x.occasion===occasion)||refs[index%Math.max(1,refs.length)]||null;
}
function recommendationVisual(box,index){
  const generated=aiFinderImages[box.id],own=box.images?.find(x=>x.cover)?.data||box.images?.[0]?.data,ref=referenceForRecommendation(box,index),image=generated||own||ref?.data;
  if(image)return `<div class="ai-gift-visual has-image" style="background-image:url('${String(image).replace(/'/g,"%27")}')"><span>${generated?"Ảnh AI · 1 bố cục":own?"Ảnh hộp quà":"Mẫu tham khảo"}</span></div>`;
  const pieces=(box.items||[]).slice(0,5).map((item,i)=>`<i style="--x:${12+(i%3)*29}%;--y:${14+Math.floor(i/3)*42}%;--r:${(i%2?4:-4)}deg">${esc(item.split(" ").slice(0,2).join(" "))}</i>`).join("");
  return `<div class="ai-gift-visual generated-layout tone-${esc(box.tone||"cream")}"><b>Hộp nhìn từ trên</b>${pieces}<span>1 bố cục gợi ý</span></div>`;
}
async function requestAiGiftRecommendations(){
  const ai=state.admin.ai||{};if(aiFinderBusy)return;
  if(!ai.enabled||!ai.endpoint||!ai.model||!aiSessionKey)return toast("Hãy cấu hình API và nhập API key tại Quản trị → Cài đặt.");
  aiFinderBusy=true;state.finder.aiError="";render();
  try{
    const catalog=boxes.filter(x=>x.stock>0).map(x=>({boxId:x.id,name:x.name,price:x.price,stock:x.stock,recipients:x.recipients,occasions:x.occasions,style:x.style,items:x.items}));
    const response=await fetch(ai.endpoint,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${aiSessionKey}`},body:JSON.stringify({model:ai.model,temperature:.25,response_format:{type:"json_object"},messages:[{role:"system",content:ai.recommendationPrompt||DEFAULT_AI_RECOMMENDATION_PROMPT},{role:"user",content:JSON.stringify({profile:{recipient:state.finder.recipient,occasion:state.finder.occasion,budget:state.finder.budget},catalog})}]})});
    const payload=await response.json().catch(()=>({}));if(!response.ok)throw new Error(payload?.error?.message||`API trả mã ${response.status}`);
    const parsed=parseAiJson(apiContent(payload)),seen=new Set(),recommendations=(parsed.recommendations||[]).filter(x=>boxes.some(b=>b.id===x.boxId&&b.stock>0)&&!seen.has(x.boxId)&&seen.add(x.boxId)).slice(0,5);
    if(!recommendations.length)throw new Error("AI chưa trả boxId hợp lệ từ danh mục.");
    state.finder.recommendations=recommendations;save();toast(`AI đã chọn ${finderRecommendations().length} hộp quà khác nhau.`);
  }catch(error){state.finder.aiError=String(error?.message||"Không gọi được API tư vấn.");save();toast(state.finder.aiError);}
  finally{aiFinderBusy=false;render();}
}
async function requestAiGiftImages(){
  const ai=state.admin.ai||{},recommendations=finderRecommendations();if(aiFinderBusy)return;
  if(!ai.enabled||!ai.imageEndpoint||!ai.imageModel||!aiSessionKey)return toast("Hãy nhập API tạo ảnh, model ảnh và API key tại Quản trị → Cài đặt.");
  aiFinderBusy=true;state.finder.aiError="";render();
  try{
    const results=await Promise.all(recommendations.map(async ({box},index)=>{
      const ref=referenceForRecommendation(box,index),prompt=`${ai.imagePrompt||DEFAULT_AI_IMAGE_PROMPT}\nHộp: ${box.name}. Thành phần: ${(box.items||[]).join(", ")}. Dịp: ${state.finder.occasion}. Người nhận: ${state.finder.recipient}. Phong cách: ${box.style}.${ref?` Tham khảo phong cách: ${ref.title}; ${ref.notes||""}.`:""}`;
      const response=await fetch(ai.imageEndpoint,{method:"POST",headers:{"Content-Type":"application/json","Authorization":`Bearer ${aiSessionKey}`},body:JSON.stringify({model:ai.imageModel,prompt,n:1,size:ai.imageSize||"1024x1024",response_format:"b64_json"})});
      const payload=await response.json().catch(()=>({}));if(!response.ok)throw new Error(payload?.error?.message||`API ảnh trả mã ${response.status}`);const item=payload?.data?.[0],src=item?.b64_json?`data:image/png;base64,${item.b64_json}`:item?.url;if(!src)throw new Error("API ảnh không trả dữ liệu ảnh.");return [box.id,src];
    }));
    aiFinderImages=Object.fromEntries(results);toast("AI đã tạo đúng 1 hình cho mỗi lựa chọn quà.");
  }catch(error){state.finder.aiError=String(error?.message||"Không tạo được ảnh AI.");save();toast(state.finder.aiError);}
  finally{aiFinderBusy=false;render();}
}
function finderPage(){
  pageTitle("Tìm quà nhanh"); const f=state.finder;
  const options=f.step===1?["Người yêu","Bạn thân","Chính mình"]:f.step===2?["Sinh nhật","Kỷ niệm","Làm hòa","Self-care","Valentine / White Day","Giáng sinh","8/3 & 20/10"]:["Dưới 300K","300–500K","500–800K","Trên 800K"];
  const selected=f.step===1?f.recipient:f.step===2?f.occasion:f.budget;
  const questions=["Bạn đang chọn quà cho ai?","Dịp này là dịp gì?","Bạn muốn dành khoảng bao nhiêu cho hộp quà?"];
  if(f.step<=3) return `<section class="page-hero"><div class="narrow"><span class="eyebrow">AI Gift Finder</span><h1>Ba câu hỏi, năm lựa chọn có lý do.</h1><p>AI chỉ được chọn từ sản phẩm đang có. Mỗi lựa chọn sẽ có đúng một hình sắp xếp hoàn chỉnh.</p></div></section><section class="section"><div class="narrow finder-shell"><div class="steps">${[1,2,3].map((n,i)=>`<button class="step ${f.step===n?"active":""}" data-action="finder-step" data-step="${n}" ${n>f.step?"disabled":""}>${n} · ${["Người nhận","Dịp","Ngân sách"][i]}</button>`).join("")}<span></span></div><span class="eyebrow">Câu ${f.step} / 3</span><h2>${questions[f.step-1]}</h2><div class="choice-list">${options.map(v=>`<button class="choice ${selected===v?"selected":""}" data-action="finder-choice" data-value="${esc(v)}">${esc(v)}</button>`).join("")}</div><div class="row spaced" style="margin-top:28px"><button class="button ghost" data-action="finder-reset">Bắt đầu lại</button><button class="button" data-action="finder-next" ${selected?"":"disabled"}>${f.step===3?"Tạo 5 lựa chọn":"Tiếp tục"}</button></div></div></section>`;
  const recommendations=finderRecommendations(),ai=state.admin.ai||{},chatReady=!!(ai.enabled&&ai.endpoint&&ai.model&&aiSessionKey),imageReady=!!(ai.enabled&&ai.imageEndpoint&&ai.imageModel&&aiSessionKey);
  return `<section class="page-hero"><div class="container results-intro"><div><span class="eyebrow">5 lựa chọn cá nhân hóa</span><h1>Mỗi hộp là một món quà khác nhau.</h1><p>${esc(f.recipient)} · ${esc(f.occasion)} · ${esc(f.budget)}. Mỗi hộp chỉ có một hình sắp xếp để bạn dễ chọn.</p></div><button class="button secondary" data-action="finder-edit">Sửa câu trả lời</button></div></section><section class="section"><div class="container"><div class="finder-ai-toolbar"><div><strong>${recommendations.some(x=>x.source==="api")?"Đã chọn bằng API AI":"Đang dùng bộ gợi ý an toàn trong web"}</strong><p class="small muted">${(state.admin.aiReferences||[]).filter(x=>x.active!==false).length} ảnh tham khảo đang hoạt động.${f.aiError?` <b class="danger-text">${esc(f.aiError)}</b>`:""}</p></div><div class="row wrap"><button class="button secondary small-btn" data-action="generate-gift-recommendations" ${chatReady&&!aiFinderBusy?"":"disabled"}>${aiFinderBusy?"AI đang xử lý…":"AI chọn lại 5 hộp"}</button><button class="button small-btn" data-action="generate-gift-images" ${imageReady&&!aiFinderBusy?"":"disabled"}>Tạo 5 hình AI</button></div></div><div class="ai-gift-grid">${recommendations.map(({box,reason,source},index)=>`<article class="ai-gift-card">${recommendationVisual(box,index)}<div class="ai-gift-card-body"><div class="row spaced"><span class="eyebrow">Lựa chọn ${index+1}</span><span class="status ${source==="api"?"status-published":"status-draft"}">${source==="api"?"AI API":"Gợi ý demo"}</span></div><h2>${esc(box.name)}</h2><p>${esc(reason)}</p><ul>${(box.items||[]).slice(0,5).map(item=>`<li>${esc(item)}</li>`).join("")}</ul><div class="row spaced"><strong class="price">${money(box.price)}</strong><span class="small muted">Còn ${box.stock}</span></div><a class="button" href="/hop-qua/${box.slug}?customize=1" data-route>Chọn hộp này</a></div></article>`).join("")}</div><div style="margin-top:34px"><button class="button ghost" data-action="finder-reset">Bắt đầu lại</button> <a class="button ghost" href="/hop-qua" data-route>Xem tất cả hộp</a></div></div></section>`;
}

function authPage(){
  pageTitle("Đăng nhập"); const ret=safeReturnTo(q("returnTo")||"/tai-khoan");
  if(state.user) return `<section class="section"><div class="narrow center"><h1>Bạn đã đăng nhập.</h1><p>Tiếp tục nơi bạn đang chọn quà nhé.</p><button class="button" data-action="continue-return" data-return="${esc(ret)}">Tiếp tục</button></div></section>`;
  const mode=q("mode")||"login";
  return `<section class="auth-layout"><div class="auth-story"><span class="eyebrow" style="color:#f0c5cd">Một chỗ để giữ những điều quan trọng</span><h1>Đăng nhập để tạo hộp quà của riêng bạn.</h1><p>Và lưu lại những dịp quan trọng, bản nháp cùng lịch sử đơn. Đây là xác thực demo, không nhập mật khẩu thật.</p></div><div class="auth-form"><form id="auth-form" data-return="${esc(ret)}"><div class="row wrap" style="margin-bottom:24px"><a class="link" href="/dang-nhap?returnTo=${encodeURIComponent(ret)}" data-route>Đăng nhập</a><a class="link" href="/dang-nhap?mode=register&returnTo=${encodeURIComponent(ret)}" data-route>Đăng ký</a><a class="link" href="/dang-nhap?mode=forgot&returnTo=${encodeURIComponent(ret)}" data-route>Quên mật khẩu</a></div><h2>${mode==="register"?"Tạo tài khoản khách hàng":mode==="forgot"?"Đặt lại mật khẩu demo":"Mừng bạn quay lại"}</h2><div class="notice">Mật khẩu chung: <strong>goithuong</strong>.<br>Quản trị: <strong>owner@goithuong.test</strong> · Sản phẩm: <strong>sanpham@goithuong.test</strong> · Đơn hàng: <strong>donhang@goithuong.test</strong>.</div>${mode==="register"?'<div class="field"><label for="auth-name">Tên của bạn</label><input id="auth-name" name="name" required autocomplete="name"></div>':""}<div class="field"><label for="auth-email">Email</label><input id="auth-email" name="email" type="email" required autocomplete="email"></div>${mode==="forgot"?"":'<div class="field"><label for="auth-password">Mật khẩu demo</label><input id="auth-password" name="password" type="password" required autocomplete="current-password"><span class="fine-print">Đăng ký công khai luôn tạo vai trò khách hàng. Chỉ chủ cửa hàng có quyền cấp vai trò nội bộ.</span></div>'}<div id="auth-error" class="field-error" role="alert"></div><button class="button" type="submit">${mode==="register"?"Tạo tài khoản khách hàng":mode==="forgot"?"Gửi hướng dẫn demo":"Đăng nhập"}</button></form></div></section>`;
}

function builderTotals(){
  const lines=Object.entries(state.builder.items).filter(([,n])=>n>0).map(([id,qty])=>({item:giftItems.find(x=>x.id===id),qty})).filter(l=>l.item);
  const itemTotal=lines.reduce((n,l)=>n+l.item.price*l.qty,0), size=lines.reduce((n,l)=>n+l.item.size*l.qty,0), pack=packaging.find(x=>x.id===state.builder.packaging), card=cards.find(x=>x.id===state.builder.card), ribbon=ribbons.find(x=>x.id===state.builder.ribbon);
  return {lines,itemTotal,size,pack,card,ribbon,total:itemTotal+(pack?.price||0)+(card?.price||0)+(ribbon?.price||0)};
}
function selectedBuilderMaterials(){ return (state.admin.materials3d||[]).filter(material=>material.active!==false&&state.builder.materials?.[material.id]); }
function builderMaterialTotal(){ return selectedBuilderMaterials().reduce((sum,material)=>sum+Number(material.price||0),0); }
function builderSummary(){ const t=builderTotals(),chosenMaterials=selectedBuilderMaterials(); return `<h3>Hộp của bạn</h3><p class="small muted">${t.lines.reduce((n,l)=>n+l.qty,0)} món · ${t.size} đơn vị dung lượng</p><div class="summary-lines">${t.lines.map(l=>`<div class="summary-line"><span>${l.qty} × ${l.item.name}</span><span>${money(l.item.price*l.qty)}</span></div>`).join("")||'<p class="muted small" style="padding-top:14px">Chưa có món nào.</p>'}${t.pack?`<div class="summary-line"><span>${t.pack.name}</span><span>${money(t.pack.price)}</span></div>`:""}${chosenMaterials.map(material=>`<div class="summary-line"><span>${material.name}</span><span>${money(material.price)}</span></div>`).join("")}${t.card&&t.card.price?`<div class="summary-line"><span>${t.card.name}</span><span>${money(t.card.price)}</span></div>`:""}${t.ribbon&&t.ribbon.price?`<div class="summary-line"><span>${t.ribbon.name}</span><span>${money(t.ribbon.price)}</span></div>`:""}</div><div class="row spaced"><strong>Tạm tính</strong><strong class="price">${money(t.total+builderMaterialTotal())}</strong></div><p class="fine-print">Chưa gồm phí giao. Không giữ hàng hoặc lịch giao ở bản nháp.</p>`; }
function builderPage(){
  pageTitle("Tự tạo hộp");
  if(!state.user) return `<section class="page-hero"><div class="container"><span class="eyebrow">Tự tạo hộp</span><h1>Mỗi món một chút, thành một hộp rất riêng.</h1><p>Xem trước 20 món demo có ảnh, giá và kích thước đóng gói. Đăng nhập trước khi bắt đầu chọn để bản nháp và dữ liệu riêng không bị lẫn.</p><button class="button" data-action="gate-builder">Đăng nhập để bắt đầu</button></div></section><section class="section"><div class="container"><div class="item-list">${giftItems.map(i=>`<article class="item-row">${itemArt(i)}<h3>${esc(i.name)}</h3><span class="small muted">${esc(i.category)} · ${money(i.price)}</span><span class="item-spec">${i.model3d.length} × ${i.model3d.width} × ${i.model3d.height} mm · ${i.model3d.weight} g</span></article>`).join("")}</div></div></section>`;
  const b=state.builder,t=builderTotals();
  return `<section class="page-hero"><div class="container"><span class="eyebrow">Tự tạo hộp</span><h1>Tự tạo một hộp quà.</h1><p>Chọn món, hộp và vật liệu chèn lót; hệ thống sẽ chuẩn bị một cách xếp tốt nhất.</p></div></section><section class="section"><div class="container"><div class="steps builder-five-steps">${["Chọn món","Hộp & chèn lót","Thiệp & trang trí","Xem lại","AI gợi ý xếp"].map((n,i)=>`<button class="step ${b.step===i+1?"active":""}" data-action="builder-step" data-step="${i+1}" ${i+1>b.step||i===4?"disabled":""}>${i+1} · ${n}</button>`).join("")}</div><div class="builder-shell"><div class="builder-main">${builderStep()}</div><aside class="builder-summary">${builderSummary()}</aside></div><div class="mobile-builder-bar"><div><span class="small">${t.lines.reduce((n,l)=>n+l.qty,0)} món</span><br><strong>${money(t.total+builderMaterialTotal())}</strong></div><button class="button small-btn" data-action="builder-next">${b.step===4?"Xem cách xếp":"Tiếp tục"}</button></div></div></section>`;
}
function builderStep(){ const b=state.builder,t=builderTotals();
  if(b.step===1) return `<div class="row spaced wrap"><div><h2>Chọn những món bạn muốn gửi</h2><p class="muted">20 sản phẩm demo đã có ảnh chính và kích thước thật để thử AI xếp hộp.</p></div><div class="field" style="margin:0"><label for="builder-budget">Ngân sách hộp</label><input id="builder-budget" type="number" min="100000" step="50000" value="${b.budget}" style="max-width:180px"></div></div>${t.total>b.budget?`<p class="notice error">Đang vượt ngân sách ${money(t.total-b.budget)}. Chúng mình không tự xóa món của bạn.</p>`:`<p class="notice">Còn khoảng ${money(b.budget-t.total)} trong ngân sách.</p>`}<div class="item-list">${giftItems.map(i=>{const n=b.items[i.id]||0,m=i.model3d; return `<article class="item-row">${itemArt(i)}<h3>${esc(i.name)}</h3><span class="small muted">${esc(i.category)} · ${i.size} đơn vị</span><span class="item-spec">${m.length} × ${m.width} × ${m.height} mm · ${m.weight} g${m.fragile?" · Dễ vỡ":""}</span><span class="price small">${money(i.price)}</span>${i.stock===0?'<p class="small muted">Tạm hết hàng</p>':`<div class="qty"><button aria-label="Giảm ${esc(i.name)}" data-action="builder-qty" data-id="${i.id}" data-delta="-1">−</button><span>${n}</span><button aria-label="Thêm ${esc(i.name)}" data-action="builder-qty" data-id="${i.id}" data-delta="1">+</button></div>`}${i.lead>2?`<p class="fine-print">Cần ${i.lead} ngày chuẩn bị</p>`:""}</article>`}).join("")}</div><div class="row spaced" style="margin-top:34px"><button class="button secondary" data-action="save-draft">Lưu bản nháp</button><button class="button" data-action="builder-next" ${t.lines.length?"":"disabled"}>Chọn hộp</button></div>`;
  if(b.step===2) return `<div class="row spaced wrap"><div><span class="eyebrow">Bao bì do Gói Thương quản lý</span><h2>Chọn hộp và lớp bảo vệ</h2><p class="muted">Bạn đã chọn ${t.size} đơn vị dung lượng. Hộp không đủ chỗ sẽ bị khóa; độ dày chèn lót được tính vào không gian đóng gói.</p></div><span class="pack-catalog-count">${packaging.length} hộp · ${(state.admin.materials3d||[]).filter(x=>x.active!==false).length} vật liệu</span></div><h3 class="builder-subhead">1. Kiểu hộp</h3><div class="packaging-choice-grid">${packaging.map(p=>{const ok=p.capacity>=t.size,selected=b.packaging===p.id; return `<label class="package-option ${selected?"selected":""} ${ok?"":"disabled"}"><input type="radio" name="package" value="${p.id}" ${selected?"checked":""} ${ok?"":"disabled"}>${assetThumb("packaging",p)}<span class="package-copy"><strong>${p.name}</strong><small>${p.finish||p.color}</small><small>Lòng hộp ${p.innerLength} × ${p.innerWidth} × ${p.innerHeight} mm</small>${ok?`<em>Phù hợp ${t.size}/${p.capacity} đơn vị</em>`:'<em class="danger-text">Không đủ dung lượng</em>'}</span><span class="price">${money(p.price)}</span></label>`}).join("")}</div><h3 class="builder-subhead material-heading">2. Vật liệu chèn lót</h3><p class="muted small">Có thể chọn nhiều loại. Hệ thống sẽ tính tất cả khi tạo một phương án cuối.</p><div class="material-choice-grid">${(state.admin.materials3d||[]).filter(material=>material.active!==false).map(material=>`<label class="material-choice ${b.materials?.[material.id]?"selected":""}" style="--material-color:${material.color}"><input type="checkbox" data-builder-material="${material.id}" ${b.materials?.[material.id]?"checked":""}><span class="material-choice-art material-kind-${material.kind}"><i></i></span><span><strong>${esc(material.name)}</strong><small>${esc(material.description||"")}</small><em>Dày ${material.thickness} mm · ${money(material.price)}</em></span></label>`).join("")}</div><div class="material-selection-note"><span>Đang chọn <strong>${selectedBuilderMaterials().length}</strong> loại chèn lót</span><span>Phụ phí <strong>${money(builderMaterialTotal())}</strong></span></div><div class="row spaced" style="margin-top:30px"><button class="button ghost" data-action="builder-back">Quay lại chọn món</button><button class="button" data-action="builder-next" ${b.packaging?"":"disabled"}>Thiệp & trang trí</button></div>`;
  if(b.step===3){const selectedCard=cards.find(x=>x.id===b.card),selectedRibbon=ribbons.find(x=>x.id===b.ribbon);return `<h2>Viết điều bạn muốn gửi</h2><div class="choice-preview-grid">${choicePreview("cards",selectedCard)}${choicePreview("ribbons",selectedRibbon)}</div><div class="form-grid"><div class="field"><label for="b-card">Mẫu thiệp</label><select id="b-card">${cards.map(x=>`<option value="${x.id}" ${b.card===x.id?"selected":""}>${x.name} ${x.price?"+ "+money(x.price):"· đã gồm"}</option>`).join("")}</select></div><div class="field"><label for="b-ribbon">Ruy băng</label><select id="b-ribbon">${ribbons.map(x=>`<option value="${x.id}" ${b.ribbon===x.id?"selected":""}>${x.name} ${x.price?"+ "+money(x.price):"· đã gồm"}</option>`).join("")}</select></div><div class="field"><label for="b-recipient">Tên người nhận</label><input id="b-recipient" maxlength="40" value="${esc(b.recipient)}"></div><div class="field"><label for="b-sender">Tên người gửi</label><input id="b-sender" maxlength="40" value="${esc(b.sender)}" ${b.anonymous?"disabled":""}></div></div><label class="checkline"><input id="b-anonymous" type="checkbox" ${b.anonymous?"checked":""}> Không ghi tên người gửi trên thiệp</label><div class="field"><label for="b-message">Lời chúc <span class="muted">(${b.message.length}/250)</span></label><textarea id="b-message" maxlength="250">${esc(b.message)}</textarea></div><div class="card-preview card-style-${esc(b.card)}">${b.message?esc(b.message):"Lời chúc của bạn sẽ hiện ở đây."}</div><p class="fine-print">Shop vẫn cần thông tin người mua để xử lý đơn. Bản xem trước chỉ mô phỏng bố cục.</p><div class="row spaced"><button class="button ghost" data-action="builder-back">Quay lại chọn hộp</button><button class="button" data-action="builder-next">Xem lại</button></div>`;}
  return `<h2>Kiểm tra lựa chọn trước khi tạo gợi ý</h2><p class="muted">Hệ thống dùng ảnh chính và kích thước thật để chuẩn bị một phương án tốt nhất. Mặt chính của mọi món luôn hướng lên trên.</p><div class="summary-lines">${t.lines.map(l=>`<div class="summary-line"><span>${l.qty} × ${l.item.name}</span><span>${money(l.item.price*l.qty)}</span></div>`).join("")}<div class="summary-line"><span>${t.pack?.name||"Chưa chọn hộp"}</span><span>${money(t.pack?.price||0)}</span></div>${selectedBuilderMaterials().map(material=>`<div class="summary-line"><span>${material.name}</span><span>${money(material.price)}</span></div>`).join("")}<div class="summary-line"><span>${t.card?.name}</span><span>${money(t.card?.price||0)}</span></div><div class="summary-line"><span>${t.ribbon?.name}</span><span>${money(t.ribbon?.price||0)}</span></div></div><div class="card-preview">${b.message?esc(b.message):"Thiệp chưa có lời chúc"}</div><div class="field" style="margin-top:24px"><label for="draft-name">Tên hộp để dễ tìm lại</label><input id="draft-name" maxlength="60" value="${esc(b.draftName)}"></div><div class="notice">Phương án cuối sẽ lưu cùng đơn để người bán đóng gói theo đúng thứ tự và vị trí.</div><div class="row spaced wrap" style="margin-top:24px"><button class="button secondary" data-action="save-draft">Lưu bản nháp</button><div class="row"><button class="button ghost" data-action="builder-back">Sửa thiệp</button><button class="button" data-action="open-ai-layouts">Tạo cách xếp →</button></div></div>`;
}

function packingMaterialTotal(){
  const selected=state.builder.materials||state.builder.layout3d?.materials||{};
  return (state.admin.materials3d||[]).filter(m=>selected[m.id]).reduce((sum,m)=>sum+Number(m.price||0),0);
}
const AI_LAYOUT_STYLES=[
  {id:"visual",name:"Dễ nhìn",description:"Nhãn chính rõ, các món nổi bật ở phía trước.",badge:"Ưu tiên thẩm mỹ"},
  {id:"compact",name:"Gọn nhất",description:"Tận dụng diện tích và giảm khoảng trống trong hộp.",badge:"Tiết kiệm không gian"},
  {id:"safe",name:"An toàn",description:"Món nặng gần tâm, món dễ vỡ cách xa thành hộp.",badge:"Ưu tiên bảo vệ"},
  {id:"balanced",name:"Cân đối",description:"Phân bố khối lượng đều quanh tâm hộp.",badge:"Dễ vận chuyển"},
  {id:"premium",name:"Trình bày cao cấp",description:"Bố cục thoáng để giấy lót và từng món đều dễ thấy.",badge:"Đẹp khi mở hộp"},
];
const AI_PACKING_SYSTEM_PROMPT=DEFAULT_AI_PACKING_PROMPT;

function aiPromptInput(box,lines){return {box:{id:box.id,innerLength:box.innerLength,innerWidth:box.innerWidth,innerHeight:box.innerHeight,maxWeight:box.maxWeight,lidClearance:box.lidClearance},materials:selectedBuilderMaterials().map(x=>({id:x.id,name:x.name,kind:x.kind,thickness:x.thickness})),products:lines.map(line=>{const image=line.item.images?.find(x=>x.cover)?.data||line.item.model3d?.textureData||"";return {productId:line.item.id,name:line.item.name,quantity:line.qty,mainImage:image?new URL(image,location.origin).href:"",dimensions:{length:line.item.model3d?.length,width:line.item.model3d?.width,height:line.item.model3d?.height},weight:line.item.model3d?.weight,padding:line.item.model3d?.padding,fragile:!!line.item.model3d?.fragile,canSupport:!!line.item.model3d?.canSupport,maxLoad:line.item.model3d?.maxLoad,primaryFace:"top",allowedRotation:"horizontal-only"};})};}

function aiFloorHeight(){return selectedBuilderMaterials().filter(x=>x.kind==="liner"||x.kind==="fiber").reduce((sum,x)=>sum+Number(x.thickness||0),0);}
function aiPlacedDimensions(instance){const turn=Math.abs(Math.round(Number(instance.rotY||0)/90))%2;return turn?{length:Number(instance.profile.width),width:Number(instance.profile.length),height:Number(instance.profile.height)}:{length:Number(instance.profile.length),width:Number(instance.profile.width),height:Number(instance.profile.height)};}
function aiTarget(style,index,box){
  const length=Number(box.innerLength),width=Number(box.innerWidth);
  if(style==="visual")return {x:0,z:width*.28};
  if(style==="compact")return {x:-length*.34,z:-width*.32};
  if(style==="safe")return {x:0,z:0};
  if(style==="balanced")return {x:(index%2?1:-1)*length*.18,z:(Math.floor(index/2)%2?1:-1)*width*.12};
  return {x:(index%3-1)*length*.16,z:-width*.18};
}
function aiSortInstances(instances,style){
  const list=[...instances],area=x=>Number(x.profile.length)*Number(x.profile.width),weight=x=>Number(x.profile.weight||0);
  if(style==="safe")return list.sort((a,b)=>weight(b)-weight(a)||Number(a.profile.fragile)-Number(b.profile.fragile));
  if(style==="visual")return list.sort((a,b)=>Number(a.profile.fragile)-Number(b.profile.fragile)||area(b)-area(a));
  if(style==="balanced")return list.sort((a,b)=>weight(b)-weight(a)||area(b)-area(a));
  return list.sort((a,b)=>area(b)-area(a));
}
function buildAiLayout(style,styleIndex,box,lines){
  const cfg=syncPackingConfiguration({configuration:null,box,lines,materials:state.admin.materials3d,owner:owner()});
  cfg.materials=structuredClone(state.builder.materials||{});cfg.promptVersion="gift-pack-face-up-v1";cfg.primaryFaceRule="up";
  const floor=aiFloorHeight(),halfL=Number(box.innerLength)/2,halfW=Number(box.innerWidth)/2,placed=[],ordered=aiSortInstances(cfg.instances,style);
  for(let itemIndex=0;itemIndex<ordered.length;itemIndex++){
    const instance=ordered[itemIndex],target=aiTarget(style,itemIndex,box),angles=style==="compact"?[90,0]:[0,90];let chosen=null;
    for(const angle of angles){
      instance.rotX=0;instance.rotY=angle;instance.rotZ=0;instance.inBox=true;instance.labelFacing="up";instance.profile.primaryFace="top";
      const d=aiPlacedDimensions(instance),pad=Number(instance.profile.padding||0),minX=-halfL+d.length/2+pad,maxX=halfL-d.length/2-pad,minZ=-halfW+d.width/2+pad,maxZ=halfW-d.width/2-pad;
      if(minX>maxX||minZ>maxZ)continue;
      const candidates=[];
      for(let z=minZ;z<=maxZ+.1;z+=10)for(let x=minX;x<=maxX+.1;x+=10){
        const edge=Math.min(x-minX,maxX-x,z-minZ,maxZ-z),edgePenalty=style==="safe"?Math.max(0,24-edge)*12:0;
        const jitter=Math.abs(((Math.round(x)+Math.round(z)*3+styleIndex*17+Number(state.builder.aiSeed||1)*11)%23)-11);
        candidates.push({x,z,score:(x-target.x)**2+(z-target.z)**2+edgePenalty+jitter});
      }
      candidates.sort((a,b)=>a.score-b.score);
      for(const point of candidates){
        instance.x=point.x;instance.z=point.z;instance.y=floor+d.height/2;
        const test={...cfg,instances:[...placed,structuredClone(instance)]},report=validatePackingConfiguration(test,box);
        if(report.valid){chosen=structuredClone(instance);break;}
      }
      if(chosen)break;
    }
    if(!chosen)return null;
    placed.push(chosen);
  }
  cfg.instances=placed;cfg.selectedId=null;cfg.updatedAt=new Date().toISOString();
  const report=validatePackingConfiguration(cfg,box,lines);if(!report.valid)return null;
  const definition=AI_LAYOUT_STYLES.find(x=>x.id===style);
  return {id:`${style}-${state.builder.aiSeed||1}`,strategy:style,name:definition.name,description:definition.description,badge:definition.badge,faceRule:"Mặt chính luôn hướng lên",configuration:cfg,report,generatedAt:new Date().toISOString()};
}
function deriveAiLayout(base,style,styleIndex,box,lines){
  if(!base)return null;
  const cfg=structuredClone(base.configuration),mirrorX=styleIndex===2||styleIndex===4,mirrorZ=styleIndex===3||styleIndex===4;
  cfg.id=crypto.randomUUID();cfg.instances.forEach(instance=>{if(mirrorX)instance.x=-instance.x;if(mirrorZ)instance.z=-instance.z;instance.rotX=0;instance.rotZ=0;instance.labelFacing="up";instance.profile.primaryFace="top";});
  cfg.updatedAt=new Date().toISOString();const report=validatePackingConfiguration(cfg,box,lines);if(!report.valid)return null;
  const definition=AI_LAYOUT_STYLES.find(x=>x.id===style);
  return {id:`${style}-${state.builder.aiSeed||1}`,strategy:style,name:definition.name,description:definition.description,badge:definition.badge,faceRule:"Mặt chính luôn hướng lên",configuration:cfg,report,generatedAt:new Date().toISOString()};
}
function prepareAiLayouts(box,lines){
  const signature=JSON.stringify({version:"face-up-single-1",box:box.id,items:lines.map(x=>[x.item.id,x.qty]),materials:state.builder.materials,seed:state.builder.aiSeed||1});
  if(state.builder.aiLayoutSignature===signature&&state.builder.aiLayouts?.length)return state.builder.aiLayouts;
  const order=["premium","balanced","safe","visual","compact"],layout=order.map((id,index)=>buildAiLayout(id,index,box,lines)).find(Boolean),layouts=layout?[layout]:[];
  state.builder.aiLayouts=layouts;state.builder.aiLayoutSignature=signature;state.builder.aiSessionId=state.builder.aiSessionId||crypto.randomUUID();state.builder.aiPrompt={version:"gift-pack-face-up-single-v1",system:state.admin.ai?.packingPrompt||AI_PACKING_SYSTEM_PROMPT,input:aiPromptInput(box,lines)};
  state.builder.aiLayoutId=layouts.some(x=>x.id===state.builder.aiLayoutId)?state.builder.aiLayoutId:(layouts[0]?.id||null);save();return layouts;
}
function parseAiJson(value){
  if(value&&typeof value==="object")return value;
  const text=String(value||"").trim().replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"");
  return JSON.parse(text);
}
function apiContent(payload){
  if(payload?.choices?.[0]?.message?.content)return payload.choices[0].message.content;
  if(payload?.output_text)return payload.output_text;
  if(Array.isArray(payload?.output))return payload.output.flatMap(x=>x.content||[]).map(x=>x.text||x.output_text||"").join("");
  return payload;
}
function apiLayoutFromResult(raw,index,box,lines){
  const style=AI_LAYOUT_STYLES.find(x=>x.id===raw?.strategy)||AI_LAYOUT_STYLES[index];if(!style)return null;
  const cfg=syncPackingConfiguration({configuration:null,box,lines,materials:state.admin.materials3d,owner:owner()});
  cfg.materials=structuredClone(state.builder.materials||{});cfg.promptVersion="gift-pack-face-up-api-v1";cfg.primaryFaceRule="up";
  const placements=Array.isArray(raw?.placements)?raw.placements:[],used=new Set(),floor=aiFloorHeight();
  for(const placement of placements){
    const candidates=cfg.instances.filter(x=>x.productId===placement.productId),quantityIndex=Number(placement.quantityIndex||0),instance=candidates[quantityIndex];
    if(!instance||used.has(instance.instanceId))continue;
    const rotation=Math.abs(Math.round(Number(placement.rotationY||0)/90))%2?90:0;
    Object.assign(instance,{x:Number(placement.x),z:Number(placement.z),rotX:0,rotY:rotation,rotZ:0,inBox:true,labelFacing:"up"});
    const d=aiPlacedDimensions(instance),requestedY=Number(placement.y);instance.y=Number.isFinite(requestedY)?requestedY:floor+d.height/2;
    instance.profile.primaryFace="top";used.add(instance.instanceId);
  }
  if(used.size!==cfg.instances.length)return null;
  cfg.selectedId=null;cfg.updatedAt=new Date().toISOString();const report=validatePackingConfiguration(cfg,box,lines);if(!report.valid)return null;
  return {id:`api-${style.id}-${Date.now()}-${index}`,strategy:style.id,name:style.name,description:style.description,badge:style.badge,faceRule:"Mặt chính luôn hướng lên",source:"api",configuration:cfg,report,generatedAt:new Date().toISOString()};
}
function mainProductImage(item){return item?.images?.find(x=>x.cover)?.data||item?.images?.[0]?.data||item?.model3d?.textureData||"";}
function isCloudflareWorkerEndpoint(endpoint){return /workers\.dev/i.test(String(endpoint||""));}
function isGeminiImageEndpoint(endpoint){return /generativelanguage\.googleapis\.com\/.+:generateContent(?:\?|$)/i.test(String(endpoint||""));}
function blobBase64(blob){return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result||"").split(",")[1]||"");reader.onerror=()=>reject(new Error("Không đọc được ảnh tham chiếu."));reader.readAsDataURL(blob);});}
async function referenceImageData(url){
  const response=await fetch(new URL(url,location.origin).href);if(!response.ok)throw new Error(`Không tải được một ảnh sản phẩm (${response.status}).`);
  const blob=await response.blob(),data=await blobBase64(blob);if(!data)throw new Error("Ảnh sản phẩm không có dữ liệu.");
  return {mimeType:blob.type||"image/jpeg",data};
}

function resizeImageToBlob(imageDataUrl, maxSide = 512){
  return new Promise((resolve,reject)=>{
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      let width = img.naturalWidth || img.width;
      let height = img.naturalHeight || img.height;
      if (width > maxSide || height > maxSide) {
        if (width >= height) {
          height = Math.round((height * maxSide) / width);
          width = maxSide;
        } else {
          width = Math.round((width * maxSide) / height);
          height = maxSide;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, width);
      canvas.height = Math.max(1, height);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob(blob => {
        if (blob) resolve(blob);
        else reject(new Error("Không thể nén ảnh sản phẩm."));
      }, "image/png");
    };
    img.onerror = () => reject(new Error("Không tải được ảnh sản phẩm để nén."));
    img.src = imageDataUrl;
  });
}

function buildTextModelInput(box, lines){
  const chosenMaterials = selectedBuilderMaterials();
  const card = state.admin.cards?.find(c => c.id === state.builder.card);
  const ribbon = state.admin.ribbons?.find(r => r.id === state.builder.ribbon);
  return {
    box: {
      id: box.id,
      name: box.name,
      innerLengthMm: Number(box.innerLength || 330),
      innerWidthMm: Number(box.innerWidth || 230),
      innerHeightMm: Number(box.innerHeight || 125),
      lidClearanceMm: Number(box.lidClearance || 7),
      maxWeightGram: Number(box.maxWeight || 2500)
    },
    materials: chosenMaterials.map(m => ({
      id: m.id,
      name: m.name,
      kind: m.kind,
      thicknessMm: Number(m.thickness || 0)
    })),
    products: lines.map(line => {
      const p = line.item;
      const m = p.model3d || {};
      return {
        productId: p.id,
        name: p.name,
        quantity: Number(line.qty || 1),
        lengthMm: Number(m.length || 100),
        widthMm: Number(m.width || 70),
        heightMm: Number(m.height || 45),
        weightGram: Number(m.weight || 100),
        paddingMm: Number(m.padding || 0),
        fragile: Boolean(m.fragile),
        canSupport: m.canSupport !== false,
        primaryFace: "up"
      };
    }),
    card: {
      name: card?.name || "None",
      message: state.builder.message || ""
    },
    ribbon: {
      name: ribbon?.name || "None"
    }
  };
}

function validateAndConvertTextModelLayout(rawJson, box, lines){
  let parsed;
  try {
    parsed = parseAiJson(rawJson);
  } catch(e) {
    return { valid: false, errors: ["Dữ liệu phản hồi không phải JSON hợp lệ: " + e.message] };
  }
  if (!parsed || typeof parsed !== "object") {
    return { valid: false, errors: ["Dữ liệu trả về rỗng hoặc không đúng cấu trúc JSON."] };
  }
  if (parsed.status === "impossible") {
    return { valid: false, impossible: true, errors: [parsed.reason || "AI đánh giá không thể xếp vừa các món vào hộp này."] };
  }

  const layout = parsed.layout || parsed;
  const placements = Array.isArray(layout.placements) ? layout.placements : [];
  if (!placements.length) {
    return { valid: false, errors: ["Thiếu danh sách vị trí xếp món (placements)."] };
  }

  // Validate product IDs and quantities
  const expectedMap = new Map();
  lines.forEach(l => {
    expectedMap.set(l.item.id, Number(l.qty || 0));
  });

  const placementCounts = new Map();
  for (const pl of placements) {
    const pid = pl.productId;
    if (!expectedMap.has(pid)) {
      return { valid: false, errors: [`Sản phẩm lạ trong phương án: "${pid}" không nằm trong danh sách đã chọn.`] };
    }
    placementCounts.set(pid, (placementCounts.get(pid) || 0) + 1);
  }

  for (const [pid, expectedQty] of expectedMap.entries()) {
    const actualQty = placementCounts.get(pid) || 0;
    if (actualQty !== expectedQty) {
      const pName = lines.find(l => l.item.id === pid)?.item?.name || pid;
      return { valid: false, errors: [`Số lượng của "${pName}" là ${actualQty}, nhưng yêu cầu phải là ${expectedQty}.`] };
    }
  }

  // Build 3D configuration
  const cfg = syncPackingConfiguration({ configuration: null, box, lines, materials: state.admin.materials3d, owner: owner() });
  cfg.materials = structuredClone(state.builder.materials || {});
  cfg.primaryFaceRule = "up";
  const floor = aiFloorHeight();
  const used = new Set();

  for (const pl of placements) {
    const candidates = cfg.instances.filter(x => x.productId === pl.productId);
    const qIndex = Number(pl.quantityIndex ?? 0);
    const instance = candidates[qIndex] || candidates.find(x => !used.has(x.instanceId));
    if (!instance || used.has(instance.instanceId)) {
      return { valid: false, errors: [`Không tìm thấy vật thể hợp lệ cho sản phẩm ${pl.productId} (chỉ mục ${qIndex}).`] };
    }

    const x = Number(pl.xMm ?? pl.x ?? 0);
    const z = Number(pl.zMm ?? pl.z ?? 0);
    const rawRot = Number(pl.rotationYDeg ?? pl.rotationY ?? 0);
    const rotY = Math.abs(Math.round(rawRot / 90)) % 2 ? 90 : 0;

    instance.x = x;
    instance.z = z;
    instance.rotX = 0;
    instance.rotY = rotY;
    instance.rotZ = 0;
    instance.inBox = true;
    instance.labelFacing = "up";
    instance.profile.primaryFace = "top";

    const d = aiPlacedDimensions(instance);
    const reqY = Number(pl.yMm ?? pl.y);
    instance.y = Number.isFinite(reqY) ? reqY : floor + d.height / 2;

    used.add(instance.instanceId);
  }

  if (used.size !== cfg.instances.length) {
    return { valid: false, errors: ["Chưa xếp đủ tất cả sản phẩm vào lòng hộp."] };
  }

  cfg.selectedId = null;
  cfg.updatedAt = new Date().toISOString();

  // Run comprehensive geometry check
  const report = validatePackingConfiguration(cfg, box, lines);
  if (!report.valid) {
    return { valid: false, errors: report.messages, cfg, report, parsedLayout: layout };
  }

  const styleId = layout.strategy || "balanced";
  const style = AI_LAYOUT_STYLES.find(x => x.id === styleId) || AI_LAYOUT_STYLES[0];
  const validatedLayout = {
    id: `api-${style.id}-${Date.now()}`,
    strategy: style.id,
    name: style.name,
    description: style.description,
    badge: style.badge,
    faceRule: "Mặt chính luôn hướng lên",
    source: "text-model-api",
    configuration: cfg,
    report,
    generatedAt: new Date().toISOString()
  };

  return { valid: true, layout: validatedLayout, cfg, report };
}

function getProductFormFactor(p) {
  const m = p?.model3d || {};
  const cat = String(p?.category || "").toLowerCase();
  const name = String(p?.name || "").toLowerCase();
  const shape = String(m.shape || "box").toLowerCase();
  const length = Number(m.length || 100);
  const width = Number(m.width || 70);
  const height = Number(m.height || 45);

  if (cat.includes("socola") || name.includes("socola") || name.includes("chocolate")) {
    return "SEALED RETAIL BOX OF CHOCOLATE (packaged inside its printed brand retail box/wrapper, lying flat facing up; strictly a thin flat rectangular paper carton, NOT bare unpackaged chocolate cubes, NOT a jar, NOT a bottle)";
  }
  if (cat.includes("nến") || name.includes("nến") || name.includes("candle") || shape === "cylinder") {
    return "CYLINDRICAL GLASS JAR CANDLE with round screw lid";
  }
  if (cat.includes("trà") || name.includes("trà") || name.includes("tea")) {
    return "SEALED STAND-UP TEA POUCH OR RECTANGULAR TEA BOX";
  }
  if (shape === "cylinder") {
    return "CYLINDRICAL JAR / ROUND CONTAINER";
  }
  if (height < Math.min(length, width) * 0.4) {
    return "SEALED FLAT RECTANGULAR RETAIL BOX (thin and flat paperboard packaging, NOT a jar, NOT a bottle)";
  }
  return "SEALED RECTANGULAR BOX PACKAGING";
}

function getSpatialZone(x, z, boxLength, boxWidth) {
  const halfL = (boxLength || 220) / 2;
  const halfW = (boxWidth || 160) / 2;
  
  let hPos = "center";
  if (x < -halfL * 0.2) hPos = "left";
  else if (x > halfL * 0.2) hPos = "right";

  let vPos = "middle";
  if (z < -halfW * 0.2) vPos = "back";
  else if (z > halfW * 0.2) vPos = "front";

  if (hPos === "left" && vPos === "back") return "the back-left corner INSIDE the open box";
  if (hPos === "left" && vPos === "front") return "the front-left corner INSIDE the open box";
  if (hPos === "right" && vPos === "back") return "the back-right corner INSIDE the open box";
  if (hPos === "right" && vPos === "front") return "the front-right corner INSIDE the open box";
  if (hPos === "left") return "the left half INSIDE the open box";
  if (hPos === "right") return "the right half INSIDE the open box";
  if (vPos === "back") return "the back-center area INSIDE the open box";
  if (vPos === "front") return "the front-center area INSIDE the open box";
  return "the center INSIDE the open box";
}

function buildFluxImagePrompt(validatedLayout, builderData, activeRefs) {
  const { box, lines, card, ribbon } = builderData;
  const materials = selectedBuilderMaterials();
  
  const refMap = activeRefs.map((line, idx) => {
    const form = getProductFormFactor(line.item);
    return `- Input image ${idx} represents productId=${line.item.id}, product name=${line.item.name}. Packaging form: ${form}. Model MUST preserve this exact packaged appearance and shape from the reference image.`;
  }).join("\n");
  
  const productList = lines.map(line => {
    const p = line.item;
    const m = p.model3d || {};
    const form = getProductFormFactor(p);
    return `- ${p.name} (productId=${p.id}): Quantity ${line.qty}, Packaging form: [${form}], dimensions ${Math.round(m.length || 100)} × ${Math.round(m.width || 70)} × ${Math.round(m.height || 45)} mm, weight ${Math.round(m.weight || 100)}g.`;
  }).join("\n");
  
  const placementList = validatedLayout.configuration.instances.map((inst, idx) => {
    const rot = Number(inst.rotY || 0);
    const rotDeg = Math.abs(rot) > 45 ? 90 : 0;
    const p = lines.find(l => l.item.id === inst.productId)?.item;
    const form = p ? getProductFormFactor(p) : "packaging box";
    const zone = getSpatialZone(inst.x, inst.z, box.innerLength, box.innerWidth);
    return `- Item ${idx + 1} (${inst.name}, productId=${inst.productId}): Placed in the [${zone}] (approx coordinates X=${Math.round(inst.x)}mm, Z=${Math.round(inst.z)}mm), orientation ${rotDeg} degrees, main front label facing UP towards camera. Packaging type: [${form}].`;
  }).join("\n");
  
  const materialsDesc = materials.length ? materials.map(m => `${m.name} (${m.kind}, ${m.thickness}mm)`).join(", ") : "Kraft shredded paper filler";
  const cardDesc = card?.name ? `${card.name}${state.builder.message ? ` with printed note: "${state.builder.message}"` : ""}` : "No card";
  const ribbonDesc = ribbon?.name ? `${ribbon.name} tied neatly as an accent` : "No ribbon";
  const basePrompt = state.admin.ai?.imagePrompt || DEFAULT_AI_IMAGE_PROMPT;

  return `Create exactly one photorealistic premium e-commerce product photograph. Show an elegant open gift box viewed from a slightly elevated top-down angle. ALL ${lines.length} products must be arranged INSIDE the box on the filler material. NO product may be placed outside, beside, or around the box.

${basePrompt}

REFERENCE IMAGE MAPPING:
${refMap}

Each reference image is the mandatory visual identity of that product. Preserve its exact retail packaging carton/pouch, color palette, front label and recognizable appearance.

VALIDATED BOX:
- Box name: ${box.name}
- Inner dimensions: ${box.innerLength} × ${box.innerWidth} × ${box.innerHeight} millimeters.
- Box color and finish: ${box.color || "Natural kraft"}, ${box.finish || "Matte cardboard"}
- Lid: open and visible beside or behind the box.

VALIDATED PRODUCTS (EXACTLY ${lines.length} PRODUCTS ONLY):
${productList}

MANDATORY SPATIAL PLACEMENT (ALL items INSIDE the open box):
${placementList}

PACKAGING:
- Fillers: ${materialsDesc}
- Card: ${cardDesc}
- Ribbon: ${ribbonDesc}

CRITICAL RULES:
1. ALL ITEMS INSIDE THE BOX: Every single product MUST be placed INSIDE the open gift box, nestled among the filler material. ABSOLUTELY NO product may appear outside the box, beside the box, or on the table surface. The box interior is the ONLY valid location for all products!
2. STRICT PRODUCT COUNT & IDENTITY: Render ONLY the ${lines.length} items listed above. DO NOT hallucinate, invent, or add extra bottles, canisters, cylinders, or gift items!
3. RETAIL PACKAGING INTEGRITY: All products must appear inside their official SEALED retail packaging boxes or pouches as shown in the reference images. DO NOT render bare unpackaged food, raw chocolate squares, or open contents!
4. PRESERVE PACKAGING SHAPES: Flat chocolate boxes must appear as flat rectangular boxes. Cylindrical jars (candle) must appear as jars. Tea pouches must appear as sealed stand-up pouches. Do not convert one shape into another!
5. SPATIAL ARRANGEMENT INSIDE THE BOX: Place items in their designated zones within the box interior. All items share the same box interior space with the filler material between them.
6. All front labels must face upwards towards the camera. Clean luxury e-commerce studio lighting, top-down perspective, no watermarks, no diagrams.`;
}

function packingImagePrompt(layout,t){
  const products=t.lines.map(line=>({productId:line.item.id,name:line.item.name,quantity:line.qty,dimensionsMm:{length:line.item.model3d?.length,width:line.item.model3d?.width,height:line.item.model3d?.height},mainFace:"front/up"}));
  const placements=layout.configuration.instances.map((instance,index)=>({order:index+1,productId:instance.productId,name:instance.name,xMm:Math.round(instance.x),zMm:Math.round(instance.z),rotationOnFloorDeg:Number(instance.rotY||0),mainFace:"up"}));
  const specification={box:{name:t.pack.name,color:t.pack.color,finish:t.pack.finish,innerDimensionsMm:[t.pack.innerLength,t.pack.innerWidth,t.pack.innerHeight],lid:"open and visible beside or behind the box"},fillers:selectedBuilderMaterials().map(x=>({name:x.name,kind:x.kind,color:x.color,thicknessMm:x.thickness})),card:{name:t.card?.name||"Không chọn",message:state.builder.message||""},ribbon:{name:t.ribbon?.name||"Không chọn"},products,validatedPlacement:placements,lidClearanceMm:Math.round(layout.report.lidClearanceMm)};
  return `${state.admin.ai?.imagePrompt||DEFAULT_AI_IMAGE_PROMPT}\n\nTHÔNG SỐ THÀNH PHẨM ĐÃ CHỌN:\n${JSON.stringify(specification)}\n\nCác ảnh sản phẩm sẽ được đính kèm ngay sau lời nhắc này. Hãy coi từng ảnh là nguồn nhận diện bắt buộc, còn kiểu hộp và phụ kiện phải lấy đúng từ thông số trên. Không biến các món bên trong thành những gói quà bọc giấy giống nhau.`;
}

function generatedImageSource(payload){
  const parts=payload?.candidates?.[0]?.content?.parts||[],part=parts.find(x=>x?.inlineData?.data||x?.inline_data?.data),inline=part?.inlineData||part?.inline_data;
  if(inline?.data)return `data:${inline.mimeType||inline.mime_type||"image/png"};base64,${inline.data}`;
  const openAi=payload?.data?.[0];if(openAi?.b64_json)return `data:image/png;base64,${openAi.b64_json}`;return openAi?.url||"";
}

async function runGiftBoxAiPipeline(){
  const t = builderTotals();
  if (aiRequestBusy || aiPackingImageBusy) return;
  if (!t.lines.length || !t.pack) return toast("Chưa có đủ món và hộp để thực hiện.");
  
  const ai = state.admin.ai || {};
  const currentTextKey = aiSessionKey;
  const currentImageKey = aiImageSessionKey || aiSessionKey;
  const hasTextModelConfig = Boolean(ai.enabled && ai.endpoint && ai.model && currentTextKey);
  const isCloudflare = ai.imageProvider === "cloudflare" || isCloudflareWorkerEndpoint(ai.imageEndpoint);
  const hasImageModelConfig = Boolean(ai.enabled && ai.imageEndpoint && ai.imageModel && currentImageKey);

  aiRequestBusy = true;
  state.builder.aiError = "";
  aiPipelineProgress = {
    active: true,
    step: "text_planning",
    stepNumber: 1,
    message: hasTextModelConfig
      ? "Bước 1/4: Đang gửi dữ liệu kích thước thực tế sang Text Model để lập phương án xếp..."
      : "Bước 1/4: Sử dụng thuật toán hình học tính toán phương án xếp theo kích thước thật...",
    repairAttempt: 0,
    maxRepairs: 2,
    errors: [],
    source: hasTextModelConfig ? `Text Model (${ai.model})` : "Thuật toán hình học cục bộ"
  };
  render();

  try {
    let validatedLayout = null;
    const inputData = buildTextModelInput(t.pack, t.lines);

    if (hasTextModelConfig) {
      // Stage 1: Send to Text Model
      const requestBody = {
        model: ai.model,
        temperature: Number(ai.temperature || 0.15),
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: ai.textModelPrompt || ai.packingPrompt || TEXT_MODEL_PACKING_PROMPT },
          { role: "user", content: `DỮ LIỆU ĐẦU VÀO:\n${JSON.stringify(inputData, null, 2)}` }
        ]
      };

      const response = await fetch(ai.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${currentTextKey}`
        },
        body: JSON.stringify(requestBody)
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload?.error?.message || `Text Model API trả mã lỗi ${response.status}`);
      
      let rawJson = apiContent(payload);
      aiPipelineProgress.step = "validating";
      aiPipelineProgress.stepNumber = 2;
      aiPipelineProgress.message = "Bước 2/4: Đang kiểm tra hình học (lòng hộp, không va chạm, khoảng đóng nắp, mặt hướng lên)...";
      render();

      let validationResult = validateAndConvertTextModelLayout(rawJson, t.pack, t.lines);
      let repairAttempt = 0;
      const MAX_REPAIRS = 2;

      while (!validationResult.valid && repairAttempt < MAX_REPAIRS && !validationResult.impossible) {
        repairAttempt++;
        aiPipelineProgress.step = "repairing";
        aiPipelineProgress.repairAttempt = repairAttempt;
        aiPipelineProgress.errors = validationResult.errors || [];
        aiPipelineProgress.message = `Bước 2/4: Phát hiện ${validationResult.errors.length} lỗi hình học. Đang yêu cầu Text Model sửa (lần ${repairAttempt}/${MAX_REPAIRS})...`;
        render();

        const repairPromptText = (ai.repairPrompt || TEXT_MODEL_REPAIR_PROMPT)
          .replace("{{VALIDATION_ERRORS}}", (validationResult.errors || []).map(e => `- ${e}`).join("\n"))
          .replace("{{INPUT_DATA}}", JSON.stringify(inputData, null, 2))
          .replace("{{INVALID_LAYOUT}}", typeof rawJson === "string" ? rawJson : JSON.stringify(rawJson, null, 2));

        const repairResponse = await fetch(ai.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${currentTextKey}`
          },
          body: JSON.stringify({
            model: ai.model,
            temperature: Number(ai.temperature || 0.15),
            response_format: { type: "json_object" },
            messages: [
              { role: "system", content: ai.textModelPrompt || ai.packingPrompt || TEXT_MODEL_PACKING_PROMPT },
              { role: "user", content: repairPromptText }
            ]
          })
        });

        const repairPayload = await repairResponse.json().catch(() => ({}));
        if (!repairResponse.ok) throw new Error(repairPayload?.error?.message || `Text Model sửa lỗi trả mã ${repairResponse.status}`);
        rawJson = apiContent(repairPayload);
        validationResult = validateAndConvertTextModelLayout(rawJson, t.pack, t.lines);
      }

      if (validationResult.valid) {
        validatedLayout = validationResult.layout;
      } else {
        if (validationResult.impossible) {
          throw new Error(validationResult.errors[0] || "AI xác nhận các món này không thể xếp vừa hộp đã chọn.");
        }
        console.warn("Text Model could not produce valid geometry after 2 repairs. Falling back to local procedural packing.");
        aiPipelineProgress.message = "Bố cục Text Model chưa đạt sau 2 lần sửa; hệ thống tự động xếp an toàn theo thuật toán chuẩn...";
        render();
        const fallback = buildAiLayout("balanced", 0, t.pack, t.lines) || buildAiLayout("safe", 1, t.pack, t.lines);
        if (!fallback) throw new Error("Các món đã chọn vượt quá không gian hộp. Vui lòng chọn hộp lớn hơn.");
        validatedLayout = fallback;
      }
    } else {
      // Local procedural packing
      const fallback = buildAiLayout("balanced", 0, t.pack, t.lines) || buildAiLayout("safe", 1, t.pack, t.lines);
      if (!fallback) throw new Error("Các món đã chọn vượt quá không gian hộp. Vui lòng chọn hộp lớn hơn.");
      validatedLayout = fallback;
    }

    // Save verified layout
    state.builder.aiLayouts = [validatedLayout];
    state.builder.aiLayoutId = validatedLayout.id;
    state.builder.aiLayoutSignature = JSON.stringify({
      version: "pipeline-v1",
      box: t.pack.id,
      items: t.lines.map(x => [x.item.id, x.qty]),
      materials: state.builder.materials,
      seed: state.builder.aiSeed || 1
    });
    state.builder.aiSource = {
      type: hasTextModelConfig ? "api" : "procedural",
      model: hasTextModelConfig ? ai.model : "procedural-engine",
      validFromApi: 1,
      generatedAt: new Date().toISOString()
    };
    save();

    // Stage 3: Generate photo with Cloudflare FLUX (or Gemini / OpenAI)
    if (hasImageModelConfig) {
      aiPackingImageBusy = true;
      aiPipelineProgress.step = "generating_image";
      aiPipelineProgress.stepNumber = 3;
      aiPipelineProgress.message = `Bước 3/4: Đang gửi bố cục đã kiểm tra và ảnh sản phẩm sang ${isCloudflare ? "Cloudflare FLUX.2 Klein 4B" : ai.imageModel}...`;
      render();

      const referenceLines = t.lines.filter(line => mainProductImage(line.item));
      if (!referenceLines.length) throw new Error("Các món đã chọn chưa có ảnh chính để gửi cho AI tạo ảnh.");

      if (isCloudflare) {
        if (referenceLines.length > 4) {
          const proceed = confirm(`CẢNH BÁO GIỚI HẠN CLOUDFLARE WORKERS AI:\n\nModel FLUX.2 Klein 4B trên Cloudflare nhận tối đa 4 ảnh tham chiếu. Bạn đang có ${referenceLines.length} loại sản phẩm.\n\nNhấn 'OK' để tiếp tục gửi 4 sản phẩm đầu tiên (sản phẩm còn lại nhận diện qua mô tả text chi tiết).\nNhấn 'Cancel' nếu bạn muốn quay lại giảm số loại sản phẩm.`);
          if (!proceed) {
            aiPipelineProgress.active = false;
            aiPipelineProgress.step = "idle";
            aiPackingImageBusy = false;
            aiRequestBusy = false;
            render();
            toast("Đã giữ bố cục kỹ thuật. Bạn có thể chọn tối đa 4 loại món để gửi đủ ảnh tham chiếu.");
            return;
          }
        }
        const activeRefs = referenceLines.slice(0, 4);
        const fluxPrompt = buildFluxImagePrompt(validatedLayout, { box: t.pack, lines: t.lines, card: t.card, ribbon: t.ribbon }, activeRefs);

        const formData = new FormData();
        formData.append("prompt", fluxPrompt);
        formData.append("width", "1024");
        formData.append("height", "768");

        for (let i = 0; i < activeRefs.length; i++) {
          const line = activeRefs[i];
          const dataUrl = mainProductImage(line.item);
          const blob = await resizeImageToBlob(dataUrl, 512);
          formData.append(`input_image_${i}`, blob, `product_${i}.png`);
        }

        const imageResponse = await fetch(ai.imageEndpoint, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${currentImageKey}`
          },
          body: formData
        });

        const imagePayload = await imageResponse.json().catch(() => ({}));
        if (!imageResponse.ok) throw new Error(imagePayload?.error?.message || `Cloudflare Worker trả mã lỗi ${imageResponse.status}`);
        
        const b64 = imagePayload?.data?.[0]?.b64_json;
        if (!b64) throw new Error("Cloudflare Worker không trả về chuỗi ảnh data[0].b64_json.");
        
        aiPackingImage = `data:image/png;base64,${b64}`;
        aiPackingImageMeta = {
          model: ai.imageModel || "@cf/black-forest-labs/flux-2-klein-4b",
          provider: "Cloudflare Workers AI",
          createdAt: new Date().toISOString(),
          referenceCount: activeRefs.length
        };
      } else if (isGeminiImageEndpoint(ai.imageEndpoint)) {
        // Gemini fallback
        const prompt = packingImagePrompt(validatedLayout, t);
        const parts = [{ text: prompt }], activeRefs = referenceLines.slice(0, 10);
        for (const line of activeRefs) {
          const image = await referenceImageData(mainProductImage(line.item));
          parts.push(
            { text: `Ảnh nhận diện bắt buộc cho productId=${line.item.id}, tên “${line.item.name}”, số lượng ${line.qty}. Mặt chính này hướng lên.` },
            { inline_data: { mime_type: image.mimeType, data: image.data } }
          );
        }
        const imageResponse = await fetch(ai.imageEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": currentImageKey },
          body: JSON.stringify({ contents: [{ role: "user", parts }], generationConfig: { responseModalities: ["IMAGE"], imageConfig: { aspectRatio: "4:3", imageSize: "1K" } } })
        });
        const imagePayload = await imageResponse.json().catch(() => ({}));
        if (!imageResponse.ok) throw new Error(imagePayload?.error?.message || `Gemini API trả mã ${imageResponse.status}`);
        const source = generatedImageSource(imagePayload);
        if (!source) throw new Error("Gemini chưa trả về dữ liệu ảnh.");
        aiPackingImage = source;
        aiPackingImageMeta = { model: ai.imageModel, provider: "Gemini", createdAt: new Date().toISOString(), referenceCount: activeRefs.length };
      } else {
        // OpenAI format
        const prompt = packingImagePrompt(validatedLayout, t);
        const imageResponse = await fetch(ai.imageEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${currentImageKey}` },
          body: JSON.stringify({ model: ai.imageModel, prompt, n: 1, size: ai.imageSize || "1024x768", response_format: "b64_json" })
        });
        const imagePayload = await imageResponse.json().catch(() => ({}));
        if (!imageResponse.ok) throw new Error(imagePayload?.error?.message || `API ảnh trả mã ${imageResponse.status}`);
        const source = generatedImageSource(imagePayload);
        if (!source) throw new Error("API chưa trả về dữ liệu ảnh.");
        aiPackingImage = source;
        aiPackingImageMeta = { model: ai.imageModel, provider: "OpenAI", createdAt: new Date().toISOString(), referenceCount: referenceLines.length };
      }
    }

    aiPipelineProgress.step = "completed";
    aiPipelineProgress.stepNumber = 4;
    aiPipelineProgress.message = aiPackingImage
      ? "Bước 4/4: Hoàn thành! Đã tạo ảnh thành phẩm chân thực từ phương án xếp chuẩn xác."
      : "Bước 4/4: Hoàn thành! Đã kiểm tra bố cục kỹ thuật thành công (chưa tạo ảnh vì chưa có khóa Worker).";
    save();
    render();
    toast(aiPackingImage ? "Đã tạo thành công ảnh thành phẩm chân thực!" : "Đã hoàn thành kiểm tra bố cục kỹ thuật!");
  } catch (error) {
    console.error("AI Pipeline error:", error);
    state.builder.aiError = String(error?.message || "Không thể thực hiện quy trình AI.");
    aiPipelineProgress.step = "error";
    aiPipelineProgress.message = "Lỗi quy trình: " + state.builder.aiError;
    save();
    render();
    toast(state.builder.aiError);
  } finally {
    aiRequestBusy = false;
    aiPackingImageBusy = false;
    render();
  }
}

async function requestAiPackingLayouts(){ return runGiftBoxAiPipeline(); }
async function requestAiPackingFinalImage(){ return runGiftBoxAiPipeline(); }
function aiLayoutPreview(layout,box){
  const length=Number(box.innerLength),width=Number(box.innerWidth),materials=selectedBuilderMaterials().map(x=>x.name).slice(0,2).join(" · ");
  const items=layout.configuration.instances.map((instance,index)=>{
    const d=aiPlacedDimensions(instance),product=state.admin.products.find(x=>x.id===instance.productId),photo=product?.images?.find(x=>x.cover)?.data||product?.images?.[0]?.data||product?.model3d?.textureData||"";
    const left=(instance.x-d.length/2+length/2)/length*100,top=(width/2-(instance.z+d.width/2))/width*100,w=d.length/length*100,h=d.width/width*100;
    const background=photo?`background-image:url('${photo.replace(/'/g,"%27")}');`:"";
    return `<div class="ai-layout-item" style="left:${left}%;top:${top}%;width:${w}%;height:${h}%;--item-color:${instance.profile.color};${background}"><b>${index+1}</b><span>${esc(instance.name)}</span><em>↑ Mặt chính</em></div>`;
  }).join("");
  return `<div class="ai-layout-box">${items}<div class="ai-layout-liner">${esc(materials||"Không dùng chèn lót")}</div></div>`;
}
function aiPackingPage(){
  pageTitle("Gợi ý cách xếp");
  if(!state.user)return authRequired("Đăng nhập để nhận phương án xếp hộp", "/tu-tao-hop/goi-y-ai");
  const t=builderTotals();if(!t.lines.length||!t.pack)return `<section class="section"><div class="narrow center"><span class="eyebrow">Bước cuối</span><h1>Chưa có đủ món và hộp.</h1><p class="muted">Hãy hoàn tất các bước chọn món và chọn hộp trước.</p><a class="button" href="/tu-tao-hop" data-route>Quay lại Tự tạo hộp</a></div></section>`;
  const layouts=prepareAiLayouts(t.pack,t.lines),selected=layouts.find(x=>x.id===state.builder.aiLayoutId);
  if(!layouts.length)return `<section class="section"><div class="narrow center"><span class="eyebrow">Chưa tìm được cách xếp hợp lệ</span><h1>Những món này chưa vừa hộp đã chọn.</h1><p class="muted">Hãy đổi sang hộp lớn hơn, giảm vật liệu lót hoặc bỏ bớt một món. Hệ thống không thu nhỏ sản phẩm để tạo ảnh đẹp giả.</p><button class="button" data-action="return-builder-step" data-step="2">Đổi hộp và chèn lót</button></div></section>`;
  const api=state.admin.ai||{},layoutApiReady=!!(api.enabled&&api.endpoint&&api.model&&aiSessionKey),imageApiReady=!!(api.enabled&&api.imageEndpoint&&api.imageModel&&(aiImageSessionKey||aiSessionKey)),apiUsed=state.builder.aiSource?.type==="api",busy=aiRequestBusy||aiPackingImageBusy;
  const references=t.lines.map(line=>{const image=mainProductImage(line.item);return `<div class="packing-reference-item">${image?`<img src="${esc(image)}" alt="Ảnh chính ${esc(line.item.name)}">`:`<span>${esc(line.item.name.slice(0,1))}</span>`}<div><strong>${line.qty} × ${esc(line.item.name)}</strong><small>${line.item.model3d.length} × ${line.item.model3d.width} × ${line.item.model3d.height} mm</small></div></div>`;}).join("");
  const finalVisual=aiPackingImage?`<figure class="ai-final-photo"><img src="${aiPackingImage}" alt="Ảnh AI xem trước hộp quà thành phẩm"><figcaption><span>Ảnh thành phẩm do ${esc(aiPackingImageMeta?.model||api.imageModel)} tạo từ ${aiPackingImageMeta?.referenceCount||t.lines.length} ảnh sản phẩm</span><em>Bố cục đóng gói vật lý đã được kiểm tra hình học bên dưới.</em></figcaption></figure>`:`<div class="ai-final-placeholder"><div class="ai-final-placeholder-art"><span>Ảnh hộp quà thành phẩm</span><i></i><i></i><i></i></div><h2>${aiPackingImageBusy?"Cloudflare FLUX đang tạo ảnh thành phẩm chân thật…":"Tạo ảnh thực tế từ phương án xếp đã kiểm duyệt"}</h2><p>Website kiểm tra hình học và chống va chạm trước; sau đó Cloudflare FLUX dùng ảnh sản phẩm thật và toạ độ chính xác để dựng ảnh chụp sản phẩm.</p></div>`;

  const pipelineBannerHtml = `
  <div class="ai-pipeline-banner ${aiPipelineProgress.active || busy ? 'active' : ''} ${aiPackingImage ? 'has-image' : ''}">
    <div class="pipeline-header">
      <div class="pipeline-title">
        <span class="pipeline-badge">2 AI Pipeline</span>
        <strong>Quy trình phối hợp 2 AI độc lập: ChatGPT lập bố cục + Cloudflare FLUX tạo ảnh</strong>
      </div>
      <div class="pipeline-steps-indicator">
        <span class="p-step ${aiPipelineProgress.stepNumber >= 1 ? 'done' : ''} ${aiPipelineProgress.step === 'text_planning' ? 'current' : ''}">1. ChatGPT xếp hộp</span>
        <span class="p-arrow">→</span>
        <span class="p-step ${aiPipelineProgress.stepNumber >= 2 ? 'done' : ''} ${['validating', 'repairing'].includes(aiPipelineProgress.step) ? 'current' : ''}">2. Kiểm tra hình học & sửa</span>
        <span class="p-arrow">→</span>
        <span class="p-step ${aiPipelineProgress.stepNumber >= 3 ? 'done' : ''} ${aiPipelineProgress.step === 'generating_image' ? 'current' : ''}">3. Cloudflare FLUX tạo ảnh</span>
        <span class="p-arrow">→</span>
        <span class="p-step ${aiPipelineProgress.step === 'completed' ? 'done' : ''}">4. Thành phẩm</span>
      </div>
    </div>
    ${aiPipelineProgress.message ? `<div class="pipeline-status-text ${aiPipelineProgress.step === 'error' ? 'danger-text' : ''}">
      ${busy ? '<span class="spinner-small"></span> ' : ''}
      ${esc(aiPipelineProgress.message)}
    </div>` : `<div class="pipeline-status-text">
      <span>${layoutApiReady ? `✓ Text Model: ${esc(api.model)} (Đã có khóa)` : '○ Text Model: Chưa nhập khóa (dùng thuật toán hình học chuẩn)'}</span>
      <span style="margin: 0 8px">·</span>
      <span>${imageApiReady ? `✓ Cloudflare FLUX: ${esc(api.imageModel)} (Đã có Secret)` : '○ Cloudflare Worker: Chưa nhập Secret'}</span>
    </div>`}
  </div>`;

  return `<section class="ai-packing-page"><div class="container"><div class="steps builder-five-steps packing-progress">${["Chọn món","Hộp & chèn lót","Thiệp & trang trí","Xem lại","Ảnh thành phẩm AI"].map((n,i)=>`<button class="step ${i===4?"active":""}" ${i===4?'disabled':`data-action="return-builder-step" data-step="${i+1}"`}>${i+1} · ${n}</button>`).join("")}</div>
  <div class="ai-layout-hero">
    <div>
      <span class="eyebrow">Bước cuối · ảnh xem trước thành phẩm</span>
      <h1>Nhìn thấy hộp quà thực tế trước khi đặt.</h1>
      <p>Kích thước thật được kiểm tra chặt chẽ; AI tạo ảnh chỉ nhận toạ độ và hướng xoay đã được xác nhận lọt lòng và còn khoảng hở đóng nắp.</p>
    </div>
    <div class="ai-rule-card">
      <strong>Quy tắc hình học</strong>
      <span>✓ Đúng kích thước mm thật</span>
      <span>✓ Ảnh chính giữ nguyên bao bì</span>
      <span>✓ Giấy lót & khoảng đóng nắp</span>
      <span>✓ Mặt chính hướng lên</span>
    </div>
  </div>

  ${pipelineBannerHtml}

  <div class="ai-api-note ${(layoutApiReady || imageApiReady) ? "connected" : ""}">
    <span>AI</span>
    <div>
      <strong>${imageApiReady ? (aiPackingImage ? `Đã tạo ảnh thành phẩm bằng ${esc(aiPackingImageMeta?.model||api.imageModel)}` : `Cloudflare FLUX sẵn sàng · ${esc(api.imageModel)}`) : (layoutApiReady ? `Text Model sẵn sàng · ${esc(api.model)}` : "Quy trình AI độc lập")}</strong>
      <p>${layoutApiReady ? "ChatGPT lập phương án xếp theo dữ liệu mm, hệ thống kiểm tra chống va chạm rồi gửi sang Cloudflare FLUX." : "Chưa cấu hình Text Model: Hệ thống tự động dùng thuật toán xếp an toàn cục bộ rồi gửi sang Cloudflare FLUX."}${state.builder.aiError ? `<br><b class="danger-text">${esc(state.builder.aiError)}</b>` : ""}</p>
    </div>
    <div class="row wrap">
      <button class="button small-btn" data-action="generate-ai-api" ${busy ? "disabled" : ""}>
        ${busy ? "AI đang xử lý…" : (aiPackingImage ? "Tạo lại ảnh FLUX" : "Xếp kích thước & tạo ảnh FLUX")}
      </button>
      <button class="button secondary small-btn" data-action="regenerate-ai-layouts" ${busy ? "disabled" : ""}>Đổi cách xếp</button>
    </div>
  </div>

  <div class="ai-final-stage">
    ${finalVisual}
    <div class="packing-reference-panel">
      <div class="row spaced wrap">
        <div><span class="eyebrow">Ảnh AI phải giữ đúng</span><h2>Ảnh chính & kích thước từng món</h2></div>
        <span>${t.lines.reduce((sum,line)=>sum+line.qty,0)} món · ${t.lines.length} loại</span>
      </div>
      <div class="packing-reference-strip">${references}</div>
      <div class="packing-choice-summary">
        <span><b>Hộp</b>${esc(t.pack.name)} · ${t.pack.innerLength} × ${t.pack.innerWidth} × ${t.pack.innerHeight} mm</span>
        <span><b>Chèn lót</b>${esc(selectedBuilderMaterials().map(x=>x.name).join(" · ")||"Không chọn")}</span>
        <span><b>Hoàn thiện</b>${esc(t.card?.name||"Không thiệp")} · ${esc(t.ribbon?.name||"Không ruy băng")}</span>
      </div>
    </div>
  </div>

  <details class="packing-technical" open>
    <summary><span>Bản vẽ kỹ thuật & thông số đóng gói (Kích thước thật)</span><em>Đã hợp lệ · còn nắp ${Math.round(selected.report.lidClearanceMm)} mm</em></summary>
    <div class="packing-technical-body">
      <div>${aiLayoutPreview(selected,t.pack)}</div>
      <div>
        <span class="eyebrow">Bố cục để nhân viên đóng gói</span>
        <h2>${esc(selected.name)}</h2>
        <p>${esc(selected.description)}</p>
        <p class="pack-valid">✓ ${selected.configuration.instances.length} món đã vượt kiểm tra lòng hộp, va chạm và chiều cao nắp.</p>
        <p class="fine-print">Ảnh AI minh hoạ thành phẩm trực quan. Khi thực tế đóng gói, shop căn cứ vào toạ độ và số đo mm trong bản vẽ kỹ thuật này.</p>
      </div>
    </div>
  </details>

  <div class="ai-layout-footer">
    <div>
      <span class="small">Thành phẩm đã chọn</span>
      <strong>${aiPackingImage ? "Ảnh AI + bố cục kích thước thật" : `${esc(selected?.name||"Chưa có")} · chưa tạo ảnh AI`}</strong>
    </div>
    <div class="row wrap">
      <button class="button ghost" data-action="return-builder-step" data-step="4">Quay lại lựa chọn</button>
      <button class="button" data-action="add-ai-builder-cart" ${selected ? "" : "disabled"}>${aiPackingImage ? "Dùng ảnh này & thêm giỏ" : "Dùng bố cục & thêm giỏ"}</button>
    </div>
  </div>
</div></section>`;
}

function cartPage(){ pageTitle("Giỏ hàng"); const subtotal=cartSubtotal();
  if(!state.cart.length) return `<section class="section"><div class="narrow center"><span class="eyebrow">Giỏ hàng</span><h1>Giỏ đang chờ một món quà.</h1><p class="muted">Chọn hộp có sẵn hoặc tự tạo một hộp thật riêng.</p><div class="row" style="justify-content:center"><a class="button" href="/hop-qua" data-route>Chọn hộp quà</a><a class="button secondary" href="/tu-tao-hop" data-route>Tự tạo hộp</a></div></div></section>`;
  return `<section class="page-hero"><div class="container"><span class="eyebrow">Giỏ hàng</span><h1>Kiểm tra từng hộp trước khi gửi.</h1></div></section><section class="section"><div class="container cart-layout"><div>${state.cart.map(l=>`<article class="cart-line"><div class="cart-thumb">${l.aiLayout?`<span>${esc(l.aiLayout.name)}<small>AI gợi ý · mặt chính hướng lên</small></span>`:esc(l.name)}</div><div><h3 style="font-family:var(--sans);font-size:1rem;font-weight:600">${esc(l.name)}</h3><p class="small muted">${l.type==="curated"?"Hộp nguyên mẫu · thiệp chưa có lời chúc":l.summary}</p>${l.aiLayout?'<p class="small pack-valid">✓ Phương án kích thước đã được lưu để shop đóng gói</p>':""}${l.message?`<p class="small">“${esc(l.message)}”</p>`:""}<div class="row wrap"><button class="link" data-action="edit-line" data-id="${l.id}">Sửa hộp</button><button class="link" data-action="remove-line" data-id="${l.id}">Xóa</button></div></div><div><strong>${money(l.unitPrice*l.qty)}</strong><div class="qty"><button data-action="cart-qty" data-id="${l.id}" data-delta="-1">−</button><span>${l.qty}</span><button data-action="cart-qty" data-id="${l.id}" data-delta="1">+</button></div></div></article>`).join("")}</div><aside class="order-summary"><h2 style="font-size:1.5rem">Tóm tắt</h2><div class="summary-lines"><div class="summary-line"><span>Tiền hàng & tùy chọn</span><span>${money(subtotal)}</span></div><div class="summary-line"><span>Phí giao</span><span>Chọn tại checkout</span></div></div><div class="field"><label for="coupon">Mã giảm giá</label><div class="coupon-row"><input id="coupon" placeholder="Nhập mã demo"><button class="button small-btn" data-action="apply-coupon">Áp dụng</button></div><span id="coupon-result" class="fine-print"></span></div><div class="row spaced"><strong>Tạm tính</strong><strong>${money(subtotal)}</strong></div><a class="button" style="width:100%;margin-top:18px" href="/thanh-toan" data-route>Tiếp tục thanh toán</a></aside></div></section>`;
}

function checkoutPage(){ pageTitle("Thanh toán"); if(!state.cart.length) return `<section class="section"><div class="narrow center"><h1>Chưa có hộp để thanh toán.</h1><a class="button" href="/hop-qua" data-route>Chọn hộp quà</a></div></section>`;
  const c=state.checkout, delivery=Number(state.admin.delivery.fee||0), total=cartSubtotal()+delivery;
  return `<section class="page-hero"><div class="container"><span class="eyebrow">Checkout một trang</span><h1>Gửi đúng người, vào dịp bạn muốn.</h1><p class="notice">Thanh toán thử nghiệm — không thu tiền, không gọi tài xế và không gửi email.</p></div></section><form id="checkout-form" class="section"><div class="container checkout-layout"><div>
    <section class="checkout-section"><h2><span class="number">1</span> Người mua</h2><div class="form-grid"><div class="field"><label for="buyerName">Họ tên</label><input id="buyerName" name="buyerName" required value="${esc(c.buyerName)}"></div><div class="field"><label for="buyerEmail">Email</label><input id="buyerEmail" name="buyerEmail" type="email" required value="${esc(c.buyerEmail||state.user?.email||"")}"></div><div class="field"><label for="buyerPhone">Điện thoại</label><input id="buyerPhone" name="buyerPhone" required pattern="[0-9 +]{9,15}" value="${esc(c.buyerPhone)}"></div></div></section>
    <section class="checkout-section"><h2><span class="number">2</span> Người nhận</h2><label class="checkline"><input id="same-receiver" type="checkbox" ${c.same?"checked":""}> Mình là người nhận</label><div class="form-grid"><div class="field"><label for="receiverName">Tên người nhận</label><input id="receiverName" name="receiverName" required value="${esc(c.receiverName)}"></div><div class="field"><label for="receiverPhone">Điện thoại người nhận</label><input id="receiverPhone" name="receiverPhone" required pattern="[0-9 +]{9,15}" value="${esc(c.receiverPhone)}"></div></div><div class="field"><label for="address">Địa chỉ giao tại ${esc(state.admin.delivery.zone)}</label><input id="address" name="address" required value="${esc(c.address)}" placeholder="Số nhà, đường, phường/xã, khu vực"><span class="fine-print">Vùng giao là cấu hình demo. Địa chỉ ghi rõ ngoài vùng phục vụ sẽ bị chặn.</span></div></section>
    <section class="checkout-section"><h2><span class="number">3</span> Lịch giao dự kiến</h2><div class="field"><label for="deliveryDate">Ngày giao</label><input id="deliveryDate" name="date" type="date" required min="${new Date(Date.now()+86400000).toISOString().slice(0,10)}" value="${esc(c.date)}"></div><p class="small">Chọn khung giờ còn nhận đơn:</p><div class="slot-list">${state.admin.delivery.slots.filter(s=>s.active!==false).map(s=>`<button type="button" class="slot ${c.slot===s.label?"selected":""}" data-action="slot" data-value="${esc(s.label)}" ${s.full?"disabled":""}>${esc(s.label)}${s.full?" · đã kín":""}</button>`).join("")}</div><div class="field" style="margin-top:18px"><label for="deliveryNote">Ghi chú giao hàng</label><textarea id="deliveryNote" name="note" placeholder="Ví dụ: gọi trước khi đến, đây là yêu cầu vận hành không phải cam kết giữ bí mật tuyệt đối.">${esc(c.note)}</textarea></div></section>
    <section class="checkout-section"><h2><span class="number">4</span> Thanh toán thử nghiệm</h2><label class="checkline"><input type="radio" name="payment" value="success" ${c.payment==="success"?"checked":""}> Mô phỏng thành công</label><label class="checkline"><input type="radio" name="payment" value="failed" ${c.payment==="failed"?"checked":""}> Mô phỏng thất bại</label><label class="checkline"><input type="radio" name="payment" value="pending" ${c.payment==="pending"?"checked":""}> Mô phỏng chờ xử lý</label><div id="checkout-error" class="field-error" role="alert"></div></section>
  </div><aside class="order-summary"><h2 style="font-size:1.5rem">Đơn của bạn</h2>${state.cart.map(l=>`<div class="summary-line"><span>${l.qty} × ${esc(l.name)}</span><span>${money(l.unitPrice*l.qty)}</span></div>`).join("")}<div class="summary-line"><span>Phí giao demo</span><span>${money(delivery)}</span></div><div class="row spaced" style="margin-top:18px"><strong>Tổng cộng</strong><strong>${money(total)}</strong></div><button id="place-order" class="button" type="submit" style="width:100%;margin-top:18px">Đặt đơn thử nghiệm</button><p class="fine-print">Nút được khóa sau lần bấm đầu. Giá, tồn và suất giao cần được server kiểm tra lại ở bản thật.</p></aside></div></form>`;
}

function confirmationPage(ref){ pageTitle("Xác nhận đơn"); const token=q("token"), order=state.orders.find(o=>o.reference===ref&&o.token===token); if(!order) return `<section class="section"><div class="narrow"><h1>Không thể mở chi tiết đơn.</h1><p>Liên kết thiếu token truy cập hợp lệ. Mã đơn đơn thuần không đủ để hiển thị thông tin người nhận.</p><a class="button" href="/theo-doi-don" data-route>Theo dõi đơn</a></div></section>`;
  return `<section class="section"><div class="narrow"><span class="eyebrow">Đã ghi nhận đơn thử nghiệm</span><h1>Cảm ơn bạn đã gửi một chút thương.</h1><div class="status-box"><div class="row spaced wrap"><div><span class="small">Mã đơn</span><h2>${order.reference}</h2></div><strong>${order.paymentLabel}</strong></div><p>${order.status}. Trạng thái này không tự chạy theo thời gian.</p></div><div class="summary-lines">${order.lines.map(l=>`<div class="summary-line"><span>${l.qty} × ${esc(l.name)}</span><span>${money(l.unitPrice*l.qty)}</span></div>`).join("")}<div class="summary-line"><span>Người nhận</span><span>${esc(order.receiverName)}</span></div><div class="summary-line"><span>Lịch giao dự kiến</span><span>${esc(order.date)} · ${esc(order.slot)}</span></div><div class="summary-line"><strong>Tổng</strong><strong>${money(order.total)}</strong></div></div><div class="row wrap"><a class="button" href="/theo-doi-don?reference=${order.reference}&token=${order.token}" data-route>Theo dõi đơn</a><button class="button secondary" data-action="request-reschedule" data-ref="${order.reference}">Yêu cầu đổi lịch</button><button class="button ghost" data-action="save-order-occasion" data-ref="${order.reference}">Lưu dịp này</button></div></div></section>`;
}

function trackingPage(){ pageTitle("Theo dõi đơn"); const ref=q("reference"),token=q("token"), order=state.orders.find(o=>o.reference===ref&&o.token===token);
  if(!order) return `<section class="page-hero"><div class="narrow"><span class="eyebrow">Theo dõi đơn</span><h1>Tra cứu bằng liên kết an toàn.</h1><p>Mã đơn một mình không hiển thị địa chỉ hay số điện thoại. Trong demo, hãy dùng liên kết từ trang xác nhận.</p></div></section><section class="section"><form id="tracking-form" class="narrow"><div class="field"><label for="trackRef">Mã đơn</label><input id="trackRef" name="reference" required placeholder="GT-XXXXXX"></div><div class="field"><label for="trackToken">Token trong liên kết xác nhận</label><input id="trackToken" name="token" required></div><div id="tracking-error" class="field-error"></div><button class="button">Tra cứu</button></form></section>`;
  const statuses=["Đã tiếp nhận","Đang chuẩn bị","Đã bàn giao giao hàng","Đã giao"];
  return `<section class="page-hero"><div class="narrow"><span class="eyebrow">${order.reference}</span><h1>${order.status}</h1><p>Khung giao dự kiến: ${esc(order.date)} · ${esc(order.slot)}. Không cam kết đúng từng phút.</p></div></section><section class="section"><div class="narrow"><ul class="status-list">${statuses.map(s=>`<li class="${s===order.status?"current":""}"><span class="status-dot"></span><div><strong>${s}</strong>${s===order.status?'<br><span class="small">Trạng thái hiện tại từ thao tác mô phỏng.</span>':""}</div></li>`).join("")}</ul><div class="row wrap"><button class="button secondary" data-action="request-reschedule" data-ref="${order.reference}">Yêu cầu đổi lịch</button><a class="button ghost" href="/ho-tro" data-route>Cần hỗ trợ</a></div></div></section>`;
}

function accountPage(){ pageTitle("Tài khoản"); if(!state.user) return authRequired("Xem hồ sơ, đơn hàng và hộp đã lưu", "/tai-khoan"); const tab=state.accountTab, drafts=byOwner(state.drafts), orders=byOwner(state.orders), occs=byOwner(state.occasions);
  let content;
  if(tab==="overview") content=`<h2>Chào ${esc(state.user.name||state.user.email.split("@")[0])}</h2><p class="muted">Một nơi gọn để quay lại những hộp và ngày bạn đã lưu.</p><div class="summary-lines"><div class="summary-line"><span>Đơn thử nghiệm</span><span>${orders.length}</span></div><div class="summary-line"><span>Hộp đã lưu</span><span>${drafts.length}</span></div><div class="summary-line"><span>Dịp của tôi</span><span>${occs.length}</span></div></div>`;
  else if(tab==="orders") content=`<h2>Đơn hàng</h2>${orders.length?orders.map(o=>`<div class="order-row"><div><strong>${o.reference}</strong><p class="small muted">${o.status} · ${money(o.total)}</p></div><a class="link" href="/xac-nhan-don/${o.reference}?token=${o.token}" data-route>Xem chi tiết</a></div>`).join(""):'<p class="muted">Chưa có đơn thử nghiệm nào.</p>'}`;
  else if(tab==="drafts") content=`<h2>Hộp đã lưu</h2>${drafts.length?drafts.map(d=>`<div class="saved-row"><div><strong>${esc(d.name)}</strong><p class="small muted">Sửa gần nhất ${esc(d.updated)} · Ước tính ${money(d.total)}</p>${d.needsReview?'<p class="small" style="color:var(--wine)">Cần kiểm tra lại món ngừng bán hoặc đổi giá.</p>':""}</div><div class="row wrap"><button class="link" data-action="open-draft" data-id="${d.id}">Tiếp tục</button><button class="link" data-action="copy-draft" data-id="${d.id}">Sao chép</button><button class="link" data-action="delete-draft" data-id="${d.id}">Xóa</button></div></div>`).join(""):'<p class="muted">Chưa có hộp nào được lưu.</p>'}`;
  else if(tab==="occasions") content=`<h2>Dịp của tôi</h2>${occasionList(occs)}<a class="button secondary" href="/dip-cua-toi" data-route>Quản lý dịp</a>`;
  else content=`<h2>${tab==="addresses"?"Địa chỉ":"Thông tin tài khoản"}</h2><p class="muted">${tab==="addresses"?"Demo chưa lưu địa chỉ vận hành. Thêm backend và kiểm tra quyền sở hữu trước khi bật tính năng này.":`Email demo: ${esc(state.user.email)}. Không có mật khẩu thật nào được lưu.`}</p>`;
  const nav=[["overview","Tổng quan"],["orders","Đơn hàng"],["drafts","Hộp đã lưu"],["occasions","Dịp của tôi"],["addresses","Địa chỉ"],["profile","Thông tin tài khoản"]];
  return `<section class="page-hero"><div class="container"><span class="eyebrow">Sổ cá nhân</span><h1>Tài khoản của bạn</h1></div></section><section class="section"><div class="container account-layout"><nav class="account-nav" aria-label="Mục tài khoản">${nav.map(([id,n])=>`<button class="${tab===id?"active":""}" data-action="account-tab" data-tab="${id}">${n}</button>`).join("")}<button data-action="logout">Đăng xuất</button></nav><div>${content}</div></div></section>`;
}

function occasionsPage(){ pageTitle("Dịp của tôi"); if(!state.user) return authRequired("Lưu và nhắc những dịp quan trọng", "/dip-cua-toi"); const occs=byOwner(state.occasions);
  return `<section class="page-hero sage-band"><div class="container"><span class="eyebrow">Nhắc dịp</span><h1>Những ngày bạn muốn nhớ.</h1><p>Email nhắc chỉ gửi cho người mua. Bản demo cho xem trước, chưa có tiến trình nền hoặc nhà cung cấp email.</p></div></section><section class="section"><div class="container occasions-layout"><div><h2>Dịp sắp tới</h2>${occasionList(occs)}</div><form id="occasion-form"><h2 style="font-size:1.5rem">Thêm một dịp</h2><div class="field"><label for="occ-name">Tên người nhận</label><input id="occ-name" name="name" required></div><div class="form-grid"><div class="field"><label for="occ-relation">Quan hệ</label><select id="occ-relation" name="relation"><option>Người yêu</option><option>Bạn thân</option><option>Gia đình</option><option>Chính mình</option></select></div><div class="field"><label for="occ-type">Loại dịp</label><select id="occ-type" name="type"><option>Sinh nhật</option><option>Kỷ niệm</option><option>Ngày khác</option></select></div><div class="field"><label for="occ-date">Ngày diễn ra</label><input id="occ-date" name="date" type="date" required></div><div class="field"><label for="occ-budget">Ngân sách dự kiến</label><input id="occ-budget" name="budget" type="number" min="0" step="50000" value="500000"></div><div class="field"><label for="occ-before">Nhắc trước</label><select id="occ-before" name="before"><option value="3">3 ngày</option><option value="7" selected>7 ngày</option><option value="14">14 ngày</option></select></div><div class="field"><label for="occ-email">Email nhận nhắc</label><input id="occ-email" name="email" type="email" required value="${esc(state.user.email)}"></div></div><label class="checkline"><input name="annual" type="checkbox" checked> Lặp hằng năm</label><label class="checkline"><input name="consent" type="checkbox"> Đồng ý nhận email nhắc (demo không gửi)</label><div class="field"><label for="occ-note">Ghi chú</label><textarea id="occ-note" name="note"></textarea></div><button class="button" type="submit">Lưu dịp</button></form></div></section>`;
}
function occasionList(occs){ return occs.length?occs.sort((a,b)=>a.date.localeCompare(b.date)).map(o=>`<div class="occasion-row"><div><strong>${esc(o.name)} · ${esc(o.type)}</strong><p class="small muted">${esc(o.date)} · nhắc trước ${o.before} ngày · ${o.enabled&&o.consent?"Đang bật":"Chưa bật"}</p></div><div class="row wrap"><button class="link" data-action="preview-reminder" data-id="${o.id}">Xem trước</button><button class="link" data-action="toggle-reminder" data-id="${o.id}">${o.enabled?"Tắt":"Bật"}</button><button class="link" data-action="delete-occasion" data-id="${o.id}">Xóa</button></div></div>`).join(""):'<div class="empty-state"><h3>Chưa có dịp nào.</h3><p>Lưu ngày do chính bạn xác nhận; ngày giao không tự biến thành ngày sinh nhật.</p></div>'; }

function infoPage(path){
  const pages={
    "/ve-chung-toi":["Về Gói Thương","Một cửa hàng quà có gu, bắt đầu từ việc lắng nghe.","Gói Thương giúp bạn chọn đúng món, gói thành một hộp đẹp và gửi vào dịp bạn muốn. Bản mẫu này không bịa địa chỉ, đối tác hay lời chứng thực."],
    "/ho-tro":["Trung tâm hỗ trợ","Có điều gì cần gỡ rối?","Tra cứu đơn bằng liên kết an toàn, xem chính sách giao hoặc gửi yêu cầu đổi lịch. Kênh liên hệ doanh nghiệp sẽ được bổ sung khi được xác nhận."],
    "/chinh-sach-giao-hang":["Chính sách giao hàng","Chọn ngày và một khung giờ dự kiến.","Bản đầu phục vụ vùng TP.HCM đã cấu hình. Khung 9–12h, 14–17h và 18–21h là khoảng dự kiến, không hứa đúng từng phút. Phí và vùng cụ thể cần dữ liệu vận hành thật."],
    "/doi-tra-huy-don":["Đổi trả & hủy đơn","Mỗi yêu cầu được xem xét theo trạng thái đơn.","Đơn chưa chuẩn bị thường dễ đổi lịch hoặc hủy hơn. Hộp cá nhân hóa, thực phẩm và món khắc tên cần chính sách riêng trước khi vận hành."],
    "/bao-mat":["Bảo mật","Chỉ giữ những gì thật sự cần thiết.","Demo này lưu dữ liệu trong trình duyệt và không phải hệ thống xác thực an toàn. Bản thật phải kiểm tra quyền ở server, bảo vệ dữ liệu cá nhân và có chính sách lưu trữ rõ ràng."],
    "/dieu-khoan":["Điều khoản","Một bản mẫu để kiểm tra trải nghiệm.","Giá, SKU, tồn kho và khung giao trong website là dữ liệu minh họa. Không dùng làm cam kết vận hành hay bằng chứng giao dịch thật."],
  }; const [ey,title,desc]=pages[path]; pageTitle(ey);
  return `<section class="page-hero"><div class="container"><span class="eyebrow">${ey}</span><h1>${title}</h1><p>${desc}</p></div></section><section class="section"><div class="container support-grid"><article><h3>Rõ ràng từ đầu</h3><p class="muted">Thành phần, giá, phụ phí và thời gian chuẩn bị được trình bày theo nguồn dữ liệu chung.</p></article><article><h3>Không hứa quá khả năng</h3><p class="muted">Không giả tích hợp thanh toán, giao hàng, email hay trạng thái tự chạy.</p></article><article><h3>Cần dữ liệu đã xác nhận</h3><p class="muted">Thông tin vận hành chính thức sẽ thay thế toàn bộ dữ liệu minh họa trước khi mở bán.</p></article></div></section>`;
}
function adminShell(title,section,body,actions=""){
  pageTitle(title+" · Quản trị");
  const links=[
    ["overview","/quan-tri","Tổng quan"],["products","/quan-tri/san-pham","Sản phẩm"],["inventory","/quan-tri/ton-kho","Tồn kho"],["options","/quan-tri/tuy-chon-hop","Tùy chọn hộp"],["library","/quan-tri/thu-vien-ai","Thư viện AI"],["orders","/quan-tri/don-hang","Đơn hàng"],["delivery","/quan-tri/giao-hang","Giao hàng"],["settings","/quan-tri/cai-dat","Cài đặt"],
  ].filter(([key])=>canAdmin(key));
  return `<section class="admin-area"><div class="container admin-layout"><aside class="admin-sidebar"><a class="admin-brand" href="/quan-tri" data-route>Gói Thương <span>Quản trị</span></a><div class="admin-person"><strong>${esc(state.user.name)}</strong><span>${esc(ROLE_LABELS[state.user.role])}</span></div><nav>${links.map(([key,url,label])=>`<a href="${url}" data-route class="${section===key?"active":""}">${label}</a>`).join("")}</nav><a class="link small" href="/" data-route>← Về cửa hàng</a><button class="link small" data-action="logout">Đăng xuất</button></aside><div class="admin-main"><div class="admin-demo-note">Bản quản trị demo chạy trong trình duyệt. Bản thật phải kiểm tra quyền, dữ liệu và tệp tải lên ở máy chủ.</div><header class="admin-page-head"><div><span class="eyebrow">${esc(ROLE_LABELS[state.user.role])}</span><h1>${esc(title)}</h1></div>${actions}</header>${body}</div></div></section>`;
}

function adminDenied(section){
  return adminShell("Không có quyền truy cập","overview",`<div class="admin-card empty-state"><h2>Vai trò này không mở được mục ${esc(section)}.</h2><p>Chủ cửa hàng có thể thay đổi vai trò tại Cài đặt. Giao diện chỉ mô phỏng; máy chủ vẫn phải chặn yêu cầu trái quyền.</p><a class="button secondary" href="/quan-tri" data-route>Về tổng quan</a></div>`);
}

function statusBadge(status){ const labels={published:"Đang bán",draft:"Bản nháp",paused:"Tạm dừng",archived:"Đã lưu trữ"}; return `<span class="status status-${esc(status)}">${labels[status]||esc(status)}</span>`; }
function adminOverview(){
  const low=state.admin.products.filter(p=>p.status!=="archived"&&Number(p.stock)<=Number(p.threshold||0));
  const pending=state.orders.filter(o=>!["Đã giao","Đã hủy"].includes(o.status));
  const today=new Date().toISOString().slice(0,10), todayOrders=state.orders.filter(o=>o.date===today);
  const metrics=[["Đơn cần xử lý",pending.length,"/quan-tri/don-hang"],["Lịch giao hôm nay",todayOrders.length,"/quan-tri/giao-hang"],["Sản phẩm sắp hết",low.length,"/quan-tri/ton-kho"],["Sản phẩm đang bán",state.admin.products.filter(p=>p.status==="published").length,"/quan-tri/san-pham?status=published"]];
  const body=`<div class="metric-grid">${metrics.map(([label,value,url])=>`<a class="metric-card" href="${url}" data-route><span>${label}</span><strong>${value}</strong><small>Xem chi tiết →</small></a>`).join("")}</div><div class="admin-grid"><section class="admin-card"><div class="row spaced"><h2>Cần chú ý</h2><a class="link" href="/quan-tri/ton-kho" data-route>Xem tồn kho</a></div>${low.length?low.slice(0,6).map(p=>`<div class="admin-list-row"><div><strong>${esc(p.name)}</strong><span>${esc(p.sku)} · ngưỡng ${p.threshold}</span></div><b>${p.stock}</b></div>`).join(""):`<div class="empty-state compact">Tồn kho đang ổn.</div>`}</section><section class="admin-card"><h2>Nhật ký gần đây</h2>${state.admin.audit.slice(0,6).map(x=>`<div class="audit-row"><strong>${esc(x.action)}</strong><span>${esc(x.detail)}</span><small>${esc(x.by)} · ${new Intl.DateTimeFormat("vi-VN",{dateStyle:"short",timeStyle:"short"}).format(new Date(x.at))}</small></div>`).join("")||'<div class="empty-state compact">Chưa có hoạt động.</div>'}</section></div>`;
  return adminShell("Tổng quan","overview",body,canAdmin("products")?'<a class="button" href="/quan-tri/san-pham/moi" data-route>+ Thêm sản phẩm</a>':"");
}

function adminProducts(){
  const search=(q("search")||"").toLowerCase(), status=q("status")||"all", kind=q("kind")||"all", sort=q("sort")||"updated", page=Math.max(1,Number(q("page"))||1), size=8;
  let list=state.admin.products.filter(p=>(!search||`${p.name} ${p.sku} ${p.slug}`.toLowerCase().includes(search))&&(status==="all"||p.status===status)&&(kind==="all"||p.kind===kind));
  list.sort((a,b)=>sort==="stock"?a.stock-b.stock:sort==="price"?a.price-b.price:String(a.name).localeCompare(String(b.name),"vi"));
  const pages=Math.max(1,Math.ceil(list.length/size)); list=list.slice((page-1)*size,page*size);
  const body=`<form class="admin-toolbar" id="product-filter-form"><input name="search" value="${esc(q("search")||"")}" placeholder="Tìm tên, SKU hoặc slug"><select name="kind"><option value="all">Mọi loại</option><option value="box" ${kind==="box"?"selected":""}>Hộp phối sẵn</option><option value="item" ${kind==="item"?"selected":""}>Món lẻ</option></select><select name="status"><option value="all">Mọi trạng thái</option>${[["published","Đang bán"],["draft","Bản nháp"],["paused","Tạm dừng"],["archived","Lưu trữ"]].map(([v,n])=>`<option value="${v}" ${status===v?"selected":""}>${n}</option>`).join("")}</select><select name="sort"><option value="updated">Tên A–Z</option><option value="stock" ${sort==="stock"?"selected":""}>Tồn thấp trước</option><option value="price" ${sort==="price"?"selected":""}>Giá thấp trước</option></select><button class="button small-btn">Lọc</button></form><section class="admin-card table-wrap"><table class="admin-table"><thead><tr><th>Sản phẩm</th><th>Loại</th><th>Giá</th><th>Tồn</th><th>Trạng thái</th><th></th></tr></thead><tbody>${list.map(p=>`<tr><td><div class="product-cell">${p.images?.[0]?.data?`<img src="${esc(p.images[0].data)}" alt="">`:`<span class="table-thumb">${esc(p.name.slice(0,2))}</span>`}<div><strong>${esc(p.name)}</strong><small>${esc(p.sku)} · /${esc(p.slug)}</small></div></div></td><td>${p.kind==="box"?"Hộp phối sẵn":"Món lẻ"}</td><td>${money(p.price)}</td><td class="${p.stock<=p.threshold?"low-stock":""}">${p.stock}</td><td>${statusBadge(p.status)}</td><td><div class="row wrap"><a class="link small" href="/quan-tri/san-pham/${encodeURIComponent(p.id)}/sua" data-route>Sửa</a><button class="link small" data-action="duplicate-product" data-id="${p.id}">Nhân bản</button><button class="link small" data-action="toggle-product" data-id="${p.id}">${p.status==="published"?"Tạm dừng":"Đăng bán"}</button><button class="link small danger-text" data-action="archive-product" data-id="${p.id}">Lưu trữ</button></div></td></tr>`).join("")||'<tr><td colspan="6"><div class="empty-state compact">Không có sản phẩm khớp bộ lọc.</div></td></tr>'}</tbody></table></section><div class="pagination"><span>Trang ${Math.min(page,pages)} / ${pages}</span>${Array.from({length:pages},(_,i)=>`<a href="/quan-tri/san-pham?page=${i+1}&status=${status}&kind=${kind}&sort=${sort}&search=${encodeURIComponent(q("search")||"")}" data-route class="${page===i+1?"active":""}">${i+1}</a>`).join("")}</div>`;
  return adminShell("Sản phẩm","products",body,'<a class="button" href="/quan-tri/san-pham/moi" data-route>+ Thêm sản phẩm</a>');
}

function physicalProductForm(html){
  return html
    .replace("Mô hình 3D & đóng gói","Ảnh chính & kích thước đóng gói")
    .replace("Dữ liệu vật lý cho Builder","Dữ liệu để tạo phương án bằng AI")
    .replace("Mô hình hiển thị và collider được quản lý riêng. Đơn vị: mm và g.","Nhập kích thước thật theo mm và ảnh mặt chính. Mặt này luôn được đặt hướng lên trên.")
    .replace(/<label class="button secondary small-btn file-button">Tải GLB[\s\S]*?<span id="model3d-status" class="fine-print">[\s\S]*?<\/span>/,"<div class=\"face-up-rule\"><b>↑ Mặt chính luôn hướng lên</b><span>Chỉ cần ảnh chính và kích thước thật của sản phẩm.</span></div>")
    .replace("Dạng đơn giản","Dạng bao bì")
    .replace("Collider","Hình bao kiểm tra")
    .replace(/<label class="checkline"><input name="modelUpright"[^>]*> Phải giữ đứng<\/label>/,"")
    .replace(/<input type="hidden" name="modelFileName"[^>]*><p class="fine-print">Bản demo chỉ lưu tên tệp GLB[\s\S]*?<\/p>/,"<p class=\"fine-print\">Ảnh mặt chính, kích thước và quy tắc dễ vỡ được dùng để tạo một phương án tốt nhất. Hệ thống không lật úp sản phẩm.</p>");
}

function productForm(id=""){
  const editing=!!id, source=state.admin.products.find(x=>x.id===id), p=source||{id:"",kind:"item",name:"",sku:"",slug:"",short:"",long:"",categories:[],tags:[],price:0,cost:0,stock:0,threshold:3,lead:1,status:"draft",size:1,capacity:1,builderEnabled:true,items:[],images:[]};
  if(editing&&!source) return adminDenied("sản phẩm không tồn tại");
  const key=editing?id:"new"; if(!state.admin.uploads[key]) state.admin.uploads[key]=structuredClone(p.images||[]); const images=state.admin.uploads[key];
  const m=p.model3d||defaultModel3d(p);if(!Object.prototype.hasOwnProperty.call(state.admin.modelPhotos,key))state.admin.modelPhotos[key]=m.textureData||"";const modelPhoto=state.admin.modelPhotos[key]||"";
  const imageHtml=images.map((img,i)=>`<div class="upload-card"><img src="${esc(img.data)}" alt="${esc(img.alt||img.name)}"><input value="${esc(img.alt||"")}" data-image-alt="${img.id}" data-key="${key}" placeholder="Mô tả ảnh"><div class="row wrap"><button class="link small" data-action="image-cover" data-id="${img.id}" data-key="${key}">${img.cover?"Ảnh bìa ✓":"Đặt ảnh bìa"}</button><button class="link small" data-action="image-left" data-id="${img.id}" data-key="${key}">←</button><button class="link small" data-action="image-right" data-id="${img.id}" data-key="${key}">→</button><button class="link small danger-text" data-action="image-remove" data-id="${img.id}" data-key="${key}">Xóa</button></div></div>`).join("");
  const body=`<form id="product-form" class="admin-form" data-key="${key}"><input type="hidden" name="id" value="${esc(id)}"><section class="admin-card"><div class="row spaced wrap"><div><h2>Thông tin cơ bản</h2><p class="muted small">Mọi trường đang nhập được giữ nguyên nếu có lỗi kiểm tra.</p></div><label class="field compact-field">Loại sản phẩm<select name="kind"><option value="item" ${p.kind==="item"?"selected":""}>Món lẻ</option><option value="box" ${p.kind==="box"?"selected":""}>Hộp phối sẵn</option></select></label></div><div class="form-grid"><div class="field"><label>Tên *</label><input name="name" required value="${esc(p.name)}"></div><div class="field"><label>SKU *</label><input name="sku" required value="${esc(p.sku)}"></div><div class="field"><label>Slug *</label><input name="slug" required pattern="[a-z0-9-]+" value="${esc(p.slug)}"></div><div class="field"><label>Trạng thái</label><select name="status">${[["draft","Bản nháp"],["published","Đăng bán"],["paused","Tạm dừng"],["archived","Lưu trữ"]].map(([v,n])=>`<option value="${v}" ${p.status===v?"selected":""}>${n}</option>`).join("")}</select></div></div><div class="field"><label>Mô tả ngắn *</label><textarea name="short" required>${esc(p.short||p.meaning||"")}</textarea></div><div class="field"><label>Mô tả đầy đủ</label><textarea name="long">${esc(p.long||"")}</textarea></div><div class="form-grid"><div class="field"><label>Danh mục (ngăn bằng dấu phẩy)</label><input name="categories" value="${esc((p.categories||p.occasions||[]).join(", "))}"></div><div class="field"><label>Thẻ</label><input name="tags" value="${esc((p.tags||[]).join(", "))}"></div></div></section><section class="admin-card"><h2>Giá và tồn kho</h2><div class="form-grid four"><div class="field"><label>Giá bán *</label><input name="price" type="number" min="0" required value="${p.price}"></div><div class="field"><label>Giá vốn</label><input name="cost" type="number" min="0" value="${p.cost||0}"></div><div class="field"><label>Tồn hiện tại</label><input name="stock" type="number" min="0" value="${p.stock||0}"></div><div class="field"><label>Ngưỡng cảnh báo</label><input name="threshold" type="number" min="0" value="${p.threshold||0}"></div><div class="field"><label>Ngày chuẩn bị</label><input name="lead" type="number" min="0" value="${p.lead||1}"></div><div class="field"><label>Dung lượng món</label><input name="size" type="number" min="1" value="${p.size||p.capacity||1}"></div></div><label class="checkline"><input name="builderEnabled" type="checkbox" ${p.builderEnabled!==false?"checked":""}> Cho phép dùng trong Builder (áp dụng món lẻ)</label></section><section class="admin-card"><h2>Cấu hình hộp phối sẵn</h2><div class="field"><label>Mỗi món một dòng</label><textarea name="items" placeholder="Nến thơm 80g&#10;Trà ô long 6 gói">${esc((p.items||[]).join("\n"))}</textarea></div><div class="form-grid"><div class="field"><label>Phong cách</label><input name="style" value="${esc(p.style||"")}"></div><div class="field"><label>Người nhận (dấu phẩy)</label><input name="recipients" value="${esc((p.recipients||[]).join(", "))}"></div></div></section><section class="admin-card model3d-admin"><div class="row spaced wrap"><div><span class="eyebrow">Mô hình 3D & đóng gói</span><h2>Dữ liệu vật lý cho Builder</h2><p class="muted small">Mô hình hiển thị và collider được quản lý riêng. Đơn vị: mm và g.</p></div><span class="status ${m.modelStatus==="checked"?"status-published":"status-draft"}">${m.modelStatus==="checked"?"Đã kiểm tra":"Bản nháp"}</span></div><div class="model3d-preview"><div class="simple-model ${m.shape}"><span>${m.shape==="cylinder"?"Hình trụ":"Khối hộp"}</span></div><div><strong>${esc(m.sourceName||"Mô hình kích thước đơn giản")}</strong><p class="small muted">${m.length} × ${m.width} × ${m.height} mm · ${m.weight} g</p><label class="button secondary small-btn file-button">Tải GLB<input id="product-model3d" type="file" accept=".glb,model/gltf-binary" hidden></label><span id="model3d-status" class="fine-print">${m.fileName?`Tệp đã chọn: ${esc(m.fileName)}`:"Chưa có GLB; Builder dùng hình học đơn giản đúng kích thước."}</span></div></div><div class="form-grid four"><div class="field"><label>Dạng đơn giản</label><select name="modelShape"><option value="box" ${m.shape==="box"?"selected":""}>Khối hộp</option><option value="cylinder" ${m.shape==="cylinder"?"selected":""}>Hình trụ</option></select></div><div class="field"><label>Dài (mm)</label><input name="modelLength" type="number" min="1" required value="${m.length}"></div><div class="field"><label>Rộng (mm)</label><input name="modelWidth" type="number" min="1" required value="${m.width}"></div><div class="field"><label>Cao (mm)</label><input name="modelHeight" type="number" min="1" required value="${m.height}"></div><div class="field"><label>Khối lượng (g)</label><input name="modelWeight" type="number" min="1" required value="${m.weight}"></div><div class="field"><label>Khoảng đệm (mm)</label><input name="modelPadding" type="number" min="0" value="${m.padding||0}"></div><div class="field"><label>Collider</label><select name="modelCollider"><option value="box" ${m.collider==="box"?"selected":""}>Hộp</option><option value="cylinder" ${m.collider==="cylinder"?"selected":""}>Trụ</option></select></div><div class="field"><label>Tải đỡ tối đa (g)</label><input name="modelMaxLoad" type="number" min="0" value="${m.maxLoad||0}"></div></div><div class="model-rules"><label class="checkline"><input name="modelUpright" type="checkbox" ${m.upright?"checked":""}> Phải giữ đứng</label><label class="checkline"><input name="modelFragile" type="checkbox" ${m.fragile?"checked":""}> Dễ vỡ / cần cẩn thận</label><label class="checkline"><input name="modelCompressible" type="checkbox" ${m.compressible?"checked":""}> Dễ móp</label><label class="checkline"><input name="modelCanSupport" type="checkbox" ${m.canSupport?"checked":""}> Có thể đỡ món khác</label><label class="checkline"><input name="modelChecked" type="checkbox" ${m.modelStatus==="checked"?"checked":""}> Đã đối chiếu kích thước thật</label></div><input type="hidden" name="modelFileName" value="${esc(m.fileName||"")}"><p class="fine-print">Bản demo chỉ lưu tên tệp GLB trong trình duyệt; mô hình đơn giản vẫn là nguồn hình học bền vững. Bản vận hành cần object storage, kiểm tra quyền sở hữu và pipeline kiểm duyệt tệp.</p></section><section class="admin-card"><div class="row spaced wrap"><div><h2>Ảnh sản phẩm</h2><p class="muted small">JPG, PNG hoặc WebP · tối đa 5MB/ảnh · tối đa 8 ảnh.</p></div><label class="button secondary small-btn file-button">Chọn ảnh từ thiết bị<input id="product-images" type="file" accept="image/jpeg,image/png,image/webp" multiple hidden></label></div><div id="upload-status" class="fine-print"></div><div class="upload-grid">${imageHtml||'<div class="empty-state compact">Chưa có ảnh. Bạn có thể chỉ dùng tên sản phẩm như hiện tại.</div>'}</div></section><div id="product-error" class="field-error" role="alert"></div><div class="admin-form-actions"><a class="button ghost" href="/quan-tri/san-pham" data-route>Hủy</a><button class="button secondary" type="button" data-action="product-preview">Xem trước</button><button class="button" type="button" data-action="save-product">${editing?"Cập nhật sản phẩm":"Lưu sản phẩm"}</button></div></form>`;
  return adminShell(editing?"Sửa sản phẩm":"Thêm sản phẩm","products",physicalProductForm(body));
}

function adminInventory(){
  const products=state.admin.products.filter(p=>p.status!=="archived");
  const body=`<div class="admin-tabs"><span class="active">Tất cả ${products.length}</span><span>Hộp phối sẵn ${products.filter(p=>p.kind==="box").length}</span><span>Món lẻ ${products.filter(p=>p.kind==="item").length}</span></div><section class="admin-card table-wrap"><table class="admin-table"><thead><tr><th>Sản phẩm</th><th>Kiểu tồn</th><th>Hiện có</th><th>Ngưỡng</th><th>Điều chỉnh</th></tr></thead><tbody>${products.map(p=>`<tr><td><strong>${esc(p.name)}</strong><small>${esc(p.sku)}</small></td><td>${p.kind==="box"?"Thành phẩm đóng sẵn":"Linh kiện Builder"}</td><td class="${p.stock<=p.threshold?"low-stock":""}">${p.stock}</td><td>${p.threshold}</td><td><form class="inventory-form"><input type="hidden" name="id" value="${p.id}"><input name="delta" type="number" required placeholder="+ / −" aria-label="Số lượng điều chỉnh"><input name="reason" required placeholder="Lý do"><button class="button small-btn">Lưu</button></form></td></tr>`).join("")}</tbody></table></section><section class="admin-card"><h2>Nhật ký điều chỉnh</h2>${state.admin.inventoryLog.slice(0,10).map(x=>`<div class="admin-list-row"><div><strong>${esc(x.product)}</strong><span>${esc(x.reason)} · ${esc(x.by)}</span></div><b class="${x.delta<0?"danger-text":""}">${x.delta>0?"+":""}${x.delta}</b></div>`).join("")||'<div class="empty-state compact">Chưa có lần điều chỉnh nào.</div>'}</section>`;
  return adminShell("Tồn kho","inventory",body);
}

function adminOptions(){
  const renderGroup=(type,title,items)=>`<section class="admin-card ${type==="packaging"?"admin-card-wide":""}"><div class="row spaced"><h2>${title}</h2><span class="muted small">Đồng bộ ngay vào Builder</span></div><div class="option-list">${items.map(x=>`<div class="admin-list-row with-asset">${assetThumb(type,x,true)}<div><strong>${esc(x.name)}</strong><span>${money(x.price)}${x.capacity?` · sức chứa ${x.capacity}`:""}${type==="packaging"&&x.innerLength?` · lòng ${x.innerLength} × ${x.innerWidth} × ${x.innerHeight} mm · tối đa ${x.maxWeight} g`:""}</span>${x.assetModel?`<span class="asset-file">${esc(x.assetModel.split("/").pop())}</span>`:""}</div><button class="link" data-action="toggle-option" data-type="${type}" data-id="${x.id}">${x.active===false?"Bật lại":"Tạm ẩn"}</button></div>`).join("")}</div><form class="option-form ${type==="packaging"?"packaging-option-form":""}" data-type="${type}"><input name="name" required placeholder="Tên tùy chọn"><input name="price" type="number" min="0" required placeholder="Giá"><input name="capacity" type="number" min="1" placeholder="Sức chứa">${type==="packaging"?'<input name="innerLength" type="number" min="50" required placeholder="Dài lòng (mm)"><input name="innerWidth" type="number" min="50" required placeholder="Rộng lòng (mm)"><input name="innerHeight" type="number" min="30" required placeholder="Cao lòng (mm)"><input name="maxWeight" type="number" min="100" required placeholder="Tải tối đa (g)">':""}<button class="button small-btn">+ Thêm</button></form></section>`;
  const materials=`<section class="admin-card admin-card-wide"><div class="row spaced"><div><h2>Vật liệu chèn lót</h2><p class="muted small">Độ dày thực tế được tính khi tạo phương án xếp.</p></div></div>${state.admin.materials3d.map(x=>`<div class="admin-list-row with-asset">${assetThumb("materials",x,true)}<div><strong>${esc(x.name)}</strong><span>${money(x.price)} · dày ${x.thickness} mm · ${x.support?"có thể làm lớp đỡ":"chỉ trang trí/đệm"}</span></div><button class="link" data-action="toggle-material3d" data-id="${x.id}">${x.active===false?"Bật lại":"Tạm ẩn"}</button></div>`).join("")}</section>`;
  return adminShell("Tùy chọn hộp","options",`<div class="asset-source-note admin-asset-note"><span>AI</span><div><strong>Dùng ảnh và kích thước thật</strong><small>Hộp và vật liệu dùng ảnh, kích thước, độ dày để tạo phương án xếp.</small></div></div><div class="admin-grid">${renderGroup("packaging","Hộp & bao bì",state.admin.packaging)}${materials}${renderGroup("cards","Thiệp",state.admin.cards)}${renderGroup("ribbons","Ruy băng",state.admin.ribbons)}</div>`);
}

function orderDetail(order){
  if(!order) return '<div class="admin-card empty-state"><h2>Không tìm thấy đơn.</h2></div>';
  const statuses=["Chờ thanh toán","Đã tiếp nhận","Đang chuẩn bị","Sẵn sàng giao","Đang giao","Đã giao","Đã hủy"];
  return `<section class="admin-card"><div class="row spaced wrap"><div><span class="eyebrow">${esc(order.reference)}</span><h2>Chi tiết đơn</h2></div><div class="row wrap"><button class="button secondary small-btn" data-action="packing-slip" data-id="${order.reference}">Phiếu đóng gói</button><a class="button ghost small-btn" href="/quan-tri/don-hang" data-route>Đóng</a></div></div><div class="order-detail-grid"><div><h3>Người mua & nhận</h3><p><strong>${esc(order.buyerName||order.owner)}</strong><br>${esc(order.buyerEmail||order.owner)} · ${esc(order.buyerPhone||"")}</p><p>Người nhận: <strong>${esc(order.receiverName||"")}</strong> · ${esc(order.receiverPhone||"")}<br>${esc(order.address||"")}</p><p>${esc(order.date||"Chưa chọn ngày")} · ${esc(order.slot||"")}</p></div><div><h3>Thanh toán</h3><p>${esc(order.paymentLabel||order.payment)}<br><strong>${money(order.total)}</strong></p><form id="order-status-form"><input type="hidden" name="reference" value="${order.reference}"><div class="field"><label>Trạng thái</label><select name="status">${statuses.map(s=>`<option ${order.status===s?"selected":""}>${s}</option>`).join("")}</select></div><div class="field"><label>Ghi chú nội bộ</label><textarea name="internalNote">${esc(order.internalNote||"")}</textarea></div><button class="button small-btn">Cập nhật</button></form></div></div><h3>Hộp và món</h3>${order.lines.map(l=>`<div class="admin-list-row"><div><strong>${l.qty} × ${esc(l.name)}</strong><span>${esc(l.summary||"")}${l.message?` · Lời nhắn: ${esc(l.message)}`:""}</span>${l.aiLayout?`<button class="link small" data-action="view-order-layout" data-order="${esc(order.reference)}" data-line="${esc(l.id)}">Xem phương án AI & thứ tự đóng</button>`:""}</div><b>${money(l.unitPrice*l.qty)}</b></div>`).join("")}<p class="fine-print">Giá, kích thước và phương án là ảnh chụp tại lúc đặt; thay đổi danh mục sau này không sửa lịch sử đơn.</p></section>`;
}

function adminOrders(){
  const selected=q("order"), search=(q("search")||"").toLowerCase(), status=q("status")||"all", date=q("date")||"";
  const list=state.orders.filter(o=>(!search||`${o.reference} ${o.receiverName} ${o.buyerName||""}`.toLowerCase().includes(search))&&(status==="all"||o.status===status)&&(!date||o.date===date));
  const body=`${selected?orderDetail(state.orders.find(o=>o.reference===selected)):""}<form class="admin-toolbar" id="order-filter-form"><input name="search" value="${esc(q("search")||"")}" placeholder="Mã đơn hoặc người nhận"><select name="status"><option value="all">Mọi trạng thái</option>${["Chờ thanh toán","Đã tiếp nhận","Đang chuẩn bị","Sẵn sàng giao","Đang giao","Đã giao","Đã hủy"].map(s=>`<option ${status===s?"selected":""}>${s}</option>`).join("")}</select><input name="date" type="date" value="${esc(date)}"><button class="button small-btn">Lọc</button></form><section class="admin-card table-wrap"><table class="admin-table"><thead><tr><th>Mã đơn</th><th>Người nhận</th><th>Lịch giao</th><th>Tổng</th><th>Thanh toán</th><th>Trạng thái</th></tr></thead><tbody>${list.map(o=>`<tr><td><a class="link" href="/quan-tri/don-hang?order=${encodeURIComponent(o.reference)}" data-route>${esc(o.reference)}</a><small>${new Intl.DateTimeFormat("vi-VN").format(new Date(o.createdAt))}</small></td><td>${esc(o.receiverName||"")}</td><td>${esc(o.date||"")}<small>${esc(o.slot||"")}</small></td><td>${money(o.total)}</td><td>${esc(o.paymentLabel||o.payment)}</td><td><span class="status">${esc(o.status)}</span></td></tr>`).join("")||'<tr><td colspan="6"><div class="empty-state compact">Chưa có đơn phù hợp. Hãy đặt một đơn thử nghiệm từ cửa hàng để kiểm tra liên thông.</div></td></tr>'}</tbody></table></section>`;
  return adminShell("Đơn hàng","orders",body);
}

function adminDelivery(){
  const d=state.admin.delivery;
  const body=`<form id="delivery-form" class="admin-form"><section class="admin-card"><h2>Vùng và phí giao</h2><div class="form-grid"><div class="field"><label>Vùng phục vụ</label><input name="zone" required value="${esc(d.zone)}"></div><div class="field"><label>Phí giao</label><input name="fee" type="number" min="0" required value="${d.fee}"></div><div class="field"><label>Sức chứa mỗi khung</label><input name="capacity" type="number" min="1" required value="${d.capacity}"></div><div class="field"><label>Ngày nghỉ (YYYY-MM-DD, dấu phẩy)</label><input name="holidays" value="${esc(d.holidays||"")}"></div></div></section><section class="admin-card"><h2>Khung giờ</h2>${d.slots.map((s,i)=>`<div class="delivery-slot-row"><input name="slotLabel${i}" value="${esc(s.label)}" required><label class="checkline"><input name="slotActive${i}" type="checkbox" ${s.active!==false?"checked":""}> Đang nhận</label><label class="checkline"><input name="slotFull${i}" type="checkbox" ${s.full?"checked":""}> Đã kín</label></div>`).join("")}</section><button class="button">Lưu cấu hình giao hàng</button></form>`;
  return adminShell("Giao hàng","delivery",body);
}

function adminAiLibrary(){
  const refs=state.admin.aiReferences||[],active=refs.filter(x=>x.active!==false).length;
  const cards=refs.map(ref=>`<article class="reference-card ${ref.active===false?"inactive":""}"><img src="${esc(ref.data)}" alt="${esc(ref.title)}"><div><div class="row spaced"><span class="status ${ref.active===false?"status-draft":"status-published"}">${ref.active===false?"Đang ẩn":"Đang dùng"}</span><small>${esc(ref.boxShape||"Hộp khác")}</small></div><h3>${esc(ref.title)}</h3><p>${esc(ref.occasion||"Dịp khác")} · ${esc(ref.style||"Phong cách khác")} · ${Number(ref.itemCount||0)} món</p><small>${esc(ref.notes||"Chưa có ghi chú bố cục.")}</small><div class="row wrap"><button class="link small" data-action="toggle-ai-reference" data-id="${ref.id}">${ref.active===false?"Bật lại":"Tạm ẩn"}</button><button class="link small danger-text" data-action="delete-ai-reference" data-id="${ref.id}">Xóa ảnh</button></div></div></article>`).join("");
  const body=`<section class="admin-card library-intro"><div><span class="eyebrow">Dữ liệu tham khảo</span><h2>${refs.length} ảnh · ${active} đang hoạt động</h2><p class="muted">AI chỉ học cách trình bày từ ảnh này; ảnh tham khảo không được phép làm thay đổi danh sách sản phẩm thật của khách.</p></div><a class="button secondary" href="/quan-tri/cai-dat" data-route>Chỉnh prompt & API</a></section><form id="ai-reference-form" class="admin-card admin-form"><div class="row spaced wrap"><div><h2>Thêm ảnh tham khảo</h2><p class="muted small">JPG, PNG hoặc WebP · tối đa 5MB/ảnh · có thể chọn nhiều ảnh.</p></div><label class="button small-btn file-button">Chọn hình ảnh<input id="ai-reference-images" name="images" type="file" accept="image/jpeg,image/png,image/webp" multiple required hidden></label></div><div class="form-grid"><div class="field"><label>Tên bộ mẫu *</label><input name="title" required placeholder="Ví dụ: Sinh nhật tối giản"></div><div class="field"><label>Dịp</label><select name="occasion"><option>Sinh nhật</option><option>Kỷ niệm</option><option>Valentine / White Day</option><option>Self-care</option><option>Giáng sinh</option><option>8/3 & 20/10</option><option>Khác</option></select></div><div class="field"><label>Phong cách</label><select name="style"><option>Tối giản</option><option>Sang trọng</option><option>Dễ thương</option><option>Tự nhiên</option><option>Lãng mạn</option><option>Ấm áp</option></select></div><div class="field"><label>Số món trong mẫu</label><input name="itemCount" type="number" min="1" max="20" value="4"></div><div class="field"><label>Dạng hộp</label><select name="boxShape"><option>Chữ nhật</option><option>Vuông</option><option>Hộp sâu</option><option>Khác</option></select></div><div class="field"><label>Ghi chú bố cục</label><input name="notes" placeholder="Món nặng ở giữa, màu sáng ở góc trên..."></div></div><div id="reference-upload-status" class="fine-print"></div><button class="button">Thêm vào thư viện</button></form><section class="admin-card"><div class="row spaced wrap"><div><h2>Kho ảnh tham khảo</h2><p class="muted small">Ẩn ảnh để tạm ngừng gửi cho AI, hoặc xóa nếu không còn sử dụng.</p></div><span class="status">Tối đa khuyến nghị 300 mẫu</span></div><div class="reference-grid">${cards||'<div class="empty-state"><h3>Chưa có ảnh tham khảo.</h3><p>Thêm khoảng 20–30 ảnh tốt trước, sau đó mở rộng theo dịp và phong cách.</p></div>'}</div></section>`;
  return adminShell("Thư viện AI","library",body);
}

function adminSettings(){
  const ai=state.admin.ai||{};
  const body=`<form id="settings-form" class="admin-form"><section class="admin-card"><h2>Nội dung cửa hàng</h2><div class="field"><label>Dải thông báo</label><input name="banner" value="${esc(state.admin.banner||"")}"></div><div class="form-grid"><div class="field"><label>Mã chiến dịch demo</label><input name="campaign" value="${esc(state.admin.campaign||"")}"></div><div class="field"><label>Số ngày nhắc mặc định</label><input name="reminderDays" type="number" min="1" value="${state.admin.reminderDays||7}"></div></div><button class="button">Lưu cài đặt</button></section></form>
  
  <form id="ai-settings-form" class="admin-form">
    <section class="admin-card ai-config-card">
      <div class="row spaced wrap">
        <div>
          <span class="eyebrow">TRUNG TÂM AI</span>
          <h2>Hai AI phối hợp độc lập</h2>
          <p class="muted small">ChatGPT lập phương án xếp dựa trên số đo mm; sau khi kiểm tra hình học hợp lệ, Cloudflare FLUX tạo ảnh thành phẩm.</p>
        </div>
        <div class="row gap-small">
          <span class="status ${aiSessionKey ? "status-published" : "status-draft"}">${aiSessionKey ? "Key Text: Có" : "Key Text: Chưa"}</span>
          <span class="status ${aiImageSessionKey ? "status-published" : "status-draft"}">${aiImageSessionKey ? "Secret FLUX: Có" : "Secret FLUX: Chưa"}</span>
        </div>
      </div>
      
      <label class="checkline" style="margin-bottom: 20px;">
        <input name="enabled" type="checkbox" ${ai.enabled ? "checked" : ""}> Kích hoạt trung tâm AI trên website
      </label>

      <!-- KHU VỰC A -->
      <div style="background: #faf7f2; border: 1px solid #dcd3c8; border-radius: 8px; padding: 18px 20px; margin-bottom: 22px;">
        <div class="row spaced wrap" style="margin-bottom: 12px;">
          <div>
            <h3 style="margin: 0; font-size: 1.05rem; color: #43281c;">PHẦN A — AI lập phương án xếp (ChatGPT / Text Model)</h3>
            <p class="fine-print" style="margin-top: 2px;">Chịu trách nhiệm phân tích kích thước và lập phương án JSON, không tạo ảnh.</p>
          </div>
          <span class="status" style="background: #e9ecef; font-size: 0.72rem;">Bắt buộc trả JSON · response_format</span>
        </div>

        <div class="form-grid">
          <div class="field">
            <label>Chat Completions endpoint</label>
            <input name="endpoint" type="url" placeholder="https://api.openai.com/v1/chat/completions" value="${esc(ai.endpoint||"")}">
            <span class="fine-print">OpenAI hoặc endpoint tương thích Chat Completions.</span>
          </div>
          <div class="field">
            <label>Text model</label>
            <input name="model" placeholder="gpt-4o-mini hoặc gpt-4o" value="${esc(ai.model||"")}">
            <span class="fine-print">Model tiếp nhận dữ liệu kích thước và xuất JSON vị trí.</span>
          </div>
          <div class="field">
            <label>API key Text Model dùng trong phiên</label>
            <input name="apiKey" type="password" autocomplete="off" placeholder="sk-...">
            <span class="fine-print">${aiSessionKey ? "✓ Đang giữ khóa trong RAM phiên này" : "Khóa chỉ lưu trong biến JS của tab, mất khi tải lại trang."}</span>
          </div>
          <div class="field">
            <label>Temperature (Mặc định 0.1–0.2)</label>
            <input name="temperature" type="number" step="0.05" min="0" max="1" value="${ai.temperature !== undefined ? ai.temperature : 0.15}">
            <span class="fine-print">Nhiệt độ thấp giúp mô hình tuân thủ quy tắc kích thước chính xác.</span>
          </div>
        </div>

        <div class="field" style="margin-top: 12px;">
          <label>Prompt hệ thống lập bố cục (System Prompt)</label>
          <textarea name="textModelPrompt" class="ai-prompt-field" style="min-height: 180px;" spellcheck="false">${esc(ai.textModelPrompt || ai.packingPrompt || TEXT_MODEL_PACKING_PROMPT)}</textarea>
          <span class="fine-print">Bao gồm 12 quy tắc bắt buộc và schema JSON trả về (status="ok" hoặc "impossible").</span>
        </div>

        <div class="field" style="margin-top: 12px;">
          <label>Prompt sửa bố cục không hợp lệ (Repair Prompt Template)</label>
          <textarea name="repairPrompt" class="ai-prompt-field" style="min-height: 120px;" spellcheck="false">${esc(ai.repairPrompt || TEXT_MODEL_REPAIR_PROMPT)}</textarea>
          <span class="fine-print">Dùng khi phương án không vượt qua kiểm tra hình học. Hệ thống tự động thay thế {{VALIDATION_ERRORS}}, {{INPUT_DATA}}, {{INVALID_LAYOUT}}.</span>
        </div>
      </div>

      <!-- KHU VỰC B -->
      <div style="background: #fdfaf6; border: 1px solid #dcd3c8; border-radius: 8px; padding: 18px 20px; margin-bottom: 22px;">
        <div class="row spaced wrap" style="margin-bottom: 12px;">
          <div>
            <h3 style="margin: 0; font-size: 1.05rem; color: #702c39;">PHẦN B — AI tạo ảnh thành phẩm (Cloudflare FLUX.2 Klein 4B)</h3>
            <p class="fine-print" style="margin-top: 2px;">Nhận toạ độ đã kiểm tra hình học và ảnh sản phẩm để tạo ảnh thành phẩm photorealistic.</p>
          </div>
          <span class="status status-published" style="font-size: 0.72rem;">FLUX.2 Klein 4B · multipart/form-data</span>
        </div>

        <div class="field">
          <label>Nhà cung cấp tạo ảnh</label>
          <select name="imageProvider" id="ai-image-provider">
            <option value="cloudflare" ${ai.imageProvider==="cloudflare"||!ai.imageProvider?"selected":""}>Cloudflare Workers AI (Khuyên dùng · FLUX.2 Klein 4B)</option>
            <option value="gemini" ${ai.imageProvider==="gemini"?"selected":""}>Google Gemini API (:generateContent)</option>
            <option value="openai" ${ai.imageProvider==="openai"?"selected":""}>API tương thích OpenAI (b64_json)</option>
          </select>
        </div>

        <div class="form-grid">
          <div class="field">
            <label>Worker endpoint</label>
            <input name="imageEndpoint" type="url" placeholder="https://goithuong-ai-image.xxx.workers.dev/" value="${esc(ai.imageEndpoint||"https://goithuong-ai-image.nguyentriquan1805.workers.dev/")}">
            <span class="fine-print">Endpoint Cloudflare Worker nhận multipart/form-data và trả b64_json.</span>
          </div>
          <div class="field">
            <label>Model tạo ảnh</label>
            <input name="imageModel" value="${esc(ai.imageModel||"@cf/black-forest-labs/flux-2-klein-4b")}">
            <span class="fine-print">Mặc định: @cf/black-forest-labs/flux-2-klein-4b.</span>
          </div>
          <div class="field">
            <label>Worker API key / Secret dùng trong phiên</label>
            <input name="imageApiKey" type="password" autocomplete="off" placeholder="hellodayladuan...">
            <span class="fine-print">${aiImageSessionKey ? "✓ Đang giữ Secret Worker trong RAM phiên này" : "Khóa chỉ lưu trong biến JS của tab, mất khi tải lại trang."}</span>
          </div>
          <div class="field">
            <label>Kích thước ảnh thành phẩm</label>
            <select name="imageSize">
              <option value="1024x768" ${ai.imageSize==="1024x768"||!ai.imageSize?"selected":""}>Ngang 4:3 (1024×768) · Chuẩn Cloudflare FLUX</option>
              <option value="1536x1024" ${ai.imageSize==="1536x1024"?"selected":""}>Ngang 3:2 (1536×1024)</option>
              <option value="1024x1024" ${ai.imageSize==="1024x1024"?"selected":""}>Vuông 1:1 (1024×1024)</option>
            </select>
          </div>
        </div>

        <div class="field" style="margin-top: 12px;">
          <label>Prompt nền tạo ảnh</label>
          <textarea name="imagePrompt" class="ai-prompt-field" style="min-height: 110px;" spellcheck="false">${esc(ai.imagePrompt||DEFAULT_AI_IMAGE_PROMPT)}</textarea>
          <span class="fine-print">Được kết hợp với thông số toạ độ đã kiểm tra và ánh xạ ảnh tham chiếu (input_image_0..3).</span>
        </div>
      </div>

      <div class="field" style="margin-top: 14px;">
        <label>Prompt gợi ý quà tặng nhanh (AI Finder)</label>
        <textarea name="recommendationPrompt" class="ai-prompt-field" style="min-height: 80px;" spellcheck="false">${esc(ai.recommendationPrompt||DEFAULT_AI_RECOMMENDATION_PROMPT)}</textarea>
      </div>

      <div class="row wrap" style="margin-top: 18px;">
        <button class="button">Lưu cấu hình AI</button>
        <button class="button ghost" type="button" data-action="clear-ai-key" ${(aiSessionKey || aiImageSessionKey) ? "" : "disabled"}>Xóa toàn bộ API key khỏi phiên</button>
        <a class="button secondary" href="/quan-tri/thu-vien-ai" data-route>Quản lý ảnh tham khảo</a>
      </div>
    </section>
  </form>

  <section class="admin-card">
    <div class="row spaced">
      <div><h2>Nhân sự và vai trò</h2><p class="muted small">Đăng ký công khai không thể tự nhận vai trò này.</p></div>
    </div>
    ${state.admin.staff.map(s=>`<div class="admin-list-row"><div><strong>${esc(s.name)}</strong><span>${esc(s.email)} · ${esc(ROLE_LABELS[s.role])}</span></div><button class="link" data-action="toggle-staff" data-email="${esc(s.email)}" ${s.role==="owner"?"disabled":""}>${s.active?"Tạm khóa":"Mở lại"}</button></div>`).join("")}
    <form id="staff-form" class="option-form">
      <input name="name" required placeholder="Tên nhân viên">
      <input name="email" type="email" required placeholder="email@goithuong.test">
      <select name="role"><option value="product">Nhân viên sản phẩm</option><option value="orders">Nhân viên đơn hàng</option></select>
      <button class="button small-btn">Cấp quyền</button>
    </form>
  </section>`;
  return adminShell("Cài đặt","settings",body);
}

function adminRoute(path){
  if(!state.user) return authRequired("Đăng nhập khu vực người bán","/quan-tri");
  if(!isSeller()) return `<section class="section"><div class="narrow center"><span class="eyebrow">Khu vực nội bộ</span><h1>Tài khoản khách hàng không có quyền quản trị.</h1><p>Vai trò người bán chỉ do chủ cửa hàng cấp. Giao diện ẩn không thay thế kiểm tra quyền ở máy chủ.</p><a class="button" href="/tai-khoan" data-route>Về tài khoản</a></div></section>`;
  if(path==="/quan-tri") return canAdmin("overview")?adminOverview():adminDenied("tổng quan");
  if(path==="/quan-tri/san-pham/moi") return canAdmin("products")?productForm():adminDenied("sản phẩm");
  const edit=path.match(/^\/quan-tri\/san-pham\/([^/]+)\/sua$/); if(edit) return canAdmin("products")?productForm(decodeURIComponent(edit[1])):adminDenied("sản phẩm");
  if(path==="/quan-tri/san-pham") return canAdmin("products")?adminProducts():adminDenied("sản phẩm");
  if(path==="/quan-tri/ton-kho") return canAdmin("inventory")?adminInventory():adminDenied("tồn kho");
  if(path==="/quan-tri/tuy-chon-hop") return canAdmin("options")?adminOptions():adminDenied("tùy chọn hộp");
  if(path==="/quan-tri/thu-vien-ai") return canAdmin("library")?adminAiLibrary():adminDenied("thư viện AI");
  if(path==="/quan-tri/don-hang") return canAdmin("orders")?adminOrders():adminDenied("đơn hàng");
  if(path==="/quan-tri/giao-hang") return canAdmin("delivery")?adminDelivery():adminDenied("giao hàng");
  if(path==="/quan-tri/cai-dat") return canAdmin("settings")?adminSettings():adminDenied("cài đặt");
  return notFound();
}

function authRequired(title, returnTo){ return `<section class="section"><div class="narrow center"><span class="eyebrow">Cần đăng nhập</span><h1>${title}</h1><p class="muted">Dữ liệu ở khu vực này thuộc về từng tài khoản và không được hiển thị công khai.</p><a class="button" href="/dang-nhap?returnTo=${encodeURIComponent(returnTo)}" data-route>Đăng nhập để tiếp tục</a></div></section>`; }
function notFound(){ pageTitle("Không tìm thấy trang"); return `<section class="section"><div class="narrow center"><span class="eyebrow">404</span><h1>Trang này chưa được gói xong.</h1><p class="muted">Liên kết có thể đã thay đổi. Bạn có thể quay lại chọn quà từ đầu.</p><a class="button" href="/" data-route>Về trang chủ</a></div></section>`; }

function routeContent(){
  const path=currentPath();
  if(path==="/quan-tri"||path.startsWith("/quan-tri/")) return adminRoute(path);
  if(path==="/") return homePage();
  if(path==="/hop-qua") return catalogPage();
  if(path.startsWith("/hop-qua/")) return detailPage(decodeURIComponent(path.split("/")[2]||""));
  if(path==="/tim-qua") return finderPage();
  if(path==="/dang-nhap") return authPage();
  if(path==="/tu-tao-hop/goi-y-ai"||path==="/tu-tao-hop/xep-3d") return aiPackingPage();
  if(path==="/tu-tao-hop") return builderPage();
  if(path==="/gio-hang") return cartPage();
  if(path==="/thanh-toan") return checkoutPage();
  if(path.startsWith("/xac-nhan-don/")) return confirmationPage(path.split("/")[2]);
  if(path==="/theo-doi-don") return trackingPage();
  if(path==="/tai-khoan") return accountPage();
  if(path==="/dip-cua-toi") return occasionsPage();
  if(["/ve-chung-toi","/ho-tro","/chinh-sach-giao-hang","/doi-tra-huy-don","/bao-mat","/dieu-khoan"].includes(path)) return infoPage(path);
  return notFound();
}
function currentTerminology(html){return html.replaceAll("Xem bố cục 3D & thứ tự đóng","Xem phương án AI & thứ tự đóng").replaceAll("Bố cục 3D:","Phương án đã chọn:").replaceAll("bố cục 3D","phương án xếp");}
function render(){ document.querySelector("#app").innerHTML=shell(currentTerminology(routeContent())); bindPageSpecific(); }

function openMenu(){
  const prior=document.activeElement; const wrap=document.createElement("div"); wrap.innerHTML=`<div class="drawer-backdrop" data-action="close-drawer"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="Menu"><div class="drawer-head"><a class="wordmark" href="/" data-route>${BRAND.name}</a><button class="drawer-close" data-action="close-drawer" aria-label="Đóng menu">×</button></div><nav><a href="/hop-qua" data-route>Hộp quà có sẵn</a><a href="/tim-qua" data-route>Tìm quà nhanh</a><a href="/tu-tao-hop" data-route>Tự tạo hộp</a><a href="/dip-cua-toi" data-route>Nhắc dịp</a><a href="/ve-chung-toi" data-route>Về Gói Thương</a><a href="${state.user?(isSeller()?'/quan-tri':'/tai-khoan'):'/dang-nhap'}" data-route>${state.user?(isSeller()?"Khu quản trị":"Tài khoản"):"Đăng nhập"}</a></nav></aside>`; wrap.id="drawer-root"; wrap.dataset.prior="menu"; document.body.append(wrap); document.body.classList.add("no-scroll"); wrap.querySelector("button")?.focus();
}
function closeDrawer(){ document.querySelector("#drawer-root")?.remove(); document.body.classList.remove("no-scroll"); document.querySelector(".menu-button")?.focus(); }

function addCartLine(line){ state.cart.push({...line,id:crypto.randomUUID(),qty:1,owner:owner()}); save(); toast("Đã thêm vào giỏ."); render(); }
function validateCartForCheckout(){
  for(const line of state.cart){
    if(line.type==="builder"){
      for(const [id,qty] of Object.entries(line.builder?.items||{})){const p=state.admin.products.find(x=>x.id===id);if(qty>0&&(!p||p.status!=="published"||p.stock<qty*line.qty))return `Món trong “${line.name}” đã hết hoặc không còn bán. Hãy sửa lại hộp.`;}
      const pack=state.admin.packaging.find(x=>x.id===line.builder?.packaging&&x.active!==false),lines=Object.entries(line.builder?.items||{}).filter(([,qty])=>qty>0).map(([id,qty])=>({item:state.admin.products.find(x=>x.id===id),qty})).filter(x=>x.item);if(!pack)return `Hộp của “${line.name}” không còn khả dụng.`;if(!line.aiLayout?.configuration)return `“${line.name}” chưa chọn phương án xếp.`;const report=validatePackingConfiguration(line.aiLayout.configuration,pack,lines);if(!report.valid)return `Phương án xếp của “${line.name}” cần được tạo lại trước khi thanh toán.`;
      continue;
    }
    const p=state.admin.products.find(x=>x.id===line.sourceId); if(!p||p.status!=="published"||p.stock<line.qty)return `“${line.name}” không còn đủ hàng. Hãy quay lại giỏ để chọn lại.`;
    if(line.type==="curated") line.unitPrice=p.price;
    if(line.type==="custom"){const card=state.admin.cards.find(x=>x.id===line.custom?.card&&x.active!==false),ribbon=state.admin.ribbons.find(x=>x.id===line.custom?.ribbon&&x.active!==false);if(!card||!ribbon)return `Tùy chọn của “${line.name}” đã thay đổi. Hãy cá nhân hóa lại hộp.`;line.unitPrice=p.price+Number(card.price||0)+Number(ribbon.price||0);}
  }
  save(); return "";
}
function consumeInventory(lines){
  lines.forEach(line=>{
    if(line.type==="builder") Object.entries(line.builder?.items||{}).forEach(([id,qty])=>{const p=state.admin.products.find(x=>x.id===id);if(p)p.stock=Math.max(0,p.stock-qty*line.qty);});
    else {const p=state.admin.products.find(x=>x.id===line.sourceId);if(p)p.stock=Math.max(0,p.stock-line.qty);}
  });
  syncStorefront();
}
function resetBuilder(){ state.builder=structuredClone(DEFAULT_STATE.builder);clearPackingImage(); }
function saveDraft(){ if(!state.user){navigate(`/dang-nhap?returnTo=${encodeURIComponent('/tu-tao-hop')}`);return;} const t=builderTotals(),existing=state.drafts.find(d=>d.owner===owner()&&d.builder?.aiSessionId&&d.builder.aiSessionId===state.builder.aiSessionId); const record={id:existing?.id||crypto.randomUUID(),owner:owner(),name:state.builder.draftName||"Hộp chưa đặt tên",builder:structuredClone(state.builder),total:t.total+packingMaterialTotal(),updated:new Intl.DateTimeFormat("vi-VN").format(new Date()),needsReview:t.lines.some(l=>l.item.stock===0)}; if(existing)Object.assign(existing,record);else state.drafts.push(record); save(); toast(state.builder.aiLayoutId?"Đã lưu hộp và phương án xếp đã chọn.":"Đã lưu hộp vào tài khoản demo."); }

function handleAction(el){
  const a=el.dataset.action;
  if(a==="open-menu") return openMenu(); if(a==="close-drawer") return closeDrawer();
  if(a==="duplicate-product"){const p=state.admin.products.find(x=>x.id===el.dataset.id);if(!p)return;const copy=structuredClone(p),stamp=Date.now().toString().slice(-5);copy.id=crypto.randomUUID();copy.name=p.name+" · bản sao";copy.sku=`${p.sku}-C${stamp}`;copy.slug=`${p.slug}-ban-sao-${stamp}`;copy.status="draft";copy.images=structuredClone(p.images||[]).map(x=>({...x,id:crypto.randomUUID(),cover:false}));if(copy.images[0])copy.images[0].cover=true;state.admin.products.unshift(copy);audit("Nhân bản sản phẩm",copy.name);save();syncStorefront();toast("Đã tạo bản nháp sao chép.");return render();}
  if(a==="toggle-product"){const p=state.admin.products.find(x=>x.id===el.dataset.id);if(!p)return;p.status=p.status==="published"?"paused":"published";audit(p.status==="published"?"Đăng bán":"Tạm dừng",p.name);save();syncStorefront();return render();}
  if(a==="archive-product"){const p=state.admin.products.find(x=>x.id===el.dataset.id);if(!p)return;p.status="archived";audit("Lưu trữ sản phẩm",p.name);save();syncStorefront();toast("Đã lưu trữ; lịch sử đơn vẫn được giữ.");return render();}
  if(a==="toggle-option"){const list=state.admin[el.dataset.type],item=list?.find(x=>x.id===el.dataset.id);if(!item)return;item.active=item.active===false;audit(item.active?"Bật tùy chọn":"Ẩn tùy chọn",item.name);save();syncStorefront();return render();}
  if(a==="toggle-material3d"){const item=state.admin.materials3d.find(x=>x.id===el.dataset.id);if(!item)return;item.active=item.active===false;audit(item.active?"Bật vật liệu":"Ẩn vật liệu",item.name);save();return render();}
  if(a==="toggle-ai-reference"){const item=state.admin.aiReferences.find(x=>x.id===el.dataset.id);if(!item)return;item.active=item.active===false;audit(item.active?"Bật ảnh tham khảo":"Ẩn ảnh tham khảo",item.title);save();return render();}
  if(a==="delete-ai-reference"){const i=state.admin.aiReferences.findIndex(x=>x.id===el.dataset.id);if(i<0)return;const [item]=state.admin.aiReferences.splice(i,1);audit("Xóa ảnh tham khảo",item.title);save();toast("Đã xóa ảnh khỏi thư viện AI.");return render();}
  if(a==="toggle-staff"){const s=state.admin.staff.find(x=>x.email===el.dataset.email);if(!s||s.role==="owner")return;s.active=!s.active;audit(s.active?"Mở tài khoản":"Khóa tài khoản",s.email);save();return render();}
  if(["image-cover","image-left","image-right","image-remove"].includes(a)){const list=state.admin.uploads[el.dataset.key]||[],i=list.findIndex(x=>x.id===el.dataset.id);if(i<0)return;if(a==="image-remove")list.splice(i,1);if(a==="image-cover")list.forEach((x,n)=>x.cover=n===i);if(a==="image-left"&&i>0)[list[i-1],list[i]]=[list[i],list[i-1]];if(a==="image-right"&&i<list.length-1)[list[i+1],list[i]]=[list[i],list[i+1]];if(list.length&&!list.some(x=>x.cover))list[0].cover=true;save();return render();}
  if(a==="use-cover-model-photo"){const key=el.dataset.key,list=state.admin.uploads[key]||[],image=list.find(x=>x.cover)||list[0];if(!image)return toast("Chưa có ảnh bìa.");state.admin.modelPhotos[key]=image.data;save();toast("Đã dùng ảnh bìa làm mặt chính hướng lên.");return render();}
  if(a==="remove-model-photo"){state.admin.modelPhotos[el.dataset.key]="";save();toast("Đã bỏ ảnh mặt chính.");return render();}
  if(a==="product-preview"){const form=document.querySelector("#product-form"),fd=new FormData(form),name=String(fd.get("name")||"Sản phẩm chưa đặt tên"),price=Number(fd.get("price")||0);const wrap=document.createElement("div");wrap.id="drawer-root";wrap.innerHTML=`<div class="drawer-backdrop" data-action="close-drawer"></div><aside class="drawer" role="dialog" aria-modal="true"><div class="drawer-head"><strong>Xem trước sản phẩm</strong><button class="drawer-close" data-action="close-drawer">×</button></div><div style="margin-top:24px">${visual(name,"product-visual",state.admin.uploads[form.dataset.key]?.find(x=>x.cover)?.data||state.admin.uploads[form.dataset.key]?.[0]?.data)}<h2>${esc(name)}</h2><p class="price">${money(price)}</p><p>${esc(fd.get("short")||"")}</p><span class="status">Bản xem trước · chưa thay đổi cửa hàng</span></div></aside>`;document.body.append(wrap);document.body.classList.add("no-scroll");return;}
  if(a==="save-product") return saveProductFromForm(document.querySelector("#product-form"));
  if(a==="packing-slip"){const order=state.orders.find(o=>o.reference===el.dataset.id);if(order)return showPackingSlip(order);}
  if(a==="view-order-layout"){const order=state.orders.find(o=>o.reference===el.dataset.order),line=order?.lines.find(l=>l.id===el.dataset.line);if(order&&line?.aiLayout)return showSellerPackingLayout(order,line);}
  if(a==="clear-filters") return navigate("/hop-qua"); if(a==="toggle-filters") return document.querySelector("#filters")?.classList.toggle("open");
  if(a==="add-curated"){ const b=boxes.find(x=>x.id===el.dataset.id); return addCartLine({type:"curated",sourceId:b.id,name:b.name,unitPrice:b.price,summary:b.items.join(" · "),message:""}); }
  if(a==="customize"){ const b=boxes.find(x=>x.id===el.dataset.id); const target=`/hop-qua/${b.slug}?customize=1`; if(!state.user) return navigate(`/dang-nhap?returnTo=${encodeURIComponent(target)}`); return navigate(target); }
  if(a==="add-custom"){ const b=boxes.find(x=>x.id===el.dataset.id), p=state.personalize, total=b.price+cards.find(x=>x.id===p.card).price+ribbons.find(x=>x.id===p.ribbon).price; return addCartLine({type:"custom",sourceId:b.id,name:b.name+" · cá nhân hóa",unitPrice:total,summary:`${cards.find(x=>x.id===p.card).name} · ${ribbons.find(x=>x.id===p.ribbon).name}`,message:p.message,custom:structuredClone(p)}); }
  if(a==="finder-choice"){ const key=state.finder.step===1?"recipient":state.finder.step===2?"occasion":"budget"; state.finder[key]=el.dataset.value;state.finder.recommendations=[];state.finder.aiError="";aiFinderImages={}; save(); return render(); }
  if(a==="finder-next"){ state.finder.step++; save(); return render(); } if(a==="finder-step"){state.finder.step=Number(el.dataset.step);save();return render();}
  if(a==="finder-reset"){state.finder=structuredClone(DEFAULT_STATE.finder);aiFinderImages={};save();return render();} if(a==="finder-edit"){state.finder.step=1;state.finder.recommendations=[];aiFinderImages={};save();return render();} if(a==="finder-relax"){state.finder.budget="500–800K";state.finder.step=4;state.finder.recommendations=[];aiFinderImages={};save();return render();}
  if(a==="generate-gift-recommendations")return requestAiGiftRecommendations();
  if(a==="generate-gift-images")return requestAiGiftImages();
  if(a==="continue-return") return navigate(safeReturnTo(el.dataset.return)); if(a==="gate-builder") return navigate(`/dang-nhap?returnTo=${encodeURIComponent('/tu-tao-hop')}`);
  if(a==="builder-qty"){ const i=giftItems.find(x=>x.id===el.dataset.id), current=state.builder.items[i.id]||0, next=Math.max(0,Math.min(i.stock,current+Number(el.dataset.delta))); if(next===current&&Number(el.dataset.delta)>0) toast("Đã chạm số lượng tồn demo."); state.builder.items[i.id]=next;state.builder.aiLayouts=[];state.builder.aiLayoutId=null;state.builder.aiLayoutSignature="";clearPackingImage(); if(state.builder.packaging&&packaging.find(x=>x.id===state.builder.packaging).capacity<builderTotals().size){state.builder.packaging=null;toast("Các món mới không còn vừa hộp đã chọn. Vui lòng chọn lại hộp.");} save(); return render(); }
  if(a==="builder-next"){ const t=builderTotals(); if(state.builder.step===1&&!t.lines.length) return toast("Hãy chọn ít nhất một món."); if(state.builder.step===2&&!state.builder.packaging) return toast("Hãy chọn một hộp đủ dung lượng."); if(state.builder.step===4) return navigate("/tu-tao-hop/goi-y-ai"); state.builder.step=Math.min(4,state.builder.step+1);save();return render(); }
  if(a==="builder-back"){state.builder.step=Math.max(1,state.builder.step-1);save();return render();} if(a==="builder-step"){state.builder.step=Number(el.dataset.step);save();return render();}
  if(a==="open-ai-layouts") return navigate("/tu-tao-hop/goi-y-ai");
  if(a==="return-builder-step"){state.builder.step=Math.min(4,Math.max(1,Number(el.dataset.step)||4));save();return navigate("/tu-tao-hop");}
  if(a==="save-draft") return saveDraft();
  if(a==="select-ai-layout"){state.builder.aiLayoutId=el.dataset.id;save();return render();}
  if(a==="generate-ai-api")return requestAiPackingLayouts();
  if(a==="generate-ai-final-image")return requestAiPackingFinalImage();
  if(a==="regenerate-ai-layouts"){state.builder.aiSeed=Number(state.builder.aiSeed||1)+1;state.builder.aiLayouts=[];state.builder.aiLayoutId=null;state.builder.aiLayoutSignature="";state.builder.aiSource=null;state.builder.aiError="";clearPackingImage();save();toast("Đang chuẩn bị một phương án mới theo đúng kích thước.");return render();}
  if(a==="clear-ai-key"){aiSessionKey="";aiImageSessionKey="";toast("Đã xóa toàn bộ API key khỏi phiên trình duyệt.");return render();}
  if(a==="add-ai-builder-cart"){const t=builderTotals(),layout=(state.builder.aiLayouts||[]).find(x=>x.id===state.builder.aiLayoutId);if(!t.lines.length||!t.pack||!layout)return toast("Hãy chọn một phương án xếp.");const report=validatePackingConfiguration(layout.configuration,t.pack,t.lines);if(!report.valid)return toast(report.messages[0]||"Phương án chưa vượt qua kiểm tra kích thước.");const materialTotal=packingMaterialTotal();addCartLine({type:"builder",name:state.builder.draftName||"Hộp tự tạo",unitPrice:t.total+materialTotal,summary:`${t.lines.reduce((n,l)=>n+l.qty,0)} món · ${t.pack.name} · mẫu ${layout.name}`,message:state.builder.message,aiPreviewGenerated:!!aiPackingImage,aiImageMeta:aiPackingImageMeta?structuredClone(aiPackingImageMeta):null,aiLayout:structuredClone(layout),configuration3d:structuredClone(layout.configuration),builder:structuredClone(state.builder)});resetBuilder();save();return navigate("/gio-hang");}
  if(a==="cart-qty"){ const l=state.cart.find(x=>x.id===el.dataset.id); if(!l)return; l.qty=Math.max(1,l.qty+Number(el.dataset.delta));save();return render(); }
  if(a==="remove-line"){ const i=state.cart.findIndex(x=>x.id===el.dataset.id); if(i<0)return; state.lastRemoved={line:state.cart[i],index:i};state.cart.splice(i,1);save();render();return toast("Đã xóa hộp khỏi giỏ.","undo-remove"); }
  if(a==="undo-remove"&&state.lastRemoved){state.cart.splice(state.lastRemoved.index,0,state.lastRemoved.line);state.lastRemoved=null;save();return render();}
  if(a==="edit-line"){const l=state.cart.find(x=>x.id===el.dataset.id); if(l?.type==="builder"&&l.builder){state.builder=structuredClone(l.builder);clearPackingImage();state.cart=state.cart.filter(x=>x.id!==l.id);save();return navigate(state.builder.aiLayoutId?"/tu-tao-hop/goi-y-ai":"/tu-tao-hop");} const b=boxes.find(x=>x.id===l?.sourceId); if(b)return navigate(`/hop-qua/${b.slug}${l.type==='custom'?'?customize=1':''}`);}
  if(a==="apply-coupon"){const code=document.querySelector("#coupon")?.value.trim().toUpperCase(),out=document.querySelector("#coupon-result");out.textContent=code===String(state.admin.campaign||"").toUpperCase()?"Mã demo hợp lệ, nhưng chưa được trừ vì không có chương trình đã xác nhận.":"Mã không tồn tại hoặc không còn hiệu lực.";}
  if(a==="slot"){state.checkout.slot=el.dataset.value;save();return render();}
  if(a==="request-reschedule") return toast("Đã ghi nhận yêu cầu demo. Shop cần xem xét trước khi xác nhận.");
  if(a==="save-order-occasion"){ if(!state.user)return navigate(`/dang-nhap?returnTo=${encodeURIComponent(currentPath()+location.search)}`); return navigate("/dip-cua-toi?fromOrder="+encodeURIComponent(el.dataset.ref)); }
  if(a==="account-tab"){state.accountTab=el.dataset.tab;save();return render();}
  if(a==="logout"){state.user=null;resetBuilder();state.personalize=structuredClone(DEFAULT_STATE.personalize);state.accountTab="overview";save();toast("Đã đăng xuất và xóa ngữ cảnh riêng khỏi màn hình.");return navigate("/");}
  if(a==="open-draft"){const d=state.drafts.find(x=>x.id===el.dataset.id&&x.owner===owner());if(d){state.builder=structuredClone(d.builder);clearPackingImage();save();navigate(state.builder.aiLayoutId?"/tu-tao-hop/goi-y-ai":"/tu-tao-hop");}}
  if(a==="copy-draft"){const d=state.drafts.find(x=>x.id===el.dataset.id&&x.owner===owner());if(d){state.drafts.push({...structuredClone(d),id:crypto.randomUUID(),name:d.name+" · bản sao"});save();render();}}
  if(a==="delete-draft"){state.drafts=state.drafts.filter(x=>!(x.id===el.dataset.id&&x.owner===owner()));save();return render();}
  if(a==="toggle-reminder"){const o=state.occasions.find(x=>x.id===el.dataset.id&&x.owner===owner());if(!o)return;o.enabled=!o.enabled;if(o.enabled&&!o.consent){o.enabled=false;toast("Cần đồng ý nhận email trước khi bật nhắc.");}save();return render();}
  if(a==="delete-occasion"){state.occasions=state.occasions.filter(x=>!(x.id===el.dataset.id&&x.owner===owner()));save();return render();}
  if(a==="preview-reminder"){const o=state.occasions.find(x=>x.id===el.dataset.id&&x.owner===owner());if(!o)return; showEmailPreview(o);}
}

function showEmailPreview(o){
  const wrap=document.createElement("div");wrap.id="drawer-root";wrap.innerHTML=`<div class="drawer-backdrop" data-action="close-drawer"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="Xem trước email"><div class="drawer-head"><strong>Xem trước lời nhắc</strong><button class="drawer-close" data-action="close-drawer" aria-label="Đóng">×</button></div><div class="email-preview" style="margin-top:24px"><span class="eyebrow">BẢN XEM TRƯỚC · CHƯA GỬI</span><h2>Sắp đến ${esc(o.type.toLowerCase())} của ${esc(o.name)}</h2><p>Bạn đã chọn được nhắc trước ${o.before} ngày. Ngân sách dự kiến là ${money(o.budget)}.</p><a class="button" href="/hop-qua?occasion=${encodeURIComponent(o.type)}&max=${o.budget}" data-route>Xem quà phù hợp</a><p class="fine-print">Email này sẽ gửi cho người mua, không gửi cho người nhận quà.</p></div></aside>`;document.body.append(wrap);document.body.classList.add("no-scroll");wrap.querySelector("button")?.focus();
}

function showPackingSlip(order){
  const wrap=document.createElement("div");wrap.id="drawer-root";wrap.innerHTML=`<div class="drawer-backdrop" data-action="close-drawer"></div><aside class="drawer packing-slip" role="dialog" aria-modal="true" aria-label="Phiếu đóng gói"><div class="drawer-head"><strong>Phiếu đóng gói · ${esc(order.reference)}</strong><button class="drawer-close" data-action="close-drawer" aria-label="Đóng">×</button></div><div class="packing-content"><p><strong>Người nhận:</strong> ${esc(order.receiverName||"")} · ${esc(order.receiverPhone||"")}<br>${esc(order.address||"")}<br>${esc(order.date||"")} · ${esc(order.slot||"")}</p><h3>Danh sách cần đóng</h3>${order.lines.map(l=>`<div class="admin-list-row"><div><strong>${l.qty} × ${esc(l.name)}</strong><span>${esc(l.summary||"")}${l.aiLayout?`<br>Phương án: ${esc(l.aiLayout.name)} · ${l.aiLayout.configuration.instances.length} món · mặt chính hướng lên`:""}${l.message?`<br>Thiệp: “${esc(l.message)}”`:""}</span></div><span>☐</span></div>`).join("")}<p class="fine-print">Phiếu nội bộ không hiển thị giá. Kiểm tra ảnh chính, kích thước, chèn lót, thiệp và ruy băng trước khi bàn giao.</p><button class="button secondary" onclick="window.print()">In phiếu</button></div></aside>`;document.body.append(wrap);document.body.classList.add("no-scroll");wrap.querySelector("button")?.focus();
}

function showSellerPackingLayout(order,line){
  const layout=line.aiLayout,cfg=layout.configuration,box=line.builder?state.admin.packaging.find(x=>x.id===line.builder.packaging):cfg.boxSnapshot,sequence=[...cfg.instances].sort((a,b)=>a.z-b.z||a.x-b.x);
  const wrap=document.createElement("div");wrap.id="drawer-root";wrap.innerHTML=`<div class="drawer-backdrop" data-action="close-drawer"></div><aside class="drawer packing-layout-drawer" role="dialog" aria-modal="true" aria-label="Phương án xếp của đơn"><div class="drawer-head"><div><strong>${esc(order.reference)} · ${esc(line.name)}</strong><div class="fine-print">${esc(layout.name)} · mặt chính luôn hướng lên</div></div><button class="drawer-close" data-action="close-drawer" aria-label="Đóng">×</button></div><div class="seller-layout-grid"><div>${aiLayoutPreview(layout,box||cfg.boxSnapshot)}</div><div><h3>Thứ tự đóng gói gợi ý</h3>${sequence.map((x,i)=>`<div class="packing-sequence"><b>${i+1}</b><span>${esc(x.name)}<small>Vị trí ${Math.round(x.x)} · ${Math.round(x.z)} mm · mặt chính ↑</small></span></div>`).join("")}<h3>Chèn lót</h3><p class="small muted">${(state.admin.materials3d||[]).filter(m=>cfg.materials?.[m.id]).map(m=>m.name).join(" · ")||"Không chọn"}</p><p class="fine-print">Kiểm tra sản phẩm thật trước khi đóng và giữ đúng mặt chính hướng lên trên.</p></div></div></aside>`;document.body.append(wrap);document.body.classList.add("no-scroll");wrap.querySelector("button")?.focus();
}

function handleProductImages(input){
  const form=input.closest("#product-form"),key=form.dataset.key,status=document.querySelector("#upload-status"),existing=state.admin.uploads[key]||[],files=[...input.files];
  if(existing.length+files.length>8){status.textContent="Tối đa 8 ảnh cho một sản phẩm.";return;}
  const invalid=files.find(f=>!["image/jpeg","image/png","image/webp"].includes(f.type)||f.size>5*1024*1024); if(invalid){status.textContent=`${invalid.name}: chỉ nhận JPG/PNG/WebP tối đa 5MB.`;return;}
  status.textContent=`Đang đọc ${files.length} tệp…`;
  Promise.all(files.map(f=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve({id:crypto.randomUUID(),name:f.name,data:reader.result,alt:"",cover:false});reader.onerror=reject;reader.readAsDataURL(f);}))).then(images=>{existing.push(...images);if(existing.length&&!existing.some(x=>x.cover))existing[0].cover=true;state.admin.uploads[key]=existing;if(!save()){existing.splice(existing.length-images.length,images.length);status.textContent="Bộ nhớ trình duyệt không đủ. Hãy thử ảnh nhỏ hơn hoặc xóa bớt ảnh.";return;}status.textContent="Tải ảnh vào bản demo thành công.";render();}).catch(()=>{status.textContent="Không đọc được tệp. Hãy chọn lại.";});
}

function compressModelPhoto(file){
  return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onerror=reject;reader.onload=()=>{const image=new Image();image.onerror=reject;image.onload=()=>{const maxSide=900,scale=Math.min(1,maxSide/Math.max(image.naturalWidth,image.naturalHeight)),canvas=document.createElement("canvas");canvas.width=Math.max(1,Math.round(image.naturalWidth*scale));canvas.height=Math.max(1,Math.round(image.naturalHeight*scale));const ctx=canvas.getContext("2d");ctx.fillStyle="#f4f0e8";ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);resolve(canvas.toDataURL("image/webp",.82));};image.src=reader.result;};reader.readAsDataURL(file);});
}

async function saveAiReferences(form){
  if(!canAdmin("library"))return toast("Bạn không có quyền sửa thư viện AI.");
  const status=document.querySelector("#reference-upload-status"),fd=new FormData(form),files=[...(form.querySelector("#ai-reference-images")?.files||[])];
  if(!files.length)return toast("Hãy chọn ít nhất một hình ảnh.");
  const invalid=files.find(file=>!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>5*1024*1024);if(invalid)return toast(`${invalid.name}: chỉ nhận JPG/PNG/WebP tối đa 5MB.`);
  if((state.admin.aiReferences||[]).length+files.length>300)return toast("Thư viện demo giới hạn 300 ảnh.");
  if(status)status.textContent=`Đang tối ưu ${files.length} ảnh…`;
  try{
    const images=await Promise.all(files.map(compressModelPhoto)),title=String(fd.get("title")||"Mẫu tham khảo").trim();
    images.forEach((data,index)=>state.admin.aiReferences.unshift({id:crypto.randomUUID(),title:files.length>1?`${title} ${index+1}`:title,name:files[index].name,data,occasion:String(fd.get("occasion")||"Khác"),style:String(fd.get("style")||""),itemCount:Number(fd.get("itemCount")||1),boxShape:String(fd.get("boxShape")||"Khác"),notes:String(fd.get("notes")||""),active:true,createdAt:new Date().toISOString()}));
    audit("Thêm ảnh tham khảo",`${title}: ${files.length} ảnh`);if(!save())throw new Error("Bộ nhớ trình duyệt không đủ. Hãy dùng ảnh nhỏ hơn hoặc xóa bớt mẫu.");toast(`Đã thêm ${files.length} ảnh vào thư viện AI.`);render();
  }catch(error){if(status)status.textContent=String(error?.message||"Không đọc được ảnh. Hãy thử lại.");toast(String(error?.message||"Không thêm được ảnh."));}
}

function handleModelPhoto(input){
  const form=input.closest("#product-form"),key=form?.dataset.key,status=document.querySelector("#model-photo-status"),file=input.files?.[0];if(!form||!file)return;
  if(!["image/jpeg","image/png","image/webp"].includes(file.type)||file.size>5*1024*1024){if(status)status.textContent="Chỉ nhận JPG, PNG hoặc WebP tối đa 5MB.";input.value="";return;}
  if(status)status.textContent="Đang tối ưu ảnh mặt chính…";
  compressModelPhoto(file).then(data=>{state.admin.modelPhotos[key]=data;if(!save()){delete state.admin.modelPhotos[key];if(status)status.textContent="Bộ nhớ trình duyệt không đủ. Hãy chọn ảnh nhỏ hơn.";return;}render();toast("Đã lưu ảnh mặt chính hướng lên.");}).catch(()=>{if(status)status.textContent="Không đọc được ảnh. Hãy chụp hoặc chọn lại.";});
}

function mountModelPhotoBuilder(){
  const form=document.querySelector("#product-form"),preview=form?.querySelector(".model3d-preview"),shapeNode=preview?.querySelector(".simple-model");if(!form||!preview||!shapeNode)return;
  const key=form.dataset.key,photo=state.admin.modelPhotos[key]||"",details=preview.children[1];shapeNode.id="model3d-live-shape";shapeNode.classList.toggle("has-photo",!!photo);shapeNode.innerHTML=photo?`<img src="${esc(photo)}" alt="Ảnh mặt chính luôn hướng lên">`:`<span>${form.elements.modelShape.value==="cylinder"?"Hình trụ":"Khối hộp"}</span>`;
  if(!details.querySelector("#model-photo-controls"))details.insertAdjacentHTML("afterbegin",`<div id="model-photo-controls" class="model-photo-controls"><strong>Ảnh mặt chính của sản phẩm</strong><p id="model-photo-status" class="fine-print">${photo?"Ảnh này sẽ luôn hướng lên trên trong mọi phương án.":"Chụp hoặc chọn một ảnh nhìn rõ mặt chính."}</p><div class="row wrap"><label class="button secondary small-btn file-button">Chụp / tải ảnh chính<input id="product-model-photo" type="file" accept="image/jpeg,image/png,image/webp" capture="environment" hidden></label>${(state.admin.uploads[key]||[]).length?`<button type="button" class="link small" data-action="use-cover-model-photo" data-key="${key}">Dùng ảnh bìa</button>`:""}${photo?`<button type="button" class="link small danger-text" data-action="remove-model-photo" data-key="${key}">Bỏ ảnh chính</button>`:""}</div></div>`);
  const labels=[["modelLength","Chiều ngang (mm)"],["modelWidth","Chiều sâu (mm)"],["modelHeight","Chiều cao (mm)"]];labels.forEach(([name,text])=>{const label=form.elements[name]?.closest(".field")?.querySelector("label");if(label)label.textContent=text;});
  const refresh=()=>{const shape=form.elements.modelShape.value,length=Number(form.elements.modelLength.value||1),width=Number(form.elements.modelWidth.value||1),height=Number(form.elements.modelHeight.value||1),weight=Number(form.elements.modelWeight.value||0);shapeNode.classList.toggle("cylinder",shape==="cylinder");shapeNode.style.setProperty("--model-ratio",String(Math.max(.65,Math.min(1.55,length/Math.max(1,height)))));if(!photo)shapeNode.innerHTML=`<span>${shape==="cylinder"?"Hình trụ":"Khối hộp"}</span>`;const sizeText=details.querySelector("p.small.muted");if(sizeText)sizeText.textContent=`${length} × ${width} × ${height} mm · ${weight} g`;};
  ["modelShape","modelLength","modelWidth","modelHeight","modelWeight"].forEach(name=>form.elements[name]?.addEventListener(name==="modelShape"?"change":"input",refresh));refresh();
  const photoInput=form.querySelector("#product-model-photo");if(photoInput)photoInput.onchange=()=>handleModelPhoto(photoInput);
}

function bindPageSpecific(){
  const sort=document.querySelector("#sort-select"); if(sort) sort.onchange=()=>{const u=new URL(location.href);u.searchParams.set("sort",sort.value);navigate(u.pathname+u.search)};
  document.querySelectorAll('#filters input[type="radio"]').forEach(i=>i.onchange=()=>{const u=new URL(location.href);u.searchParams.set(i.name,i.value);navigate(u.pathname+u.search)});
  document.querySelectorAll('input[name="package"]').forEach(i=>i.onchange=()=>{state.builder.packaging=i.value;state.builder.aiLayouts=[];state.builder.aiLayoutId=null;state.builder.aiLayoutSignature="";clearPackingImage();save();render();});
  document.querySelectorAll('[data-builder-material]').forEach(input=>input.onchange=()=>{
    state.builder.materials=state.builder.materials||{};
    state.builder.materials[input.dataset.builderMaterial]=input.checked;
    state.builder.aiLayouts=[];state.builder.aiLayoutId=null;state.builder.aiLayoutSignature="";clearPackingImage();
    save();render();
  });
  const bind=(id,key,event="input")=>{const n=document.querySelector(id);if(n)n.addEventListener(event,()=>{state.builder[key]=n.type==="checkbox"?n.checked:n.value;if(["#b-card","#b-ribbon"].includes(id))clearPackingImage();save();if(["#b-card","#b-ribbon","#b-anonymous"].includes(id))render();});};
  bind("#builder-budget","budget","change");bind("#b-card","card","change");bind("#b-ribbon","ribbon","change");bind("#b-recipient","recipient");bind("#b-sender","sender");bind("#b-anonymous","anonymous","change");bind("#b-message","message");bind("#draft-name","draftName");
  const pCard=document.querySelector("#p-card"),pRibbon=document.querySelector("#p-ribbon"),pMsg=document.querySelector("#p-message"),pRec=document.querySelector("#p-recipient"),pAnon=document.querySelector("#p-anonymous");
  if(pCard)pCard.onchange=()=>{state.personalize.card=pCard.value;save();render();}; if(pRibbon)pRibbon.onchange=()=>{state.personalize.ribbon=pRibbon.value;save();render();};
  if(pMsg)pMsg.oninput=()=>{state.personalize.message=pMsg.value;save();document.querySelector("#p-count").textContent=pMsg.value.length;document.querySelector("#card-preview").textContent=pMsg.value||"Lời chúc của bạn sẽ hiện ở đây.";}; if(pRec)pRec.oninput=()=>{state.personalize.recipient=pRec.value;save();}; if(pAnon)pAnon.onchange=()=>{state.personalize.anonymous=pAnon.checked;save();};
  const same=document.querySelector("#same-receiver"); if(same)same.onchange=()=>{state.checkout.same=same.checked;if(same.checked){state.checkout.receiverName=document.querySelector("#buyerName").value;state.checkout.receiverPhone=document.querySelector("#buyerPhone").value;}save();render();};
  document.querySelectorAll("#checkout-form [name]").forEach(i=>{
    const eventName=(i.type==="radio"||i.type==="checkbox"||i.tagName==="SELECT")?"change":"input";
    i.addEventListener(eventName,()=>{
      if(i.type==="radio"&&!i.checked) return;
      state.checkout[i.name]=i.type==="checkbox"?i.checked:i.value;
      save();
    });
  });
  const imageInput=document.querySelector("#product-images"); if(imageInput) imageInput.onchange=()=>handleProductImages(imageInput);mountModelPhotoBuilder();
  document.querySelectorAll("[data-image-alt]").forEach(input=>input.oninput=()=>{const image=(state.admin.uploads[input.dataset.key]||[]).find(x=>x.id===input.dataset.imageAlt);if(image){image.alt=input.value;save();}});
}

document.addEventListener("click",e=>{
  const route=e.target.closest("a[data-route]"); if(route&&route.origin===location.origin){e.preventDefault();closeDrawer();navigate(route.pathname+route.search+route.hash);return;}
  const action=e.target.closest("[data-action]"); if(action){e.preventDefault();handleAction(action);}
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDrawer();});
window.addEventListener("popstate",render);

function saveProductFromForm(form){
  if(!canAdmin("products")) return toast("Bạn không có quyền sửa sản phẩm.");
  const fd=new FormData(form),id=String(fd.get("id")||""),name=String(fd.get("name")||"").trim(),sku=String(fd.get("sku")||"").trim().toUpperCase(),slug=String(fd.get("slug")||"").trim().toLowerCase(),price=Number(fd.get("price")),cost=Number(fd.get("cost")),stock=Number(fd.get("stock")),threshold=Number(fd.get("threshold")),err=document.querySelector("#product-error");
  const duplicate=state.admin.products.find(p=>p.id!==id&&(String(p.sku).toLowerCase()===sku.toLowerCase()||String(p.slug).toLowerCase()===slug));
  if(!name||!sku||!slug||!String(fd.get("short")||"").trim()){err.textContent="Hãy điền tên, SKU, slug và mô tả ngắn.";return;}
  if(!/^[a-z0-9-]+$/.test(slug)){err.textContent="Slug chỉ gồm chữ thường không dấu, số và dấu gạch ngang.";return;}
  if([price,cost,stock,threshold].some(n=>!Number.isFinite(n)||n<0)){err.textContent="Giá và số lượng không được âm.";return;}
  if(duplicate){err.textContent=`SKU hoặc slug đang trùng với “${duplicate.name}”.`;return;}
  const categories=String(fd.get("categories")||"").split(",").map(x=>x.trim()).filter(Boolean),tags=String(fd.get("tags")||"").split(",").map(x=>x.trim()).filter(Boolean),recipients=String(fd.get("recipients")||"").split(",").map(x=>x.trim()).filter(Boolean),items=String(fd.get("items")||"").split(/\r?\n/).map(x=>x.trim()).filter(Boolean),kind=String(fd.get("kind"));
  const prior=state.admin.products.find(p=>p.id===id)?.model3d||{},textureData=state.admin.modelPhotos[form.dataset.key]||"";
  const model3d={...prior,sourceType:textureData?"photo-dimensions":"dimensions",sourceName:textureData?"Ảnh chính và kích thước thật":"Kích thước đóng gói",fileName:"",textureData,shape:String(fd.get("modelShape")||"box"),length:Number(fd.get("modelLength")||100),width:Number(fd.get("modelWidth")||70),height:Number(fd.get("modelHeight")||45),weight:Number(fd.get("modelWeight")||120),padding:Number(fd.get("modelPadding")||0),collider:String(fd.get("modelCollider")||"box"),maxLoad:Number(fd.get("modelMaxLoad")||0),upright:false,fragile:fd.get("modelFragile")==="on",compressible:fd.get("modelCompressible")==="on",canSupport:fd.get("modelCanSupport")==="on",stackable:true,allowedRotations:"y",primaryFace:"top",labelFacing:"up",modelStatus:fd.get("modelChecked")==="on"?"checked":"draft",modelVersion:`dimensions-${Date.now()}`,colliderVersion:`${String(fd.get("modelCollider")||"box")}-1`,color:prior.color||"#a98372"};
  if([model3d.length,model3d.width,model3d.height,model3d.weight].some(n=>!Number.isFinite(n)||n<=0)){err.textContent="Kích thước và khối lượng đóng gói phải lớn hơn 0.";return;}
  const product={id:id||crypto.randomUUID(),kind,name,sku,slug,short:String(fd.get("short")),long:String(fd.get("long")||""),categories,tags,price,cost,stock,threshold,lead:Number(fd.get("lead")||1),status:String(fd.get("status")),size:Number(fd.get("size")||1),capacity:Number(fd.get("size")||1),builderEnabled:fd.get("builderEnabled")==="on",items,style:String(fd.get("style")||tags[0]||"Ấm áp"),recipients:recipients.length?recipients:["Bạn thân"],occasions:categories.length?categories:["Sinh nhật"],meaning:String(fd.get("short")),category:categories[0]||"Món thêm",images:structuredClone(state.admin.uploads[form.dataset.key]||[]),model3d,updatedAt:new Date().toISOString()};
  const index=state.admin.products.findIndex(p=>p.id===id);if(index>=0)state.admin.products[index]={...state.admin.products[index],...product};else state.admin.products.unshift(product);
  delete state.admin.uploads[form.dataset.key];delete state.admin.modelPhotos[form.dataset.key];audit(index>=0?"Cập nhật sản phẩm":"Tạo sản phẩm",name);save();syncStorefront();toast(index>=0?"Đã cập nhật sản phẩm.":"Đã tạo sản phẩm.");navigate("/quan-tri/san-pham");
}

document.addEventListener("submit",e=>{
  if(e.target.id==="auth-form"){e.preventDefault();const fd=new FormData(e.target),mode=q("mode")||"login",email=String(fd.get("email")||"").trim().toLowerCase(),err=document.querySelector("#auth-error");if(mode==="forgot"){err.textContent="Đây là demo: chưa gửi email. Hãy dùng mật khẩu goithuong để tiếp tục.";return;}if(fd.get("password")!=="goithuong"){err.textContent="Mật khẩu demo chưa đúng. Hãy nhập goithuong.";return;}const staff=state.admin.staff.find(x=>x.email===email);if(mode==="register"&&(ADMIN_ROLES[email]||staff)){err.textContent="Email này dành cho tài khoản nội bộ và không thể đăng ký công khai.";return;}const admin=mode==="register"?null:(staff&&["owner","product","orders"].includes(staff.role)?{role:staff.role,name:staff.name}:ADMIN_ROLES[email]);if(admin&&staff?.active===false){err.textContent="Tài khoản nội bộ này đang bị tạm khóa.";return;}state.user={email,name:String(fd.get("name")||admin?.name||email.split("@")[0]),role:admin?.role||"customer"};state.cart.forEach(l=>{if(l.owner==="guest")l.owner=email;});save();toast("Đăng nhập demo thành công.");const ret=safeReturnTo(e.target.dataset.return);navigate(isSeller()&&ret==="/tai-khoan"?"/quan-tri":ret);}
  if(e.target.id==="product-filter-form"||e.target.id==="order-filter-form"){e.preventDefault();const fd=new FormData(e.target),params=new URLSearchParams();for(const [k,v] of fd)if(String(v))params.set(k,String(v));navigate(currentPath()+"?"+params);}
  if(e.target.id==="product-form"){e.preventDefault();saveProductFromForm(e.target);}
  if(e.target.id==="ai-reference-form"){e.preventDefault();saveAiReferences(e.target);}
  if(e.target.classList.contains("inventory-form")){e.preventDefault();if(!canAdmin("inventory"))return;const fd=new FormData(e.target),p=state.admin.products.find(x=>x.id===fd.get("id")),delta=Number(fd.get("delta")),reason=String(fd.get("reason")||"").trim();if(!p||!Number.isInteger(delta)||!delta||!reason)return toast("Nhập số lượng nguyên khác 0 và lý do.");if(p.stock+delta<0)return toast("Số lượng sau điều chỉnh không thể âm.");p.stock+=delta;state.admin.inventoryLog.unshift({id:crypto.randomUUID(),product:p.name,productId:p.id,delta,reason,by:state.user.email,at:new Date().toISOString()});audit("Điều chỉnh tồn kho",`${p.name}: ${delta>0?"+":""}${delta}`);save();syncStorefront();toast("Đã cập nhật tồn kho và cửa hàng.");render();}
  if(e.target.classList.contains("option-form")){e.preventDefault();if(!canAdmin("options"))return;const fd=new FormData(e.target),type=e.target.dataset.type,name=String(fd.get("name")||"").trim(),price=Number(fd.get("price")),capacity=Number(fd.get("capacity")||0);if(!name||price<0)return toast("Tên và giá tùy chọn chưa hợp lệ.");const item={id:`${type}-${Date.now()}`,name,price,active:true};if(type==="packaging"){Object.assign(item,{capacity:capacity||5,color:"Tùy chỉnh",innerLength:Number(fd.get("innerLength")),innerWidth:Number(fd.get("innerWidth")),innerHeight:Number(fd.get("innerHeight")),maxWeight:Number(fd.get("maxWeight")),wall:4,bottom:4,lidClearance:7,lidType:"Nắp rời"});if([item.innerLength,item.innerWidth,item.innerHeight,item.maxWeight].some(n=>!Number.isFinite(n)||n<=0))return toast("Hãy nhập đủ kích thước lòng hộp và tải trọng.");}state.admin[type].push(item);audit("Thêm tùy chọn",name);save();syncStorefront();render();}
  if(e.target.id==="order-status-form"){e.preventDefault();if(!canAdmin("orders"))return;const fd=new FormData(e.target),order=state.orders.find(o=>o.reference===fd.get("reference")),next=String(fd.get("status")),allowed={"Chờ thanh toán":["Đã tiếp nhận","Đã hủy"],"Đã tiếp nhận":["Đang chuẩn bị","Đã hủy"],"Đang chuẩn bị":["Sẵn sàng giao","Đã hủy"],"Sẵn sàng giao":["Đang giao","Đã hủy"],"Đang giao":["Đã giao"],"Đã giao":[],"Đã hủy":[]};if(!order)return;if(next!==order.status&&!(allowed[order.status]||[]).includes(next))return toast(`Không thể chuyển trực tiếp từ “${order.status}” sang “${next}”.`);order.status=next;order.internalNote=String(fd.get("internalNote")||"");audit("Cập nhật đơn",`${order.reference}: ${next}`);save();toast("Đã cập nhật trạng thái đơn.");render();}
  if(e.target.id==="delivery-form"){e.preventDefault();if(!canAdmin("delivery"))return;const fd=new FormData(e.target),d=state.admin.delivery;d.zone=String(fd.get("zone"));d.fee=Number(fd.get("fee"));d.capacity=Number(fd.get("capacity"));d.holidays=String(fd.get("holidays")||"");d.slots=d.slots.map((s,i)=>({...s,label:String(fd.get(`slotLabel${i}`)),active:fd.get(`slotActive${i}`)==="on",full:fd.get(`slotFull${i}`)==="on"}));audit("Cập nhật giao hàng",`${d.zone} · ${money(d.fee)}`);save();toast("Checkout đã nhận cấu hình giao hàng mới.");render();}
  if(e.target.id==="settings-form"){e.preventDefault();if(!canAdmin("settings"))return;const fd=new FormData(e.target);state.admin.banner=String(fd.get("banner")||"");state.admin.campaign=String(fd.get("campaign")||"");state.admin.reminderDays=Number(fd.get("reminderDays")||7);audit("Cập nhật cài đặt","Nội dung cửa hàng và nhắc dịp");save();toast("Đã lưu cài đặt.");render();}
  if(e.target.id==="ai-settings-form"){
    e.preventDefault();
    if(!canAdmin("settings"))return;
    const fd=new FormData(e.target);
    const key=String(fd.get("apiKey")||"").trim();
    const imageKey=String(fd.get("imageApiKey")||"").trim();
    const imageProvider=String(fd.get("imageProvider")||"cloudflare");
    const endpoint=String(fd.get("endpoint")||"").trim();
    const model=String(fd.get("model")||"").trim();
    const temperature=parseFloat(fd.get("temperature"))||0.15;
    const textModelPrompt=String(fd.get("textModelPrompt")||"").trim();
    const repairPrompt=String(fd.get("repairPrompt")||"").trim();
    const imageEndpoint=String(fd.get("imageEndpoint")||"").trim();
    const imageModel=String(fd.get("imageModel")||"").trim();
    const imagePrompt=String(fd.get("imagePrompt")||"").trim();
    const imageSize=String(fd.get("imageSize")||"1024x768");
    const recommendationPrompt=String(fd.get("recommendationPrompt")||"").trim();
    const enabled=fd.get("enabled")==="on";

    if((endpoint&&!model)||(!endpoint&&model)) return toast("Endpoint và Model của Text Model phải được nhập cùng nhau.");
    if((imageEndpoint&&!imageModel)||(!imageEndpoint&&imageModel)) return toast("Worker endpoint và Model ảnh phải được nhập cùng nhau.");

    state.admin.ai = {
      ...state.admin.ai,
      enabled,
      endpoint,
      model,
      temperature,
      textModelPrompt: textModelPrompt || TEXT_MODEL_PACKING_PROMPT,
      repairPrompt: repairPrompt || TEXT_MODEL_REPAIR_PROMPT,
      packingPrompt: textModelPrompt || TEXT_MODEL_PACKING_PROMPT,
      imageProvider,
      imageEndpoint: imageEndpoint || "https://goithuong-ai-image.nguyentriquan1805.workers.dev/",
      imageModel: imageModel || "@cf/black-forest-labs/flux-2-klein-4b",
      imageSize,
      imagePrompt: imagePrompt || DEFAULT_AI_IMAGE_PROMPT,
      recommendationPrompt: recommendationPrompt || DEFAULT_AI_RECOMMENDATION_PROMPT
    };

    if(key) aiSessionKey = key;
    if(imageKey) aiImageSessionKey = imageKey;

    // Secure audit - never logs keys
    audit("Cập nhật trung tâm AI", `Text: ${model || "cục bộ"} · Ảnh: ${imageModel || "FLUX"} · ${enabled ? "bật" : "tắt"}`);
    save();

    const keyNotices = [];
    if(aiSessionKey) keyNotices.push("Text Model Key");
    if(aiImageSessionKey) keyNotices.push("FLUX Secret Key");
    toast(keyNotices.length ? `Đã lưu cấu hình. Đang giữ ${keyNotices.join(" và ")} trong phiên duyệt (RAM).` : "Đã lưu cấu hình AI. Hãy nhập API key khi cần kích hoạt.");
    render();
  }
  if(e.target.id==="staff-form"){e.preventDefault();if(!canAdmin("settings"))return;const fd=new FormData(e.target),email=String(fd.get("email")||"").trim().toLowerCase();if(state.admin.staff.some(s=>s.email===email))return toast("Email này đã có trong danh sách nhân sự.");state.admin.staff.push({email,name:String(fd.get("name")),role:String(fd.get("role")),active:true});ADMIN_ROLES[email]={role:String(fd.get("role")),name:String(fd.get("name"))};audit("Cấp quyền nhân sự",email);save();render();}
  if(e.target.id==="checkout-form"){e.preventDefault();const fd=new FormData(e.target),address=String(fd.get("address")||""),cartError=validateCartForCheckout();if(cartError){document.querySelector("#checkout-error").textContent=cartError;return;}if(!state.checkout.slot){document.querySelector("#checkout-error").textContent="Hãy chọn một khung giao còn chỗ.";return;}if(/hà nội|đà nẵng|cần thơ/i.test(address)){document.querySelector("#checkout-error").textContent=`Địa chỉ nằm ngoài vùng ${state.admin.delivery.zone} đang cấu hình. Vui lòng liên hệ hỗ trợ.`;return;}const btn=document.querySelector("#place-order");btn.disabled=true;btn.textContent="Đang kiểm tra…";const pay=String(fd.get("payment")||"success");state.checkout={...state.checkout,...Object.fromEntries(fd),slot:state.checkout.slot,payment:pay};save();setTimeout(()=>{if(pay==="failed"){document.querySelector("#checkout-error").textContent="Thanh toán thử nghiệm thất bại. Không có đơn hoặc khoản thu nào được tạo.";btn.disabled=false;btn.textContent="Thử đặt đơn lại";return;}const reference="GT-"+Math.random().toString(36).slice(2,8).toUpperCase(),token=crypto.randomUUID(),total=cartSubtotal()+Number(state.admin.delivery.fee||0),order={reference,token,owner:owner(),lines:structuredClone(state.cart),buyerName:state.checkout.buyerName,buyerEmail:state.checkout.buyerEmail,buyerPhone:state.checkout.buyerPhone,receiverName:state.checkout.receiverName,receiverPhone:state.checkout.receiverPhone,address:state.checkout.address,note:state.checkout.note,date:state.checkout.date,slot:state.checkout.slot,deliveryFee:Number(state.admin.delivery.fee||0),total,payment:pay,status:pay==="pending"?"Chờ thanh toán":"Đã tiếp nhận",paymentLabel:pay==="pending"?"Thanh toán đang chờ":"Thanh toán thử nghiệm thành công",internalNote:"",createdAt:new Date().toISOString()};state.orders.push(order);consumeInventory(order.lines);audit("Tạo đơn mới",reference);state.cart=[];save();navigate(`/xac-nhan-don/${reference}?token=${token}`);},700);}
  if(e.target.id==="tracking-form"){e.preventDefault();const fd=new FormData(e.target),ref=String(fd.get("reference")||"").trim(),token=String(fd.get("token")||"").trim(),order=state.orders.find(o=>o.reference===ref&&o.token===token);if(!order){document.querySelector("#tracking-error").textContent="Không tìm thấy đơn với mã và token này.";return;}navigate(`/theo-doi-don?reference=${encodeURIComponent(ref)}&token=${encodeURIComponent(token)}`);}
  if(e.target.id==="occasion-form"){e.preventDefault();const fd=new FormData(e.target);state.occasions.push({id:crypto.randomUUID(),owner:owner(),name:String(fd.get("name")),relation:String(fd.get("relation")),type:String(fd.get("type")),date:String(fd.get("date")),budget:Number(fd.get("budget")),before:Number(fd.get("before")),email:String(fd.get("email")),note:String(fd.get("note")),annual:fd.get("annual")==="on",consent:fd.get("consent")==="on",enabled:fd.get("consent")==="on"});save();toast("Đã lưu dịp. Email chưa được gửi trong demo.");render();}
});

render();
