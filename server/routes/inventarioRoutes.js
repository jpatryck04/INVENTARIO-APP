const express = require('express');
const router = express.Router();

const controller = require('../controllers/inventarioController');
const multer = require('multer');
const path = require('path');

// Configuración Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });
console.log('InventarioRoutes cargado');


// Rutas CRUD
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', upload.single('foto'), controller.create);
router.put('/:id', upload.single('foto'), controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
