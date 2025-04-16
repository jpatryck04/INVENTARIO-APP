const express = require('express');
const cors = require('cors');
const app = express();
const inventarioRoutes = require('./routes/inventarioRoutes');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use (express.static(path.join(__dirname, '../client')))

// Rutas
app.use('/api/inventario', inventarioRoutes);
app.use('/', require('./routes/inventarioRoutes')); // o como se llame el archivo


// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

console.log('inventarioRoutes:', inventarioRoutes);
