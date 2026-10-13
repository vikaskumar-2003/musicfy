import dotenv from "dotenv";
dotenv.config({
    quiet: true
});
import express from "express";
import { sql } from "./config/db.js";
import adminRoutes from "./routes.js";
import cloudinary from "cloudinary";
import cors from "cors";
import redis from "redis";
export const redisClient = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: "microbright-sleek-festive-94509.db.redis.io",
        port: 14363
    }
});
redisClient.connect().then(() => console.log("connected to redis")).catch(console.error);
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
async function initDB() {
    try {
        await sql `
     CREATE TABLE IF NOT EXISTS albums(
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     description VARCHAR(255) NOT NULL,
     thumbnail VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     )  `;
        await sql `
     CREATE TABLE IF NOT EXISTS songs(
     id SERIAL PRIMARY KEY,
     title VARCHAR(255) NOT NULL,
     description VARCHAR(255) NOT NULL,
     thumbnail VARCHAR(255) ,
     audio VARCHAR(255) NOT NULL,
     album_id INTEGER REFERENCES albums(id) ON DELETE SET NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     )  `;
        console.log("database inital");
    }
    catch (error) {
        console.log("error initdb", error);
    }
}
app.use("/api/v1", adminRoutes);
const port = process.env.PORT || 7000;
initDB().then(() => {
    app.listen(port, () => {
        console.log("server is runnning");
    });
});
//# sourceMappingURL=index.js.map