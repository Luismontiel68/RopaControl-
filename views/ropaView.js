export class RopaVista {
    constructor() {
        this.lista = document.getElementById("lista-ropa");
        this.formulario = document.getElementById("formulario-ropa");
        this.tipo = document.getElementById("tipo"); 
        this.talla = document.getElementById("talla");
        this.precio = document.getElementById("precio");
        this.id = document.getElementById("id");
    }

    obtenerDatosFormulario() {
        return {
            id: this.id.value || Date.now().toString(),
            tipo: this.tipo.value, 
            talla: this.talla.value,
            precio: this.precio.value
        };
    }

    limpiarFormulario() {
        this.id.value = "";
        this.tipo.value = ""; 
        this.talla.value = "";
        this.precio.value = "";
    }

    mostrarRopa(listaRopa) {
        this.lista.innerHTML = "";
        listaRopa.forEach(prenda => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${prenda.id}</td>
                <td>${prenda.nombre}</td>
                <td>${prenda.talla}</td>
                <td>${prenda.precio}</td>
                <td>
                    <button class="editar" data-id="${prenda.id}">Editar</button>
                    <button class="eliminar" data-id="${prenda.id}">Eliminar</button>
                </td>
            `;
            this.lista.appendChild(fila);
        });
    }
}
