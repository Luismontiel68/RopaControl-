// singleton_montiel/singleton.js

class HistorialAcciones {
    constructor() {
        if (HistorialAcciones.instancia) {
            return HistorialAcciones.instancia;
        }

        this.historial = [];
        HistorialAcciones.instancia = this;
    }

    registrarAccion(accion) {
        const timestamp = new Date().toLocaleString();
        this.historial.push(`[${timestamp}] ${accion}`);
    }

    obtenerHistorial() {
        return [...this.historial]; // Copia segura
    }

    limpiarHistorial() {
        this.historial = [];
    }
}

const historialSingleton = new HistorialAcciones();
Object.freeze(historialSingleton);

export default historialSingleton;
