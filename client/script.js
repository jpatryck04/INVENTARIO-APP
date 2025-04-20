const API_URL = 'http://localhost:3000/api/inventario';

document.addEventListener('DOMContentLoaded', () => {
    cargarArticulos();

    const form = document.getElementById('formulario-articulo');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

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
    }
});

async function cargarArticulos() {
    const contenedor = document.getElementById('contenedor-cards');
    if (!contenedor) return;

    contenedor.innerHTML = '';

    const res = await fetch(API_URL);
    const datos = await res.json();

    // Detecta en qué archivo HTML estamos
    const paginaActual = window.location.pathname;
    const mostrarCantidad = paginaActual.includes('almacen.html');

    datos.forEach(articulo => {
        if (mostrarCantidad) {
            renderArticuloConCantidad(articulo, contenedor);
        } else {
            renderArticuloSinCantidad(articulo, contenedor);
        }
    });
}

// 🔸 Sin cantidad (index.html)
function renderArticuloSinCantidad(articulo, contenedor) {
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
        <p><strong>Precio:</strong> $${articulo.precio}</p>
        
    `;

    contenedor.appendChild(card);
}

// 🔸 Con cantidad (almacen.html)
function renderArticuloConCantidad(articulo, contenedor) {
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
  <button style="background-color: #28a745; color: white;" onclick="reducirCantidad(${articulo.id})">Reducir Cantidad</button>
  <button style="background-color: #28a745; color: white;" onclick="eliminarArticulo(${articulo.id})">Eliminar</button>
  <button style="background-color: #28a745; color: white;" onclick="AumentarCantidad(${articulo.id})">Aumentar Producto</button>

    
</div>
    `;

    contenedor.appendChild(card);
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

async function reducirCantidad(id) {
    // const res = await fetch(`${API_URL}/${id}/reducir`, {
    //     method: 'GET'
    // });
   const res = await fetch(`${API_URL}/reducir?id=${id}`, {
        method: 'PATCH'
    });

    if (res.ok) {
        console.log(res);
        cargarArticulos();
    } else { 
        alert('Error al reducir la cantidad');
    }
}

async function AumentarCantidad(id) {
    // const res = await fetch(`${API_URL}/${id}/reducir`, {
    //     method: 'GET'
    // });
   const res = await fetch(`${API_URL}/aumentar?id=${id}`, {
        method: 'PATCH'
    });

    if (res.ok) {
        console.log(res);
        cargarArticulos();
    } else { 
        alert('Error al Aumentar la cantidad');
    }
}

