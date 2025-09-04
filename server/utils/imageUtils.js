import imagekit from "../config/imagekit.js";
import fs from "fs";
import path from "path";

/**
 * Upload a single image to ImageKit
 * @param {string} imagePath - Path to the local image file
 * @param {string} fileName - Desired file name in ImageKit
 * @param {string} folder - Folder path in ImageKit (optional)
 * @returns {Promise<object>} - ImageKit upload response
 */
export async function uploadImageToImageKit(
  imagePath,
  fileName,
  folder = "/products"
) {
  try {
    // Read the image file
    const imageBuffer = fs.readFileSync(imagePath);

    const uploadResponse = await imagekit.upload({
      file: imageBuffer,
      fileName: fileName,
      folder: folder,
      useUniqueFileName: false, // Set to true if you want unique names
      tags: ["product", "ecommerce"],
    });

    return uploadResponse;
  } catch (error) {
    console.error("Error uploading image to ImageKit:", error);
    throw error;
  }
}

/**
 * Generate ImageKit URL with transformations
 * @param {string} filePath - File path in ImageKit
 * @param {object} transformations - ImageKit transformations
 * @returns {string} - Transformed image URL
 */
export function getImageKitUrl(filePath, transformations = {}) {
  const url = imagekit.url({
    path: filePath,
    transformation: [
      {
        height: transformations.height || 400,
        width: transformations.width || 400,
        crop: transformations.crop || "maintain_ratio",
        quality: transformations.quality || 80,
        format: transformations.format || "auto",
      },
    ],
  });

  return url;
}

/**
 * Bulk upload all images from the images directory
 */
export async function bulkUploadImages() {
  const imagesDir = path.join(process.cwd(), "images");

  try {
    const files = fs.readdirSync(imagesDir);
    const imageFiles = files.filter((file) =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to upload...`);

    const uploadPromises = imageFiles.map(async (file) => {
      const imagePath = path.join(imagesDir, file);
      const fileName = file;

      try {
        const result = await uploadImageToImageKit(imagePath, fileName);
        console.log(`✅ Uploaded: ${file} -> ${result.url}`);
        return {
          file,
          success: true,
          url: result.url,
          filePath: result.filePath,
        };
      } catch (error) {
        console.error(`❌ Failed to upload ${file}:`, error.message);
        return { file, success: false, error: error.message };
      }
    });

    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error("Error during bulk upload:", error);
    throw error;
  }
}
