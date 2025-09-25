// modulo de rutas de express, nos permite definir endpoints ordenados por recurso
import { Router } from "express";

// importamos funciones del controlador, cada una maneja la logica de un endpoint
import {
    postTema, putTema, deleteTema, votarTemaCtrl,
    postEnlace, putEnlace, deleteEnlace, votarEnlaceCtrl,
    mostrar_pagina_principal
} from "../controllers/temas.controller.js";

// creamos un router independiente para agrupar rutas relacionadas - grupo de rutas
const router = Router();

// ----------- TEMAS -----------

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


// ----------- ENLACES -----------

// POST /temas/:idTema/enlaces -> crear enlace dentro de un tema
router.post("/temas/:idTema/enlaces", postEnlace);

// PUT /temas/:idTema/enlaces/:idEnlace -> editar enlace
router.put("/temas/:idTema/enlaces/:idEnlace", putEnlace);

// DELETE /temas/:idTema/enlaces/:idEnlace -> borrar enlace
router.delete("/temas/:idTema/enlaces/:idEnlace", deleteEnlace);

// POST /temas/:idTema/enlaces/:idEnlace/votar -> votar enlace
router.post("/temas/:idTema/enlaces/:idEnlace/votar", votarEnlaceCtrl);


// exportamos el router para poder montarlo en app.js con app.use()
export default router;
