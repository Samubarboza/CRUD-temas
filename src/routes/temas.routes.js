// modulo de rutas de express, nos permite definir endpoints ordenados por recurso
import { Router } from "express";

// importamos funciones del controlador, cada una maneja la logica de un endpoint
import {
    postTema, putTema, deleteTema, votarTemaCtrl,
    mostrar_pagina_principal
} from "../controllers/temas.controller.js";


// creamos un router independiente para agrupar rutas relacionadas - grupo de rutas
const router = Router();

// temas

// GET / -> pagina principal (lista de temas + enlaces renderizados)
router.get("/", mostrar_pagina_principal);

// POST /temas -> crea un tema nuevo (body: {titulo})
router.post("/temas", postTema);

// PUT /temas/:idTema -> actualizar un tema
router.put("/temas/:idTema", putTema);

// DELETE /temas/:idTema -> borrar un tema
router.delete("/temas/:idTema", deleteTema);

// POST /temas/:idTema/votar -> votar por un tema
router.post("/temas/:idTema/votar", votarTemaCtrl);


// exportamos el router para poder montarlo en app.js con app.use()
export default router;
