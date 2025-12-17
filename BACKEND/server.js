const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
app.use(express.json());
dotenv.config();
const cors = require("cors");
app.use(cors());
const PORT = 2000;
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const orderRouter = require("./routes/orderRoute");
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
mongoose
  .connect("mongodb://localhost:27017/SHOP")
  .then(() => {
    console.log("database connected");
    app.listen(PORT, () => {
      console.log("Server is running", PORT);
    });
  })
  .catch((e) => console.log("Error", e));
