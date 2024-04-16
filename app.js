const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT = 3000 } = process.env;
/* conexion a MongoDB */
mongoose.connect('mongodb://127.0.0.1:27017/IRNI');
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error de conexión a la base de datos:', err);
});

db.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

/* parsers */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

/* cors */
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

/* importando routers */
const productsRouter = require('./routes/products');
const usersRouter = require('./routes/users');

/* usando routers */
app.use('/', productsRouter);
app.use('/', usersRouter);

/* conect to port */
app.listen(PORT, () => {
  console.log('app listening in port 3000');
});
