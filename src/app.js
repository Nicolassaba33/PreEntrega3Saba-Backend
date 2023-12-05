const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const port = 8080;

const productManager = new ProductManager('./products.json');

app.use(express.json());


app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = limit ? (await productManager.getProducts()).slice(0, limit) : await productManager.getProducts();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});


app.get('/products/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (!product) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      res.json({ product });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});