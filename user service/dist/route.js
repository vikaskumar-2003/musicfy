import express from "express";
import { addToPlaylist, loginUser, myProfile, registerUser } from "./controllers.js";
import { isAuth } from "./middleware.js";
const userRouter = express.Router();
userRouter.post("/user/register", registerUser);
userRouter.post("/user/login", loginUser);
userRouter.get("/user/me", isAuth, myProfile);
userRouter.post("/song/:id", isAuth, addToPlaylist);
export default userRouter;
//# sourceMappingURL=route.js.map