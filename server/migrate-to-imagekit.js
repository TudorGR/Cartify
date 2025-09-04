import "dotenv/config";
import { bulkUploadImages, getImageKitUrl } from "./utils/imageUtils.js";
import { products } from "./productsData.js";
import fs from "fs";
import path from "path";

/**
 * Migration script to upload images to ImageKit and update product data
 */
async function migrateToImageKit() {
  console.log("🚀 Starting migration to ImageKit...");

  try {
    // Step 1: Upload all images to ImageKit
    console.log("\n📤 Uploading images to ImageKit...");
    const uploadResults = await bulkUploadImages();

    // Create a mapping of local image names to ImageKit URLs
    const imageMapping = {};
    uploadResults.forEach((result) => {
      if (result.success) {
        imageMapping[result.file] = result.filePath;
      }
    });

    console.log("\n✅ Upload completed. Creating image mapping...");
    console.log("Image mapping:", imageMapping);

    // Step 2: Update product data
    console.log("\n🔄 Updating product data...");
    const updatedProducts = products.map((product) => {
      // Extract filename from current image path
      const currentImagePath = product.image;
      const fileName = path.basename(currentImagePath);

      if (imageMapping[fileName]) {
        return {
          ...product,
          image: imageMapping[fileName], // Store the ImageKit file path
          imageUrl: getImageKitUrl(imageMapping[fileName]), // Generate the full URL
        };
      } else {
        console.warn(`⚠️  No ImageKit mapping found for: ${fileName}`);
        return product;
      }
    });

    // Step 3: Create new products data file
    const newProductsContent = `export const products = ${JSON.stringify(
      updatedProducts,
      null,
      2
    )};`;

    // Backup original file
    const backupPath = "./productsData.backup.js";
    fs.copyFileSync("./productsData.js", backupPath);
    console.log(`📋 Backup created: ${backupPath}`);

    // Write updated file
    fs.writeFileSync("./productsData.js", newProductsContent);
    console.log("📝 Updated productsData.js with ImageKit URLs");

    // Step 4: Generate summary
    const successfulUploads = uploadResults.filter((r) => r.success).length;
    const failedUploads = uploadResults.filter((r) => !r.success).length;

    console.log("\n🎉 Migration completed!");
    console.log(`✅ Successfully uploaded: ${successfulUploads} images`);
    console.log(`❌ Failed uploads: ${failedUploads} images`);
    console.log(`📦 Updated ${updatedProducts.length} products`);

    if (failedUploads > 0) {
      console.log("\n❌ Failed uploads:");
      uploadResults
        .filter((r) => !r.success)
        .forEach((result) => {
          console.log(`   - ${result.file}: ${result.error}`);
        });
    }
  } catch (error) {
    console.error("💥 Migration failed:", error);
    process.exit(1);
  }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateToImageKit();
}
