import app from "./api/index.js"
import dotenv from "dotenv"
dotenv.config()
app.listen(5000,()=>{
    console.log("Server running on port");
})