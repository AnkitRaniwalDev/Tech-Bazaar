import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import registerUser from "./src/routes/user.route.js";
import loginUser from "./src/routes/user.route.js";
import  ProductRouter  from "./src/routes/product.route.js";
import orderRouter from "./src/routes/order.route.js";
import cartRouter from "./src/routes/cart.routes.js";
import cartActionsRouter from "./src/routes/cartActions.route.js";
import  adminRouter  from "./src/routes/admin.route.js";

dotenv.config();
const app =express();
app.use(cors());
app.use (express.json());


app.use("/admin", adminRouter);

app.use("/update", cartActionsRouter);

app.use("/cart", cartRouter);

app.use("/cart",cartRouter );

app.use("/order",orderRouter );

app.use("/product",ProductRouter );

app.use("/api/users", registerUser);
app.use("/api/users", loginUser);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL) 
        console.log("MongoDB connected successfully");

    }

    catch (error) {
        console.error("MongoDB connection failed:", error.message);

    }
}

connectDB();



app.listen(process.env.PORT ||5000, () => {
    console.log(`Server is running on port  ${process.env.PORT}`);
});