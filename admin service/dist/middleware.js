import dotenv from "dotenv";
dotenv.config({ quiet: true });
import axios from 'axios';
export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(403).json({
                message: "Please login"
            });
            return;
        }
        const { data } = await axios.get(`${process.env.User_URL}/api/v1/user/me`, {
            headers: {
                token,
            }
        });
        req.user = data;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "please login"
        });
    }
};
//multer setup
import multer from "multer";
const storage = multer.memoryStorage();
const uploadFile = multer({ storage }).single("file");
export default uploadFile;
//# sourceMappingURL=middleware.js.map