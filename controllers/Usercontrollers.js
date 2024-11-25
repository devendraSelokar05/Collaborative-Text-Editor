import { User}  from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// RegisterController
const RegisterUser = async(req, res)=>{
    try {
        const {name, email, password} = req.body

        //validation
        const exisitingUser = await User.findOne({email})

        if (exisitingUser) {
            return res.status(400).send({
                message: "Email Already Exist"
            })
        }
         // hash password
         const hashedPassword = await bcrypt.hash(password, 10)

         //create and save a new user
         const newUser = new User({name, email, password: hashedPassword})
         await newUser.save()
         res.status(201).json({ 
            message: 'User registered successfully',
            user: newUser
         });
    }
    catch (error) {
        res.status(500).send({
            message: "Failed to Register User",
            details: error.message
        })
    }
}

// LoginController
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        // Find user by email
        const user = await User.findOne({email});
        if (!user) {
            return res.status(404).send({
                message: "User not found"
            });
        }

        // Verifying Password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Invalid Credentials"
            });
        }

        // Generating token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });

        return res.status(200).json({
            message: "User LoggedIn Successfully",
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to log in",
            details: error.message
        });
    }
};

//UpdateUserController
const updateUser = async (req, res) => {
    try {
        const{role, status, name} = req.body;
           // Update the lastseen field with the current date/time
           const updateduser = await User.findByIdAndUpdate(
            req.params.id,
            {
                name,
                role,
                status,
                lastseen: Date.now(),
            },
            { new: true }

           );
           if(!updateUser){
            res.status(400).json({
              message: "User not found"  
            })
           }
           res.status(200).json({
            message: "User Updated Successfully",
            user:updateduser
           })
    } catch (error) {
        res.status(500).json({
            message: "Failed to update user",
            details : error.message
        })
    }
}

//getuserController
const getUser = async (req, res) => {
    try {
    
        const users = await User.find()
        res.status(200).json({
            message: "Users Retrieved Successfully",
            users: users,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to Rretrived User",
            details: error.message
        })
    }
}

export { RegisterUser, loginUser, updateUser, getUser };
