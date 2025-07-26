const tipo = document.getElementById('tipo');
        const talla = document.getElementById('talla');
        const formulario = document.getElementById('formulario-ropa');
        const tituloFormulario = document.getElementById('titulo-formulario');

        const tallasPorTipo = {
            sueter: ['S', 'M', 'L', 'XL'],
            pantalon: ['28', '30', '32', '34', '36'],
            camisa: ['XS', 'S', 'M', 'L', 'XL'],
            otra: ['Única']
        };

        tipo.addEventListener('change', () => {
            const opciones = tallasPorTipo[tipo.value] || [];
            talla.innerHTML = '<option value="" disabled selected>Talla</option>';
            opciones.forEach(t => {
                const option = document.createElement('option');
                option.value = t;
                option.textContent = t;
                talla.appendChild(option);
            });
        });

        formulario.addEventListener('submit', () => {
            const id = document.getElementById('id').value;
            tituloFormulario.textContent = id ? "Editar producto" : "Agregar producto";
        });

        // Formatear precio (opcional)
        function formatearPrecio(valor) {
            return `$ ${parseFloat(valor).toLocaleString('es-CO')}`;
        }
        window.formatearPrecio = formatearPrecio;