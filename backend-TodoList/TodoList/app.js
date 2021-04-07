var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const http = require('http');

// Importamos lo necestado
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

// habilito la lectura de variables de entorno
dotenv.config()

// Improtamos las Rutas
var indexRouter = require('./routes/tareaRoute');
var usersRouter = require('./routes/users');
var app = express();

app.use(cors())
app.options('*', cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/todolist/', usersRouter)
app.use('/Lista/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});





// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Designar host y puerto
const port = process.env.PORTAPP || '8200';
app.set('port', port);
app.set('host', '127.0.0.1');
// ################

// Levantar servidor
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on 127.0.0.1:${port}`));
// #################


const PORT = process.env.PORT || 5000

// mi string de conexion
mongoose.connect(process.env.MONGO,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(()=>{
  console.log('Conectado a la base de datos')

  app.listen(PORT,() =>{
    console.log(`Ejecutandose en el puerto ${PORT}`)
  })
}).catch((error) =>{
  console.log('Error al conectarse a la base de datos', error)
})

module.exports = app;
