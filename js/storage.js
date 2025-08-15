export function obtenerPrendas() {
    return JSON.parse(localStorage.getItem("ropa")) || [];
}

export function guardarPrenda(prenda) {
    let prendas = obtenerPrendas();
    const indice = prendas.findIndex(p => p.id === prenda.id);
    if (indice !== -1) {
        prendas[indice] = prenda;
    } else {
        prendas.push(prenda);
    }
    localStorage.setItem("ropa", JSON.stringify(prendas));
}

export function eliminarPrenda(id) {
    let prendas = obtenerPrendas();
    prendas = prendas.filter(p => p.id !== id);
    localStorage.setItem("ropa", JSON.stringify(prendas));
}
