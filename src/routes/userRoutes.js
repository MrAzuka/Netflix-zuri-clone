const {Router} = require('express')
const router = Router()
const {signIn, signUp, dashboard} = require('../controllers/homecontroller')
const {stripeToken} = require('../controllers/stripeController')
const {authUser} = require('../auth/authentication')

// Signup and Login Routes
router.post('/signup', signUp)
router.post('/login', signIn)

// Stripe Routes
router.post('/payment', stripeToken)

// Dashboard
router.get('/dashboard', authUser, dashboard)

module.exports = router