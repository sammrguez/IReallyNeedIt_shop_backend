const router = require("express").Router();

module.exports.makePago = (req, res, next) => {
  const client = new MercadoPagoConfig({ accessToken: "YOUR_ACCESS_TOKEN" });

  const preference = new Preference(client);

  preference
    .create({
      body: {
        items: [
          {
            title: "Mi producto",
            quantity: 1,
            unit_price: 85,
          },
        ],
      },
    })
    .then(console.log)
    .catch(console.log);

  //

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  //
};

module.exports.getFeedback = (req, res, next) => {
  res.json({
    Payment: req.query.payment_id,
    Status: req.query.status,
    MerchantOrder: req.query.merchant_order_id,
  });
};
