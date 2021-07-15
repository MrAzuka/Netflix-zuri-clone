const {User} = require('../models/user')
const {signupToken, loginToken} = require('../jwt/token')
const bcrypt = require('bcrypt')

// SignUp and Registration controller
exports.signUp = (req,res) => {
   
        // Check if email exists
        User.findOne({email: req.body.email}, (err, existingUser) => {
            if(existingUser){
                res.status(400).json({message:'User already exists'})
            }
            if(err){
                res.status(500).json({err})
            }
             // Create New User
        User.create({
            email: req.body.email,
            password: req.body.password
        }, (err, newUser) => {
            if(err){
             res.status(500).json({err})
            }
            signupToken(newUser)
        })
        })
       
        // res.send({message: "New User created"})
        // res.status(200)
    
}


// Signin and Login controller
exports.signIn = async (req,res) => {
    try {
        await User.findOne({email: req.body.email}, (err, existingUser) => {
            if (err) {
                res.status(500).json({err})
            }
            if(!existingUser) {
                res.status(401).json({message: "Incorrect Username"})
            }
            // Compare passowrd with hashed password
            let matchedPassword = bcrypt.compareSync(req.body.password, existingUser.password)
            if(!matchedPassword){
                res.status(401).json({message: "Incorrect password"})
            } 
            loginToken(existingUser)
        })
    } catch (error) {
        res.send({message: "User cannot be login"})
        res.status(500)
    }
}

// DashBoard
exports.dashboard = (req,res) => {
    res.send({message: `Welcome to Netflix ${req.body.email}`})
    res.status(200)
}