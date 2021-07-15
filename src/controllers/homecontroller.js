const User = require('../models/user')
const {signupToken, loginToken} = require('../jwt/token')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {SECRET, EXPIRE_TIME} = process.env


// SignUp and Registration controller
exports.signUp = (req,res) => {
   const {email, password} = req.body
        // Check if email exists
        User.findOne({email}, (err, existingUser) => {
            if(existingUser){
                res.status(400).json({message:'User already exists'})
            }
            if(err){
                res.status(500).json({err})
            }
             // Create New User
             User.create({
                email,
                password
            }, (err, newUser) => {
                if(err){
                res.status(500).json({err})
                }else{
                    res.send({message: "New User created"})
                    res.status(200)
                }
                signupToken(newUser)
                // redirect to login route
                res.redirect('/login')
            })
            })  
}


// Signin and Login controller
exports.signIn = (req,res) => {
    const {email, password} = req.body
    
       // Check if email exist
    User.findOne({email}, (err,existingUser) => {
        if (err) {
            res.status(500).json({err})
        }
        if(!existingUser) {
            res.status(401).json({message: "Incorrect Username"})
        }
        // Compare passowrd with hashed password
        // console.log(password)
        // console.log(existingUser)
        let matchedPassword = bcrypt.compare(password, existingUser.password)
        if(!matchedPassword){
            res.status(401).json({message: "Incorrect password"})
        } 

        // loginToken(existingUser)
        loginToken(existingUser)
        // redirect to dashboard route
        res.redirect('/dashboard')
    })
    
}

// DashBoard
exports.dashboard = (req,res) => {
    res.send({message: `Welcome to Netflix ${req.body.email}`})
    res.status(200)
}

// Landing Page
exports.homePage = (req,res) => {
    res.send({message: `Welcome to Netflix. Please login`})
    res.status(200)
}

// Signout
exports.signOut = (req,res) => {
    res.send({message: `Goodbye......`})
    res.status(200)
    // redirect to home page
    res.redirect('/')
}