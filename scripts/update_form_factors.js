const fs = require('fs');

const filePath = 'C:/Users/DELL/Documents/Codex/2026-11-14/files-pasted-by-the-user-prompt/goi-thuong-site/dist/app.js';
let content = fs.readFileSync(filePath, 'utf8');

const targetFunction = `function buildFluxImagePrompt(validatedLayout, builderData, activeRefs) {
  const { box, lines, card, ribbon } = builderData;
  const materials = selectedBuilderMaterials();
  
  const refMap = activeRefs.map((line, idx) => {
    return \`- Input image \${idx} represents productId=\${line.item.id}, product name=\${line.item.name}.\`;
  }).join("\\n");
  
  const productList = lines.map(line => {
    const p = line.item;
    const m = p.model3d || {};
    return \`- \${p.name} (productId=\${p.id}): Quantity \${line.qty}, dimensions \${Math.round(m.length || 100)} × \${Math.round(m.width || 70)} × \${Math.round(m.height || 45)} mm, weight \${Math.round(m.weight || 100)}g.\`;
  }).join("\\n");
  
  const placementList = validatedLayout.configuration.instances.map((inst, idx) => {
    const rot = Number(inst.rotY || 0);
    const rotDeg = Math.abs(rot) > 45 ? 90 : 0;
    return \`- Item \${idx + 1} (\${inst.name}, productId=\${inst.productId}): Position X=\${Math.round(inst.x)}mm, Z=\${Math.round(inst.z)}mm, floor rotation=\${rotDeg} degrees, front label facing directly UP towards camera.\`;
  }).join("\\n");
  
  const materialsDesc = materials.length ? materials.map(m => \`\${m.name} (\${m.kind}, \${m.thickness}mm)\`).join(", ") : "No decorative fillers";
  const cardDesc = card?.name ? \`\${card.name}\${state.builder.message ? \` with card note: "\${state.builder.message}"\` : ""}\` : "No card";
  const ribbonDesc = ribbon?.name || "No ribbon";
  const basePrompt = state.admin.ai?.imagePrompt || DEFAULT_AI_IMAGE_PROMPT;

  return \`Create exactly one photorealistic premium e-commerce product photograph of the completed open gift box.

\${basePrompt}

REFERENCE IMAGE MAPPING:
\${refMap}

Each reference image is the mandatory visual identity of that product. Preserve its packaging shape, color palette, front label and recognizable appearance.

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
1. Preserve the exact product types and quantities.
2. Do not add, remove, duplicate, or hallucinate extra items.
3. Front label and main face of all products must face upward towards the camera.
4. Respect the relative physical millimeter scale and placement coordinates in the box.
5. Clean luxury product photography, soft natural studio lighting, no diagrams, no text overlays, no arrows.\`;
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

if (!content.includes(targetFunction)) {
  console.error("Target function not found in app.js!");
  process.exit(1);
}

content = content.replace(targetFunction, replacementFunction);
fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully updated buildFluxImagePrompt with explicit form factors!");
