import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URI )
        console.log(`Databse is successfully Connected`)
    } catch (error) {
        console.log("Databse is Failed to Connect", error)
        
    }
}

export default ConnectDB