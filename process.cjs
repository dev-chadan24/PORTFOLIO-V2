const Jimp = require('jimp');

async function removeBackground() {
  const imagePath = 'src/assets/Images/Signature.png';
  const image = await Jimp.read(imagePath);
  
  // Ensure the image has an alpha channel
  image.rgba(true);
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    
    // Calculate brightness of the original pixel
    const brightness = (r + g + b) / 3;
    
    // If the image is black ink on white paper, brightness will be low for ink, high for paper.
    // We want to turn the ink into solid white (255) with high alpha,
    // and the paper into fully transparent (alpha 0).
    
    let alpha = 255 - brightness;
    
    // Boost the alpha contrast to completely remove gray artifacts
    // Any brightness above ~200 will become alpha <= 0.
    alpha = Math.max(0, Math.min(255, (alpha - 20) * 1.5));
    
    // Set pixel to pure white with calculated alpha
    this.bitmap.data[idx + 0] = 255;
    this.bitmap.data[idx + 1] = 255;
    this.bitmap.data[idx + 2] = 255;
    this.bitmap.data[idx + 3] = alpha;
  });

  await image.writeAsync('src/assets/Images/Signature.png');
  console.log("Signature perfectly extracted to transparent PNG!");
}

removeBackground().catch(console.error);
