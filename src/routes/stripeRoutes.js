const express = require("express");
const router = express.Router();
const { stripeHome, 
    stripeCustomer,stripeAllCards,
    stripeCardDetails,stripeCreateCard,
    stripeDeleteCard,stripeNewCard} = require('../controllers/stripeController')

router.get("/stripe", stripeHome);

// Stripe Routes


router.post("/newCustomer", stripeCustomer)
  
  // Add a new card of the customer
  router.post("/addNewCard", stripeNewCard)
  
  // Get List of all saved card of the customers
  router.get("/viewAllCards",stripeAllCards)
  
  // Update saved card details of the customer
  router.post("/updateCardDetails", stripeCardDetails)
  
  // Delete a saved card of the customer
  router.post("/deleteCard",stripeDeleteCard );
  
  // Create a payment charge
  router.post("/createCharge",stripeCreateCard);

module.exports = router;