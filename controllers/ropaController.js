import { Ropa } from "../models/ropaModel.js";
import { RopaVista } from "../views/ropaView.js";
import { obtenerPrendas, guardarPrenda, eliminarPrenda } from "../js/storage.js";
import historial from '../singleton_montiel/singleton.js';

import logger from "../singleton_montiel/singleton.js";

let productos = JSON.parse(localStorage.getItem("productos")) || [];

// ========================
// TABLA DE PRODUCTOS
// ========================
const mostrarProductos = () => {
    const tabla = document.getElementById("lista-ropa");
    tabla.innerHTML = "";

    productos.forEach((producto, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${index + 1}</td>
            <td>${producto.tipo}</td>
            <td>${producto.talla}</td>
            <td>$${producto.precio}</td>
            <td>
                <button onclick="editarProducto(${index})">Editar</button>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
    localStorage.setItem("productos", JSON.stringify(productos));
};

// ========================
// AGREGAR PRODUCTO
// ========================
document.getElementById("formulario-ropa").addEventListener("submit", (e) => {
    e.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const talla = document.getElementById("talla").value;
    const precio = document.getElementById("precio").value;

    const producto = { tipo, talla, precio };

    productos.push(producto);
    mostrarProductos();

    logger.registrarAccion("Agregar", `Producto: ${tipo}, Talla: ${talla}, Precio: ${precio}`);

    e.target.reset();
});

// ========================
// EDITAR PRODUCTO
// ========================
window.editarProducto = (index) => {
    const producto = productos[index];

    document.getElementById("tipo").value = producto.tipo;
    document.getElementById("talla").value = producto.talla;
    document.getElementById("precio").value = producto.precio;

    productos.splice(index, 1);
    mostrarProductos();

    logger.registrarAccion("Editar", `Producto editado: ${producto.tipo}, Talla: ${producto.talla}, Precio: ${producto.precio}`);
};

// ========================
// ELIMINAR PRODUCTO
// ========================
window.eliminarProducto = (index) => {
    const eliminado = productos.splice(index, 1)[0];
    mostrarProductos();

    logger.registrarAccion("Eliminar", `Producto eliminado: ${eliminado.tipo}, Talla: ${eliminado.talla}, Precio: ${eliminado.precio}`);
};

// ========================
// HISTORIAL DE ACCIONES
// ========================
const mostrarHistorial = () => {
    const historial = logger.obtenerHistorial();
    const contenedor = document.getElementById("contenedor-historial");

    if (historial.length === 0) {
        contenedor.innerHTML = "<p>No hay registros en el historial.</p>";
        return;
    }

    let tabla = `
        <table>
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Acción</th>
                    <th>Detalle</th>
                </tr>
            </thead>
            <tbody>
    `;

    historial.forEach(reg => {
        tabla += `
            <tr>
                <td>${reg.fecha}</td>
                <td>${reg.accion}</td>
                <td>${reg.detalle}</td>
            </tr>
        `;
    });

    tabla += `</tbody></table>`;
    contenedor.innerHTML = tabla;
};

document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos();

    const btnHistorial = document.getElementById("btn-historial");
    const contenedorHistorial = document.getElementById("contenedor-historial");

    btnHistorial.addEventListener("click", () => {
        if (contenedorHistorial.style.display === "none") {
            mostrarHistorial();
            contenedorHistorial.style.display = "block";
            btnHistorial.textContent = "Ocultar historial";
        } else {
            contenedorHistorial.style.display = "none";
            btnHistorial.textContent = "Ver historial";
        }
    });

    // === Toggle formulario ===
    const btnFormulario = document.getElementById("btn-formulario");
    const contenedorFormulario = document.getElementById("contenedor-formulario");

    btnFormulario.addEventListener("click", () => {
        if (contenedorFormulario.style.display === "none") {
            contenedorFormulario.style.display = "block";
            btnFormulario.textContent = "Ocultar formulario";
        } else {
            contenedorFormulario.style.display = "none";
            btnFormulario.textContent = "Agregar producto";
        }
    });
});





// Inicializar historial al cargar
document.addEventListener("DOMContentLoaded", actualizarHistorial);


historial.registrarAccion("Se agregó un nuevo producto: Camisa talla M, $25000");
historial.registrarAccion("Se eliminó el producto con ID 5");

console.log("Historial de acciones:");
console.table(historial.obtenerHistorial());


const vista = new RopaVista();

function iniciarControlador() {
    vista.formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const datos = vista.obtenerDatosFormulario();

        const prenda = new Ropa(datos.id, datos.tipo, datos.talla, datos.precio);

        guardarPrenda(prenda);
        vista.mostrarRopa(obtenerPrendas());
        vista.limpiarFormulario();

        // 🟢 Restaurar título después de guardar
        document.getElementById("titulo-formulario").textContent = "Agregar Producto";
    });

    vista.lista.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        if (e.target.classList.contains("eliminar")) {
            eliminarPrenda(id);
            vista.mostrarRopa(obtenerPrendas());
        } else if (e.target.classList.contains("editar")) {
            const prenda = obtenerPrendas().find(p => p.id === id);
            if (prenda) {
                vista.id.value = prenda.id;
                vista.tipo.value = prenda.nombre; // nombre ahora es tipo
                vista.talla.value = prenda.talla;
                vista.precio.value = prenda.precio;

                // 🔄 Actualiza tallas automáticamente si tu select lo requiere
                const evento = new Event('change');
                vista.tipo.dispatchEvent(evento);

                // 🟠 Cambiar título inmediatamente al editar
                document.getElementById("titulo-formulario").textContent = "Editar Producto";
            }
        }
    });

    vista.mostrarRopa(obtenerPrendas());
}

iniciarControlador();
