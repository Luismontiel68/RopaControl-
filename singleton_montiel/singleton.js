// ================================
// SINGLETON LOGGER
// ================================
// Este singleton maneja un historial de acciones.
// Se asegura de que exista una sola instancia en toda la aplicación.
// ================================

class Logger {
    constructor() {
        // Si ya existe una instancia previa, devuelve esa misma (patrón Singleton)
        if (Logger.instance) {
            return Logger.instance;
        }

        // Recupera historial desde localStorage, o inicializa vacío
        this.historial = JSON.parse(localStorage.getItem("historialAcciones")) || [];

        // Guardar la instancia en la clase para reutilizarla
        Logger.instance = this;
    }

    // =========================
    // REGISTRAR ACCIÓN
    // =========================
    registrarAccion(accion, detalle) {
        const registro = {
            fecha: new Date().toLocaleString(), // Fecha y hora actual
            accion,   // Tipo de acción ("Agregar", "Editar", "Eliminar", etc.)
            detalle   // Descripción más específica
        };

        // Guardar en memoria y en localStorage
        this.historial.push(registro);
        localStorage.setItem("historialAcciones", JSON.stringify(this.historial));

        // Mostrar en consola para depuración
        console.log("Acción registrada:", registro);
    }

    // =========================
    // OBTENER HISTORIAL
    // =========================
    obtenerHistorial() {
        // Devuelve el array completo de acciones
        return this.historial;
    }

    // =========================
    // LIMPIAR HISTORIAL
    // =========================
    limpiarHistorial() {
        this.historial = []; // Vacía el historial en memoria
        localStorage.removeItem("historialAcciones"); // Elimina del almacenamiento
    }
}

// ================================
// EXPORTAR INSTANCIA ÚNICA
// ================================
// Al exportar "logger", garantizamos que toda la app use
// la misma instancia del Logger.
const logger = new Logger();
export default logger;
