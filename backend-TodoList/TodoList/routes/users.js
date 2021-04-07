var express = require('express');
var router = express.Router();

const usuarioControlador = require('../controller/usuarioController')
const servicioDePassword = require('../service/servicioDeRecuperacion')


router.post('/crearUsuario', usuarioControlador.crearUsuario)
router.post('/iniciarSession', usuarioControlador.login)
router.post('/enviodelcorreo', servicioDePassword.envioDelToken)
router.post('/get_idUsuario/:_id', usuarioControlador.get_idUsuario)
router.post('/password/:token', servicioDePassword.comparaElToken);

router.post('/changepassword', servicioDePassword.changePassword);

module.exports = router;
