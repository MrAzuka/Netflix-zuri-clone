const {Schema, model} = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Enter Email'],
        validate: {
            validator: function (value) {
              return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value.toLowerCase());
            },
            message: 'Enter a valid email',
        }
    },
    password: {
        type: String,
        required: [true, 'Password'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false,
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = model("User", userSchema)