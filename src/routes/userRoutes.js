const {Router} = require('express')
const router = Router()
const {signIn, signUp, dashboard} = require('../controllers/homecontroller')

const {authUser} = require('../auth/authentication')

// Signup and Login Routes
router.post('/signup', signUp)
router.post('/login', signIn)


// Dashboard
router.get('/dashboard', authUser, dashboard)

module.exports = router