// const express = require('express');
// const app = express();
// const path = require('path');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const { PORT = 3000 } = process.env;
// // /* conexion a MongoDB */

// const uri =
//   'mongodb+srv://sammrguez:IRNIclusterpassword@irnicluster.hjnrszc.mongodb.net/?retryWrites=true&w=majority&appName=IRNIcluster';
// const clientOptions = {
//   serverApi: { version: '1', strict: true, deprecationErrors: true },
// };
// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!'
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);
// // mongoose.connect(
// //   'mongodb+srv://sammrguez:IRNIclusterpassword@irnicluster.hjnrszc.mongodb.net/?retryWrites=true&w=majority&appName=IRNIcluster'
// // );
// // const db = mongoose.connection;

// // db.on('error', (err) => {
// //   console.error('Error de conexión a la base de datos:', err);
// // });

// // db.once('open', () => {
// //   console.log('Conexión exitosa a la base de datos');
// // });

// /* parsers */
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());

// /* cors */
// app.use(
//   cors({
//     origin: '*',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     preflightContinue: false,
//     optionsSuccessStatus: 200,
//   })
// );

// /* importando routers */
// const productsRouter = require('./routes/products');
// const usersRouter = require('./routes/users');
// const ordersRouter = require('./routes/orders.js');

// /* usando routers */

// app.use('/', productsRouter);
// app.use('/', usersRouter);
// app.use('/', ordersRouter);

// /* conect to port */
// app.listen(PORT, () => {
//   console.log('app listening in port 3000');
// });
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT = 3000 } = process.env;

const uri =
  'mongodb+srv://sammrguez:IRNIclusterpassword@irnicluster.hjnrszc.mongodb.net/test?retryWrites=true&w=majority&appName=IRNIcluster';
const clientOptions = {
  serverApi: { version: '1', strict: true, deprecationErrors: true },
};

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log('Connected to MongoDB Atlas!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Si ocurre un error al conectar, puedes decidir cómo manejarlo aquí
    // Por ejemplo, podrías intentar reconectar o detener el servidor
    process.exit(1);
  }
}

connectToDatabase();

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
const ordersRouter = require('./routes/orders.js');

/* usando routers */
app.use('/', productsRouter);
app.use('/', usersRouter);
app.use('/', ordersRouter);

/* conect to port */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Manejar eventos de conexión y desconexión
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open to MongoDB Atlas');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose default connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(
      'Mongoose default connection disconnected through app termination'
    );
    process.exit(0);
  });
});
