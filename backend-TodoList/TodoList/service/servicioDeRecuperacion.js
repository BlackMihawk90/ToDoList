// paquete para enviar correos 
const nodemailer = require('nodemailer')
require('dotenv').config()

// paquete para generar tokes
const jwt = require('jsonwebtoken')
const bcryt = require('bcrypt')
const ModeloUsuario = require('../models/usuario')



//* transporte para enviar correo de recuperacion
const envioDelToken = async (req, res) =>{

    try {
        const {email} = req.body

        // busco el usuario que tenga correo en la base de datos
        const correoExisteEnDB = await ModeloUsuario.findOne({email})
        if (correoExisteEnDB) {
            
            // traigo el token del objeto correoExisteEnDB
            let tokenBaseDeDatos = correoExisteEnDB.token
            
            let transporte = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })
            
            // todo: mejorar el html 
            let opcionesEmail = {
                from: "proyectotodolist@gmail.com",
                to: email,
                subject: "enviado desde nodemailer",
                html:` ${tokenBaseDeDatos}    Copee este token y ingreselo en el 
                        siguiente formulario:
                        href="http://localhost:4200/tokenform`
                
            }       
            transporte.sendMail(opcionesEmail, (error, info)=>{
                if (error) {
                    console.log('Error al intentar enviar el correo', error)
                    res.status(500).send(error.message)
                 }else{
                    console.log('¡Correo enviado con exito!')
                    res.status(200).send({status: 'Correo enviado con exito'})
                 }
            })
        }else{
            res.status(403).send({status: 'correo no existe'})
            let transporte = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })
        
            let opcionesEmail = {
                from: "proyectotodolist@gmail.com",
                to: email,
                subject: "Empresa Todolist",
                text: `Este correo no existe en nuestra base de datos`
            }       
            transporte.sendMail(opcionesEmail, (error, info)=>{
                if (error) {
                    console.log('Error al intentar enviar el correo', error)
                    res.status(500).send(error.message)
                 }else{
                    console.log('¡Correo enviado con exito!')
                    res.status(200).send({status: 'Correo enviado con exito'})
                 }
            })
        }
    } catch (error) {
        res.status(500).send({status: '¡ERROR!', message: error.message})
    }
}


// compara si el token es el mismo de la base de datos de mongodb
const comparaElToken =  async (req, res) =>{
    try {
        let token  = req.body.token

        const existeElToken = await ModeloUsuario.findOne({ token })
        
        if (existeElToken.token === token) {

            let generoUnNuevoToken = jwt.sign({userId: existeElToken._id}, process.env.JWT_SECRET)

            //* le actualizo el token al usuario y se lo guardo en la base
            await ModeloUsuario.findByIdAndUpdate(existeElToken._id, {token:generoUnNuevoToken},{new: true})            

            // le mando el _id del usuario
            res.send({status: existeElToken._id, message: generoUnNuevoToken})
        }
    } catch (error) {
        res.status(500).send({status: 'No existe ese token en la base de datos '})
    }
}


// cambio de contraseña del usuario
const changePassword = async (req, res) => {
    try {
        let userIdDeLaURL = req.query._id
        let password = req.body.password
    
        if (password) {
            const newPasswordEncriptado = await bcryt.hash(password,2)
            await ModeloUsuario.findByIdAndUpdate(userIdDeLaURL, {password: newPasswordEncriptado}, {new: true})
            res.send({status: '¡Contraseña Actualizada!', message: 'OK'})
        } else {
            res.status(500).send({status: '!Contraseña incorrecta¡', message: error.message})
        }
    } catch (error) {
        res.status(500).send({status: 'Error'})

    }
}


module.exports = {
    envioDelToken,
    comparaElToken,
    changePassword
}