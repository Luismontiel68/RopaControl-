// singleton_montiel/singleton.js

class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance;
        }

        this.historial = JSON.parse(localStorage.getItem("historialAcciones")) || [];
        Logger.instance = this;
    }

    registrarAccion(accion, detalle) {
        const registro = {
            fecha: new Date().toLocaleString(),
            accion,
            detalle
        };

        this.historial.push(registro);
        localStorage.setItem("historialAcciones", JSON.stringify(this.historial));
        console.log("Acción registrada:", registro);
    }

    obtenerHistorial() {
        return this.historial;
    }

    limpiarHistorial() {
        this.historial = [];
        localStorage.removeItem("historialAcciones");
    }
}

const logger = new Logger();
export default logger;
