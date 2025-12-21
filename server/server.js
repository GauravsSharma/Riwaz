import dotenv from "dotenv";
import app from "./api/index.js";
dotenv.config();
app.listen(5000, () => console.log("Local server running"));
