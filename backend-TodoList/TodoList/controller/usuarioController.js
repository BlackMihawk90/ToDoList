// paquete para incrirtar las contraseñas
const bcrypt = require('bcrypt')
// paquete para generar tokes
const jwt = require('jsonwebtoken')
// modelo de usuario
const Usuarios = require('../models/usuario')


// tiempo de expiracion del token 
const sessionAExpira = 60 * 10

// crear un usuario
const crearUsuario = async (req, res) =>{
    try {
        // recibo los parametros del body
        const {userName, email, password } = req.body

        // espera que encripte la contrseña del usuario y despues mande la respuesta
        const encriptacionPassword = await bcrypt.hash(password, 2)
        

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
}

// Iniciar session
const login = async( req, res) =>{
    try {
        const {email, password } = req.body

        // me retorna el primer usuario que coincida con el correo
        const usuario = await Usuarios.findOne({email})
        if (usuario) {
            // comprueba la contraseña que sea correcta
            const esCorrecto = await bcrypt.compare(password, usuario.password)
            if (esCorrecto) {
                
                //* genera un token firmado con JWTSCRET
                const token  = jwt.sign (
                    {userId: usuario._id},
                    process.env.JWT_SECRET
                    //{expiresIn: sessionAExpira}
                ) //con esto genero un  token el cual almacena el userID
                const userID1 = await Usuarios.findOne({email})
                res.send({status: userID1._id, data: {token}})
                //res.send({status: token})
            }else{
                res.status(403).send({status: 'Contraseña Incorrecta :('})
            }
        }else{
            res.status(401).send({status: 'Correo electronico no encontrado'})
        }
    } catch (error) {
        res.status(500).send({status: '¡ERROR!', message: error.message})
    }
}

// obtener id
const get_idUsuario = async(req, res) => {
    try {
        const userID = await Usuarios.find({
            email: req.body.email
        })
        
        res.send({status: 'OK', data: userID._id})
    } catch (error) {
        console.log('Error al consultar en Mongo' + error);
        res.status(500).send({status:'ERROR', data: error.message})
    }
}


// exporto las funciones
module.exports = {
    crearUsuario,
    login,
    get_idUsuario
}