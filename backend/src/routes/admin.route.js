import express from 'express';
import {addProduct,updateProduct,deleteProduct,getProducts} from '../controllers/admin.controller.js';
import {auth} from '../middelware/auth.middleware.js';

const router = express.Router();

router.post('/add-product', auth, addProduct);
router.get('/products', auth, getProducts);
router.put('/update-product/:id', auth, updateProduct);
router.delete('/delete-product/:id', auth, deleteProduct);


export default router;