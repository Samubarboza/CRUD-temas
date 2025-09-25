import fs from "fs"; // modulo de node para leer, escribir, borrar o crear archivos - usamos para abrir y guardar archivo db.json
import path from "path"; // modulo de node que ayuda a armar rutas de carpetas y archivos
// ruta completa hasta el archivo db.json, donde se guardan los datos
const ruta_de_database_json = path.join(process.cwd(), "data", "db.json"); 

// Helpers de lectura/escritura - usamos para leer datos de la bd, esta funcion trae en formato objeto js para poder manipularlos
function leer_json_como_objeto_js() {
    const texto_de_database = fs.readFileSync(ruta_de_database_json, "utf-8"); // leemos en formato texto normal
    // parse convierte un texto en formato json a objeto js
    return JSON.parse(texto_de_database);
}
// funcion para guardar los datos en la db.json
function guardar_datos_en_dbjson(objeto_con_temas_y_enlaces) { // data es el objeto js que tenemos en memoria - es lo que vamos a guardar en la memoria
    // write, escribe un archivo, bloquea el prgrama hasta guardar - JSON.. convierte un objeto js en texto json
    fs.writeFileSync(ruta_de_database_json, JSON.stringify(objeto_con_temas_y_enlaces, null, 4)); // null es para decir, no quiero transformar nada y asi poder usar el numero para la sangria
}

// generador de id
function nuevoId(prefijo_identificador) {
    // toString convierte el numero aleatorio generado a base, (sistema numerico que usa 10 numero y 26 letras)
    return prefijo_identificador + Math.random().toString(36).slice(2, 8); // slice corta un pedazo del string - arranca desde el 2 y corta en la posicion 8
}

// pedir datos para mostrarlos ordenadamente 
export function obtener_lista_temas_y_enlaces_ordenados() {
    // sacamos la propiedad temas que viene el objeto que devuelve el json
    const { temas: lista_de_todos_los_temas } = leer_json_como_objeto_js();
  // Ordenar por votos desc; enlaces también
    lista_de_todos_los_temas.forEach(tema_actual => tema_actual.enlaces.sort((enlace_1,enlace_2)=>enlace_2.votos - enlace_1.votos));
    return lista_de_todos_los_temas.sort((tema_1,tema_2)=> tema_2.votos - tema_1.votos);
}

export function crearTema(titulo_del_tema) {
    const base_de_datos = leer_json_como_objeto_js();

    base_de_datos.temas.push({ id: nuevoId("t"), titulo: titulo_del_tema, votos: 0, enlaces: [] });
    guardar_datos_en_dbjson(base_de_datos);
}

export function editar_titulo_del_tema(id_del_tema_a_modificar, nuevo_titulo) {
    const base_de_datos = leer_json_como_objeto_js();
    const tema_a_modificar = base_de_datos.temas.find(tema_seleccionado => tema_seleccionado.id === id_del_tema_a_modificar);
    if (tema_a_modificar) tema_a_modificar.titulo = nuevo_titulo;
    guardar_datos_en_dbjson(base_de_datos);
}

export function borrarTema(id_del_tema_a_eliminar) {
    const base_de_datos = leer_json_como_objeto_js();
    // aca eliminamos el tema 
    base_de_datos.temas = base_de_datos.temas.filter(tema_seleccionado => tema_seleccionado.id !== id_del_tema_a_eliminar);
    guardar_datos_en_dbjson(base_de_datos);
}

export function votarTema(id_del_tema_a_votar) {
    const base_de_datos = leer_json_como_objeto_js();
    const tema_a_votar = base_de_datos.temas.find(tema_seleccionado => tema_seleccionado.id === id_del_tema_a_votar);
    if (tema_a_votar) tema_a_votar.votos++;
    guardar_datos_en_dbjson(base_de_datos);
}

export function crearEnlace(id_del_tema_destino, direccion_url_del_enlace) {
    const base_de_datos = leer_json_como_objeto_js();
    const tema_encontrado = base_de_datos.temas.find(tema_actual => tema_actual.id === id_del_tema_destino);
    if (tema_encontrado) {
        tema_encontrado.enlaces.push({ id: nuevoId("e"), url: direccion_url_del_enlace, votos: 0 });
    }
    guardar_datos_en_dbjson(base_de_datos);
}

export function editarEnlace(id_del_tema_destino, id_del_enlace_a_editar, nueva_url_del_enlace) {
    const base_de_datos = leer_json_como_objeto_js();
    const tema_encontrado = base_de_datos.temas.find(tema_actual => tema_actual.id === id_del_tema_destino);
    const enlace_encontrado = tema_encontrado?.enlaces.find(enlace_actual => enlace_actual.id === id_del_enlace_a_editar);
    if (enlace_encontrado) enlace_encontrado.url = nueva_url_del_enlace;
    guardar_datos_en_dbjson(base_de_datos);
}

export function borrarEnlace(id_del_tema, id_del_enlace_a_eliminar) {
    const base_de_datos = leer_json_como_objeto_js();
    const tema_seleccionado = base_de_datos.temas.find(tema_actual => tema_actual.id === id_del_tema);
    if (tema_seleccionado) tema_seleccionado.enlaces = tema_seleccionado.enlaces.filter(enlace_actual => enlace_actual.id !== id_del_enlace_a_eliminar);
    guardar_datos_en_dbjson(base_de_datos);
}

export function votarEnlace(id_del_tema, id_del_enlace_a_votar) {
    const base_de_datos = leer_json_como_objeto_js();
    const tema_encontrado = base_de_datos.temas.find(tema_actual => tema_actual.id === id_del_tema);
    const enlace_encontrado = tema_encontrado?.enlaces.find(enlace_actual => enlace_actual.id === id_del_enlace_a_votar);
    if (enlace_encontrado) enlace_encontrado.votos++;
    guardar_datos_en_dbjson(base_de_datos);
}
