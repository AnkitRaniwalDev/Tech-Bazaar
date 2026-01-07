import {Product} from '../models/product.model.js';

export const addProduct = async (req, res) => {
    try{
        const { name, price, category, image, description, } = req.body;
        const newProduct = new Product({
            name,
            price,
            category,
            image,
            description,
             user:req.user.id ,
        });
        await newProduct.save();
        res.status(201).json({ message: "Product added successfully", product: newProduct });

    }
    catch(error){
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({ user: req.user.id });
        res.status(200).json(products);
    }
    catch(error){
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


export const updateProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, price, category, image, description } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, category, image, description },
            { new: true }
        );
        if(!updatedProduct){ 
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", key: updatedProduct });

    }
    catch(error){
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
export const deleteProduct = async (req, res) => {
    try{
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if(!deletedProduct){
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch(error){
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

           
   