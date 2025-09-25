// src/db/db.js
import Database from "better-sqlite3";
import path from 'path';

// 1. abrir/crear archivo sqlite
const ruta_archivo_db = path.join(process.cwd(), 'datos.sqlite');
export const conexion_db = new Database(ruta_archivo_db);

// 2) asegurar claves foraneas
conexion_db.pragma('foreign_keys = ON')

// 3. Crear tablas si no existen
export function iniciar_base_de_datos() {
    conexion_db.prepare(
        `CREATE TABLE IF NOT EXISTS temas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT NOT NULL,
        votos INTEGER NOT NULL DEFAULT 0,
        creado_en TEXT NOT NULL DEFAULT (datetime('now'))
        );
    `)
    .run();

    conexion_db
    .prepare(`
        CREATE TABLE IF NOT EXISTS enlaces(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        id_temas INTEGER NOT NULL,
        url TEXT NOT NULL,
        votos INTEGER NOT NULL DEFAULT 0,
        creado_en TEXT NOT NULL DEFAULT (datetime('now')),
        FOREIGN KEY (id_temas) REFERENCES temas(id) ON DELETE CASCADE
        );
    `)
    .run();

    console.log('Base de datos lista en: ', ruta_archivo_db);
}

iniciar_base_de_datos();