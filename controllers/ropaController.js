import { Ropa } from "../models/ropaModel.js";
import { RopaVista } from "../views/ropaView.js";
import { obtenerPrendas, guardarPrenda, eliminarPrenda } from "../js/storage.js";
import historial from '../singleton_montiel/singleton.js';

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
