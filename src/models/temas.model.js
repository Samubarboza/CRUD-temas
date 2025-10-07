import { conexion_db } from "../db/db.js";
import { sql_listar_enlaces_por_tema } from "./enlaces.model.js";

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



// LECTUA COMPUESTA, TEMAS + ENLACES ORDENADOS
export function obtener_lista_temas_y_enlaces_ordenados() {
    const temas = sql_listar_temas_ordenados.all();
    return temas.map(tema => ({
        ...tema, enlaces: sql_listar_enlaces_por_tema(tema.id)
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
