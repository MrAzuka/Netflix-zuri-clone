require('dotenv').config()
const {SECRET_KEY} = process.env
const stripe = require('stripe')('SECRET_KEY')

exports.stripeToken = (req,res) => {
    try {
        stripe.customers
          .create({
            name: req.body.name,
            email: req.body.email,
            source: req.body.stripeToken
          })
          .then(customer =>
            stripe.charges.create({
              amount: req.body.amount * 100,
              currency: "usd",
              customer: customer.id
            })
          )
          .then(() => res.send("TRansaction Completed"))
          .catch(err => console.log(err));
      } catch (err) {
        res.send(err);
      }
}