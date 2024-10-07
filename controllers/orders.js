const shortid = require("shortid");
const User = require("../models/user");
const Order = require("../models/order");
const mercadopago = require("mercadopago"); // Importar Mercado Pago

// Configurar Mercado Pago con el Access Token
mercadopago.configure({
  access_token:
    "APP_USR-1535422911594285-092620-35579eecddefaef5ff6ea9e173e260fe-2004100643",
});

// lista de precios
const shippingRates = {
  CDMX: 120,
  Jalisco: 200,
  "Nuevo León": 210,
  Otros: 250,
};

// calcula el precio //

function calcularEnvio(estado) {
  return shippingRates[estado] || shippingRates["Otros"]; // Devuelve el costo del estado o el valor 'Otros' por defecto
}

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

      if (!user.address) {
        return res
          .status(400)
          .json({ message: "Completa tu dirección antes de continuar" });
      }
      const shippingCost = calcularEnvio(user.address.state);
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
            items: [
              ...items.map((item) => ({
                title: item.name,
                quantity: item.quantity,
                currency_id: "MXN",
                unit_price: item.price,
              })),
              {
                title: "Costo de Envío",
                quantity: 1,
                currency_id: "MXN",
                unit_price: shippingCost,
              },
            ],
            payer: {
              email: user.email,
            },
            back_urls: {
              success: "https://ireallyneedit.com.mx/success", // Asegúrate de que estas URLs son correctas
              failure: "https://ireallyneedit.com.mx/failure",
              pending: "https://ireallyneedit.com.mx/pending",
            },
            auto_return: "approved",
            external_reference: trackId,
          };

          console.log("preferencias de mercado libre:");
          console.log(preference);
          // Crear preferencia en Mercado Pago
          mercadopago.preferences
            .create(preference)
            .then((response) => {
              const preferenceId = response.body.id;
              console.log(preferenceId);
              res.status(200).json({
                trackId: trackId,
                init_point: response.body.init_point, // URL del checkout de Mercado Pago
                preferenceId: preferenceId,
              });
            })
            .catch((err) => {
              console.error(
                "Error creando la preferencia de Mercado Pago: ",
                err
              );
              res.status(500).json({ message: "Error al procesar el pago" });
            });
        })
        .catch(next);
    })
    .catch(next);
};
