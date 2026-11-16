import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const assets = [
  ["tea-oolong.jpg", "https://images.pexels.com/photos/16586298/pexels-photo-16586298/free-photo-of-close-up-of-dry-herb-leaves.jpeg?auto=compress&w=900"],
  ["tea-jasmine.jpg", "https://images.pexels.com/photos/9952779/pexels-photo-9952779.jpeg?auto=compress&w=900"],
  ["tea-mint.jpg", "https://images.pexels.com/photos/7565516/pexels-photo-7565516.jpeg?auto=compress&w=900"],
  ["candle-linen.jpg", "https://images.pexels.com/photos/11145797/pexels-photo-11145797.jpeg?auto=compress&w=900"],
  ["candle-rose.jpg", "https://images.pexels.com/photos/35532443/pexels-photo-35532443/free-photo-of-romantic-scented-candle-with-red-roses.jpeg?auto=compress&w=900"],
  ["candle-lavender.jpg", "https://images.pexels.com/photos/30676123/pexels-photo-30676123/free-photo-of-elegant-cbd-infused-candle-on-lavender-background.jpeg?auto=compress&w=900"],
  ["choco-dark.jpg", "https://images.pexels.com/photos/7260258/pexels-photo-7260258.jpeg?auto=compress&w=900"],
  ["choco-almond.jpg", "https://images.pexels.com/photos/8987040/pexels-photo-8987040.jpeg?auto=compress&w=900"],
  ["choco-floral.jpg", "https://images.pexels.com/photos/14750356/pexels-photo-14750356.jpeg?auto=compress&w=900"],
  ["honey-flower.jpg", "https://images.pexels.com/photos/38164883/pexels-photo-38164883/free-photo-of-shelf-display-of-honey-jars-in-rustic-setting.jpeg?auto=compress&w=900"],
  ["jam-orange.jpg", "https://images.pexels.com/photos/8441091/pexels-photo-8441091.jpeg?auto=compress&w=900"],
  ["cookies-butter.jpg", "https://images.pexels.com/photos/30668209/pexels-photo-30668209/free-photo-of-delicious-homemade-cookies-gift-wrapped.jpeg?auto=compress&w=900"],
  ["coffee-arabica.jpg", "https://images.pexels.com/photos/13549432/pexels-photo-13549432.jpeg?auto=compress&w=900"],
  ["cocoa-hot.jpg", "https://images.pexels.com/photos/1212845/pexels-photo-1212845.jpeg?auto=compress&w=900"],
  ["bath-salt-himalayan.jpg", "https://images.pexels.com/photos/18083317/pexels-photo-18083317/free-photo-of-open-jar-of-bath-salts.jpeg?auto=compress&w=900"],
  ["bath-salt-herbal.jpg", "https://images.pexels.com/photos/20862392/pexels-photo-20862392/free-photo-of-crystals-and-herbs-in-glass-jar.jpeg?auto=compress&w=900"],
  ["lip-balm.jpg", "https://images.pexels.com/photos/20382237/pexels-photo-20382237/free-photo-of-choice-of-lip-balms.jpeg?auto=compress&w=900"],
  ["notebook-a6.jpg", "https://images.pexels.com/photos/5417687/pexels-photo-5417687.jpeg?auto=compress&w=900"],
  ["dried-flowers.jpg", "https://images.pexels.com/photos/31044545/pexels-photo-31044545/free-photo-of-beautifully-wrapped-dried-flower-bouquets-in-basket.jpeg?auto=compress&w=900"],
  ["ceramic-mug.jpg", "https://images.pexels.com/photos/6312177/pexels-photo-6312177.jpeg?auto=compress&w=900"],
];

const outputDir = path.resolve("dist/assets/products");
await mkdir(outputDir, { recursive: true });

for (const [fileName, url] of assets) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${fileName}: HTTP ${response.status}`);
  await writeFile(path.join(outputDir, fileName), Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${fileName}`);
}
