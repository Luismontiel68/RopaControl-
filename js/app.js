// Selección de elementos del DOM
const formulario = document.getElementById('formulario-prenda');
const inputNombre = document.getElementById('nombre');
const inputCategoria = document.getElementById('categoria');
const inputPrecio = document.getElementById('precio');
const inputId = document.getElementById('prenda-id');
const cuerpoTabla = document.getElementById('tabla-prendas-cuerpo');

// Evento al enviar el formulario
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const categoria = inputCategoria.value.trim();
    const precio = parseFloat(inputPrecio.value).toFixed(2);

    if (!nombre || !categoria || isNaN(precio)) return;

    const prenda = {
        id: inputId.value || Date.now().toString(),
        nombre,
        categoria,
        precio
    };

    guardarPrenda(prenda); // Función del archivo storage.js
    renderizarTabla();
    formulario.reset();
    inputId.value = '';
});

// Cargar datos de la prenda al formulario para editar
function editarPrenda(id) {
    const prenda = buscarPrendaPorId(id); // Función del archivo storage.js
    if (!prenda) return;

    inputNombre.value = prenda.nombre;
    inputCategoria.value = prenda.categoria;
    inputPrecio.value = prenda.precio;
    inputId.value = prenda.id;
}

// Renderizar tabla con prendas
function renderizarTabla() {
    const prendas = obtenerPrendas(); // Función del archivo storage.js
    cuerpoTabla.innerHTML = '';

    prendas.forEach(prenda => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${prenda.nombre}</td>
            <td>${prenda.categoria}</td>
            <td>$${prenda.precio}</td>
            <td class="acciones">
                <button class="editar-btn" onclick="editarPrenda('${prenda.id}')">Editar</button>
                <button class="eliminar-btn" onclick="confirmarEliminacion('${prenda.id}')">Eliminar</button>
            </td>
        `;

        cuerpoTabla.appendChild(fila);
    });
}

// Confirmar y eliminar prenda
function confirmarEliminacion(id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta prenda?')) {
        eliminarPrenda(id); // Función del archivo storage.js
        renderizarTabla();
    }
}

// Mostrar prendas al iniciar
renderizarTabla();
