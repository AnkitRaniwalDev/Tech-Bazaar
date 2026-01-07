import { Product } from "../models/product.model.js";

export const getProducts = async (req, res) => {
    try {

        const products = await Product.find();
        res.status(200).json(products);


    }
    catch (error) {
        res.status(500).json({ message: " server error product" });
    };

};

export const searchProducts = async (req, res) => {
    try {
        const { key } = req.params;
        const products = await Product.find({
            name: { $regex: key, $options: 'i' }
        });
        res.status(200).json(products);
    }
    catch (error) {
        res.status(500).json({ message: " server error search product" });
    };
};

