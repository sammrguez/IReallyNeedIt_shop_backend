const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

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

/* importando routers */
const productsRouter = require('./routes/products');

/* usando routers */
app.use('/', productsRouter);

/* conect to port */
app.listen(PORT, () => {
  console.log('app listening in port 3000');
});
