import { conexion_db } from "../db/db.js";

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

// función para listar los enlaces por tema (necesaria para temas.model.js)
export function sql_listar_enlaces_por_tema(id_tema) {
    return sql_listar_enlaces_de_tema.all(id_tema);
}
