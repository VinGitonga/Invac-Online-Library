import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:'Name is required'
    },
    email:{
        type:String,
        required:"Username is required",
        unique:true
    },
    password:{
        type:String,
        required: [true, "Please input your password"],
        minlength:6,
        maxlength: 1024,
        trim:true
    },
    createdAt:{
        type:Date,
        required:true,
        trim:true,
        default: Date.now
    }
},{
    timestamps:true
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
