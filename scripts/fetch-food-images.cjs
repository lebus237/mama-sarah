const fs = require('fs');
const path = require('path');

/**
 * Fetch food images from foodish-api.com and save URLs to a JSON file
 * @param {number} count - Number of images to fetch
 * @param {string} outputPath - Path to output JSON file
 */
async function fetchFoodImages(count, outputPath) {
  const imageUrls = [];
  
  console.log(`Fetching ${count} food images...`);
  
  for (let i = 0; i < count; i++) {
    try {
      const response = await fetch('https://foodish-api.com/api');
      const data = await response.json();
      
      if (data.image) {
        imageUrls.push(data.image);
        console.log(`[${i + 1}/${count}] ${data.image}`);
      }
    } catch (error) {
      console.error(`[${i + 1}/${count}] Failed to fetch: ${error.message}`);
    }
  }
  
  // Ensure output directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(imageUrls, null, 2));
  console.log(`\nSaved ${imageUrls.length} image URLs to ${outputPath}`);
  
  return imageUrls;
}

// Parse command line arguments
const args = process.argv.slice(2);
const count = parseInt(args[0]) || 10;
const outputPath = args[1] || path.join(__dirname, 'food-images.json');

// Run the script
fetchFoodImages(count, outputPath).catch(console.error);
