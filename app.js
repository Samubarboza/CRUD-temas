import express from "express";
import path from "path";
import temasRouter from "./src/routes/temas.routes.js";

// base de datos
import { iniciar_base_de_datos } from "./src/db/db.js";

const app = express();

// inicializar db, crea tablas si faltan
iniciar_base_de_datos();

// Config básica
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

// Rutas
app.use("/", temasRouter);

// Arranque
const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
