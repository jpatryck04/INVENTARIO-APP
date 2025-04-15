const db = require('../db');

// Obtener todos los artículos
exports.getAll = (callback) => {
    db.query('SELECT * FROM inventario', callback);
};

// Obtener un solo artículo por ID
exports.getById = (id, callback) => {
    db.query('SELECT * FROM inventario WHERE id = ?', [id], callback);
};

// Crear un nuevo artículo
exports.create = (data, callback) => {
    db.query('INSERT INTO inventario SET ?', data, callback);
};

// Actualizar un artículo
exports.update = (id, data, callback) => {
    db.query('UPDATE inventario SET ? WHERE id = ?', [data, id], callback);
};

// Eliminar un artículo
exports.delete = (id, callback) => {
    db.query('DELETE FROM inventario WHERE id = ?', [id], callback);
};
