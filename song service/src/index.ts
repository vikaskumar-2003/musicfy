import dotenv from "dotenv"
dotenv.config({
    quiet:true
})


import express from "express"
import songRoutes from "./route.js"
import redis from "redis"

export const redisClient=redis.createClient({
    password:process.env.REDIS_PASSWORD as string,
    socket:{
        host:"microbright-sleek-festive-94509.db.redis.io",
        port:14363
    }
})

redisClient.connect().then(()=>console.log("connected to redis")).catch(console.error);



const app=express()

const PORT=process.env.PORT

app.use("/api/v1",songRoutes)

app.listen(PORT,()=>{
    console.log("server is running");
    
})