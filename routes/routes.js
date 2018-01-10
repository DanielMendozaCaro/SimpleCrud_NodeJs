var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');

/* GET home page. */
router.get('/', controllers.homecontroller.index);


// Rutas para productos
router.get('/productos', controllers.productoscontroller.getProductos);
router.get('/nuevo', controllers.productoscontroller.getNuevoProducto);
router.post('/crearproducto', controllers.productoscontroller.postNuevoProducto);
router.post('/eliminarproducto', controllers.productoscontroller.eliminarProducto);
router.get('/modificar/:id', controllers.productoscontroller.getModificarProducto);
router.post('/editar', controllers.productoscontroller.postModificarProducto);

module.exports = router;
