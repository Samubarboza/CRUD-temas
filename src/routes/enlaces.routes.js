// modulo de rutas de express, nos permite definir endpoints ordenados por recurso
import { Router } from "express";


import {
    postEnlace, putEnlace, deleteEnlace, votarEnlaceCtrl
} from '../controllers/enlaces.controller.js'

// creamos un router independiente para agrupar rutas relacionadas - grupo de rutas
const router = Router();


// enlaces

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
