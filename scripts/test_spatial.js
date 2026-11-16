const fs = require('fs');

const filePath = 'C:/Users/DELL/Documents/Codex/2026-11-14\files-pasted-by-the-user-prompt/goi-thuong-site/dist/app.js';
let content = fs.readFileSync(filePath, 'utf8');

function formatSpatialDescription(x, z, boxLength, boxWidth) {
  const halfL = (boxLength || 200) / 2;
  const halfW = (boxWidth || 150) / 2;
  
  let hPos = "CENTER (left-to-right)";
  if (x < -halfL * 0.25) hPos = "LEFT side";
  else if (x > halfL * 0.25) hPos = "RIGHT side";

  let vPos = "MIDDLE";
  if (z < -halfW * 0.25) vPos = "TOP / BACK area";
  else if (z > halfW * 0.25) vPos = "BOTTOM / FRONT area";

  if (hPos.includes("LEFT") && vPos.includes("TOP")) return "TOP-LEFT corner of the box";
  if (hPos.includes("LEFT") && vPos.includes("BOTTOM")) return "BOTTOM-LEFT area of the box";
  if (hPos.includes("RIGHT") && vPos.includes("TOP")) return "TOP-RIGHT corner of the box";
  if (hPos.includes("RIGHT") && vPos.includes("BOTTOM")) return "BOTTOM-RIGHT area of the box";
  if (hPos.includes("LEFT")) return "LEFT side of the box";
  if (hPos.includes("RIGHT")) return "RIGHT side of the box";
  if (vPos.includes("TOP")) return "TOP / BACK center area of the box";
  if (vPos.includes("BOTTOM")) return "BOTTOM / FRONT center area of the box";
  return "CENTER of the box";
}

// Let's inspect current buildFluxImagePrompt
const startIdx = content.indexOf('function getProductFormFactor');
const endIdx = content.indexOf('function packingImagePrompt');
console.log('Found indices:', startIdx, endIdx);
