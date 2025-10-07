import { obtener_lista_temas_y_enlaces_ordenados } from "../models/temas.model.js";


import {
    crearEnlace, editarEnlace, borrarEnlace, votarEnlace
} from '..//models/enlaces.model.js';


// render parcial, (lista) y devolver como json.html para actualizar ui
function renderizar_lista_html(respuesta_al_navegador) {
    const lista_de_temas_ordenados = obtener_lista_temas_y_enlaces_ordenados();
    respuesta_al_navegador.render('temas/_lista', { temas: lista_de_temas_ordenados }, (error_de_renderizado, html_generado) => {
        if (error_de_renderizado) return respuesta_al_navegador.status(500).json({ error: 'Render error' });
        respuesta_al_navegador.json({ html: html_generado });
    });
}

function devolverListarHTML(respuesta_al_navegador) {
    renderizar_lista_html(respuesta_al_navegador);
}


// enlace crud + voto
export function postEnlace(peticion_del_navegador, respuesta_al_navegador) {
    const { idTema: id_del_tema_padre } = peticion_del_navegador.params;
    const { url: direccion_del_enlace_nuevo } = peticion_del_navegador.body;
    if (!direccion_del_enlace_nuevo?.trim()) return respuesta_al_navegador.status(400).json({ error: 'URL requerida '});
    crearEnlace(Number(id_del_tema_padre), direccion_del_enlace_nuevo.trim());
    devolverListarHTML(respuesta_al_navegador);
}

export function putEnlace(peticion_del_navegador, respuesta_al_navegador) {
    const { idTema: id_del_tema_padre, idEnlace: id_del_enlace_a_editar } = peticion_del_navegador.params;
    const { url: nueva_direccion_del_enlace } = peticion_del_navegador.body;
    editarEnlace(Number(id_del_tema_padre), Number(id_del_enlace_a_editar), (nueva_direccion_del_enlace || '').trim());
    renderizar_lista_html(respuesta_al_navegador);
}

export function deleteEnlace(peticion_del_navegador, respuesta_al_navegador) {
    const { idTema: id_del_tema_padre, idEnlace: id_del_enlace_a_borrar } = peticion_del_navegador.params;
    borrarEnlace(Number(id_del_tema_padre), Number(id_del_enlace_a_borrar));
    renderizar_lista_html(respuesta_al_navegador);
}

export function votarEnlaceCtrl(peticion_del_navegador, respuesta_al_navegador) {
    const { idTema: id_del_tema_padre, idEnlace: id_del_enlace_a_votar } = peticion_del_navegador.params;
    votarEnlace(Number(id_del_tema_padre), Number(id_del_enlace_a_votar));
    renderizar_lista_html(respuesta_al_navegador);
}