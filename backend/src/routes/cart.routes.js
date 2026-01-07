import express from "express";
import { addToCart, getCartItems} from "../controllers/cart.controller.js";
import { auth } from '../middelware/auth.middleware.js';

const router = express.Router();

router.post("/add",auth ,addToCart);
router.get("/get",auth ,getCartItems);


export default router;