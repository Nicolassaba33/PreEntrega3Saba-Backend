const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      id: this.generateUniqueId(products),
      ...product,
    };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  getProductById(productId) {
    const products = this.getProducts();
    return products.find((product) => product.id === productId);
  }

  updateProduct(productId, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex((product) => product.id === productId);

    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updatedFields,
        id: productId,
      };

      this.saveProducts(products);
      return products[index];
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(productId) {
    const products = this.getProducts();
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    this.saveProducts(updatedProducts);
  }

  generateUniqueId(products) {
    const maxId = products.reduce(
      (max, product) => (product.id > max ? product.id : max),
      0
    );
    return maxId + 1;
  }

  saveProducts(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2), "utf8");
  }
}

module.exports = ProductManager;
