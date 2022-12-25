import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

/* register User */
export const register = async(req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            role
        } = req.body;

        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            role
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

/* Logging in */
export const loginUser = async (req, res) => {
    
    
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email});
        if (!user) return res.status(400).json({msg: "Pengguna tidak terdata. "});
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({msg: "Password salah. "});

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ email, token});
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}