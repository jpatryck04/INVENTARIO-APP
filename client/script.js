const API_URL = 'http://localhost:3000/api/inventario';

document.addEventListener('DOMContentLoaded', () => {
    cargarArticulos();

    document.getElementById('formulario-articulo').addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const res = await fetch(API_URL, {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Error al guardar');

            form.reset();
            cargarArticulos();
        } catch (err) {
            alert(err.message);
        }
    });
});

async function cargarArticulos() {
    const contenedor = document.getElementById('contenedor-cards');
    contenedor.innerHTML = '';

    const res = await fetch(API_URL);
    const datos = await res.json();

    datos.forEach(articulo => {
        const card = document.createElement('div');
        card.classList.add('card');

        const fotoUrl = articulo.foto
            ? `http://localhost:3000/uploads/${articulo.foto}`
            : 'https://via.placeholder.com/200x150';

        card.innerHTML = `
            <img src="${fotoUrl}" alt="${articulo.nombre}">
            <h3>${articulo.nombre}</h3>
            <p><strong>Código:</strong> ${articulo.codigo}</p>
            <p><strong>Descripción:</strong> ${articulo.descripcion}</p>
            <p><strong>Cantidad:</strong> ${articulo.cantidad}</p>
            <p><strong>Precio:</strong> $${articulo.precio}</p>
            <div class="acciones">
                <button onclick="eliminarArticulo(${articulo.id})">Eliminar</button>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

async function eliminarArticulo(id) {
    if (!confirm('¿Estás seguro de eliminar este artículo?')) return;

    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

    if (res.ok) {
        cargarArticulos();
    } else {
        alert('Error al eliminar');
    }
}
