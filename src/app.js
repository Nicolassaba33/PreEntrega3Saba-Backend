/*
Consigna
-Desarrollar un servidor basado en
express donde podamos hacer
consultas a nuestro archivo de
productos

Se deberá utilizar la clase
ProductManager que actualmente
utilizamos con persistencia de archivos.
-Desarrollar un servidor express que, en
su archivo app.js importe al archivo de
ProductManager que actualmente
tenemos.

El servidor debe contar con los
siguientes endpoints:
○ ruta ‘/products’, la cual debe leer el
archivo de productos y devolverlos
dentro de un objeto. Agregar el
soporte para recibir por query
param el valor ?limit= el cual
recibirá un límite de resultados.
- Si no se recibe query de límite, se
devolverán todos los productos
- Si se recibe un límite, sólo devolver el
número de productos solicitados
ruta ‘/products/:pid’, la cual debe
recibir por req.params el pid
(product Id), y devolver sólo el
producto solicitado, en lugar de
todos los productos

Link al repositorio de Github con el
proyecto completo, el cual debe incluir:
- carpeta src con app.js dentro y tu
ProductManager dentro.
- package.json con la info del proyecto.
- NO INCLUIR LOS node_modules
generados.



*/

const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const port = 8080;

const productManager = new ProductManager("./products.json");

app.use(express.json());

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = limit
      ? (await productManager.getProducts()).slice(0, limit)
      : await productManager.getProducts();
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (!product) {
      res.status(404).json({ error: "Producto no encontrado" });
    } else {
      res.json({ product });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express iniciado en http://localhost:${port}`);
});
