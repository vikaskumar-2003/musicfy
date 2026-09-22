import TryCatch from "./tryCatch.js";
import { User } from "./model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const registerUser = TryCatch(async (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "all fields are required"
        });
    }
    let user = await User.findOne({
        email
    });
    if (user) {
        return res.status(400).json({
            message: "user already exist"
        });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = await User.create({
        name,
        email,
        password: hashPassword
    });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "1d" });
    res.status(200).json({
        message: "user created",
        user,
        token
    });
});
export const loginUser = TryCatch(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404).json({
            message: "user not exists"
        });
        return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(404).json({
            message: "user not exists"
        });
        return;
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: "7d" });
    res.status(200).json({
        message: "login user",
        user,
        token
    });
});
export const myProfile = TryCatch(async (req, res) => {
    const user = req.user;
    res.json(user);
});
//# sourceMappingURL=controllers.js.map