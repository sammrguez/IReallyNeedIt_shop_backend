const express = require('express');
const app = express();
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
/* conexion a MongoDB */
mongoose.connect('mongodb://localhost:27017/IRNI');

/* parsers */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

/* conect to port */
app.listen(PORT, () => {
  console.log('app listening in port 3000');
});
