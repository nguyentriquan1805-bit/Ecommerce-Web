import * as THREE from "/vendor/three.module.js";

const clone = value => structuredClone(value);
const clamp = (value,min,max) => Math.max(min,Math.min(max,value));
const rad = deg => deg*Math.PI/180;
const round = value => Math.round(Number(value)||0);
const unique = values => [...new Set(values.filter(Boolean))];

function profileFrom(item){
  const model=item.model3d||item.profile||{};
  return {
    shape:model.shape==="cylinder"?"cylinder":"box",
    length:Number(model.length||100),width:Number(model.width||70),height:Number(model.height||45),
    weight:Number(model.weight||120),padding:Number(model.padding||0),
    upright:!!model.upright,fragile:!!model.fragile,compressible:!!model.compressible,
    stackable:model.stackable!==false,canSupport:!!model.canSupport,maxLoad:Number(model.maxLoad||0),
    collider:model.collider||model.shape||"box",color:model.color||"#a98372",
    modelVersion:model.modelVersion||"simple-1",colliderVersion:model.colliderVersion||"simple-1",
    sourceType:model.sourceType||"simple",sourceName:model.sourceName||"Mô hình kích thước đơn giản"
  };
}

function makeInstance(item,index,box){
  const profile=profileFrom(item);
  const trayColumn=index%3, trayRow=Math.floor(index/3);
  return {
    instanceId:crypto.randomUUID(),productId:item.id,sku:item.sku,name:item.name,price:Number(item.price||0),
    x:-Number(box.innerLength||330)/2-85-trayColumn*78,y:profile.height/2,z:-Number(box.innerWidth||230)/2+45+trayRow*70,
    rotX:0,rotY:0,rotZ:0,inBox:false,locked:false,valid:true,warning:"",
    profile,itemSnapshot:{id:item.id,sku:item.sku,name:item.name,price:Number(item.price||0),model3d:clone(item.model3d||profile)}
  };
}

export function syncPackingConfiguration(input){
  const box=input.box, lines=input.lines||[], existing=input.configuration&&input.configuration.schemaVersion===1?input.configuration:null;
  const cfg=existing||{
    id:crypto.randomUUID(),schemaVersion:1,units:{length:"mm",weight:"g"},axes:{x:"dài hộp",y:"cao",z:"rộng hộp",origin:"tâm đáy lòng hộp"},
    owner:input.owner||"guest",boxId:box.id,boxVersion:"box-1",boxSnapshot:clone(box),instances:[],materials:{},materialSnapshots:clone(input.materials||[]),
    selectedId:null,snap:true,wallFade:true,historyVersion:1,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),syncMessages:[]
  };
  cfg.boxId=box.id;cfg.boxSnapshot=clone(box);cfg.materialSnapshots=clone(input.materials||[]);
  cfg.syncMessages=[];
  const next=[];
  let ordinal=0;
  lines.forEach(line=>{
    const item=line.item, wanted=Number(line.qty||0), matches=cfg.instances.filter(x=>x.productId===item.id);
    for(let i=0;i<wanted;i++){
      const instance=matches[i]||makeInstance(item,ordinal,box);
      instance.name=item.name;instance.sku=item.sku;instance.price=Number(item.price||0);
      instance.profile=profileFrom(item);instance.itemSnapshot={id:item.id,sku:item.sku,name:item.name,price:Number(item.price||0),model3d:clone(item.model3d||instance.profile)};
      next.push(instance);ordinal++;
    }
    if(matches.length>wanted) cfg.syncMessages.push("Đã bỏ "+(matches.length-wanted)+" đối tượng "+item.name+" do số lượng trong Builder đã giảm.");
  });
  cfg.instances.filter(old=>!lines.some(line=>line.item.id===old.productId)).forEach(old=>cfg.syncMessages.push("Đã bỏ "+old.name+" vì món này không còn trong lựa chọn Builder."));
  cfg.instances=next;
  if(!cfg.instances.some(x=>x.instanceId===cfg.selectedId)) cfg.selectedId=cfg.instances[0]?.instanceId||null;
  cfg.updatedAt=new Date().toISOString();
  return cfg;
}

function selectedMaterials(cfg){
  return (cfg.materialSnapshots||[]).filter(material=>cfg.materials?.[material.id]);
}
function materialSpace(cfg){
  const chosen=selectedMaterials(cfg);
  return {
    floor:chosen.filter(x=>x.kind==="liner"||x.kind==="fiber").reduce((sum,x)=>sum+Number(x.thickness||0),0),
    top:chosen.filter(x=>x.kind==="top").reduce((sum,x)=>sum+Number(x.thickness||0),0),
    divider:chosen.find(x=>x.kind==="divider")||null
  };
}
function dimensions(instance){
  const p=instance.profile, xTurn=((Math.round(instance.rotX/90)%2)+2)%2, yTurn=((Math.round(instance.rotY/90)%2)+2)%2;
  let length=p.length,width=p.width,height=p.height;
  if(xTurn&&!p.upright){const old=height;height=width;width=old;}
  if(yTurn){const old=length;length=width;width=old;}
  return {length,width,height};
}
function verticalRange(instance){
  const d=dimensions(instance);return {bottom:instance.y-d.height/2,top:instance.y+d.height/2,height:d.height};
}
function overlapAmount(aMin,aMax,bMin,bMax){return Math.max(0,Math.min(aMax,bMax)-Math.max(aMin,bMin));}
function horizontalOverlap(a,b){
  const ad=dimensions(a),bd=dimensions(b);
  const ox=overlapAmount(a.x-ad.length/2,a.x+ad.length/2,b.x-bd.length/2,b.x+bd.length/2);
  const oz=overlapAmount(a.z-ad.width/2,a.z+ad.width/2,b.z-bd.width/2,b.z+bd.width/2);
  return {x:ox,z:oz,area:ox*oz,ratio:ox*oz/Math.max(1,Math.min(ad.length*ad.width,bd.length*bd.width))};
}
function circleBoxCollision(circle,boxInst){
  const cd=dimensions(circle),bd=dimensions(boxInst),radius=Math.min(cd.length,cd.width)/2;
  const cx=clamp(circle.x,boxInst.x-bd.length/2,boxInst.x+bd.length/2);
  const cz=clamp(circle.z,boxInst.z-bd.width/2,boxInst.z+bd.width/2);
  return (circle.x-cx)**2+(circle.z-cz)**2<radius**2;
}
function horizontalCollision(a,b){
  const ap=a.profile.collider||a.profile.shape,bp=b.profile.collider||b.profile.shape;
  if(ap==="cylinder"&&bp==="cylinder"){
    const ar=Math.min(dimensions(a).length,dimensions(a).width)/2,br=Math.min(dimensions(b).length,dimensions(b).width)/2;
    return Math.hypot(a.x-b.x,a.z-b.z)<ar+br;
  }
  if(ap==="cylinder") return circleBoxCollision(a,b);
  if(bp==="cylinder") return circleBoxCollision(b,a);
  const o=horizontalOverlap(a,b);return o.x>0.5&&o.z>0.5;
}
function instancesCollide(a,b){
  const av=verticalRange(a),bv=verticalRange(b);
  return overlapAmount(av.bottom,av.top,bv.bottom,bv.top)>0.5&&horizontalCollision(a,b);
}

function placementMessages(instance,cfg,box,instances){
  const messages=[],invalidIds=[],d=dimensions(instance),v=verticalRange(instance),space=materialSpace(cfg),pad=Number(instance.profile.padding||0);
  const halfL=Number(box.innerLength||330)/2,halfW=Number(box.innerWidth||230)/2,maxY=Number(box.innerHeight||125)-Number(box.lidClearance||0)-space.top;
  if(!instance.inBox) messages.push(instance.name+" còn ở khay chờ.");
  if(instance.inBox&&(instance.x-d.length/2-pad<-halfL||instance.x+d.length/2+pad>halfL||instance.z-d.width/2-pad<-halfW||instance.z+d.width/2+pad>halfW)){messages.push(instance.name+" đang vượt thành hộp.");invalidIds.push(instance.instanceId);}
  if(instance.inBox&&v.bottom<space.floor-0.8){messages.push(instance.name+" xuyên đáy hoặc lớp lót.");invalidIds.push(instance.instanceId);}
  if(instance.inBox&&v.top>maxY+0.8){messages.push(instance.name+" cao hơn khoảng đóng nắp "+round(v.top-maxY)+" mm.");invalidIds.push(instance.instanceId);}
  if(instance.profile.upright&&(Math.abs(instance.rotX)%180>1||Math.abs(instance.rotZ)%180>1)){messages.push(instance.name+" phải được giữ đứng.");invalidIds.push(instance.instanceId);}
  if(instance.inBox&&space.divider&&Math.abs(instance.x)<Number(space.divider.thickness||6)/2+d.length/2){messages.push(instance.name+" đang giao với vách ngăn.");invalidIds.push(instance.instanceId);}
  instances.forEach(other=>{if(other.instanceId!==instance.instanceId&&other.inBox&&instance.inBox&&instancesCollide(instance,other)){messages.push(instance.name+" đang xuyên "+other.name+".");invalidIds.push(instance.instanceId,other.instanceId);}});
  if(instance.inBox&&v.bottom>space.floor+2){
    const supporters=instances.filter(other=>other.instanceId!==instance.instanceId&&other.inBox&&Math.abs(verticalRange(other).top-v.bottom)<=5&&horizontalOverlap(instance,other).ratio>=0.42);
    if(!supporters.length){messages.push(instance.name+" chưa có mặt đỡ và đang lơ lửng.");invalidIds.push(instance.instanceId);}
    else {
      const support=supporters.sort((a,b)=>horizontalOverlap(instance,b).ratio-horizontalOverlap(instance,a).ratio)[0];
      if(!support.profile.canSupport){messages.push(support.name+" không được khai báo làm mặt đỡ cho "+instance.name+".");invalidIds.push(instance.instanceId,support.instanceId);}
      if(Number(support.profile.maxLoad||0)>0&&instance.profile.weight>support.profile.maxLoad){messages.push(instance.name+" nặng hơn tải đỡ của "+support.name+".");invalidIds.push(instance.instanceId,support.instanceId);}
      if(horizontalOverlap(instance,support).ratio<0.55){messages.push(instance.name+" đang chồng lệch nhiều trên "+support.name+".");invalidIds.push(instance.instanceId);}
    }
  }
  return {messages,invalidIds};
}

export function validatePackingConfiguration(cfg,boxArg,lines){
  const box=boxArg||cfg.boxSnapshot, messages=[],invalidIds=[];
  const expected=new Map((lines||[]).map(line=>[line.item.id,Number(line.qty||0)]));
  if(lines){
    expected.forEach((qty,id)=>{const actual=cfg.instances.filter(x=>x.productId===id).length;if(actual!==qty)messages.push("Số lượng vật thể 3D chưa khớp lựa chọn sản phẩm.");});
  }
  cfg.instances.forEach(instance=>{const result=placementMessages(instance,cfg,box,cfg.instances);messages.push(...result.messages);invalidIds.push(...result.invalidIds);});
  const totalWeight=cfg.instances.reduce((sum,x)=>sum+Number(x.profile.weight||0),0);
  if(totalWeight>Number(box.maxWeight||Infinity)) messages.push("Tổng khối lượng vượt giới hạn hộp "+round(totalWeight-Number(box.maxWeight))+" g.");
  if(!cfg.instances.length) messages.push("Chưa có món nào để xếp.");
  const space=materialSpace(cfg), highest=Math.max(space.floor,...cfg.instances.filter(x=>x.inBox).map(x=>verticalRange(x).top));
  const usableHeight=Number(box.innerHeight||125)-Number(box.lidClearance||0)-space.top;
  return {
    valid:messages.length===0,messages:unique(messages),invalidIds:unique(invalidIds),
    totalWeight,weightLimit:Number(box.maxWeight||0),highest,usableHeight,lidClearanceMm:usableHeight-highest,
    checkedAt:new Date().toISOString(),method:"compound-collider-v1"
  };
}

function instanceListHtml(configuration,esc){
  return configuration.instances.map((instance,index)=>{
    const state=instance.inBox?"Trong hộp":"Khay chờ";
    return '<button class="pack-item-row '+(instance.instanceId===configuration.selectedId?"selected":"")+'" data-pack-select="'+instance.instanceId+'"><span class="pack-item-swatch" style="--item-color:'+instance.profile.color+'">'+(index+1)+'</span><span><strong>'+esc(instance.name)+'</strong><small>'+state+' · '+round(instance.profile.length)+'×'+round(instance.profile.width)+'×'+round(instance.profile.height)+' mm</small></span><em>'+(instance.locked?"Khóa":"")+'</em></button>';
  }).join("");
}

export function packingStudioMarkup(input){
  const cfg=input.configuration,box=input.box,esc=input.esc,money=input.money,materials=(input.materials||[]).filter(x=>x.active!==false);
  const syncNote=cfg.syncMessages?.length?'<div class="notice">'+cfg.syncMessages.map(esc).join("<br>")+'</div>':"";
  return '<div id="packing-studio" class="packing-studio">'+
    '<div class="pack-mobile-tabs"><button data-pack-panel="items">Món & chèn lót</button><button data-pack-panel="canvas" class="active">Bàn xếp</button><button data-pack-panel="tools">Công cụ</button></div>'+ 
    '<aside class="pack-panel pack-left" data-pack-section="items"><div class="pack-panel-head"><span class="eyebrow">Món đã chọn</span><a href="/tu-tao-hop" data-route>Thay đổi món</a></div>'+syncNote+
      '<div id="pack-instance-list" class="pack-instance-list">'+instanceListHtml(cfg,esc)+'</div>'+
      '<div class="pack-section"><div class="row spaced"><h3>Chèn lót</h3><span class="fine-print">Có tính không gian</span></div>'+materials.map(material=>'<label class="pack-material"><input type="checkbox" data-pack-material="'+material.id+'" '+(cfg.materials?.[material.id]?"checked":"")+'><span style="--material-color:'+material.color+'"></span><b>'+esc(material.name)+'</b><small>'+material.thickness+' mm · '+money(material.price)+'</small></label>').join("")+'</div>'+
      '<p class="fine-print">Giấy sợi chỉ là lớp trang trí/đệm, không mặc định chịu lực như tấm cứng.</p></aside>'+
    '<main class="pack-workspace" data-pack-section="canvas"><div class="pack-toolbar"><div><button data-pack-view="angle" class="active">Nghiêng</button><button data-pack-view="top">Từ trên</button><button data-pack-view="front">Cạnh trước</button><button data-pack-view="side">Cạnh bên</button></div><div><button data-pack-action="wall">'+(cfg.wallFade?"Hiện thành trước":"Làm mờ thành trước")+'</button><button data-pack-action="lid">Thử đóng nắp</button></div></div>'+
      '<div class="pack-canvas-wrap"><canvas id="pack-canvas" aria-label="Bàn xếp hộp quà 3D tương tác"></canvas><div class="pack-canvas-label"><strong>'+esc(box.name)+'</strong><span>Lòng '+box.innerLength+' × '+box.innerWidth+' × '+box.innerHeight+' mm</span></div><div id="pack-scene-status" class="pack-scene-status">Kéo nền để xoay camera · chọn món rồi kéo để di chuyển</div><div id="pack-lightweight" class="pack-lightweight" hidden></div></div>'+
      '<div class="pack-commandbar"><button data-pack-action="undo" aria-label="Hoàn tác">↶ Hoàn tác</button><button data-pack-action="redo" aria-label="Làm lại">↷ Làm lại</button><label><input type="checkbox" data-pack-action="snap" '+(cfg.snap?"checked":"")+'> Bắt lưới 10 mm</label><button data-pack-action="reset">Đặt lại bố cục</button></div>'+
      '<div class="pack-suggestions"><div><span class="eyebrow">Gợi ý xếp hộp</span><p>Chỉ dùng món, hướng và vị trí vượt qua bộ kiểm tra.</p></div><div class="row wrap"><button data-pack-suggest="visible">Dễ nhìn</button><button data-pack-suggest="flat">Ít xếp chồng</button><button data-pack-suggest="compact">Gọn trong hộp</button><button data-pack-action="apply-suggestion" class="button small-btn" hidden>Áp dụng</button><button data-pack-action="revert-suggestion" hidden>Quay lại bố cục cũ</button></div></div></main>'+
    '<aside class="pack-panel pack-right" data-pack-section="tools"><div id="pack-inspector"></div><div class="pack-checks"><button class="button secondary" data-pack-action="stability">Kiểm tra độ ổn định</button><div id="pack-validation" class="pack-validation" role="status"></div></div></aside>'+
    '<footer class="pack-footer"><div><span class="small">Tạm tính gồm vật liệu</span><strong id="pack-total">'+money(input.baseTotal+input.materialTotal)+'</strong></div><div id="pack-footer-status" class="pack-footer-status">Chưa kiểm tra bố cục</div><div class="row"><button class="button secondary" data-pack-action="save">Lưu hộp</button><button class="button" data-pack-action="finish">Xem lại & thêm giỏ</button></div></footer>'+
  '</div>';
}

const safeText = value => String(value??"").replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));

function createBoxMeshes(box,cfg){
  const group=new THREE.Group(),material=new THREE.MeshStandardMaterial({color:0xd8c5a7,roughness:.78,metalness:0});
  const frontMaterial=material.clone();frontMaterial.transparent=true;frontMaterial.opacity=cfg.wallFade?.14:.62;
  const length=Number(box.innerLength),width=Number(box.innerWidth),height=Number(box.innerHeight),wall=Number(box.wall||4),bottom=Number(box.bottom||4);
  const parts=[
    {name:"floor",size:[length+wall*2,bottom,width+wall*2],position:[0,-bottom/2,0],mat:material},
    {name:"back",size:[length+wall*2,height,wall],position:[0,height/2,-width/2-wall/2],mat:material},
    {name:"front",size:[length+wall*2,height,wall],position:[0,height/2,width/2+wall/2],mat:frontMaterial},
    {name:"left",size:[wall,height,width],position:[-length/2-wall/2,height/2,0],mat:material},
    {name:"right",size:[wall,height,width],position:[length/2+wall/2,height/2,0],mat:material}
  ];
  parts.forEach(part=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(...part.size),part.mat);mesh.name=part.name;mesh.position.set(...part.position);mesh.receiveShadow=true;mesh.castShadow=true;group.add(mesh);});
  const lid=new THREE.Mesh(new THREE.BoxGeometry(length+wall*2,wall,width+wall*2),new THREE.MeshStandardMaterial({color:0x8f2d3f,roughness:.68,transparent:true,opacity:.88}));
  lid.name="lid";lid.position.set(0,height+45,-width/2);lid.rotation.x=-Math.PI/2.5;lid.castShadow=true;group.add(lid);group.userData.lid=lid;group.userData.front=group.getObjectByName("front");
  return group;
}

function createMaterialMeshes(cfg,box){
  const group=new THREE.Group(),space=materialSpace(cfg);
  selectedMaterials(cfg).forEach(material=>{
    const color=new THREE.Color(material.color||"#ddd0ba");
    if(material.kind==="liner"||material.kind==="fiber"){
      const height=Number(material.thickness||2);
      const mesh=new THREE.Mesh(new THREE.BoxGeometry(Number(box.innerLength)-4,height,Number(box.innerWidth)-4),new THREE.MeshStandardMaterial({color,roughness:.95,transparent:material.kind==="fiber",opacity:material.kind==="fiber"?.72:1}));
      mesh.position.y=height/2;mesh.receiveShadow=true;group.add(mesh);
    }
    if(material.kind==="divider"){
      const thickness=Number(material.thickness||6);
      const mesh=new THREE.Mesh(new THREE.BoxGeometry(thickness,Number(box.innerHeight)*.72,Number(box.innerWidth)-8),new THREE.MeshStandardMaterial({color,roughness:.85}));
      mesh.position.y=space.floor+Number(box.innerHeight)*.36;mesh.receiveShadow=true;mesh.castShadow=true;group.add(mesh);
    }
    if(material.kind==="top"){
      const mesh=new THREE.Mesh(new THREE.BoxGeometry(Number(box.innerLength)-10,Number(material.thickness||8),Number(box.innerWidth)-10),new THREE.MeshStandardMaterial({color,transparent:true,opacity:.42,roughness:.9}));
      mesh.position.y=Number(box.innerHeight)-Number(material.thickness||8)/2-Number(box.lidClearance||0);group.add(mesh);
    }
  });
  return group;
}

function createItemMesh(instance){
  const p=instance.profile,geometry=p.shape==="cylinder"?
    new THREE.CylinderGeometry(p.length/2,p.length/2,p.height,32):
    new THREE.BoxGeometry(p.length,p.height,p.width);
  const material=new THREE.MeshStandardMaterial({color:new THREE.Color(p.color||"#a98372"),roughness:.66,metalness:.02,emissive:0x000000});
  const mesh=new THREE.Mesh(geometry,material);mesh.userData.instanceId=instance.instanceId;mesh.castShadow=true;mesh.receiveShadow=true;
  mesh.position.set(instance.x,instance.y,instance.z);mesh.rotation.set(rad(instance.rotX),rad(instance.rotY),rad(instance.rotZ));
  return mesh;
}

function setCameraView(camera,target,name,box){
  const length=Number(box.innerLength),width=Number(box.innerWidth),height=Number(box.innerHeight),distance=Math.max(length,width)*1.55;
  if(name==="top") camera.position.set(0,height+distance*.95,.01);
  else if(name==="front") camera.position.set(0,height*.55,distance);
  else if(name==="side") camera.position.set(distance,height*.55,0);
  else camera.position.set(distance*.78,height+distance*.32,distance*.78);
  target.set(0,height*.32,0);camera.lookAt(target);
}

function renderLightweight(root,cfg,box){
  const holder=root.querySelector("#pack-lightweight");if(!holder)return;
  holder.hidden=false;root.classList.add("is-lightweight");
  const length=Number(box.innerLength),width=Number(box.innerWidth);
  holder.innerHTML='<div class="lightweight-title"><strong>Sơ đồ nhìn trên</strong><span>Thiết bị không mở được WebGL; bạn vẫn có thể dùng nút di chuyển và kiểm tra hình học.</span></div><div class="lightweight-box">'+cfg.instances.filter(x=>x.inBox).map(instance=>{const d=dimensions(instance);const left=(instance.x-d.length/2+length/2)/length*100,top=(instance.z-d.width/2+width/2)/width*100;return '<button data-pack-select="'+instance.instanceId+'" style="left:'+left+'%;top:'+top+'%;width:'+d.length/length*100+'%;height:'+d.width/width*100+'%;background:'+instance.profile.color+'">'+safeText(instance.name)+'</button>';}).join("")+'</div>';
}

function findPlacement(instance,cfg,box,strategy){
  const original={x:instance.x,y:instance.y,z:instance.z,inBox:instance.inBox};
  const originalRotation=instance.rotY,space=materialSpace(cfg),halfL=Number(box.innerLength)/2,halfW=Number(box.innerWidth)/2,step=strategy==="compact"?10:15;
  const rotations=instance.profile.shape==="cylinder"?[originalRotation]:unique([originalRotation,Math.round(originalRotation/90)*90,(Math.round(originalRotation/90)*90+90)%360]);
  for(const rotation of rotations){
    instance.rotY=rotation;const d=dimensions(instance),pad=Number(instance.profile.padding||0),candidates=[];
    for(let z=-halfW+d.width/2+pad;z<=halfW-d.width/2-pad;z+=step){
      for(let x=-halfL+d.length/2+pad;x<=halfL-d.length/2-pad;x+=step)candidates.push({x,z,y:space.floor+d.height/2});
    }
    if(strategy==="visible") candidates.sort((a,b)=>b.z-a.z||Math.abs(a.x)-Math.abs(b.x));
    if(strategy==="flat") candidates.sort((a,b)=>(Math.abs(a.x)+Math.abs(a.z))-(Math.abs(b.x)+Math.abs(b.z)));
    if(strategy==="compact"){
      cfg.instances.filter(x=>x.inBox&&x.instanceId!==instance.instanceId&&x.profile.canSupport).forEach(support=>{const top=verticalRange(support).top;candidates.unshift({x:support.x,z:support.z,y:top+d.height/2});});
      candidates.sort((a,b)=>Math.hypot(a.x,a.z)-Math.hypot(b.x,b.z)||a.y-b.y);
    }
    for(const candidate of candidates){
      Object.assign(instance,candidate,{inBox:true});
      if(!placementMessages(instance,cfg,box,cfg.instances).messages.length)return candidate;
    }
  }
  Object.assign(instance,original);instance.rotY=originalRotation;return null;
}

export function mountPackingStudio(options){
  const root=options.root,cfg=options.configuration,box=options.box,lines=options.lines||[],materials=options.materials||[];
  root.dataset.mobilePanel="canvas";
  let renderer=null,scene=null,camera=null,target=new THREE.Vector3(),boxGroup=null,materialGroup=null,itemGroup=null,selectionHelper=null,resizeObserver=null,animation=0,destroyed=false;
  let selectedId=cfg.selectedId,drag=null,cameraDrag=null,theta=.75,phi=.95,radius=Math.max(Number(box.innerLength),Number(box.innerWidth))*1.55;
  const raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2(),dragPlane=new THREE.Plane(new THREE.Vector3(0,1,0),0),history=[],redo=[],meshes=new Map();
  let suggestionBackup=null,suggestionActive=false;

  const canvas=root.querySelector("#pack-canvas"),statusNode=root.querySelector("#pack-scene-status"),validationNode=root.querySelector("#pack-validation"),footerStatus=root.querySelector("#pack-footer-status"),totalNode=root.querySelector("#pack-total"),inspector=root.querySelector("#pack-inspector");
  const reportStatus=(message,type="")=>{if(statusNode){statusNode.textContent=message;statusNode.className="pack-scene-status "+type;}};
  const refreshTotal=()=>{if(totalNode)totalNode.textContent=options.money(Number(options.baseTotal||0)+materials.filter(material=>material.active!==false&&cfg.materials?.[material.id]).reduce((sum,material)=>sum+Number(material.price||0),0));};
  const snapshot=()=>({instances:clone(cfg.instances),materials:clone(cfg.materials),selectedId:cfg.selectedId,snap:cfg.snap,wallFade:cfg.wallFade});
  const restore=snap=>{cfg.instances=clone(snap.instances);cfg.materials=clone(snap.materials);cfg.selectedId=snap.selectedId;cfg.snap=snap.snap;cfg.wallFade=snap.wallFade;selectedId=cfg.selectedId;rebuild();options.onChange?.();};
  const remember=()=>{history.push(snapshot());if(history.length>40)history.shift();redo.length=0;};
  const selected=()=>cfg.instances.find(x=>x.instanceId===selectedId)||null;
  const meshFor=id=>meshes.get(id);
  const updateInstanceMesh=instance=>{const mesh=meshFor(instance.instanceId);if(!mesh)return;mesh.position.set(instance.x,instance.y,instance.z);mesh.rotation.set(rad(instance.rotX),rad(instance.rotY),rad(instance.rotZ));};

  function refreshList(){
    const list=root.querySelector("#pack-instance-list");if(list)list.innerHTML=instanceListHtml(cfg,safeText);
  }
  function refreshInspector(){
    const instance=selected();
    if(!instance){inspector.innerHTML='<span class="eyebrow">Công cụ</span><h3>Chọn một món để chỉnh</h3><p class="muted small">Bấm món trong danh sách hoặc trực tiếp trên canvas.</p>';return;}
    const d=dimensions(instance),v=verticalRange(instance),stateText=instance.inBox?"Trong hộp":"Ở khay chờ";
    inspector.innerHTML='<div class="pack-inspector-head"><span class="pack-item-swatch" style="--item-color:'+instance.profile.color+'"></span><div><span class="eyebrow">'+stateText+'</span><h3>'+safeText(instance.name)+'</h3><p>'+round(d.length)+' × '+round(d.width)+' × '+round(d.height)+' mm · '+round(instance.profile.weight)+' g</p></div></div>'+
      '<div class="pack-tool-group"><strong>Di chuyển 10 mm</strong><div class="move-pad"><span></span><button data-pack-nudge="z-">↑</button><span></span><button data-pack-nudge="x-">←</button><button data-pack-action="place">'+(instance.inBox?"Căn giữa":"Đưa vào hộp")+'</button><button data-pack-nudge="x+">→</button><span></span><button data-pack-nudge="z+">↓</button><span></span></div><div class="row wrap"><button data-pack-nudge="y+">Nâng +5</button><button data-pack-nudge="y-">Hạ −5</button></div></div>'+
      '<div class="pack-tool-group"><strong>Xoay & hướng đặt</strong><div class="row wrap"><button data-pack-rotate="-15">−15°</button><button data-pack-rotate="15">+15°</button><button data-pack-rotate="90">+90°</button><button data-pack-action="flip" '+(instance.profile.upright?"disabled":"")+'>Lật 90°</button></div></div>'+
      '<details class="pack-advanced"><summary>Vị trí chính xác</summary><div class="pack-coordinate-grid"><label>X<input data-pack-coordinate="x" type="number" value="'+round(instance.x)+'"></label><label>Y<input data-pack-coordinate="y" type="number" value="'+round(instance.y)+'"></label><label>Z<input data-pack-coordinate="z" type="number" value="'+round(instance.z)+'"></label><label>Góc<input data-pack-coordinate="rotY" type="number" value="'+round(instance.rotY)+'"></label></div><button data-pack-action="apply-coordinates">Áp dụng tọa độ</button></details>'+
      '<div class="pack-tool-group row wrap"><button data-pack-action="lock">'+(instance.locked?"Mở khóa vị trí":"Khóa vị trí")+'</button><button data-pack-action="tray" '+(!instance.inBox?"disabled":"")+'>Đưa về khay</button><button data-pack-action="delete" class="danger-text">Xóa khỏi cấu hình</button></div>'+
      '<p class="fine-print">'+(instance.profile.upright?"Món này phải giữ đứng. ":"")+(instance.profile.fragile?"Nhãn dễ vỡ. ":"")+(instance.profile.canSupport?"Có thể làm mặt đỡ tối đa "+instance.profile.maxLoad+" g.":"Không dùng làm mặt đỡ.")+'</p>';
  }
  function selectInstance(id){
    selectedId=id;cfg.selectedId=id;refreshList();refreshInspector();
    if(selectionHelper){scene?.remove(selectionHelper);selectionHelper.geometry?.dispose();selectionHelper.material?.dispose();selectionHelper=null;}
    const mesh=meshFor(id);if(mesh&&scene){selectionHelper=new THREE.BoxHelper(mesh,0x8f2d3f);scene.add(selectionHelper);}
  }
  function paintValidation(report){
    cfg.instances.forEach(instance=>{
      const mesh=meshFor(instance.instanceId);if(!mesh)return;
      const invalid=report.invalidIds.includes(instance.instanceId);mesh.material.emissive.setHex(invalid?0x741426:instance.instanceId===selectedId?0x3d171e:0x000000);mesh.material.emissiveIntensity=invalid ? .7 : (instance.instanceId===selectedId ? .23 : 0);
    });
    if(selectionHelper)selectionHelper.update();
    if(footerStatus){footerStatus.textContent=report.valid?"Bố cục hợp lệ · nắp còn "+round(report.lidClearanceMm)+" mm":report.messages.length+" điểm cần sửa";footerStatus.className="pack-footer-status "+(report.valid?"valid":"invalid");}
    return report;
  }
  function currentReport(show=false){
    const report=validatePackingConfiguration(cfg,box,lines);paintValidation(report);
    if(show&&validationNode)validationNode.innerHTML=report.valid?'<div class="notice success"><strong>Bố cục vượt qua kiểm tra demo.</strong><br>Khối lượng '+round(report.totalWeight)+'/'+round(report.weightLimit)+' g · khoảng nắp '+round(report.lidClearanceMm)+' mm.</div>':'<div class="notice error"><strong>Cần sửa trước khi hoàn tất:</strong><ul>'+report.messages.slice(0,8).map(message=>'<li>'+safeText(message)+'</li>').join("")+'</ul></div>';
    cfg.lastValidation=report;cfg.validatedAt=report.checkedAt;return report;
  }
  function notifyChange(message){
    cfg.updatedAt=new Date().toISOString();options.onChange?.();refreshList();refreshInspector();currentReport(false);if(message)reportStatus(message);
  }
  function rebuild(){
    if(!scene){renderLightweight(root,cfg,box);refreshList();refreshInspector();currentReport(false);return;}
    if(boxGroup)scene.remove(boxGroup);if(materialGroup)scene.remove(materialGroup);if(itemGroup)scene.remove(itemGroup);if(selectionHelper){scene.remove(selectionHelper);selectionHelper=null;}
    meshes.clear();boxGroup=createBoxMeshes(box,cfg);materialGroup=createMaterialMeshes(cfg,box);itemGroup=new THREE.Group();
    cfg.instances.forEach(instance=>{const mesh=createItemMesh(instance);meshes.set(instance.instanceId,mesh);itemGroup.add(mesh);});
    scene.add(boxGroup,materialGroup,itemGroup);selectInstance(selectedId);currentReport(false);
  }
  function mutateSelected(mutator,message){
    const instance=selected();if(!instance||instance.locked)return reportStatus(instance?.locked?"Món đang bị khóa vị trí.":"Hãy chọn một món.","invalid");
    remember();mutator(instance);updateInstanceMesh(instance);notifyChange(message);
  }
  function trayPosition(instance){
    const index=cfg.instances.indexOf(instance),column=index%3,row=Math.floor(index/3);return {x:-Number(box.innerLength)/2-85-column*78,y:dimensions(instance).height/2,z:-Number(box.innerWidth)/2+45+row*70};
  }
  function placeSelected(strategy="flat"){
    const instance=selected();if(!instance||instance.locked)return;
    remember();const result=findPlacement(instance,cfg,box,strategy);
    if(!result){const tray=trayPosition(instance);Object.assign(instance,tray,{inBox:false});reportStatus("Chưa tìm được vị trí hợp lệ. Hãy đổi hộp, giảm món hoặc điều chỉnh chèn lót.","invalid");}
    else reportStatus("Đã đặt "+instance.name+" vào vị trí hợp lệ gần nhất.","valid");
    updateInstanceMesh(instance);notifyChange();
  }

  try{
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,preserveDrawingBuffer:true});
    renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;
    scene=new THREE.Scene();scene.background=new THREE.Color(0xf1eee8);
    camera=new THREE.PerspectiveCamera(38,1,1,4000);setCameraView(camera,target,"angle",box);
    scene.add(new THREE.HemisphereLight(0xfff9ef,0x6f6259,2.2));
    const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(240,420,260);key.castShadow=true;key.shadow.mapSize.set(1024,1024);scene.add(key);
    const fill=new THREE.DirectionalLight(0xe7c8cd,1.1);fill.position.set(-220,180,-160);scene.add(fill);
    const ground=new THREE.Mesh(new THREE.PlaneGeometry(1800,1200),new THREE.ShadowMaterial({opacity:.13}));ground.rotation.x=-Math.PI/2;ground.position.y=-Number(box.bottom||4)-.5;ground.receiveShadow=true;scene.add(ground);
    rebuild();
    resizeObserver=new ResizeObserver(()=>{const rect=canvas.getBoundingClientRect();renderer.setSize(Math.max(1,rect.width),Math.max(1,rect.height),false);camera.aspect=Math.max(1,rect.width)/Math.max(1,rect.height);camera.updateProjectionMatrix();});resizeObserver.observe(canvas);
    const animate=()=>{if(destroyed)return;animation=requestAnimationFrame(animate);renderer.render(scene,camera);};animate();
  }catch(error){
    console.warn("WebGL không khả dụng, chuyển sang sơ đồ nhẹ.",error);renderer=null;scene=null;renderLightweight(root,cfg,box);reportStatus("Đang dùng sơ đồ nhìn trên vì WebGL không khả dụng.","invalid");
  }

  function ndcFromEvent(event){const rect=canvas.getBoundingClientRect();pointer.x=(event.clientX-rect.left)/rect.width*2-1;pointer.y=-(event.clientY-rect.top)/rect.height*2+1;return pointer;}
  function rayFromEvent(event){raycaster.setFromCamera(ndcFromEvent(event),camera);return raycaster;}
  function onPointerDown(event){
    if(!renderer)return;canvas.setPointerCapture?.(event.pointerId);const intersections=rayFromEvent(event).intersectObjects([...meshes.values()],false);
    if(intersections.length){
      const id=intersections[0].object.userData.instanceId;selectInstance(id);const instance=selected();
      if(!instance.locked){remember();dragPlane.set(new THREE.Vector3(0,1,0),-instance.y);const hit=new THREE.Vector3();raycaster.ray.intersectPlane(dragPlane,hit);drag={id,start:{x:instance.x,y:instance.y,z:instance.z},offset:{x:instance.x-hit.x,z:instance.z-hit.z},pointerId:event.pointerId};reportStatus("Đang di chuyển "+instance.name+". Camera tạm khóa.");}
    }else cameraDrag={x:event.clientX,y:event.clientY,pointerId:event.pointerId};
  }
  function onPointerMove(event){
    if(drag&&drag.pointerId===event.pointerId){
      const instance=cfg.instances.find(x=>x.instanceId===drag.id),hit=new THREE.Vector3();rayFromEvent(event).ray.intersectPlane(dragPlane,hit);
      let x=hit.x+drag.offset.x,z=hit.z+drag.offset.z;if(cfg.snap){x=Math.round(x/10)*10;z=Math.round(z/10)*10;}
      instance.x=x;instance.z=z;instance.inBox=true;updateInstanceMesh(instance);const report=validatePackingConfiguration(cfg,box,lines);paintValidation(report);return;
    }
    if(cameraDrag&&cameraDrag.pointerId===event.pointerId){
      theta-=(event.clientX-cameraDrag.x)*.008;phi=clamp(phi+(event.clientY-cameraDrag.y)*.008,.18,1.48);cameraDrag.x=event.clientX;cameraDrag.y=event.clientY;
      camera.position.set(target.x+radius*Math.sin(phi)*Math.cos(theta),target.y+radius*Math.cos(phi),target.z+radius*Math.sin(phi)*Math.sin(theta));camera.lookAt(target);
    }
  }
  function onPointerUp(event){
    if(drag&&drag.pointerId===event.pointerId){
      const instance=cfg.instances.find(x=>x.instanceId===drag.id),result=placementMessages(instance,cfg,box,cfg.instances);
      if(result.messages.length){Object.assign(instance,drag.start);updateInstanceMesh(instance);history.pop();reportStatus("Vị trí chưa hợp lệ; món đã trở về vị trí trước.","invalid");}
      else {redo.length=0;notifyChange("Đã đặt "+instance.name+".");}
      drag=null;
    }
    cameraDrag=null;canvas.releasePointerCapture?.(event.pointerId);
  }
  function onWheel(event){if(!renderer)return;event.preventDefault();radius=clamp(radius+event.deltaY*.35,Math.max(Number(box.innerLength),Number(box.innerWidth))*.75,1200);camera.position.sub(target).setLength(radius).add(target);camera.lookAt(target);}
  canvas?.addEventListener("pointerdown",onPointerDown);canvas?.addEventListener("pointermove",onPointerMove);canvas?.addEventListener("pointerup",onPointerUp);canvas?.addEventListener("pointercancel",onPointerUp);canvas?.addEventListener("wheel",onWheel,{passive:false});

  function createSuggestion(strategy){
    if(suggestionActive&&suggestionBackup)restore(suggestionBackup);
    suggestionBackup=snapshot();remember();
    const ordered=[...cfg.instances].sort((a,b)=>b.profile.length*b.profile.width-a.profile.length*a.profile.width);
    let failed=null;
    for(const instance of ordered){
      if(instance.locked&&instance.inBox)continue;
      instance.rotX=0;instance.rotZ=0;if(strategy!=="visible")instance.rotY=Math.round(instance.rotY/90)*90;
      const position=findPlacement(instance,cfg,box,strategy);if(!position){failed=instance;break;}
    }
    const report=validatePackingConfiguration(cfg,box,lines);
    if(failed||!report.valid){restore(suggestionBackup);suggestionBackup=null;suggestionActive=false;history.pop();reportStatus("Chưa tìm được phương án trong thời gian demo. Hãy thử hộp lớn hơn, giảm chèn lót hoặc mở khóa món.","invalid");return;}
    suggestionActive=true;rebuild();root.querySelector('[data-pack-action="apply-suggestion"]').hidden=false;root.querySelector('[data-pack-action="revert-suggestion"]').hidden=false;reportStatus("Đang xem trước gợi ý “"+(strategy==="visible"?"Dễ nhìn":strategy==="flat"?"Ít xếp chồng":"Gọn trong hộp")+"”. Chọn Áp dụng hoặc Quay lại.","valid");
  }

  function closeLid(){
    const report=currentReport(true),lid=boxGroup?.userData?.lid;if(!lid)return;
    if(!report.valid){lid.material.color.setHex(0x9f1d31);reportStatus("Nắp bị cấn hoặc bố cục chưa hợp lệ. Các món gây vướng đã được đánh dấu.","invalid");return;}
    lid.material.color.setHex(0x8f2d3f);const start=performance.now(),fromY=lid.position.y,toY=Number(box.innerHeight)+Number(box.wall||4)/2;
    const animateLid=now=>{const t=clamp((now-start)/520,0,1),ease=1-(1-t)*(1-t);lid.position.y=fromY+(toY-fromY)*ease;lid.position.z=-Number(box.innerWidth)/2+(Number(box.innerWidth)/2)*ease;lid.rotation.x=-Math.PI/2.5*(1-ease);if(t<1)requestAnimationFrame(animateLid);else reportStatus("Nắp đóng được theo kiểm tra hình học demo. Còn "+round(report.lidClearanceMm)+" mm.","valid");};requestAnimationFrame(animateLid);
  }

  function handleRootClick(event){
    const selectButton=event.target.closest("[data-pack-select]");if(selectButton){selectInstance(selectButton.dataset.packSelect);return;}
    const view=event.target.closest("[data-pack-view]");if(view&&camera){root.querySelectorAll("[data-pack-view]").forEach(x=>x.classList.toggle("active",x===view));setCameraView(camera,target,view.dataset.packView,box);return;}
    const suggest=event.target.closest("[data-pack-suggest]");if(suggest){createSuggestion(suggest.dataset.packSuggest);return;}
    const nudge=event.target.closest("[data-pack-nudge]");if(nudge){const key=nudge.dataset.packNudge;mutateSelected(instance=>{const amount=key.startsWith("y")?5:10;if(key==="x-")instance.x-=amount;if(key==="x+")instance.x+=amount;if(key==="z-")instance.z-=amount;if(key==="z+")instance.z+=amount;if(key==="y-")instance.y=Math.max(dimensions(instance).height/2,instance.y-amount);if(key==="y+")instance.y+=amount;instance.inBox=true;},"Đã dịch chuyển món.");return;}
    const rotate=event.target.closest("[data-pack-rotate]");if(rotate){mutateSelected(instance=>{instance.rotY=(instance.rotY+Number(rotate.dataset.packRotate))%360;},"Đã xoay món.");return;}
    const action=event.target.closest("[data-pack-action]");if(!action)return;const type=action.dataset.packAction;
    if(type==="place")return placeSelected("flat");
    if(type==="flip")return mutateSelected(instance=>{if(!instance.profile.upright)instance.rotX=(instance.rotX+90)%180;},"Đã đổi hướng đặt.");
    if(type==="lock")return mutateSelected(instance=>{instance.locked=!instance.locked;},"Đã cập nhật khóa vị trí.");
    if(type==="tray")return mutateSelected(instance=>{Object.assign(instance,trayPosition(instance),{inBox:false});},"Đã đưa món về khay chờ.");
    if(type==="delete"){const instance=selected();if(!instance)return;if(!confirm("Xóa một đơn vị "+instance.name+" khỏi cấu hình và danh sách món?"))return;options.onDeleteInstance?.(instance);return;}
    if(type==="apply-coordinates")return mutateSelected(instance=>{root.querySelectorAll("[data-pack-coordinate]").forEach(input=>{const value=Number(input.value);if(Number.isFinite(value))instance[input.dataset.packCoordinate]=value;});instance.inBox=true;},"Đã áp dụng tọa độ.");
    if(type==="undo"&&history.length){redo.push(snapshot());restore(history.pop());reportStatus("Đã hoàn tác.");return;}
    if(type==="redo"&&redo.length){history.push(snapshot());restore(redo.pop());reportStatus("Đã làm lại.");return;}
    if(type==="wall"&&boxGroup){cfg.wallFade=!cfg.wallFade;boxGroup.userData.front.material.opacity=cfg.wallFade?.14:.62;action.textContent=cfg.wallFade?"Hiện thành trước":"Làm mờ thành trước";options.onChange?.();return;}
    if(type==="lid")return closeLid();
    if(type==="stability"){const report=currentReport(true);reportStatus(report.valid?"Bố cục ổn định theo dữ liệu demo.":"Đã phát hiện điểm cần sửa.",report.valid?"valid":"invalid");return;}
    if(type==="reset"){if(!confirm("Đặt toàn bộ món về khay chờ?"))return;remember();cfg.instances.forEach(instance=>Object.assign(instance,trayPosition(instance),{inBox:false,locked:false,rotX:0,rotY:0,rotZ:0}));rebuild();notifyChange("Đã đặt lại bố cục.");return;}
    if(type==="save"){cfg.lastValidation=currentReport(false);options.onSave?.();return;}
    if(type==="finish"){const report=currentReport(true);if(!report.valid){reportStatus("Chưa thể thêm giỏ: hãy sửa các điểm được liệt kê.","invalid");return;}const screenshot=renderer?renderer.domElement.toDataURL("image/jpeg",.72):"";options.onAddToCart?.({screenshot,report});return;}
    if(type==="apply-suggestion"&&suggestionActive){suggestionActive=false;suggestionBackup=null;action.hidden=true;root.querySelector('[data-pack-action="revert-suggestion"]').hidden=true;notifyChange("Đã áp dụng gợi ý.");return;}
    if(type==="revert-suggestion"&&suggestionBackup){restore(suggestionBackup);suggestionBackup=null;suggestionActive=false;action.hidden=true;root.querySelector('[data-pack-action="apply-suggestion"]').hidden=true;reportStatus("Đã quay lại bố cục cũ.");return;}
  }
  root.addEventListener("click",handleRootClick);
  root.querySelectorAll("[data-pack-material]").forEach(input=>input.addEventListener("change",()=>{remember();cfg.materials[input.dataset.packMaterial]=input.checked;refreshTotal();rebuild();notifyChange("Đã cập nhật chèn lót; không gian hữu dụng đã được tính lại.");}));
  root.querySelector('[data-pack-action="snap"]')?.addEventListener("change",event=>{cfg.snap=event.target.checked;options.onChange?.();});
  root.querySelectorAll("[data-pack-panel]").forEach(button=>button.addEventListener("click",()=>{root.dataset.mobilePanel=button.dataset.packPanel;root.querySelectorAll("[data-pack-panel]").forEach(x=>x.classList.toggle("active",x===button));}));
  refreshInspector();currentReport(false);

  return {destroy(){destroyed=true;cancelAnimationFrame(animation);resizeObserver?.disconnect();canvas?.removeEventListener("pointerdown",onPointerDown);canvas?.removeEventListener("pointermove",onPointerMove);canvas?.removeEventListener("pointerup",onPointerUp);canvas?.removeEventListener("pointercancel",onPointerUp);canvas?.removeEventListener("wheel",onWheel);root.removeEventListener("click",handleRootClick);scene?.traverse(object=>{object.geometry?.dispose?.();if(Array.isArray(object.material))object.material.forEach(m=>m.dispose?.());else object.material?.dispose?.();});renderer?.dispose?.();}};
}

export function mountReadonlyPackingPreview(options){
  const root=options.root,canvas=options.canvas,cfg=options.configuration,box=cfg.boxSnapshot;let renderer,scene,camera,target=new THREE.Vector3(),boxGroup,materialGroup,itemGroup,animation=0,destroyed=false,resizeObserver;
  try{
    renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.5));renderer.shadowMap.enabled=true;renderer.outputColorSpace=THREE.SRGBColorSpace;
    scene=new THREE.Scene();scene.background=new THREE.Color(0xf1eee8);camera=new THREE.PerspectiveCamera(38,1,1,4000);
    scene.add(new THREE.HemisphereLight(0xfff9ef,0x6f6259,2.2));const light=new THREE.DirectionalLight(0xffffff,3);light.position.set(220,360,220);light.castShadow=true;scene.add(light);
    boxGroup=createBoxMeshes(box,{...cfg,wallFade:true});materialGroup=createMaterialMeshes(cfg,box);itemGroup=new THREE.Group();cfg.instances.forEach(instance=>{if(instance.inBox)itemGroup.add(createItemMesh(instance));});scene.add(boxGroup,materialGroup,itemGroup);setCameraView(camera,target,"angle",box);
    resizeObserver=new ResizeObserver(()=>{const rect=canvas.getBoundingClientRect();renderer.setSize(Math.max(1,rect.width),Math.max(1,rect.height),false);camera.aspect=Math.max(1,rect.width)/Math.max(1,rect.height);camera.updateProjectionMatrix();});resizeObserver.observe(canvas);
    const animate=()=>{if(destroyed)return;animation=requestAnimationFrame(animate);itemGroup.rotation.y+=.0012;renderer.render(scene,camera);};animate();
  }catch(error){canvas.replaceWith(Object.assign(document.createElement("div"),{className:"notice error",textContent:"Không thể mở WebGL. Hãy dùng ảnh chụp và danh sách tọa độ."}));}
  const onClick=event=>{const button=event.target.closest("[data-preview-view]");if(button&&camera)setCameraView(camera,target,button.dataset.previewView,box);};root.addEventListener("click",onClick);
  return {destroy(){destroyed=true;cancelAnimationFrame(animation);resizeObserver?.disconnect();root.removeEventListener("click",onClick);scene?.traverse(object=>{object.geometry?.dispose?.();if(Array.isArray(object.material))object.material.forEach(m=>m.dispose?.());else object.material?.dispose?.();});renderer?.dispose?.();}};
}
