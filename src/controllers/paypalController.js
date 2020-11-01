const fct = require('../util/fct.js');
const config = require('../const/config.js');
const paypal = require('@paypal/checkout-server-sdk');
const payPalClient = require('../util/paypalClient.js');
const managerDb = require('../models/managerDb.js');

exports.createOrder = async (req, res, next) => {
  try {
    console.log('createOrder');
    let euros = req.body.euros;
    const userId = req.body.userId;

    if (!euros || isNaN(euros) || euros < 5 || euros > 1000) {
      return res.send(fct.apiResponseJson([],'Euros need to be a value within 5 and 1000.'));
    }
    euros = Math.floor(euros * 100) / 100;

    if (!userId || isNaN(userId)) {
      return res.send(fct.apiResponseJson([],'userId needs to be a number.'));
    }


    // 3. Call PayPal to set up a transaction
    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'EUR',
          value: euros
        },
        custom_id: userId
      }]
    });

    let order;

    order = await payPalClient.client().execute(request);

    // 5. Return a successful response to the client with the order ID
    res.status(200).json({
      id: order.result.id
    });
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Create Order failed.'));
  }
}

exports.captureOrder = async (req, res, next) => {
  try {
    console.log('captureOrder');
    // 2. Set up your server to receive a call from the client

    // 2a. Get the order ID from the request body
    //console.log(req);
    const userId = req.body.userId;
    if (isNaN(userId)) {
      return res.send(fct.apiResponseJson([],'userId needs to be a number.'));
    }

    const orderId = req.body.orderId;

    // 3. Call PayPal to capture the order
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    const capture = await payPalClient.client().execute(request);

    // 4. Save the capture ID to your database. Implement logic to save capture to your database for future reference.
    const captureId = capture.result.purchase_units[0]
        .payments.captures[0].id;
    const euros = capture.result.purchase_units[0]
        .payments.captures[0].amount.value;
    console.log(captureId);

    //await managerDb.fetch({userId:userId,count:euros*1000},'/api/user/tokens/add/','post');

   // await database.savecaptureId(captureId);

    // 6. Return a successful response to the client
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.send(fct.apiResponseJson([],'Capture Order failed.'));
  }
}
