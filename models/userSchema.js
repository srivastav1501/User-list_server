const mongoose= require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('not a valid email address')
            }
        }
    },
    number: {
        type:String,
        required:true,
        unique:true
    }
})

const User = new mongoose.model('users', userSchema);


module.exports = User;