import imagekit from "../config/imagekit.js";
import { getImageKitUrl } from "../utils/imageUtils.js";

/**
 * Get ImageKit authentication parameters for client-side uploads
 */
export const getImageKitAuth = (req, res) => {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.status(200).json(authenticationParameters);
  } catch (error) {
    console.error("Error getting ImageKit auth:", error);
    res.status(500).json({ error: "Failed to get authentication parameters" });
  }
};

/**
 * Generate optimized image URL with transformations
 */
export const getOptimizedImageUrl = (req, res) => {
  const { filePath, width, height, quality, format } = req.query;

  if (!filePath) {
    return res.status(400).json({ error: "filePath is required" });
  }

  try {
    const optimizedUrl = getImageKitUrl(filePath, {
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined,
      quality: quality ? parseInt(quality) : undefined,
      format: format || "auto",
    });

    res.status(200).json({ url: optimizedUrl });
  } catch (error) {
    console.error("Error generating optimized URL:", error);
    res.status(500).json({ error: "Failed to generate optimized URL" });
  }
};

/**
 * List all images from ImageKit
 */
export const listImages = async (req, res) => {
  try {
    const { skip = 0, limit = 20, searchQuery = "" } = req.query;

    const listOptions = {
      skip: parseInt(skip),
      limit: parseInt(limit),
      searchQuery: searchQuery || undefined,
    };

    const imageList = await imagekit.listFiles(listOptions);
    res.status(200).json(imageList);
  } catch (error) {
    console.error("Error listing images:", error);
    res.status(500).json({ error: "Failed to list images" });
  }
};
