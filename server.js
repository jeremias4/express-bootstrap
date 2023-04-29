import express from "express";
import morgan from "morgan";
import { dirname, join } from "path"; //creacion de direccion dinamica para obtener la ruta absolute
import { fileURLToPath } from "url"; //creacion de direccion dinamica para obtener la ruta absolute
import indexRoutes from "./src/routes/index.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url)); //creacion de direccion dinamica para obtener la ruta absolute

//configuraciones de express, crea variable para luego utilizarla
app.set("case sensitive routing", true);
app.set("appName", "express");
app.set("port", 3000);
app.set("views", join(__dirname, "views")); //direccion de carpeta de vistas

//uso del middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(join(__dirname, "public"))); //direccion de carpeta publica o archivos estaticos
app.use(indexRoutes);

app.listen(3000);
console.log(
  `AppName: ${app.get("appName")} - server on port ${app.get("port")}`
);
