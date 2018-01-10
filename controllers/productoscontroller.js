'use strict';

var mysql = require('mysql');
var config = require('.././database/config');
var dateFormat = require('dateformat');
//productos controller

module.exports = {

    //funciones del controlador
    getProductos: (req, res, next) => {
        var db = mysql.createConnection(config);
        db.connect();
        
        var productos = null;
        db.query('select * from productos', (err, rows, fields) => {
            if(err) throw err;
            
            productos = rows;
            db.end();
            res.render('productos/productos', {'productos': productos})
        });
    },

    getNuevoProducto: (req,res,next) => {
        res.render('productos/nuevo');
    },

    postNuevoProducto: (req,res,next) => {
        var fechaactual =  new Date();
        var fecha = dateFormat(fechaactual, 'yyyy-mm-dd h:MM:ss');
        
        var producto = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock:  req.body.stock,
            fecha_creacion: fecha
        }
        var db = mysql.createConnection(config);
        db.connect();
        db.query('insert into productos set ?', producto, (err,rows) => {
            if(err) throw err;
            db.end();
        });

        res.render('productos/nuevo', {info: 'Producto creado correctamente'});
    },

    eliminarProducto: (req,res,next) => {
        var id = req.body.id;

        var db = mysql.createConnection(config);
        db.connect();

        var respuesta = {res: false};
        db.query('delete from productos where id_producto = ?', id, (err,rows) => {
            if (err) throw err;
             db.end();
             respuesta.res = true;
             res.json(respuesta);
        });
    },

    getModificarProducto: (req,res,next) => {
        var id = req.params.id;

        var db = mysql.createConnection(config);
        db.connect();

        var producto = null;

        db.query('Select * from productos where id_producto = ?', id, (err,rows,fields) => {
            if(err) throw err;

            producto = rows;
            db.end();

            res.render('productos/modificar', {producto : producto});
        });
    },

    postModificarProducto: (req,res,next) => {
        var producto = {
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock:  req.body.stock
        };

        var db = mysql.createConnection(config);
        db.connect();

        db.query('Update productos set ? where ?',[producto, {id_producto: req.body.id_producto}], (err, rows, fields) => {
            if (err) throw err;
            db.end();
        });

        res.redirect('/productos');
    }
}