import express from 'express';
import { createOrder, getOrders } from '../controllers/order.controller.js';
import { auth } from '../middelware/auth.middleware.js';
const router = express.Router();

router.post('/order',auth , createOrder);
router.get('/orders',auth , getOrders);

export default router;