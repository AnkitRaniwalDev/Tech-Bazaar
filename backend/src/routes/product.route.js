import express from 'express';
import { getProducts, searchProducts } from '../controllers/product.controller.js';

const router = express.Router();

router.get('/products', getProducts);
router.get('/search/:key', searchProducts);

export default router;