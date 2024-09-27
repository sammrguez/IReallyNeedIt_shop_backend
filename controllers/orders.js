const shortid = require("shortid");
const User = require("../models/user");
const Order = require("../models/order");
const mercadopago = require("mercadopago");
const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  INVALID_DATA_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("../controllers/errors");

// Configurar Mercado Pago con tu API Key
// mercadopago.configurations.setAccessToken("TU_ACCESS_TOKEN");

module.exports.makeOrder = (req, res, next) => {
  const items = req.body;
  const userId = req.user._id;
  const trackId = shortid.generate();
  console.log("ya se procesa la orden");

  User.findById(userId)
    .orFail()
    .then((user) => {
      console.log(user);
      // Crear la orden en tu base de datos
      Order.create({
        items: items,
        user: user,
        ShippingAddress: user.address,
        trackId: trackId,
      })
        .then((order) => {
          console.log(order);
          // Generar la preferencia de Mercado Pago
          const preference = {
            items: items.map((item) => ({
              title: item.name,
              quantity: item.quantity,
              currency_id: "MXN",
              unit_price: item.price,
            })),
            payer: {
              email: user.email,
            },
            back_urls: {
              success: "https://ireallyneedit.com.mx/", // Cambia estas URLs por las de tu sitio
              failure: "https://ireallyneedit.com.mx/failure",
              pending: "https://ireallyneedit.com.mx/pending",
            },
            external_reference: trackId, // Esto ayuda a relacionar el pago con la orden
          };

          // Crear preferencia en Mercado Pago
          mercadopago.preferences
            .create(preference)
            .then((response) => {
              res.status(200).json({
                trackId: trackId,
                init_point: response.body.init_point, // URL del checkout de Mercado Pago
              });
            })
            .catch((err) => {
              console.error(
                "Error creando la preferencia de Mercado Pago: ",
                err
              );
              res
                .status(SERVER_ERROR_CODE)
                .json({ message: "Error al procesar el pago" });
            });
        })
        .catch(next);
    })
    .catch(next);
};
