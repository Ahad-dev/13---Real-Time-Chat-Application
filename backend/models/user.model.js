import { Schema,model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
        enum:["Male","Female"]
    },
    profilePic:{
        type: String,
        default: "",
    },
},{timestamps:true});

const User = model("User", userSchema);

export default User;