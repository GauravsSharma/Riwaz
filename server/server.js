import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from './src/routes/user.route.js';
import storeRoutes from './src/routes/store.route.js';
import productRoute from './src/routes/product.route.js';
import userCartRoute from './src/routes/userCart.route.js';
import productReview from './src/routes/productReview.route.js';
import orderRoute from './src/routes/order.route.js';
import parentProduct from './src/routes/parentProduct.route.js';
import connectDB from './src/db/db.js';
import Stripe from 'stripe';
// import "./src/models/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({
  origin: "http://localhost:3000",  // specific domain, NOT "*"
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
connectDB()

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.use('/api/user', userRoutes);
app.use('/api/store', storeRoutes);
app.use('/api/product', productRoute);
app.use('/api/usercart', userCartRoute);
app.use('/api/review', productReview);
app.use('/api/order', orderRoute);
app.use('/api/parentProduct', parentProduct);
app.get('/', (req, res) => {
  res.send('Hello World!');
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
