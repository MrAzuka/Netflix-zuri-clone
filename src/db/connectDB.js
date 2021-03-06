const {connect} = require('mongoose')
require('dotenv').config()
const {MONGO_URI} = process.env

exports.connectDB = async () => {
    try {
        await connect(MONGO_URI, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        console.log("Database Connected")
        
    } catch (error) {
        console.error(error.message)

        process.exit(1)
    }
   
}