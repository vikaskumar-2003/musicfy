import dotenv from "dotenv";
dotenv.config({
    quiet: true
});
import express from "express";
import mongoose, { mongo } from "mongoose";
import userRouter from "./route.js";
import cors from "cors";
const app = express();
app.use(cors());
const connectDb = async () => {
    try {
        //  console.log(process.env.MONGO_URI)
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Spotify"
        });
        console.log("CONNECT");
    }
    catch (error) {
        console.log(error);
    }
};
const port = process.env.PORT || 5000;
app.use(express.json());
app.use("/api/v1", userRouter);
app.listen(5000, () => {
    console.log(`server is running on ports ${port}`);
    connectDb();
});
//# sourceMappingURL=index.js.map