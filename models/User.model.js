import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type: String,
        enum: ["viewer", "editor", "admin"],
        default: "viewer",
    },
    status:{
        type: String,
        enum:["online", "offline", "typing"],
        default: "offline",
    },
    lastseen:{
        type: Date,
        default: new Date()
    },
    session:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'codeSession'
    }],
    
}, {timestamps: true})

export const User = mongoose.model("User", userSchema)

