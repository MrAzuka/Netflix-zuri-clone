const jwt = require('jsonwebtoken')
require('dotenv').config()
const {SECRET, EXPIRE_TIME} = process.env

exports.loginToken = () => {
    jwt.sign({
        id: existingUser._id,
        email: existingUser.email,
    }, SECRET, {expiresIn: EXPIRE_TIME},
    (err, token) => {
        if (err) {
            res.status(500).json({err})
        }else{
            res.status(200).json({message: "Login Token Successful", token})
        }
    })
}

exports.signupToken = () => {
    jwt.sign({
        id: newUser._id,
        email: newUser.email,
    }, SECRET, {expiresIn: EXPIRE_TIME},
    (err, token) => {
        if (err) {
            res.status(500).json({err})
        }else{
            res.status(200).json({message: "Signup Token Successful", token})
        }
    })
}