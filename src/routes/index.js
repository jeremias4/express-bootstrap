import { Router } from "express";

//peticiones http
const router = Router();

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

//obtengo todos los productos
router.get("/products", (req, res) => {
  res.json(products);
});

// mando nuevo producto

router.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

//actualizando datos
router.put("/products/:id", (req, res) => {
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

// obteniendo datos por un id

router.get("/products/:id", (req, res) => {
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!productFound)
    return res.status(404).json({
      message: "Product Not Found",
    });

  res.send(productFound);
});

export default router;
