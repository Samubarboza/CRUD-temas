// main se ejecuta en el navegador, por eso tenemos en la carpeta public

// esta funcion recibe un string html y lo inserta dentro del contenedor principal
function reemplazar_contenido_con_html_del_servidor(contenido_html_devuelto_por_servidor) {
  // leemos el documento por id, con inner agarramos ese id y lo que contenga lo reemplazamos por el contenido
  document.getElementById('contenedor-lista').innerHTML = contenido_html_devuelto_por_servidor
}


// Envía petición HTTP al servidor Express con URL, método y datos en JSON, espera la respuesta y la devuelve como objeto JSON
async function enviar_http_con_json(url_destino_servidor, metodo_http_ausar, datos_opciones_a_enviar_en_json) {
  const respuesta_http_del_servidor = await fetch(url_destino_servidor, {
    method: metodo_http_ausar,
    headers: { "Content-Type": "application/json" },
    body: datos_opciones_a_enviar_en_json ? JSON.stringify(datos_opciones_a_enviar_en_json) : undefined
  });
  return respuesta_http_del_servidor.json();
}

// Al enviar el formulario: envía POST /temas con {titulo}, recibe JSON {html} del servidor, reemplaza #contenedor-lista con ese HTML y resetea el formulario (no retorna nada, solo actualiza la UI).
document.getElementById("form-crear-tema").addEventListener("submit", async (evento_del_formulario) => {
  evento_del_formulario.preventDefault();
  const titulo_ingresado_usuario = evento_del_formulario.target.titulo.value.trim();

  if (!titulo_ingresado_usuario) return;
   // envío POST /temas con {titulo} y espero la respuesta { html }
  const { html: contenido_html_devuelto_por_servidor } = await enviar_http_con_json("/temas", "POST", { titulo: titulo_ingresado_usuario });

  reemplazar_contenido_con_html_del_servidor(contenido_html_devuelto_por_servidor);
  evento_del_formulario.target.reset();
});


// Delegación de eventos para TODOS los botones y formularios dentro de la lista
// aca estamos escuchando eventos, en este caso click, y le decimos, cada vez que haya un evento, ejecuta esta funcion
document.addEventListener("click", async (evento_click)=>{ // async permite escuchar await adentro para esperar respuestas del servidor
    const boton_clickeado = evento_click.target.closest("button");
    if (!boton_clickeado) return; 
    const accion_del_boton = boton_clickeado.dataset.accion;

  // Tema: votar
    if (accion_del_boton === "votar-tema") {
      // sacamos el id del tema por el que se voto - dataset nos da acceso a todos los atributos que empiezan con data en este elemento
    const { idtema: id_del_tema_a_votar } = boton_clickeado.dataset;

    const { html: contenido_html_devuelto_por_servidor} = await enviar_http_con_json(`/temas/${id_del_tema_a_votar}/votar`, "POST");
    reemplazar_contenido_con_html_del_servidor(contenido_html_devuelto_por_servidor);
}
  
  // Tema: editar
    if (accion_del_boton === "editar-tema") {
    const { idtema: id_del_tema_a_editar } = boton_clickeado.dataset;
    const nuevo_titulo_ingresado_usuario = prompt("Nuevo título:"); // mostramos una ventanita emergente en el navegador
    if (!nuevo_titulo_ingresado_usuario) return; // si el usuario no escribio nada, retornamos (o cancelamos) undefined

    const { html: contenido_html_devuelto_por_servidor} = await enviar_http_con_json(`/temas/${id_del_tema_a_editar}`, "PUT", { titulo: nuevo_titulo_ingresado_usuario });
    reemplazar_contenido_con_html_del_servidor(contenido_html_devuelto_por_servidor);
}

  // Tema: borrar
    if (accion_del_boton === "borrar-tema") {
      // seleccionamos el id del tema en el boton clieado
    const { idtema: id_del_tema_a_borrar } = boton_clickeado.dataset;
    if (!confirm("¿Eliminar tema?")) return; // lanzamos una ventana emergente preguntando si confirma la eliminacion
    const { html: contenido_html_devuelto_por_servidor } = await enviar_http_con_json(`/temas/${id_del_tema_a_borrar}`, "DELETE");
    reemplazar_contenido_con_html_del_servidor(contenido_html_devuelto_por_servidor);
}

  // Enlace: votar - comparamos que tipo de clickeo se efectuo
    if (accion_del_boton === "votar-enlace") {
      // leemos los identificador del tema, y del enlace
    const { idtema: id_del_tema, idenlace: id_del_enlace_a_votar } = boton_clickeado.dataset;
    const { html: contenido_html_devuelto_por_servidor } = await enviar_http_con_json(`/temas/${id_del_tema}/enlaces/${id_del_enlace_a_votar}/votar`, "POST");
    reemplazar_contenido_con_html_del_servidor(contenido_html_devuelto_por_servidor);
}

  // Enlace: editar
    if (accion_del_boton === "editar-enlace") {
      // leemos los identificadosres
    const { idtema: id_del_tema_seleccionado, idenlace: id_del_enlace_seleccionado } = boton_clickeado.dataset;

    const nueva_url_ingresada_por_usuario = prompt("Nueva URL:"); // mostramos un mensaje emergente 
    if (!nueva_url_ingresada_por_usuario) return; // si no hay url nueva ingresada, undefinited

    const { html: contenido_html_devuelto_por_servidor } = await enviar_http_con_json(`/temas/${id_del_tema_seleccionado}/enlaces/${id_del_enlace_seleccionado}`, "PUT", { url: nueva_url_ingresada_por_usuario });
    reemplazar_contenido_con_html_del_servidor(contenido_html_devuelto_por_servidor);
}

// Enlace: borrar
    if (accion_del_boton === "borrar-enlace") {
    const { idtema: id_del_tema_seleccionado, idenlace: id_del_enlace_seleccionado } = boton_clickeado.dataset;

    if (!confirm("¿Eliminar enlace?")) return;

    const { html: contenido_html_devuelto_por_servidor } = await enviar_http_con_json(`/temas/${id_del_tema_seleccionado}/enlaces/${id_del_enlace_seleccionado}`, "DELETE");

    reemplazar_contenido_con_html_del_servidor(contenido_html_devuelto_por_servidor);
  }
});

// Crear enlace (delegado por formulario dentro de cada tema)
document.addEventListener("submit", async (evento_submit)=>{
  // guardamos el formulario entero
  const formulario_para_crear_enlace = evento_submit.target.closest(".form-crear-enlace");
  // si no hay formulario retornamos undefined
  if (!formulario_para_crear_enlace) return; // retornamos undefined por defecto

  // evitamos recargar la pagina
  evento_submit.preventDefault();

  // seleccionamos el id del tema en el formulario - dataset nos da acceso a los atributos 
  const id_del_tema_seleccionado = formulario_para_crear_enlace.dataset.idtema;
  // accedemos al url y agarramos en valor, el texto que ingreso el usuario
  const url_ingresada_por_usuario = formulario_para_crear_enlace.url.value.trim(); // usamos trim por si el usuario ingresa su texto con espacios
  // si el usuario no ingreso la url, retornamos undefined
  if (!url_ingresada_por_usuario) return;

  // contenido html devuelto por el servidor - armamos todo para agregar a la interfaz
  const { html: contenido_html_devuelto_por_servidor } =
    await enviar_http_con_json(`/temas/${id_del_tema_seleccionado}/enlaces`, "POST", { url: url_ingresada_por_usuario });

  reemplazar_contenido_con_html_del_servidor(contenido_html_devuelto_por_servidor);
});
