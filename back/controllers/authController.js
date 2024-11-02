import User from "../model/User.js";
import jwt from 'jsonwebtoken';

const signInToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email }).select("+password");
        if (!user || !(await user.matchePassword(password))) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        const token = signInToken(user._id);
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })
        res.status(200).json({ success: true, message: "User logged in", user: user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Something went wrong", err: err.message });
    }
};


export const register = async (req, res) => {
    const { name, email, password, age, gender, genderPreference, bio } = req.body;
    try {
        if (!name || !email || !password || !age || !gender || !genderPreference) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        if (age < 18) {
            return res.status(400).json({ success: false, message: "You must be at least 18 years old" });
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        const newUser = await User.create({ name, email, password, age, gender, genderPreference, bio });

        const token = signInToken(newUser._id);
        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        })

        console.log(newUser)

        res.status(201).json({ success: true, message: "Account created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong", err: error.message });
    }
}

export const logout = (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "User logged out" });
}