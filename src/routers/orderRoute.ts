import express from "express"

import {createOrder,
    getAllOrder} from "../controllers/orderController"
import {adminLoginController} from "../controllers/adminController";
import {verifyAdmin} from "../middleware/jwtAuth"
const router = express.Router()
router.post("/admin",adminLoginController);
router.post("/postOrder",verifyAdmin,createOrder,);
router.get("/getAllOrder",verifyAdmin,getAllOrder);




export default router;