import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/dbConfig.js";
import userRouter from "./routes/userRoutes.js";
import productRouter from "./routes/productRoute.js";

//dotenv config
dotenv.config();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("welcome ecommerce api");
});

//connect to db
connectDB();

//routes
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);

//port
const PORT = process.env.PORT || 3000;

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
