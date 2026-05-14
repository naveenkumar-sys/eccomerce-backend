import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        enum:['buyer', 'seller'],
        required: true
    },
    token:{
        type: String
    }
}, {
    timestamps: true
})

const  User = mongoose.model('User',userSchema);

export default User
