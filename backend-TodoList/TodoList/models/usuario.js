const mongoose = require('mongoose');
const {Schema} = mongoose;


const usuarioSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    token:{type:String, required: false},
    password: {type: String,  require: true } 
})




const modeloUsuario = mongoose.model('Usuario', usuarioSchema)
module.exports = modeloUsuario