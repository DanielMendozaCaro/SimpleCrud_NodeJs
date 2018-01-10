'use strict';

//home controller

module.exports = {

    //funciones del controlador
    index: (req, res, next) => {
        res.render('index', {title: 'Bienvenido al crud con nodejs'});
    } 
}