const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const productManager = new ProductManager("./data/products.json");

app.use(express.json());

app.get("/products", (req, res) => {
  const limit = req.query.limit;
  let products = productManager.getProducts();

  if (limit) {
    products = products.slice(0, limit);
  }

  res.json({ products });
});

app.get("/products/:pid", (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);

  if (product) {
    res.json({ product });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.post("/products", (req, res) => {
  const newProduct = req.body;
  const addedProduct = productManager.addProduct(newProduct);
  res.status(201).json({ product: addedProduct });
});

app.put("/products/:pid", (req, res) => {
  const productId = req.params.pid;
  const updatedFields = req.body;
  const updatedProduct = productManager.updateProduct(productId, updatedFields);

  if (updatedProduct) {
    res.json({ product: updatedProduct });
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.delete("/products/:pid", (req, res) => {
  const productId = req.params.pid;
  productManager.deleteProduct(productId);
  res.json({ message: "Product deleted successfully" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
