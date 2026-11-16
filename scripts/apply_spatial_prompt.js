const fs = require('fs');

const filePath = 'C:/Users/DELL/Documents/Codex/2026-11-14/files-pasted-by-the-user-prompt/goi-thuong-site/dist/app.js';
let content = fs.readFileSync(filePath, 'utf8');

const targetFunction = `function getProductFormFactor(p) {
  const m = p?.model3d || {};
  const cat = String(p?.category || "").toLowerCase();
  const name = String(p?.name || "").toLowerCase();
  const shape = String(m.shape || "box").toLowerCase();
  const length = Number(m.length || 100);
  const width = Number(m.width || 70);
  const height = Number(m.height || 45);

  if (cat.includes("socola") || name.includes("socola") || name.includes("chocolate")) {
    return "FLAT RECTANGULAR CHOCOLATE BAR PACKAGING / PAPERBOARD SLAB (strictly thin flat rectangular bar, NOT a jar, NOT a bottle, NOT cylindrical)";
  }
  if (cat.includes("nến") || name.includes("nến") || name.includes("candle") || shape === "cylinder") {
    return "CYLINDRICAL GLASS JAR CANDLE with round screw lid";
  }
  if (cat.includes("trà") || name.includes("trà") || name.includes("tea")) {
    return "RECTANGULAR TEA TIN / PAPER BOX";
  }
  if (shape === "cylinder") {
    return "CYLINDRICAL JAR / ROUND CONTAINER";
  }
  if (height < Math.min(length, width) * 0.4) {
    return "FLAT RECTANGULAR BOX / PAPERBOARD SLAB (thin and flat rectangular packaging, NOT a jar)";
  }
  return "RECTANGULAR BOX PACKAGING";
}

function buildFluxImagePrompt(validatedLayout, builderData, activeRefs) {
  const { box, lines, card, ribbon } = builderData;
  const materials = selectedBuilderMaterials();
  
  const refMap = activeRefs.map((line, idx) => {
    const form = getProductFormFactor(line.item);
    return \`- Input image \${idx} represents productId=\${line.item.id}, product name=\${line.item.name}. Form factor: \${form}. Must strictly preserve this reference image's flat or jar packaging geometry.\`;
  }).join("\\n");
  
  const productList = lines.map(line => {
    const p = line.item;
    const m = p.model3d || {};
    const form = getProductFormFactor(p);
    return \`- \${p.name} (productId=\${p.id}): Quantity \${line.qty}, form factor: [\${form}], dimensions \${Math.round(m.length || 100)} × \${Math.round(m.width || 70)} × \${Math.round(m.height || 45)} mm, weight \${Math.round(m.weight || 100)}g.\`;
  }).join("\\n");
  
  const placementList = validatedLayout.configuration.instances.map((inst, idx) => {
    const rot = Number(inst.rotY || 0);
    const rotDeg = Math.abs(rot) > 45 ? 90 : 0;
    const p = lines.find(l => l.item.id === inst.productId)?.item;
    const form = p ? getProductFormFactor(p) : "packaging box";
    return \`- Item \${idx + 1} (\${inst.name}, productId=\${inst.productId}): Shape is [\${form}], Position X=\${Math.round(inst.x)}mm, Z=\${Math.round(inst.z)}mm, floor rotation=\${rotDeg} degrees, front label facing directly UP towards camera.\`;
  }).join("\\n");
  
  const materialsDesc = materials.length ? materials.map(m => \`\${m.name} (\${m.kind}, \${m.thickness}mm)\`).join(", ") : "No decorative fillers";
  const cardDesc = card?.name ? \`\${card.name}\${state.builder.message ? \` with card note: "\${state.builder.message}"\` : ""}\` : "No card";
  const ribbonDesc = ribbon?.name || "No ribbon";
  const basePrompt = state.admin.ai?.imagePrompt || DEFAULT_AI_IMAGE_PROMPT;

  return \`Create exactly one photorealistic premium e-commerce product photograph of the completed open gift box.

\${basePrompt}

REFERENCE IMAGE MAPPING:
\${refMap}

Each reference image is the mandatory visual identity of that product. Preserve its exact packaging shape, color palette, front label and recognizable appearance.

VALIDATED BOX:
- Box name: \${box.name}
- Inner dimensions: \${box.innerLength} × \${box.innerWidth} × \${box.innerHeight} millimeters.
- Box color and finish: \${box.color || "Natural kraft"}, \${box.finish || "Matte cardboard"}
- Lid: open and visible beside or behind the box.

VALIDATED PRODUCTS:
\${productList}

VALIDATED PLACEMENT:
\${placementList}

PACKAGING:
- Fillers: \${materialsDesc}
- Card: \${cardDesc}
- Ribbon: \${ribbonDesc}

STRICT RULES:
1. Preserve the exact product types, quantities, and distinct individual packaging geometry.
2. CRITICAL FORM FACTOR RULE: Strictly preserve each product's individual packaging shape. Chocolate bars MUST appear as flat thin rectangular paperboard boxes or slabs, NEVER as round jars, cans, or bottles. Cylindrical jars (candles) and flat rectangular items (chocolate bars) must coexist with their distinct true shapes. DO NOT homogenize or turn rectangular bars into jars!
3. Do not add, remove, duplicate, or hallucinate extra items.
4. Front label and main face of all products must face upward towards the camera.
5. Respect the relative physical millimeter scale and placement coordinates in the box.
6. Clean luxury product photography, soft natural studio lighting, no diagrams, no text overlays, no arrows.\`;
}`;

const replacementFunction = `function getProductFormFactor(p) {
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
  
  let hPos = "horizontal CENTER";
  if (x < -halfL * 0.2) hPos = "LEFT side";
  else if (x > halfL * 0.2) hPos = "RIGHT side";

  let vPos = "middle";
  if (z < -halfW * 0.2) vPos = "TOP / BACK area";
  else if (z > halfW * 0.2) vPos = "BOTTOM / FRONT area";

  if (hPos.includes("LEFT") && vPos.includes("TOP")) return "TOP-LEFT quadrant of the box";
  if (hPos.includes("LEFT") && vPos.includes("BOTTOM")) return "BOTTOM-LEFT quadrant of the box";
  if (hPos.includes("RIGHT") && vPos.includes("TOP")) return "TOP-RIGHT quadrant of the box";
  if (hPos.includes("RIGHT") && vPos.includes("BOTTOM")) return "BOTTOM-RIGHT quadrant of the box";
  if (hPos.includes("LEFT")) return "LEFT side of the box";
  if (hPos.includes("RIGHT")) return "RIGHT side of the box";
  if (vPos.includes("TOP")) return "TOP / BACK center area of the box";
  if (vPos.includes("BOTTOM")) return "BOTTOM / FRONT center area of the box";
  return "CENTER of the box";
}

function buildFluxImagePrompt(validatedLayout, builderData, activeRefs) {
  const { box, lines, card, ribbon } = builderData;
  const materials = selectedBuilderMaterials();
  
  const refMap = activeRefs.map((line, idx) => {
    const form = getProductFormFactor(line.item);
    return \`- Input image \${idx} represents productId=\${line.item.id}, product name=\${line.item.name}. Packaging form: \${form}. Model MUST preserve this exact packaged appearance and shape from the reference image.\`;
  }).join("\\n");
  
  const productList = lines.map(line => {
    const p = line.item;
    const m = p.model3d || {};
    const form = getProductFormFactor(p);
    return \`- \${p.name} (productId=\${p.id}): Quantity \${line.qty}, Packaging form: [\${form}], dimensions \${Math.round(m.length || 100)} × \${Math.round(m.width || 70)} × \${Math.round(m.height || 45)} mm, weight \${Math.round(m.weight || 100)}g.\`;
  }).join("\\n");
  
  const placementList = validatedLayout.configuration.instances.map((inst, idx) => {
    const rot = Number(inst.rotY || 0);
    const rotDeg = Math.abs(rot) > 45 ? 90 : 0;
    const p = lines.find(l => l.item.id === inst.productId)?.item;
    const form = p ? getProductFormFactor(p) : "packaging box";
    const zone = getSpatialZone(inst.x, inst.z, box.innerLength, box.innerWidth);
    return \`- Item \${idx + 1} (\${inst.name}, productId=\${inst.productId}): Placed in the [\${zone}] (approx coordinates X=\${Math.round(inst.x)}mm, Z=\${Math.round(inst.z)}mm), orientation \${rotDeg} degrees, main front label facing UP towards camera. Packaging type: [\${form}].\`;
  }).join("\\n");
  
  const materialsDesc = materials.length ? materials.map(m => \`\${m.name} (\${m.kind}, \${m.thickness}mm)\`).join(", ") : "Kraft shredded paper filler";
  const cardDesc = card?.name ? \`\${card.name}\${state.builder.message ? \` with printed note: "\${state.builder.message}"\` : ""}\` : "No card";
  const ribbonDesc = ribbon?.name ? \`\${ribbon.name} tied neatly as an accent\` : "No ribbon";
  const basePrompt = state.admin.ai?.imagePrompt || DEFAULT_AI_IMAGE_PROMPT;

  return \`Create exactly one photorealistic premium e-commerce product photograph of the completed open gift box.

\${basePrompt}

REFERENCE IMAGE MAPPING:
\${refMap}

Each reference image is the mandatory visual identity of that product. Preserve its exact retail packaging carton/pouch, color palette, front label and recognizable appearance.

VALIDATED BOX:
- Box name: \${box.name}
- Inner dimensions: \${box.innerLength} × \${box.innerWidth} × \${box.innerHeight} millimeters.
- Box color and finish: \${box.color || "Natural kraft"}, \${box.finish || "Matte cardboard"}
- Lid: open and visible beside or behind the box.

VALIDATED PRODUCTS (EXACTLY \${lines.length} PRODUCTS ONLY):
\${productList}

MANDATORY SPATIAL PLACEMENT:
\${placementList}

PACKAGING:
- Fillers: \${materialsDesc}
- Card: \${cardDesc}
- Ribbon: \${ribbonDesc}

CRITICAL RULES:
1. STRICT PRODUCT COUNT & IDENTITY: Render ONLY the \${lines.length} items listed above. DO NOT hallucinate, invent, or add extra bottles, canisters, cylinders, or gift items!
2. RETAIL PACKAGING INTEGRITY: All products must appear inside their official SEALED retail packaging boxes or pouches as shown in the reference images. DO NOT render bare unpackaged food, raw chocolate squares, or open contents!
3. PRESERVE PACKAGING SHAPES: Flat chocolate boxes must appear as flat rectangular boxes lying in their assigned quadrant. Cylindrical jars (candle) must appear as jars in their assigned quadrant. Do not convert flat boxes into jars!
4. RESPECT SPATIAL ZONES: Items specified in the LEFT side must appear on the left; items specified in the RIGHT side must appear on the right; items in the TOP/BACK must appear in the top/back; items in the BOTTOM/FRONT must appear in the bottom/front.
5. All front labels must face upwards towards the camera. Clean luxury e-commerce studio lighting, top-down perspective, no watermarks, no diagrams.\`;
}`;

if (!content.includes(targetFunction)) {
  console.error("Target function not found!");
  process.exit(1);
}

content = content.replace(targetFunction, replacementFunction);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Updated buildFluxImagePrompt successfully with spatial zones and strict packaging rules!");
