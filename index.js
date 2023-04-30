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
app.set("views", join(__dirname, "src/views")); //direccion de carpeta de vistas
app.set("view engine", "ejs"); // no es necesario con express

//uso del middleware
app.use(morgan("dev"));
app.use(express.json()); //direccion de carpeta publica o archivos estaticos
app.use(express.static(join(__dirname, "public")));
app.use(indexRoutes);

app.listen(3000);
console.log(
  `AppName: ${app.get("appName")} - server on port ${app.get("port")}`
);
