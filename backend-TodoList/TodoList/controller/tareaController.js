const Tarea = require('../models/tarea');


// ejemplo del controlador, 
const getTareas = async(req, res) => {
    try {
        const verTarea = await Tarea.find({});
        res.send({data: verTarea});
    } catch (error) {
        
    }
}

// get de solo un usuario
const get_tarea = async(req, res) => {
    try {
        const idusuario = req.query.userName;
        const userTask = await Tarea.find({
            userName: idusuario
        });
        res.status(200).json(userTask);
    } catch (error) {
        console.log('Error al consultar en Mongo' + error);
        res.status(500).send({status:'ERROR', data: error.message})
    }
}

//insertar una tarea
const insert_tarea = async(req, res) => {
    try{
        const {tituloDeLaTarea, description, estado, userName } =  (req.body);

        const task = await Tarea.create({
            tituloDeLaTarea,
            description,
            estado,
            userName
        });
        //tarea.save();
        res.send({status: 'Tarea agregada', data: task})
    }
    catch(error){
        console.log('Error al insertar en Mongo' + error);
        res.status(500).send({status: 'ERROR', data: error.message})
    }
}

const delete_tarea = async(req, res) => {
    try{
        const cid = req.query.id;
    
        console.log("id de la tarea:" + cid);
        
        const tareaDB = await Tarea.findById(cid);
    
        if(!tareaDB){
            res.status(400).json({
                msg: 'No existe la tarea'
            });
        }
    
        await Tarea.findByIdAndDelete(cid);
        res.status(200).json({mensaje: 'Tarea Borrada'});
    }
    catch(error){
        console.log('Error al eliminar en Mongo' + error);
    }
}

const update_tarea = async(req, res) => {
    const cid= req.body._id;
    const tareaDB = await Tarea.findById(cid);
    if(!tareaDB){
        res.status(400).json({
            msg: 'No existe la tarea'
        });
    }
    const datos = req.body;
    
    const tareaACtualizada = 
    await Tarea.findByIdAndUpdate(cid, datos, {new:true});
    res.status(200).json({tarea: tareaACtualizada});
}
// Exportar 
module.exports = {
    getTareas,
    get_tarea,
    insert_tarea,
    delete_tarea,
    update_tarea
 }