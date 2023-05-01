import { Router } from "express";
import axios from "axios";

//base de datos
var products = [
  {
    id: 1,
    name: "laptop",
    price: "3000",
  },
  {
    id: 2,
    name: "pc",
    price: "4000",
  },
];

//peticiones http
const router = Router();
//compras
//obtengo todos los productos del array

router.get("/", (req, res) => res.render("index"));
router.get("/compra", (req, res) => res.render("compra"));
router.get("/posts", async (req, res) => {
  const respon = await axios.get("https://jsonplaceholder.typicode.com/posts");
  res.render("posts", { vp: respon.data });
});

router.get("/ofertas", (req, res) => res.render("carrito"));
//envio de datos al servidor
router.post("/compra", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

// obteniendo datos por un id
router.get("/compra/:id", (req, res) => {
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!productFound)
    return res.status(404).json({
      message: "Product Not Found",
    });

  res.send(productFound);
});

//ventas
//actualizando datos de las ventas
router.put("/compra/:id", (req, res) => {
  const newData = req.body;
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!productFound)
    return res.status(404).json({
      message: "Product Not Found",
    });
  products = products.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...newData } : p
  );
  res.json(products);
});

//eliminando datos

router.delete("/products/:id", (req, res) => {
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );

  if (!productFound)
    return res.status(404).json({
      message: "Product Not Found",
    });

  products = products.filter((p) => p.id !== parseInt(req.params.id));

  res.sendStatus(204);
});

export default router;
