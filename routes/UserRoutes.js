import express from 'express';
import { RegisterUser, loginUser, updateUser, getUser } from '../controllers/Usercontrollers.js';

const router = express.Router();

// Public routes
router.post('/register', RegisterUser);
router.post('/login', loginUser);  // Use POST method for login

// Protected route (only authenticated users can access)
router.put('/update/:id?',  updateUser);
router.get('/User/:id?', getUser)

export default router;
