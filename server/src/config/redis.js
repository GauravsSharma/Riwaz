import { createClient } from 'redis';

import dotenv from "dotenv";
dotenv.config();

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_PORT
    }
});
redisClient.on("ready",()=>{
    console.log("Redis connect ho gaya h bhai.");
    
})
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.connect();
export default redisClient


