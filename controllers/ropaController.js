// ========================
// IMPORTACIONES
// ========================
import { Ropa } from "../models/ropaModel.js"; // Modelo que representa una prenda
import { RopaVista } from "../views/ropaView.js"; // Vista encargada de mostrar elementos en el DOM
import { obtenerPrendas, guardarPrenda, eliminarPrenda } from "../js/storage.js"; // Funciones de almacenamiento
import historial from '../singleton_montiel/singleton.js'; // Singleton para manejar historial
import logger from "../singleton_montiel/singleton.js"; // Alias del singleton para registrar acciones

// ========================
// VARIABLES GLOBALES
// ========================
let productos = JSON.parse(localStorage.getItem("productos")) || []; 
// Recupera los productos desde localStorage, o inicializa como array vacío

// ========================
// TABLA DE PRODUCTOS
// ========================
const mostrarProductos = () => {
    const tabla = document.getElementById("lista-ropa");
    tabla.innerHTML = ""; // Limpia la tabla antes de volver a llenarla

    productos.forEach((producto, index) => {
        // Crear fila con datos del producto
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

    // Guardar nuevamente los productos en localStorage
    localStorage.setItem("productos", JSON.stringify(productos));
};

// ========================
// AGREGAR PRODUCTO
// ========================
document.getElementById("formulario-ropa").addEventListener("submit", (e) => {
    e.preventDefault(); // Evita recargar la página

    // Obtiene valores de los campos
    const tipo = document.getElementById("tipo").value;
    const talla = document.getElementById("talla").value;
    const precio = document.getElementById("precio").value;

    // Crear objeto producto
    const producto = { tipo, talla, precio };

    productos.push(producto); // Agregar al array
    mostrarProductos(); // Actualizar tabla

    // Registrar acción en el historial (singleton)
    logger.registrarAccion("Agregar", `Producto: ${tipo}, Talla: ${talla}, Precio: ${precio}`);

    e.target.reset(); // Limpiar formulario
});

// ========================
// EDITAR PRODUCTO
// ========================
window.editarProducto = (index) => {
    const producto = productos[index]; // Producto a editar

    // Rellenar el formulario con los datos del producto
    document.getElementById("tipo").value = producto.tipo;
    document.getElementById("talla").value = producto.talla;
    document.getElementById("precio").value = producto.precio;

    // Eliminar temporalmente el producto del array para sobrescribirlo al guardar
    productos.splice(index, 1);
    mostrarProductos();

    // Registrar acción en historial
    logger.registrarAccion("Editar", `Producto editado: ${producto.tipo}, Talla: ${producto.talla}, Precio: ${producto.precio}`);
};

// ========================
// ELIMINAR PRODUCTO
// ========================
window.eliminarProducto = (index) => {
    // Elimina el producto y devuelve el eliminado
    const eliminado = productos.splice(index, 1)[0];
    mostrarProductos();

    // Registrar acción en historial
    logger.registrarAccion("Eliminar", `Producto eliminado: ${eliminado.tipo}, Talla: ${eliminado.talla}, Precio: ${eliminado.precio}`);
};

// ========================
// HISTORIAL DE ACCIONES
// ========================
const mostrarHistorial = () => {
    const historial = logger.obtenerHistorial(); // Recupera historial del singleton
    const contenedor = document.getElementById("contenedor-historial");

    if (historial.length === 0) {
        contenedor.innerHTML = "<p>No hay registros en el historial.</p>";
        return;
    }

    // Construir tabla de historial
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

    // Mostrar del más reciente al más antiguo
    historial.slice().reverse().forEach(reg => {
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

// ========================
// EVENTOS INICIALES
// ========================
document.addEventListener("DOMContentLoaded", () => {
    mostrarProductos(); // Mostrar productos guardados al inicio

    // Botón para ver/ocultar historial
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

    // Botón para ver/ocultar formulario
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

// ========================
// HISTORIAL INICIAL
// ========================
document.addEventListener("DOMContentLoaded", actualizarHistorial);

// Ejemplos de acciones predefinidas
historial.registrarAccion("Se agregó un nuevo producto: Camisa talla M, $25000");
historial.registrarAccion("Se eliminó el producto con ID 5");

// Mostrar historial en consola
console.log("Historial de acciones:");
console.table(historial.obtenerHistorial());

// ========================
// CONTROLADOR VISTA + MODELO
// ========================
const vista = new RopaVista();

function iniciarControlador() {
    // Evento de guardar producto desde formulario de la vista
    vista.formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const datos = vista.obtenerDatosFormulario();

        // Crear objeto prenda usando el modelo Ropa
        const prenda = new Ropa(datos.id, datos.tipo, datos.talla, datos.precio);

        guardarPrenda(prenda); // Guardar en storage
        vista.mostrarRopa(obtenerPrendas()); // Mostrar en la tabla
        vista.limpiarFormulario(); // Limpiar formulario

        // Restaurar título después de guardar
        document.getElementById("titulo-formulario").textContent = "Agregar Producto";
    });

    // Evento de click en lista de productos (editar/eliminar)
    vista.lista.addEventListener("click", (e) => {
        const id = e.target.dataset.id;

        if (e.target.classList.contains("eliminar")) {
            eliminarPrenda(id); // Eliminar por ID
            vista.mostrarRopa(obtenerPrendas());
        } else if (e.target.classList.contains("editar")) {
            // Buscar prenda por ID
            const prenda = obtenerPrendas().find(p => p.id === id);
            if (prenda) {
                // Cargar valores en formulario
                vista.id.value = prenda.id;
                vista.tipo.value = prenda.nombre; // nombre corresponde al tipo
                vista.talla.value = prenda.talla;
                vista.precio.value = prenda.precio;

                // Dispara evento change por si el select necesita actualizarse
                const evento = new Event('change');
                vista.tipo.dispatchEvent(evento);

                // Cambiar título inmediatamente al editar
                document.getElementById("titulo-formulario").textContent = "Editar Producto";
            }
        }
    });

    // Mostrar productos guardados desde el inicio
    vista.mostrarRopa(obtenerPrendas());
}

// Inicializa el controlador
iniciarControlador();
