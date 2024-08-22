import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async(req,res) => {
    const {username,password,email} = req.body;
    const hashedpassword = bcryptjs.hashSync(password,8);
    const newUser = new User({
        username,
        email,
        password: hashedpassword,
    });
    try {
        await newUser.save();
        res.json("Signup is success");
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};