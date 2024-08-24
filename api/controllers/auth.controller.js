import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

export const signup = async(req,res,next) => {
    const {username,password,email} = req.body;
    const hashedpassword = bcryptjs.hashSync(password,8);
    const newUser = new User({
        username,
        email,
        password: hashedpassword,
    });
    try {
        await newUser.save();
        res.status(201).json("Signup is success");
    } catch (error) {
        next(error);
    }
};