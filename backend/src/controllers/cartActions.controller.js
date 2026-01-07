import {Cart} from "../models/cart.model.js";



export const updateQuantity = async (req, res) => {
    try {
        const title = decodeURIComponent(req.params.title);
        const { type } = req.params;
        const userId = req.user._id;
        const change = type === "inc" ? 1 : -1;

        const cart = await Cart.findOneAndUpdate(
            { user: userId, "cartItems.title": title },
            { $inc: { "cartItems.$.quantity": change } },
            { new: true }
        );

        if (!cart) return res.status(404).json({ message: "Item not found" });
        res.status(200).json(cart.cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeCartItem = async (req, res) => {
    try {
        const title = decodeURIComponent(req.params.title);
        const userId = req.user._id;

        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { cartItems: { title: title } } },
            { new: true }
        );

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        res.status(200).json(cart.cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



