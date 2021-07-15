const {Router} = require('express')
const router = Router()
const {signIn, signUp, dashboard, homePage} = require('../controllers/homecontroller')

const {authUser} = require('../auth/authentication')

// Signup and Login Routes
router.post('/signup', signUp)
router.post('/login', signIn)

// Landing Page
router.get('/', homePage)
// Dashboard
router.get('/dashboard', authUser, dashboard)
// Signout
router.get('/signout', authUser, signOut)
module.exports = router