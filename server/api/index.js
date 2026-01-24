import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import Stripe from "stripe";

import userRoutes from "../src/routes/user.route.js";
import storeRoutes from "../src/routes/store.route.js";
import productRoute from "../src/routes/product.route.js";
import userCartRoute from "../src/routes/userCart.route.js";
import productReview from "../src/routes/productReview.route.js";
import orderRoute from "../src/routes/order.route.js";
import parentProduct from "../src/routes/parentProduct.route.js";
import dashboardRoutes from "../src/routes/dashboard.route.js";
import connectDB from "../src/db/db.js";

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

connectDB();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.use("/api/user", userRoutes);
app.use("/api/store", storeRoutes);
app.use("/api/product", productRoute);
app.use("/api/usercart", userCartRoute);
app.use("/api/review", productReview);
app.use("/api/order", orderRoute);
app.use("/api/parentProduct", parentProduct);
app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
