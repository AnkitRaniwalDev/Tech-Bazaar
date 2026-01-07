import { Order} from "../models/order.model.js";
import {Cart} from "../models/cart.model.js"; // isko import  is liye kiya taki cart ke items delete kr ske order place hone k bad

export const createOrder = async (req, res) => {
    try {
        const { fullName, mobileNumber, address, city, pincode, state, cartItems } = req.body;
        const newOrder = new Order({
            fullName,
            mobileNumber,
            address,
            city,
            pincode,
            state,
            cartItems,
            user:req.user.id ,
            

        });
        const savedOrder = await newOrder.save();
        await Cart.findOneAndDelete({ user: req.user.id });  // cart ke itmens delete krne ke liye order place hone k bad
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};