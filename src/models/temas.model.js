// src/models/temas.model.js
import { conexion_db } from "../db/db.js";

// SQL TEMAS
const sql_insertar_tema = conexion_db.prepare(
    'INSERT INTO temas (titulo) VALUES (?)'
);

const sql_actualizar_tema = conexion_db.prepare(
    'UPDATE temas SET titulo = ? WHERE id = ?'
);

const sql_borrar_tema = conexion_db.prepare(
    'DELETE FROM temas WHERE id = ?'
);

const sql_sumar_voto_tema = conexion_db.prepare(
    'UPDATE temas SET votos = votos + 1 WHERE id = ?'
);

const sql_listar_temas_ordenados = conexion_db.prepare(
    'SELECT id, titulo, votos FROM temas ORDER BY votos DESC, id DESC'
);


// sql enlaces
const sql_insertar_enlace = conexion_db.prepare(
    'INSERT INTO enlaces (id_temas, url) VALUES (?, ?)'
);

const sql_actualizar_enlace = conexion_db.prepare(
    'UPDATE enlaces SET url = ? WHERE id = ?'
);

const sql_borrar_enlace = conexion_db.prepare(
    'DELETE FROM enlaces WHERE id = ?'
);

const sql_sumar_voto_enlace = conexion_db.prepare(
    'UPDATE enlaces SET votos = votos + 1 WHERE id = ?'
);

const sql_listar_enlaces_de_tema = conexion_db.prepare(
    'SELECT id, url, votos FROM enlaces WHERE id_temas = ? ORDER BY votos DESC, id DESC'
);

// LECTUA COMPUESTA, TEMAS + ENLACES ORDENADOS
export function obtener_lista_temas_y_enlaces_ordenados() {
    const temas = sql_listar_temas_ordenados.all();
    return temas.map(tema => ({
        ...tema, enlaces: sql_listar_enlaces_de_tema.all(tema.id)
    }));
}

// --------- TEMAS (CRUD MAS VOTOS)-----------
export function crearTema(titulo_del_tema) {
    sql_insertar_tema.run(titulo_del_tema);
}

export function editar_titulo_del_tema(id_del_tema_a_modificar, nuevo_titulo) {
    sql_actualizar_tema.run(nuevo_titulo, id_del_tema_a_modificar);
}

export function borrarTema(id_del_tema_a_eliminar) {
    sql_borrar_tema.run(id_del_tema_a_eliminar);
}

export function votarTema(id_del_tema_a_votar) {
    sql_sumar_voto_tema.run(id_del_tema_a_votar);
}


// ------------enlaces (crud + voto)---------
export function crearEnlace(id_del_tema_destino, direccion_url_del_enlace) {
    sql_insertar_enlace.run(id_del_tema_destino, direccion_url_del_enlace);
}

export function editarEnlace(_id_del_tema_destinom, id_del_enlace_a_editar, nueva_url_del_enlace) {
    sql_actualizar_enlace.run(nueva_url_del_enlace, id_del_enlace_a_editar);
}

export function borrarEnlace(_id_del_tema, id_del_enlace_a_eliminar) {
    sql_borrar_enlace.run(id_del_enlace_a_eliminar);
}

export function votarEnlace(_id_del_tema, id_del_enlace_a_votar) {
    sql_sumar_voto_enlace.run(id_del_enlace_a_votar);
}