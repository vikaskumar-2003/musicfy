import jwt, {} from "jsonwebtoken";
import { User } from "./model.js";
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({
                message: "Please login"
            });
        }
        const decodedValue = jwt.verify(token, process.env.JWT_KEY);
        if (!decodedValue || !decodedValue._id) {
            res.status(400).json({
                message: "invalid token"
            });
            return;
        }
        const userId = decodedValue._id;
        const user = await User.findById(userId).select("-password");
        if (!user) {
            res.status(403).json({
                message: "User not found"
            });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "please login"
        });
    }
};
//# sourceMappingURL=middleware.js.map