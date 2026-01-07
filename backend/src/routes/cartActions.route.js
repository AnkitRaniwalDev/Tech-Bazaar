import express from "express";
import { updateQuantity, removeCartItem } from "../controllers/cartActions.controller.js";
import { auth } from '../middelware/auth.middleware.js';

const router = express.Router();
router.put("/update/:productId/:type", auth, updateQuantity);
router.delete("/remove/:title", auth, removeCartItem);

export default router;