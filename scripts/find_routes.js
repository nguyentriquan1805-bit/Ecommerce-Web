const fs = require('fs');
const content = fs.readFileSync('dist/app.js', 'utf8');
let pos = 0;
while (true) {
  const idx = content.indexOf('"/quan-tri', pos);
  if (idx === -1) break;
  console.log('--- At index', idx, '---');
  console.log(content.slice(idx - 50, idx + 200));
  pos = idx + 1;
}
