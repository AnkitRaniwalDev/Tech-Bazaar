import { Cart } from "../models/cart.model.js";

export const addToCart = async (req, res) => {
    try {
        const { productId, title, price, image, quantity } = req.body;
        const userId = req.user.id;

        let cartItem = await Cart.findOne({ user: userId, productId });

        if (cartItem) {
            cartItem.quantity += quantity || 1;
            await cartItem.save();
        } else {
            cartItem = new Cart({
                user: userId,
                productId,
                title,
                price,
                image,
                quantity: quantity || 1
            });
            await cartItem.save();
        }

        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

export const getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find({ user: req.user.id });
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};







