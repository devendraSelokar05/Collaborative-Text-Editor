import mongoose, {Schema} from "mongoose"
const codeSessionSchema = new Schema({
    code: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        default: 'javascript', // default language is javascript
    },
    theme: {
        type: String,
        default: 'vs-dark', // default theme is dark
    },
    participants: [{
   
        name: {
            type: String,
            required: true
        },
        role: {
            type: String, 
            default: 'viewer', // Default role for a participant
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {timestamps: true});

export const codeSession = mongoose.model("codeSession", codeSessionSchema);