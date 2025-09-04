import { products } from "../productsData.js";

const randomDelay = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export async function getProducts(req, res) {
  setTimeout(() => res.status(200).json(products), randomDelay(200, 500));
}

export async function getProductsCategory(req, res) {
  const reqCategory = req.params.category;
  let filteredProducts = [];

  if (reqCategory == "All") {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(
      (product) => product.category.toLowerCase() === reqCategory.toLowerCase()
    );
  }

  setTimeout(() => {
    if (filteredProducts.length > 0) {
      return res.status(200).json(filteredProducts);
    } else {
      return res.status(404).json({ message: "No products found" });
    }
  }, randomDelay(200, 500));
}

export async function getProduct(req, res) {
  const id = req.params.id;
  const product = products.find((item) => item.id == id);
  setTimeout(() => {
    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "No product found" });
    }
  }, randomDelay(200, 500));
}

export async function getFeatured(req, res) {
  setTimeout(() => {
    const r1 = 9;
    const r2 = 24;
    const r3 = 81;
    const r4 = 4;

    return res
      .status(200)
      .json([products[r1], products[r2], products[r3], products[r4]]);
  }, randomDelay(200, 500));
}

export async function searchProducts(req, res) {
  const { q = "" } = req.body;
  const query = String(q).trim().toLowerCase();

  let filtered = products;
  if (query) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.shortDescription || "").toLowerCase().includes(query)
    );
  }
  setTimeout(() => res.status(200).json(filtered), randomDelay(200, 500));
}
