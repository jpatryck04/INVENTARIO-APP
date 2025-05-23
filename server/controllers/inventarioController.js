const Inventario = require('../models/inventarioModel');
const path = require('path');

exports.getAll = (req, res) => {
    Inventario.getAll((err, rows) => {
        if (err) return res.status(500).json({ error: err });
        res.json(rows);
    });
};

exports.getById = (req, res) => {
    Inventario.getById(req.params.id, (err, rows) => {
        if (err) return res.status(500).json({ error: err });
        res.json(rows[0]);
    });
};

exports.create = (req, res) => {
    const { codigo, nombre, descripcion, cantidad, precio } = req.body;
    const foto = req.file ? req.file.filename : null;

    const nuevoArticulo = {
        codigo,
        nombre,
        descripcion,
        cantidad,
        precio,
        foto
    };

    Inventario.create(nuevoArticulo, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Artículo creado', id: result.insertId });
    });
};

exports.update = (req, res) => {
    const { codigo, nombre, descripcion, cantidad, precio } = req.body;
    const foto = req.file ? req.file.filename : null;

    const datosActualizados = {
        codigo,
        nombre,
        descripcion,
        cantidad,
        precio
    };

    if (foto) datosActualizados.foto = foto;

    Inventario.update(req.params.id, datosActualizados, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Artículo actualizado' });
    });
};

exports.delete = (req, res) => {
    Inventario.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Artículo eliminado' });
    });
};
exports.reducirCantidad = (req, res) => {
    let {id} = req.query;
   
   
    Inventario.getById(id, (err, rows) => {
        if (err) return res.status(500).json({ error: err });

        let articulo = rows[0];
        if (!articulo) return res.status(404).json({ message: 'Artículo no encontrado' });

        if (articulo.cantidad > 1) {
            const nuevaCantidad = articulo.cantidad - 1;
            console.log("Articulo:", articulo);
            Inventario.update(id, { cantidad: nuevaCantidad }, (err) => {
                if (err) return res.status(500).json({ error: err });
                res.json({ message: 'Cantidad reducida', cantidad: nuevaCantidad });
            });
        } else {
            // Si es 1 o menos, lo eliminamos
            Inventario.delete(id, (err) => {
                if (err) return res.status(500).json({ error: err });
                res.json({ message: 'Artículo eliminado' });
            });
        }
    });
};
exports.AumentarCantidad = (req, res) => {
     console.log("AumentarCantidad ejecutándose");
    let {id} = req.query;
   
    Inventario.getById(id, (err, rows) => {
        if (err) return res.status(500).json({ error: err });

        let articulo = rows[0];
        if (!articulo) return res.status(404).json({ message: 'Artículo no encontrado' });
        
            const nuevaCantidad = articulo.cantidad + 1;
            console.log("Articulo:", articulo);
            Inventario.update(id, { cantidad: nuevaCantidad }, (err) => {
                if (err) return res.status(500).json({ error: err });
                res.json({ message: 'Cantidad reducida', cantidad: nuevaCantidad });
            });
    });
};