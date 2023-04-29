import express from "express";
import morgan from "morgan";

const app = express();
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

//uso del middleware
app.use(morgan("dev"));
app.use(express.json());

//configuraciones de express, crea variable para luego utilizarla
app.set("case sensitive routing", true);
app.set("appName", "express");
app.set("port", 3000);

//obtengo todos los productos
app.get("/products", (req, res) => {
  res.json(products);
});

// mando nuevo producto

app.post("/products", (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

//actualizando datos
app.put("/products/:id", (req, res) => {
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

app.delete("/products/:id", (req, res) => {
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

app.get("/products/:id", (req, res) => {
  const productFound = products.find(
    (product) => product.id === parseInt(req.params.id)
  );
  if (!productFound)
    return res.status(404).json({
      message: "Product Not Found",
    });

  res.send(productFound);
});

app.listen(3000);
console.log(
  `AppName: ${app.get("appName")} - server on port ${app.get("port")}`
);
