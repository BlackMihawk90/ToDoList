//* importo la tarea y usuario de controller

var express = require('express');
var router = express.Router();
const tareaControlador = require('../controller/tareaController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tareaRoute', { title: 'Express' });
});



// ejemplo de ruteo, puedes borrarlo

router.get('/getTareas', tareaControlador.getTareas)
router.get('/get_tarea', tareaControlador.get_tarea)
router.post('/insert_tarea', tareaControlador.insert_tarea)
router.delete('/delete_tarea', tareaControlador.delete_tarea)
router.put('/update_tarea', tareaControlador.update_tarea)

module.exports = router;
