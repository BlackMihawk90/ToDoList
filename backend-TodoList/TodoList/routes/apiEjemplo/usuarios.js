const express = require('express')
const router  = express.Router()

// paquete para incrirtar las contraseñas
const bcrypt = require('bcrypt')
// paquete para generar tokes
const jwt = require('jsonwebtoken')
// modelo de usuario
const Usuarios = require('../../models/usuario')

router.post('/crearUsuario', async ( req, res)=>{
    try {
        // recibo los parametros del body
        const {userName, email, password } = req.body

        // espera que encripte la contrseña del usuario y despues mande la respuesta
        const encriptacionPassword = await bcrypt.hash(password, 5)
        

        // guardo los datos en MONGO
        const usuario = new Usuarios()
        usuario.userName = userName
        usuario.email = email
        usuario.password = encriptacionPassword,

        // para guardar el token unico de un usuario
        usuario.token = jwt.sign({userId: userName}, process.env.JWT_SECRET)
        
        // mando los datos a guardar en mongo
        await usuario.save()

        res.send({status: '¡OK!', message: '¡Usuario Creado con Exito!'})
    } catch (error) {
        if (error.code && error.code === 11000) {
            res.status(400).send({status: 'Usuario duplicado', message: error.keyValue})
        }else{
            
        }
    }

})

module.exports = router

