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

const giftItems = [
  ["candle-ivory","GT-I01","Nến linen nhỏ 80g","Nến",129000,2,12,1],
  ["candle-rose","GT-I02","Nến hoa hồng 120g","Nến",169000,3,8,1],
  ["candle-engraved","GT-I03","Nến khắc tên 120g","Nến",229000,3,5,4],
  ["tea-oolong","GT-I04","Trà ô long 50g","Trà",99000,1,14,1],
  ["tea-jasmine","GT-I05","Trà lài 50g","Trà",109000,1,11,1],
  ["tea-mint","GT-I06","Trà bạc hà 6 gói","Trà",69000,1,16,1],
  ["choco-dark","GT-I07","Socola đen 70g","Socola",89000,1,18,1],
  ["choco-almond","GT-I08","Socola hạnh nhân 90g","Socola",119000,1,7,1],
  ["choco-orange","GT-I09","Socola cam 70g","Socola",99000,1,0,1],
  ["flower-dry","GT-I10","Hoa khô trang trí","Trang trí",59000,1,20,1],
  ["notebook","GT-I11","Sổ vải nhỏ","Món thêm",139000,2,9,1],
  ["bath-salt","GT-I12","Muối tắm 150g","Self-care",119000,2,10,1],
  ["honey","GT-I13","Mật ong nhỏ 100ml","Món thêm",89000,1,6,1],
  ["jam","GT-I14","Mứt cam 100g","Món thêm",99000,1,5,1],
].map(([id,sku,name,category,price,size,stock,lead])=>({id,sku,name,category,price,size,stock,lead}));

const packaging = [
  {id:"small",name:"Hộp nhỏ",capacity:5,price:39000,color:"Kem giấy"},
  {id:"medium",name:"Hộp vừa",capacity:8,price:59000,color:"Kem giấy"},
  {id:"large",name:"Hộp lớn",capacity:12,price:89000,color:"Đỏ rượu"},
];
const cards = [
  {id:"simple",name:"Thiệp kem tối giản",price:0},
  {id:"blush",name:"Thiệp hồng phấn",price:19000},
  {id:"botanical",name:"Thiệp hoa ép",price:39000},
  {id:"photo",name:"Thiệp ảnh minh họa",price:49000},
];
const ribbons = [
  {id:"wine",name:"Ruy băng đỏ rượu",price:0},
  {id:"blush",name:"Ruy băng hồng trầm",price:10000},
  {id:"sage",name:"Dây vải sage",price:15000},
];

const DEFAULT_STATE = {
  user: null,
  cart: [],
  drafts: [],
  occasions: [],
  orders: [],
  finder: {step:1, recipient:null, occasion:null, budget:null},
  builder: {step:1, items:{}, budget:600000, packaging:null, card:"simple", ribbon:"wine", recipient:"", sender:"", anonymous:false, message:"", draftName:"Hộp quà của mình"},
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
function save(){ localStorage.setItem("goiThuongState", JSON.stringify(state)); }
const money = n => new Intl.NumberFormat("vi-VN").format(Math.round(n||0)) + " ₫";
const esc = s => String(s??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
const q = (k) => new URL(location.href).searchParams.get(k);
const owner = () => state.user?.email || "guest";
const byOwner = xs => xs.filter(x=>x.owner===owner());
const cartCount = () => state.cart.reduce((n,l)=>n+(l.qty||1),0);
const cartSubtotal = () => state.cart.reduce((n,l)=>n+l.unitPrice*(l.qty||1),0);
const safeReturnTo = value => value && value.startsWith("/") && !value.startsWith("//") && !value.includes("\\") ? value : "/tai-khoan";
const currentPath = () => location.pathname.replace(/\/+$/,"") || "/";

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

function shell(content){
  const p=currentPath();
  const nav=[
    ["/hop-qua","Hộp quà có sẵn"],["/tim-qua","Tìm quà nhanh"],["/tu-tao-hop","Tự tạo hộp"],["/dip-cua-toi","Nhắc dịp"],["/ve-chung-toi","Về Gói Thương"]
  ];
  return `
    <div class="top-strip"><div class="container">Giao trong vùng phục vụ tại TP.HCM <span>·</span> <a href="/chinh-sach-giao-hang" data-route>Chọn lịch giao phù hợp</a></div></div>
    <header class="site-header">
      <div class="container header-inner">
        <a class="wordmark" href="/" data-route>${BRAND.name}</a>
        <nav class="main-nav" aria-label="Điều hướng chính">${nav.map(([u,n])=>`<a href="${u}" data-route ${p===u||p.startsWith(u+"/")?'aria-current="page"':""}>${n}</a>`).join("")}</nav>
        <div class="header-tools">
          <a href="/hop-qua?search=1" data-route>Tìm kiếm</a>
          <a class="account-link" href="${state.user?'/tai-khoan':'/dang-nhap'}" data-route>${state.user?"Tài khoản":"Đăng nhập"}</a>
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

function visual(name, cls="product-visual") { return `<div class="${cls}" role="img" aria-label="Khung ảnh minh họa cho ${esc(name)}"><span>${esc(name)}</span><small>Ảnh minh họa · cần thay ảnh thật</small></div>`; }
function productTile(b, reason=""){
  return `<article class="product-tile">${visual(b.name)}<div class="product-info"><h3><a href="/hop-qua/${b.slug}" data-route>${b.name}</a></h3><p>${esc(b.items.slice(0,3).join(" · "))}</p><div class="row spaced"><span class="price">${money(b.price)}</span>${b.stock===0?'<span class="small muted">Tạm hết</span>':`<a class="link small" href="/hop-qua/${b.slug}" data-route>Xem hộp</a>`}</div>${reason?`<p class="reason">${esc(reason)}</p>`:""}</div></article>`;
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
  return `<section class="detail-layout"><div class="detail-gallery">${visual(b.name)}</div><div class="detail-info"><span class="eyebrow">${esc(b.occasions.join(" · "))}</span><h1>${b.name}</h1><p class="detail-price price">${money(b.price + (customize?extras:0))}</p><p>${b.meaning}</p><ul class="feature-list">${b.items.map(i=>`<li><span>${esc(i)}</span><span>1</span></li>`).join("")}<li><span>Hộp và ruy băng chuẩn</span><span>Đã gồm</span></li><li><span>Chuẩn bị</span><span>${b.lead}–${b.lead+1} ngày</span></li></ul><p class="fine-print">Thiệp mặc định chưa có lời chúc. Bảo quản nơi khô ráo, tránh nhiệt trực tiếp.</p><div class="row wrap"><button class="button" data-action="add-curated" data-id="${b.id}" ${b.stock===0?"disabled":""}>${b.stock===0?"Tạm hết hàng":"Thêm hộp nguyên mẫu"}</button><button class="button secondary" data-action="customize" data-id="${b.id}" ${b.stock===0?"disabled":""}>Cá nhân hóa hộp này</button></div>${customize?personalizer(b):""}</div></section><section class="section"><div class="container"><span class="eyebrow">Gợi ý liên quan</span><h2>Vì bạn đang xem một món quà ${esc(b.style.toLowerCase())}</h2><div class="product-grid">${boxes.filter(x=>x.id!==b.id&&x.recipients.some(r=>b.recipients.includes(r))).slice(0,3).map(x=>productTile(x)).join("")}</div></div></section>`;
}
function personalizer(b){
  const p=state.personalize;
  return `<div class="personalizer"><h2 style="font-size:1.55rem">Cá nhân hóa</h2><p class="notice">Bạn đang chỉnh hộp <strong>${b.name}</strong>. Mọi phụ phí được cộng ngay vào tổng.</p><div class="form-grid"><div class="field"><label for="p-card">Mẫu thiệp</label><select id="p-card">${cards.map(x=>`<option value="${x.id}" ${p.card===x.id?"selected":""}>${x.name} ${x.price?"+ "+money(x.price):"· đã gồm"}</option>`).join("")}</select></div><div class="field"><label for="p-ribbon">Trang trí</label><select id="p-ribbon">${ribbons.map(x=>`<option value="${x.id}" ${p.ribbon===x.id?"selected":""}>${x.name} ${x.price?"+ "+money(x.price):"· đã gồm"}</option>`).join("")}</select></div></div><div class="field"><label for="p-recipient">Tên người nhận trên thiệp</label><input id="p-recipient" maxlength="40" value="${esc(p.recipient)}"></div><div class="field"><label for="p-message">Lời chúc <span class="muted">(<span id="p-count">${p.message.length}</span>/250)</span></label><textarea id="p-message" maxlength="250" placeholder="Mong những ngày tới đều dịu dàng với bạn.">${esc(p.message)}</textarea></div><label class="checkline"><input id="p-anonymous" type="checkbox" ${p.anonymous?"checked":""}> Không ghi tên người gửi trên thiệp</label><div class="card-preview" id="card-preview">${p.message?esc(p.message):"Lời chúc của bạn sẽ hiện ở đây."}</div><p class="fine-print">Bản xem trước chỉ mô phỏng bố cục chữ, không phải bản in chính xác.</p><button class="button" data-action="add-custom" data-id="${b.id}">Thêm hộp đã cá nhân hóa</button></div>`;
}

function finderPage(){
  pageTitle("Tìm quà nhanh"); const f=state.finder;
  const options=f.step===1?["Người yêu","Bạn thân","Chính mình"]:f.step===2?["Sinh nhật","Kỷ niệm","Làm hòa","Self-care","Valentine / White Day","Giáng sinh","8/3 & 20/10"]:["Dưới 300K","300–500K","500–800K","Trên 800K"];
  const selected=f.step===1?f.recipient:f.step===2?f.occasion:f.budget;
  const questions=["Bạn đang chọn quà cho ai?","Dịp này là dịp gì?","Bạn muốn dành khoảng bao nhiêu cho hộp quà?"];
  if(f.step<=3) return `<section class="page-hero"><div class="narrow"><span class="eyebrow">Gift Finder</span><h1>Ba câu hỏi, một gợi ý vừa lòng.</h1><p>Không cần tên, email hay tài khoản. Ngân sách đã gồm bao bì chuẩn, chưa gồm phí giao.</p></div></section><section class="section"><div class="narrow finder-shell"><div class="steps">${[1,2,3].map((n,i)=>`<button class="step ${f.step===n?"active":""}" data-action="finder-step" data-step="${n}" ${n>f.step?"disabled":""}>${n} · ${["Người nhận","Dịp","Ngân sách"][i]}</button>`).join("")}<span></span></div><span class="eyebrow">Câu ${f.step} / 3</span><h2>${questions[f.step-1]}</h2><div class="choice-list">${options.map(v=>`<button class="choice ${selected===v?"selected":""}" data-action="finder-choice" data-value="${esc(v)}">${esc(v)}</button>`).join("")}</div><div class="row spaced" style="margin-top:28px"><button class="button ghost" data-action="finder-reset">Bắt đầu lại</button><button class="button" data-action="finder-next" ${selected?"":"disabled"}>${f.step===3?"Xem gợi ý":"Tiếp tục"}</button></div></div></section>`;
  const ranges={"Dưới 300K":[0,299999],"300–500K":[300000,500000],"500–800K":[500001,800000],"Trên 800K":[800001,Infinity]}, [min,max]=ranges[f.budget];
  const matches=boxes.filter(b=>b.stock>0&&b.price>=min&&b.price<=max&&b.recipients.includes(f.recipient)&&b.occasions.includes(f.occasion)).slice(0,5);
  return `<section class="page-hero"><div class="container results-intro"><div><span class="eyebrow">Gợi ý của Gói Thương</span><h1>${matches.length?`Có ${matches.length} hộp thật sự phù hợp.`:"Chưa có hộp khớp trọn vẹn."}</h1><p>${esc(f.recipient)} · ${esc(f.occasion)} · ${esc(f.budget)}. Không có hộp vượt ngân sách được tự động chèn vào.</p></div><button class="button secondary" data-action="finder-edit">Sửa câu trả lời</button></div></section><section class="section"><div class="container">${matches.length?`<div class="product-grid">${matches.map(b=>productTile(b,`Phù hợp ${f.occasion.toLowerCase()} cho ${f.recipient.toLowerCase()}, trong khoảng ngân sách bạn chọn.`)).join("")}</div>`:`<div class="empty-state"><h2>Thử nới một tiêu chí nhé.</h2><p>Không có sản phẩm đang còn hàng nằm đúng cả người nhận, dịp và ngân sách này.</p><button class="button" data-action="finder-relax">Nới ngân sách</button></div>`}<div style="margin-top:34px"><button class="button ghost" data-action="finder-reset">Bắt đầu lại</button> <a class="button ghost" href="/hop-qua" data-route>Xem tất cả hộp</a></div></div></section>`;
}

function authPage(){
  pageTitle("Đăng nhập"); const ret=safeReturnTo(q("returnTo")||"/tai-khoan");
  if(state.user) return `<section class="section"><div class="narrow center"><h1>Bạn đã đăng nhập.</h1><p>Tiếp tục nơi bạn đang chọn quà nhé.</p><button class="button" data-action="continue-return" data-return="${esc(ret)}">Tiếp tục</button></div></section>`;
  const mode=q("mode")||"login";
  return `<section class="auth-layout"><div class="auth-story"><span class="eyebrow" style="color:#f0c5cd">Một chỗ để giữ những điều quan trọng</span><h1>Đăng nhập để tạo hộp quà của riêng bạn.</h1><p>Và lưu lại những dịp quan trọng, bản nháp cùng lịch sử đơn. Đây là xác thực demo, không nhập mật khẩu thật.</p></div><div class="auth-form"><form id="auth-form" data-return="${esc(ret)}"><div class="row wrap" style="margin-bottom:24px"><a class="link" href="/dang-nhap?returnTo=${encodeURIComponent(ret)}" data-route>Đăng nhập</a><a class="link" href="/dang-nhap?mode=register&returnTo=${encodeURIComponent(ret)}" data-route>Đăng ký</a><a class="link" href="/dang-nhap?mode=forgot&returnTo=${encodeURIComponent(ret)}" data-route>Quên mật khẩu</a></div><h2>${mode==="register"?"Tạo tài khoản demo":mode==="forgot"?"Đặt lại mật khẩu demo":"Mừng bạn quay lại"}</h2><div class="notice">Tài khoản demo: dùng email hợp lệ bất kỳ và mật khẩu <strong>goithuong</strong>.</div>${mode==="register"?'<div class="field"><label for="auth-name">Tên của bạn</label><input id="auth-name" name="name" required autocomplete="name"></div>':""}<div class="field"><label for="auth-email">Email</label><input id="auth-email" name="email" type="email" required autocomplete="email"></div>${mode==="forgot"?"":'<div class="field"><label for="auth-password">Mật khẩu demo</label><input id="auth-password" name="password" type="password" required autocomplete="current-password"><span class="fine-print">Không nhập mật khẩu thật.</span></div>'}<div id="auth-error" class="field-error" role="alert"></div><button class="button" type="submit">${mode==="register"?"Tạo tài khoản":mode==="forgot"?"Gửi hướng dẫn demo":"Đăng nhập"}</button></form></div></section>`;
}

function builderTotals(){
  const lines=Object.entries(state.builder.items).filter(([,n])=>n>0).map(([id,qty])=>({item:giftItems.find(x=>x.id===id),qty}));
  const itemTotal=lines.reduce((n,l)=>n+l.item.price*l.qty,0), size=lines.reduce((n,l)=>n+l.item.size*l.qty,0), pack=packaging.find(x=>x.id===state.builder.packaging), card=cards.find(x=>x.id===state.builder.card), ribbon=ribbons.find(x=>x.id===state.builder.ribbon);
  return {lines,itemTotal,size,pack,card,ribbon,total:itemTotal+(pack?.price||0)+(card?.price||0)+(ribbon?.price||0)};
}
function builderSummary(){ const t=builderTotals(); return `<h3>Hộp của bạn</h3><p class="small muted">${t.lines.reduce((n,l)=>n+l.qty,0)} món · ${t.size} đơn vị dung lượng</p><div class="summary-lines">${t.lines.map(l=>`<div class="summary-line"><span>${l.qty} × ${l.item.name}</span><span>${money(l.item.price*l.qty)}</span></div>`).join("")||'<p class="muted small" style="padding-top:14px">Chưa có món nào.</p>'}${t.pack?`<div class="summary-line"><span>${t.pack.name}</span><span>${money(t.pack.price)}</span></div>`:""}${t.card&&t.card.price?`<div class="summary-line"><span>${t.card.name}</span><span>${money(t.card.price)}</span></div>`:""}${t.ribbon&&t.ribbon.price?`<div class="summary-line"><span>${t.ribbon.name}</span><span>${money(t.ribbon.price)}</span></div>`:""}</div><div class="row spaced"><strong>Tạm tính</strong><strong class="price">${money(t.total)}</strong></div><p class="fine-print">Chưa gồm phí giao. Không giữ hàng hoặc lịch giao ở bản nháp.</p>`; }
function builderPage(){
  pageTitle("Tự tạo hộp");
  if(!state.user) return `<section class="page-hero"><div class="container"><span class="eyebrow">Tự tạo hộp</span><h1>Mỗi món một chút, thành một hộp rất riêng.</h1><p>Xem trước các món shop đang có. Đăng nhập trước khi bắt đầu chọn để bản nháp và dữ liệu riêng không bị lẫn.</p><button class="button" data-action="gate-builder">Đăng nhập để bắt đầu</button></div></section><section class="section"><div class="container"><div class="item-list">${giftItems.slice(0,8).map(i=>`<article class="item-row"><div class="item-art">${i.name}</div><h3>${i.name}</h3><span class="small muted">${i.category} · ${money(i.price)}</span></article>`).join("")}</div></div></section>`;
  const b=state.builder,t=builderTotals();
  return `<section class="page-hero"><div class="container"><span class="eyebrow">Builder demo</span><h1>Tự tạo một hộp quà.</h1><p>Quy tắc dung lượng dưới đây là minh họa; bản vận hành cần cấu hình xếp hộp đã được shop kiểm tra.</p></div></section><section class="section"><div class="container"><div class="steps">${["Chọn món","Chọn hộp","Thiệp & trang trí","Xem lại"].map((n,i)=>`<button class="step ${b.step===i+1?"active":""}" data-action="builder-step" data-step="${i+1}" ${i+1>b.step?"disabled":""}>${i+1} · ${n}</button>`).join("")}</div><div class="builder-shell"><div class="builder-main">${builderStep()}</div><aside class="builder-summary">${builderSummary()}</aside></div><div class="mobile-builder-bar"><div><span class="small">${t.lines.reduce((n,l)=>n+l.qty,0)} món</span><br><strong>${money(t.total)}</strong></div><button class="button small-btn" data-action="builder-next">${b.step===4?"Thêm giỏ":"Tiếp tục"}</button></div></div></section>`;
}
function builderStep(){ const b=state.builder,t=builderTotals();
  if(b.step===1) return `<div class="row spaced wrap"><div><h2>Chọn những món bạn muốn gửi</h2><p class="muted">Không cần chọn đủ mọi nhóm.</p></div><div class="field" style="margin:0"><label for="builder-budget">Ngân sách hộp</label><input id="builder-budget" type="number" min="100000" step="50000" value="${b.budget}" style="max-width:180px"></div></div>${t.total>b.budget?`<p class="notice error">Đang vượt ngân sách ${money(t.total-b.budget)}. Chúng mình không tự xóa món của bạn.</p>`:`<p class="notice">Còn khoảng ${money(b.budget-t.total)} trong ngân sách.</p>`}<div class="item-list">${giftItems.map(i=>{const n=b.items[i.id]||0; return `<article class="item-row"><div class="item-art">${i.name}</div><h3>${i.name}</h3><span class="small muted">${i.category} · ${i.size} đơn vị</span><br><span class="price small">${money(i.price)}</span>${i.stock===0?'<p class="small muted">Tạm hết hàng</p>':`<div class="qty"><button aria-label="Giảm ${esc(i.name)}" data-action="builder-qty" data-id="${i.id}" data-delta="-1">−</button><span>${n}</span><button aria-label="Thêm ${esc(i.name)}" data-action="builder-qty" data-id="${i.id}" data-delta="1">+</button></div>`}${i.lead>2?`<p class="fine-print">Cần ${i.lead} ngày chuẩn bị</p>`:""}</article>`}).join("")}</div><div class="row spaced" style="margin-top:34px"><button class="button secondary" data-action="save-draft">Lưu bản nháp</button><button class="button" data-action="builder-next" ${t.lines.length?"":"disabled"}>Chọn hộp</button></div>`;
  if(b.step===2) return `<h2>Chọn hộp phù hợp</h2><p class="muted">Bạn đã chọn ${t.size} đơn vị dung lượng. Phương án không đủ chỗ sẽ bị khóa.</p><div class="package-list">${packaging.map(p=>{const ok=p.capacity>=t.size; return `<label class="package-option ${ok?"":"disabled"}"><input type="radio" name="package" value="${p.id}" ${b.packaging===p.id?"checked":""} ${ok?"":"disabled"}><span><strong>${p.name}</strong><br><span class="small muted">Tối đa ${p.capacity} đơn vị · ${p.color}${ok?"":" · Không đủ dung lượng"}</span></span><span class="price">${money(p.price)}</span></label>`}).join("")}</div><div class="row spaced" style="margin-top:30px"><button class="button ghost" data-action="builder-back">Quay lại chọn món</button><button class="button" data-action="builder-next" ${b.packaging?"":"disabled"}>Thiệp & trang trí</button></div>`;
  if(b.step===3) return `<h2>Viết điều bạn muốn gửi</h2><div class="form-grid"><div class="field"><label for="b-card">Mẫu thiệp</label><select id="b-card">${cards.map(x=>`<option value="${x.id}" ${b.card===x.id?"selected":""}>${x.name} ${x.price?"+ "+money(x.price):"· đã gồm"}</option>`).join("")}</select></div><div class="field"><label for="b-ribbon">Ruy băng</label><select id="b-ribbon">${ribbons.map(x=>`<option value="${x.id}" ${b.ribbon===x.id?"selected":""}>${x.name} ${x.price?"+ "+money(x.price):"· đã gồm"}</option>`).join("")}</select></div><div class="field"><label for="b-recipient">Tên người nhận</label><input id="b-recipient" maxlength="40" value="${esc(b.recipient)}"></div><div class="field"><label for="b-sender">Tên người gửi</label><input id="b-sender" maxlength="40" value="${esc(b.sender)}" ${b.anonymous?"disabled":""}></div></div><label class="checkline"><input id="b-anonymous" type="checkbox" ${b.anonymous?"checked":""}> Không ghi tên người gửi trên thiệp</label><div class="field"><label for="b-message">Lời chúc <span class="muted">(${b.message.length}/250)</span></label><textarea id="b-message" maxlength="250">${esc(b.message)}</textarea></div><div class="card-preview">${b.message?esc(b.message):"Lời chúc của bạn sẽ hiện ở đây."}</div><p class="fine-print">Shop vẫn cần thông tin người mua để xử lý đơn. Bản xem trước chỉ mô phỏng bố cục.</p><div class="row spaced"><button class="button ghost" data-action="builder-back">Quay lại chọn hộp</button><button class="button" data-action="builder-next">Xem lại</button></div>`;
  return `<h2>Kiểm tra hộp của bạn</h2><div class="summary-lines">${t.lines.map(l=>`<div class="summary-line"><span>${l.qty} × ${l.item.name}</span><span>${money(l.item.price*l.qty)}</span></div>`).join("")}<div class="summary-line"><span>${t.pack?.name||"Chưa chọn hộp"}</span><span>${money(t.pack?.price||0)}</span></div><div class="summary-line"><span>${t.card?.name}</span><span>${money(t.card?.price||0)}</span></div><div class="summary-line"><span>${t.ribbon?.name}</span><span>${money(t.ribbon?.price||0)}</span></div></div><div class="card-preview">${b.message?esc(b.message):"Thiệp chưa có lời chúc"}</div><div class="field" style="margin-top:24px"><label for="draft-name">Tên hộp để dễ tìm lại</label><input id="draft-name" maxlength="60" value="${esc(b.draftName)}"></div><div class="row spaced wrap"><button class="button secondary" data-action="save-draft">Lưu hộp này</button><div class="row"><button class="button ghost" data-action="builder-back">Sửa thiệp</button><button class="button" data-action="add-builder-cart">Thêm vào giỏ · ${money(t.total)}</button></div></div>`;
}

function cartPage(){ pageTitle("Giỏ hàng"); const subtotal=cartSubtotal();
  if(!state.cart.length) return `<section class="section"><div class="narrow center"><span class="eyebrow">Giỏ hàng</span><h1>Giỏ đang chờ một món quà.</h1><p class="muted">Chọn hộp có sẵn hoặc tự tạo một hộp thật riêng.</p><div class="row" style="justify-content:center"><a class="button" href="/hop-qua" data-route>Chọn hộp quà</a><a class="button secondary" href="/tu-tao-hop" data-route>Tự tạo hộp</a></div></div></section>`;
  return `<section class="page-hero"><div class="container"><span class="eyebrow">Giỏ hàng</span><h1>Kiểm tra từng hộp trước khi gửi.</h1></div></section><section class="section"><div class="container cart-layout"><div>${state.cart.map(l=>`<article class="cart-line"><div class="cart-thumb">${esc(l.name)}</div><div><h3 style="font-family:var(--sans);font-size:1rem;font-weight:600">${esc(l.name)}</h3><p class="small muted">${l.type==="curated"?"Hộp nguyên mẫu · thiệp chưa có lời chúc":l.summary}</p>${l.message?`<p class="small">“${esc(l.message)}”</p>`:""}<div class="row wrap"><button class="link" data-action="edit-line" data-id="${l.id}">Sửa hộp</button><button class="link" data-action="remove-line" data-id="${l.id}">Xóa</button></div></div><div><strong>${money(l.unitPrice*l.qty)}</strong><div class="qty"><button data-action="cart-qty" data-id="${l.id}" data-delta="-1">−</button><span>${l.qty}</span><button data-action="cart-qty" data-id="${l.id}" data-delta="1">+</button></div></div></article>`).join("")}</div><aside class="order-summary"><h2 style="font-size:1.5rem">Tóm tắt</h2><div class="summary-lines"><div class="summary-line"><span>Tiền hàng & tùy chọn</span><span>${money(subtotal)}</span></div><div class="summary-line"><span>Phí giao</span><span>Chọn tại checkout</span></div></div><div class="field"><label for="coupon">Mã giảm giá</label><div class="coupon-row"><input id="coupon" placeholder="Nhập mã demo"><button class="button small-btn" data-action="apply-coupon">Áp dụng</button></div><span id="coupon-result" class="fine-print"></span></div><div class="row spaced"><strong>Tạm tính</strong><strong>${money(subtotal)}</strong></div><a class="button" style="width:100%;margin-top:18px" href="/thanh-toan" data-route>Tiếp tục thanh toán</a></aside></div></section>`;
}

function checkoutPage(){ pageTitle("Thanh toán"); if(!state.cart.length) return `<section class="section"><div class="narrow center"><h1>Chưa có hộp để thanh toán.</h1><a class="button" href="/hop-qua" data-route>Chọn hộp quà</a></div></section>`;
  const c=state.checkout, delivery=45000, total=cartSubtotal()+delivery;
  return `<section class="page-hero"><div class="container"><span class="eyebrow">Checkout một trang</span><h1>Gửi đúng người, vào dịp bạn muốn.</h1><p class="notice">Thanh toán thử nghiệm — không thu tiền, không gọi tài xế và không gửi email.</p></div></section><form id="checkout-form" class="section"><div class="container checkout-layout"><div>
    <section class="checkout-section"><h2><span class="number">1</span> Người mua</h2><div class="form-grid"><div class="field"><label for="buyerName">Họ tên</label><input id="buyerName" name="buyerName" required value="${esc(c.buyerName)}"></div><div class="field"><label for="buyerEmail">Email</label><input id="buyerEmail" name="buyerEmail" type="email" required value="${esc(c.buyerEmail||state.user?.email||"")}"></div><div class="field"><label for="buyerPhone">Điện thoại</label><input id="buyerPhone" name="buyerPhone" required pattern="[0-9 +]{9,15}" value="${esc(c.buyerPhone)}"></div></div></section>
    <section class="checkout-section"><h2><span class="number">2</span> Người nhận</h2><label class="checkline"><input id="same-receiver" type="checkbox" ${c.same?"checked":""}> Mình là người nhận</label><div class="form-grid"><div class="field"><label for="receiverName">Tên người nhận</label><input id="receiverName" name="receiverName" required value="${esc(c.receiverName)}"></div><div class="field"><label for="receiverPhone">Điện thoại người nhận</label><input id="receiverPhone" name="receiverPhone" required pattern="[0-9 +]{9,15}" value="${esc(c.receiverPhone)}"></div></div><div class="field"><label for="address">Địa chỉ giao tại TP.HCM</label><input id="address" name="address" required value="${esc(c.address)}" placeholder="Số nhà, đường, phường/xã, khu vực"><span class="fine-print">Vùng giao là cấu hình demo. Địa chỉ ghi rõ ngoài TP.HCM sẽ bị chặn.</span></div></section>
    <section class="checkout-section"><h2><span class="number">3</span> Lịch giao dự kiến</h2><div class="field"><label for="deliveryDate">Ngày giao</label><input id="deliveryDate" name="date" type="date" required min="${new Date(Date.now()+86400000).toISOString().slice(0,10)}" value="${esc(c.date)}"></div><p class="small">Chọn khung giờ còn nhận đơn:</p><div class="slot-list">${["9–12h","14–17h","18–21h"].map((s,i)=>`<button type="button" class="slot ${c.slot===s?"selected":""}" data-action="slot" data-value="${s}" ${i===1?"disabled":""}>${s}${i===1?" · đã kín":""}</button>`).join("")}</div><div class="field" style="margin-top:18px"><label for="deliveryNote">Ghi chú giao hàng</label><textarea id="deliveryNote" name="note" placeholder="Ví dụ: gọi trước khi đến, đây là yêu cầu vận hành không phải cam kết giữ bí mật tuyệt đối.">${esc(c.note)}</textarea></div></section>
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
function authRequired(title, returnTo){ return `<section class="section"><div class="narrow center"><span class="eyebrow">Cần đăng nhập</span><h1>${title}</h1><p class="muted">Dữ liệu ở khu vực này thuộc về từng tài khoản và không được hiển thị công khai.</p><a class="button" href="/dang-nhap?returnTo=${encodeURIComponent(returnTo)}" data-route>Đăng nhập để tiếp tục</a></div></section>`; }
function notFound(){ pageTitle("Không tìm thấy trang"); return `<section class="section"><div class="narrow center"><span class="eyebrow">404</span><h1>Trang này chưa được gói xong.</h1><p class="muted">Liên kết có thể đã thay đổi. Bạn có thể quay lại chọn quà từ đầu.</p><a class="button" href="/" data-route>Về trang chủ</a></div></section>`; }

function routeContent(){
  const path=currentPath();
  if(path==="/") return homePage();
  if(path==="/hop-qua") return catalogPage();
  if(path.startsWith("/hop-qua/")) return detailPage(decodeURIComponent(path.split("/")[2]||""));
  if(path==="/tim-qua") return finderPage();
  if(path==="/dang-nhap") return authPage();
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
function render(){ document.querySelector("#app").innerHTML=shell(routeContent()); bindPageSpecific(); }

function openMenu(){
  const prior=document.activeElement; const wrap=document.createElement("div"); wrap.innerHTML=`<div class="drawer-backdrop" data-action="close-drawer"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="Menu"><div class="drawer-head"><a class="wordmark" href="/" data-route>${BRAND.name}</a><button class="drawer-close" data-action="close-drawer" aria-label="Đóng menu">×</button></div><nav><a href="/hop-qua" data-route>Hộp quà có sẵn</a><a href="/tim-qua" data-route>Tìm quà nhanh</a><a href="/tu-tao-hop" data-route>Tự tạo hộp</a><a href="/dip-cua-toi" data-route>Nhắc dịp</a><a href="/ve-chung-toi" data-route>Về Gói Thương</a><a href="${state.user?'/tai-khoan':'/dang-nhap'}" data-route>${state.user?"Tài khoản":"Đăng nhập"}</a></nav></aside>`; wrap.id="drawer-root"; wrap.dataset.prior="menu"; document.body.append(wrap); document.body.classList.add("no-scroll"); wrap.querySelector("button")?.focus();
}
function closeDrawer(){ document.querySelector("#drawer-root")?.remove(); document.body.classList.remove("no-scroll"); document.querySelector(".menu-button")?.focus(); }

function addCartLine(line){ state.cart.push({...line,id:crypto.randomUUID(),qty:1,owner:owner()}); save(); toast("Đã thêm vào giỏ."); render(); }
function resetBuilder(){ state.builder=structuredClone(DEFAULT_STATE.builder); }
function saveDraft(){ if(!state.user){navigate(`/dang-nhap?returnTo=${encodeURIComponent('/tu-tao-hop')}`);return;} const t=builderTotals(); const id=crypto.randomUUID(); state.drafts.push({id,owner:owner(),name:state.builder.draftName||"Hộp chưa đặt tên",builder:structuredClone(state.builder),total:t.total,updated:new Intl.DateTimeFormat("vi-VN").format(new Date()),needsReview:t.lines.some(l=>l.item.stock===0)}); save(); toast("Đã lưu hộp vào tài khoản demo."); }

function handleAction(el){
  const a=el.dataset.action;
  if(a==="open-menu") return openMenu(); if(a==="close-drawer") return closeDrawer();
  if(a==="clear-filters") return navigate("/hop-qua"); if(a==="toggle-filters") return document.querySelector("#filters")?.classList.toggle("open");
  if(a==="add-curated"){ const b=boxes.find(x=>x.id===el.dataset.id); return addCartLine({type:"curated",sourceId:b.id,name:b.name,unitPrice:b.price,summary:b.items.join(" · "),message:""}); }
  if(a==="customize"){ const b=boxes.find(x=>x.id===el.dataset.id); const target=`/hop-qua/${b.slug}?customize=1`; if(!state.user) return navigate(`/dang-nhap?returnTo=${encodeURIComponent(target)}`); return navigate(target); }
  if(a==="add-custom"){ const b=boxes.find(x=>x.id===el.dataset.id), p=state.personalize, total=b.price+cards.find(x=>x.id===p.card).price+ribbons.find(x=>x.id===p.ribbon).price; return addCartLine({type:"custom",sourceId:b.id,name:b.name+" · cá nhân hóa",unitPrice:total,summary:`${cards.find(x=>x.id===p.card).name} · ${ribbons.find(x=>x.id===p.ribbon).name}`,message:p.message,custom:structuredClone(p)}); }
  if(a==="finder-choice"){ const key=state.finder.step===1?"recipient":state.finder.step===2?"occasion":"budget"; state.finder[key]=el.dataset.value; save(); return render(); }
  if(a==="finder-next"){ state.finder.step++; save(); return render(); } if(a==="finder-step"){state.finder.step=Number(el.dataset.step);save();return render();}
  if(a==="finder-reset"){state.finder=structuredClone(DEFAULT_STATE.finder);save();return render();} if(a==="finder-edit"){state.finder.step=1;save();return render();} if(a==="finder-relax"){state.finder.budget="500–800K";state.finder.step=4;save();return render();}
  if(a==="continue-return") return navigate(safeReturnTo(el.dataset.return)); if(a==="gate-builder") return navigate(`/dang-nhap?returnTo=${encodeURIComponent('/tu-tao-hop')}`);
  if(a==="builder-qty"){ const i=giftItems.find(x=>x.id===el.dataset.id), current=state.builder.items[i.id]||0, next=Math.max(0,Math.min(i.stock,current+Number(el.dataset.delta))); if(next===current&&Number(el.dataset.delta)>0) toast("Đã chạm số lượng tồn demo."); state.builder.items[i.id]=next; if(state.builder.packaging&&packaging.find(x=>x.id===state.builder.packaging).capacity<builderTotals().size){state.builder.packaging=null;toast("Các món mới không còn vừa hộp đã chọn. Vui lòng chọn lại hộp.");} save(); return render(); }
  if(a==="builder-next"){ const t=builderTotals(); if(state.builder.step===1&&!t.lines.length) return toast("Hãy chọn ít nhất một món."); if(state.builder.step===2&&!state.builder.packaging) return toast("Hãy chọn một hộp đủ dung lượng."); if(state.builder.step===4) return handleAction({dataset:{action:"add-builder-cart"}}); state.builder.step=Math.min(4,state.builder.step+1);save();return render(); }
  if(a==="builder-back"){state.builder.step=Math.max(1,state.builder.step-1);save();return render();} if(a==="builder-step"){state.builder.step=Number(el.dataset.step);save();return render();}
  if(a==="save-draft") return saveDraft();
  if(a==="add-builder-cart"){ const t=builderTotals(); if(!t.lines.length||!t.pack) return toast("Hộp chưa hoàn thiện."); addCartLine({type:"builder",name:state.builder.draftName||"Hộp tự tạo",unitPrice:t.total,summary:`${t.lines.reduce((n,l)=>n+l.qty,0)} món · ${t.pack.name} · ${t.card.name}`,message:state.builder.message,configurationId:crypto.randomUUID(),builder:structuredClone(state.builder)}); resetBuilder(); save(); return navigate("/gio-hang"); }
  if(a==="cart-qty"){ const l=state.cart.find(x=>x.id===el.dataset.id); if(!l)return; l.qty=Math.max(1,l.qty+Number(el.dataset.delta));save();return render(); }
  if(a==="remove-line"){ const i=state.cart.findIndex(x=>x.id===el.dataset.id); if(i<0)return; state.lastRemoved={line:state.cart[i],index:i};state.cart.splice(i,1);save();render();return toast("Đã xóa hộp khỏi giỏ.","undo-remove"); }
  if(a==="undo-remove"&&state.lastRemoved){state.cart.splice(state.lastRemoved.index,0,state.lastRemoved.line);state.lastRemoved=null;save();return render();}
  if(a==="edit-line"){const l=state.cart.find(x=>x.id===el.dataset.id); if(l?.type==="builder"&&l.builder){state.builder=structuredClone(l.builder);state.cart=state.cart.filter(x=>x.id!==l.id);save();return navigate("/tu-tao-hop");} const b=boxes.find(x=>x.id===l?.sourceId); if(b)return navigate(`/hop-qua/${b.slug}${l.type==='custom'?'?customize=1':''}`);}
  if(a==="apply-coupon"){const code=document.querySelector("#coupon")?.value.trim().toUpperCase(),out=document.querySelector("#coupon-result");out.textContent=code==="THUONG10"?"Mã demo hợp lệ, nhưng chưa được trừ vì không có chương trình đã xác nhận.":"Mã không tồn tại hoặc không còn hiệu lực.";}
  if(a==="slot"){state.checkout.slot=el.dataset.value;save();return render();}
  if(a==="request-reschedule") return toast("Đã ghi nhận yêu cầu demo. Shop cần xem xét trước khi xác nhận.");
  if(a==="save-order-occasion"){ if(!state.user)return navigate(`/dang-nhap?returnTo=${encodeURIComponent(currentPath()+location.search)}`); return navigate("/dip-cua-toi?fromOrder="+encodeURIComponent(el.dataset.ref)); }
  if(a==="account-tab"){state.accountTab=el.dataset.tab;save();return render();}
  if(a==="logout"){state.user=null;resetBuilder();state.personalize=structuredClone(DEFAULT_STATE.personalize);state.accountTab="overview";save();toast("Đã đăng xuất và xóa ngữ cảnh riêng khỏi màn hình.");return navigate("/");}
  if(a==="open-draft"){const d=state.drafts.find(x=>x.id===el.dataset.id&&x.owner===owner());if(d){state.builder=structuredClone(d.builder);save();navigate("/tu-tao-hop");}}
  if(a==="copy-draft"){const d=state.drafts.find(x=>x.id===el.dataset.id&&x.owner===owner());if(d){state.drafts.push({...structuredClone(d),id:crypto.randomUUID(),name:d.name+" · bản sao"});save();render();}}
  if(a==="delete-draft"){state.drafts=state.drafts.filter(x=>!(x.id===el.dataset.id&&x.owner===owner()));save();return render();}
  if(a==="toggle-reminder"){const o=state.occasions.find(x=>x.id===el.dataset.id&&x.owner===owner());if(!o)return;o.enabled=!o.enabled;if(o.enabled&&!o.consent){o.enabled=false;toast("Cần đồng ý nhận email trước khi bật nhắc.");}save();return render();}
  if(a==="delete-occasion"){state.occasions=state.occasions.filter(x=>!(x.id===el.dataset.id&&x.owner===owner()));save();return render();}
  if(a==="preview-reminder"){const o=state.occasions.find(x=>x.id===el.dataset.id&&x.owner===owner());if(!o)return; showEmailPreview(o);}
}

function showEmailPreview(o){
  const wrap=document.createElement("div");wrap.id="drawer-root";wrap.innerHTML=`<div class="drawer-backdrop" data-action="close-drawer"></div><aside class="drawer" role="dialog" aria-modal="true" aria-label="Xem trước email"><div class="drawer-head"><strong>Xem trước lời nhắc</strong><button class="drawer-close" data-action="close-drawer" aria-label="Đóng">×</button></div><div class="email-preview" style="margin-top:24px"><span class="eyebrow">BẢN XEM TRƯỚC · CHƯA GỬI</span><h2>Sắp đến ${esc(o.type.toLowerCase())} của ${esc(o.name)}</h2><p>Bạn đã chọn được nhắc trước ${o.before} ngày. Ngân sách dự kiến là ${money(o.budget)}.</p><a class="button" href="/hop-qua?occasion=${encodeURIComponent(o.type)}&max=${o.budget}" data-route>Xem quà phù hợp</a><p class="fine-print">Email này sẽ gửi cho người mua, không gửi cho người nhận quà.</p></div></aside>`;document.body.append(wrap);document.body.classList.add("no-scroll");wrap.querySelector("button")?.focus();
}

function bindPageSpecific(){
  const sort=document.querySelector("#sort-select"); if(sort) sort.onchange=()=>{const u=new URL(location.href);u.searchParams.set("sort",sort.value);navigate(u.pathname+u.search)};
  document.querySelectorAll('#filters input[type="radio"]').forEach(i=>i.onchange=()=>{const u=new URL(location.href);u.searchParams.set(i.name,i.value);navigate(u.pathname+u.search)});
  document.querySelectorAll('input[name="package"]').forEach(i=>i.onchange=()=>{state.builder.packaging=i.value;save();render();});
  const bind=(id,key,event="input")=>{const n=document.querySelector(id);if(n)n.addEventListener(event,()=>{state.builder[key]=n.type==="checkbox"?n.checked:n.value;save();if(["#b-card","#b-ribbon","#b-anonymous"].includes(id))render();});};
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
}

document.addEventListener("click",e=>{
  const route=e.target.closest("a[data-route]"); if(route&&route.origin===location.origin){e.preventDefault();closeDrawer();navigate(route.pathname+route.search+route.hash);return;}
  const action=e.target.closest("[data-action]"); if(action){e.preventDefault();handleAction(action);}
});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeDrawer();});
window.addEventListener("popstate",render);

document.addEventListener("submit",e=>{
  if(e.target.id==="auth-form"){e.preventDefault();const fd=new FormData(e.target),mode=q("mode")||"login",email=String(fd.get("email")||"").trim().toLowerCase(),err=document.querySelector("#auth-error");if(mode==="forgot"){err.textContent="Đây là demo: chưa gửi email. Hãy dùng mật khẩu goithuong để tiếp tục.";return;}if(fd.get("password")!=="goithuong"){err.textContent="Mật khẩu demo chưa đúng. Hãy nhập goithuong.";return;}state.user={email,name:String(fd.get("name")||email.split("@")[0])};state.cart.forEach(l=>{if(l.owner==="guest")l.owner=email;});save();toast("Đăng nhập demo thành công.");navigate(safeReturnTo(e.target.dataset.return));}
  if(e.target.id==="checkout-form"){e.preventDefault();const fd=new FormData(e.target),address=String(fd.get("address")||""); if(!state.checkout.slot){document.querySelector("#checkout-error").textContent="Hãy chọn một khung giao còn chỗ.";return;} if(/hà nội|đà nẵng|cần thơ/i.test(address)){document.querySelector("#checkout-error").textContent="Địa chỉ nằm ngoài vùng TP.HCM đang cấu hình. Vui lòng liên hệ hỗ trợ.";return;} const btn=document.querySelector("#place-order");btn.disabled=true;btn.textContent="Đang kiểm tra…"; const pay=String(fd.get("payment")||"success"); state.checkout={...state.checkout,...Object.fromEntries(fd),slot:state.checkout.slot,payment:pay};save();setTimeout(()=>{if(pay==="failed"){document.querySelector("#checkout-error").textContent="Thanh toán thử nghiệm thất bại. Không có đơn hoặc khoản thu nào được tạo.";btn.disabled=false;btn.textContent="Thử đặt đơn lại";return;}const reference="GT-"+Math.random().toString(36).slice(2,8).toUpperCase(),token=crypto.randomUUID(),total=cartSubtotal()+45000,order={reference,token,owner:owner(),lines:structuredClone(state.cart),receiverName:state.checkout.receiverName,date:state.checkout.date,slot:state.checkout.slot,total,payment:pay,status:pay==="pending"?"Chờ thanh toán":"Đã tiếp nhận",paymentLabel:pay==="pending"?"Thanh toán đang chờ":"Thanh toán thử nghiệm thành công",createdAt:new Date().toISOString()};state.orders.push(order);state.cart=[];save();navigate(`/xac-nhan-don/${reference}?token=${token}`);},700);}
  if(e.target.id==="tracking-form"){e.preventDefault();const fd=new FormData(e.target),ref=String(fd.get("reference")||"").trim(),token=String(fd.get("token")||"").trim(),order=state.orders.find(o=>o.reference===ref&&o.token===token);if(!order){document.querySelector("#tracking-error").textContent="Không tìm thấy đơn với mã và token này.";return;}navigate(`/theo-doi-don?reference=${encodeURIComponent(ref)}&token=${encodeURIComponent(token)}`);}
  if(e.target.id==="occasion-form"){e.preventDefault();const fd=new FormData(e.target);state.occasions.push({id:crypto.randomUUID(),owner:owner(),name:String(fd.get("name")),relation:String(fd.get("relation")),type:String(fd.get("type")),date:String(fd.get("date")),budget:Number(fd.get("budget")),before:Number(fd.get("before")),email:String(fd.get("email")),note:String(fd.get("note")),annual:fd.get("annual")==="on",consent:fd.get("consent")==="on",enabled:fd.get("consent")==="on"});save();toast("Đã lưu dịp. Email chưa được gửi trong demo.");render();}
});

render();
