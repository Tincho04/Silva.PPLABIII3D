import crearTabla from "./tabla.js";
import Anuncio_Auto from "./anuncio_auto.js";


let listaAnuncios;
let frmAnuncio;
let proximoId;
let divTabla;

window.addEventListener('load', inicializarManejadores);
Spinner(true);

function inicializarManejadores() {
    listaAnuncios = obtenerAnuncios();
    proximoId = obtenerId();
    frmAnuncio = document.forms[0];

    Spinner(false);
    setTimeout(() => {
        divTabla = document.getElementById("divTabla");
        Spinner(true);
        actualizarLista();
        ocultarTabla(false)

    }, 3000);


    frmAnuncio.addEventListener('submit', e => {

        e.preventDefault();

        const nuevoAnuncio = obtenerAnuncio();
        if (nuevoAnuncio) {
            ProcesoAlta(listaAnuncios, nuevoAnuncio);
        }
    });


    document.getElementById("btnLimpiar").addEventListener("click", function() {
        localStorage.clear();
        listaAnuncios = obtenerAnuncios();
        actualizarLista();
        ocultarBtnTab(false);
    });

    document.getElementById("btnEliminar").addEventListener("click", function() {
        Spinner(false);
        ocultarTabla(true)
        setTimeout(() => {
            divTabla = document.getElementById("divTabla");
            listaAnuncios = obtenerAnuncios();
            const nuevoAnuncio = modificarAnuncio();
            if (nuevoAnuncio) {
                ProcesoEliminar(listaAnuncios, nuevoAnuncio);
                Spinner(true);
            }
        }, 3000);
    });

    document.getElementById("btnModificar").addEventListener("click", function() {
        Spinner(false);
        ocultarTabla(true)
        setTimeout(() => {
            divTabla = document.getElementById("divTabla");

            const nuevoAnuncio = modificarAnuncio();
            if (nuevoAnuncio) {
                ProcesoModificacion(listaAnuncios, nuevoAnuncio);
                Spinner(true);
            }
        }, 3000);
    });



    document.getElementById("btnTabla").addEventListener("click", function() {
        Spinner(false);
        ocultarTabla(true)
        setTimeout(() => {
            divTabla = document.getElementById("divTabla");
            Spinner(true);
            actualizarLista();
            ocultarTabla(false)
            ocultarBtnTab(true);

        }, 3000);
    });

    document.getElementById("btnEscTabla").addEventListener("click", function() {
        ocultarTabla(true);
        ocultarBtnTab(false);
    });

}

function obtenerAnuncio() {
    var puertas = document.getElementById("txtPuertas");
    var km = document.getElementById("txtKm");
    var potencia = document.getElementById("txtPotencia");

    const nuevoAnuncio = new Anuncio_Auto(proximoId,
        frmAnuncio.titulo.value,
        frmAnuncio.trans.value,
        frmAnuncio.descripcion.value,
        frmAnuncio.precio.value,
        puertas.value || 2,
        km.value || 0,
        potencia.value || 1000
    );

    return nuevoAnuncio;
}

function obtenerAnuncios(lista) {
    return JSON.parse(localStorage.getItem('anuncios')) || [];
}

function obtenerId() {
    return JSON.parse(localStorage.getItem('nextId')) || 1;
}

function actualizarLista() {
    divTabla.innerHTML = "";

    divTabla.appendChild(crearTabla(listaAnuncios));
}


function ProcesoAlta(listaAnuncios, nuevoAnuncio) {
    listaAnuncios.push(nuevoAnuncio);
    proximoId++;
    guardarDatos();
    actualizarLista();
    ActivaBotones();
    ocultarBtnTab(true);
}

function guardarDatos() {
    localStorage.setItem('anuncios', JSON.stringify(listaAnuncios));
    localStorage.setItem('nextId', proximoId);
}

function ActualizarDatos() {
    localStorage.setItem('anuncios', JSON.stringify(listaAnuncios));
}

function Spinner(value) {
    var spinner = document.getElementById('spinner');
    spinner.hidden = value;
}


function ActivaBotones() {
    var botonEliminar = document.getElementById("btnEliminar");
    var botonModificar = document.getElementById("btnModificar");
    var botonLimpiar = document.getElementById("btnLimpiar");
    botonEliminar.hidden = false;
    botonModificar.hidden = false;
    botonLimpiar.hidden = false;
    var textoId = document.getElementById("txtId");
    textoId.disabled = false;
    textoId.hidden = false;
}


function ProcesoEliminar(listaAnuncios, nuevoAnuncio) {
    var flag = false;
    var index = 0;

    listaAnuncios.forEach(element => {
        if (element.id == nuevoAnuncio.id) {
            listaAnuncios.splice(index, 1);
            flag = true;
        }
        index++;

    });
    if (flag == true) {
        ActualizarDatos();
        alert("Baja satisfactoria");
        actualizarLista();
        ocultarTabla(false)
    } else {
        alert("Baja fallida, Id no encontrado")
    }

}

function modificarAnuncio() {
    var puertas = document.getElementById("txtPuertas");
    var km = document.getElementById("txtKm");
    var potencia = document.getElementById("txtPotencia");

    const nuevoAnuncio = new Anuncio_Auto(frmAnuncio.id.value,
        frmAnuncio.titulo.value,
        frmAnuncio.trans.value,
        frmAnuncio.descripcion.value,
        frmAnuncio.precio.value,
        puertas.value || 2,
        km.value || 0,
        potencia.value || 1000);

    return nuevoAnuncio;
}


function ProcesoModificacion(listaAnuncios, nuevoAnuncio) {
    var flag = false;
    var index = 0;
    listaAnuncios.forEach(element => {
        if (element.id == nuevoAnuncio.id) {
            listaAnuncios.splice(index, 1);
            flag = true;
        }
        index++;

    });
    if (flag == true) {
        listaAnuncios.push(nuevoAnuncio);
        ActualizarDatos();
        ocultarTabla(true)
        alert("Modificación exitosa");
        actualizarLista();
        ocultarTabla(false)

    } else {
        alert("Fallo en la modificación de datos")
    }
}

function ocultarBtnTab(value) {
    var botonTab = document.getElementById("btnTabla");
    var botonETab = document.getElementById("btnEscTabla");

    botonTab.hidden = value;
    botonETab.hidden = !value;
}


function ocultarTabla(value) {
    divTabla = document.getElementById("divTabla");
    divTabla.hidden = value;
}