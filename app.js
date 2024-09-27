const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middleware/logger");
const { HttpStatus, HttpResponseMessage } = require("./enums/http");
const { errors } = require("celebrate");
const mercadopago = require("mercadopago");

const { PORT = 3000 } = process.env;

const uri =
  "mongodb+srv://sammrguez:IRNIclusterpassword@irnicluster.hjnrszc.mongodb.net/test?retryWrites=true&w=majority&appName=IRNIcluster";
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function connectToDatabase() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // Si ocurre un error al conectar, puedes decidir cómo manejarlo aquí
    // Por ejemplo, podrías intentar reconectar o detener el servidor
    process.exit(1);
  }
}

connectToDatabase();

/* parsers */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});

/* cors */
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);

app.use(requestLogger);
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("El servidor va a caer");
  }, 0);
});
/* importando routers */
const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const ordersRouter = require("./routes/orders.js");

/* usando routers */
app.use("/", productsRouter);
app.use("/", usersRouter);
app.use("/", ordersRouter);

app.use(errorLogger);
app.use(errors());
app.use("/", (req, res) => {
  return res.status(HttpStatus.NOT_FOUND).send(HttpResponseMessage.NOT_FOUND);
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500 ? "Se ha producido un error en el servidor" : message,
  });
});

/* conect to port */
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Manejar eventos de conexión y desconexión
mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open to MongoDB Atlas");
});

mongoose.connection.on("error", (err) => {
  console.error("Mongoose default connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose default connection disconnected");
});

// If the Node process ends, close the Mongoose connection
