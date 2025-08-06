import express from "express";

const router = express()

 
import{getProfileFromTokenforOrder}from "../controllers/usersOrder" 
import {createOrder,
    getAllOrder} from "../controllers/orderController"
import {adminLoginController} from "../controllers/adminController";
import {verifyAdmin} from "../middleware/jwtAuth";
import {createProfile,getAllProfiles} from "../controllers/profileController";
import {loginProfile,getProfileFromToken,} from "../controllers/getProfile";
import {getOrders} from "../controllers/order.controller";
import {generateFilterToken} from "../controllers/getOrderjwtCon";
import {decodeFilterToken} from "../middleware/getOrderAuth"

router.post("/admin",adminLoginController);
router.post("/postOrder",verifyAdmin,createOrder,);
router.get("/getAllOrder",verifyAdmin,getAllOrder);
//profile Routes
// router.post("/admin",adminLoginController)
 router.post("/postProfile",verifyAdmin,createProfile);
router.get("/Getprofile",verifyAdmin,getAllProfiles);
//profileByJWT auth
router.post("/loginUser",loginProfile);
router.get("/profile",getProfileFromToken)
//userOrders
// router.post("/orders",loginProfilewithOrder);
router.get("/getOrderFilter",decodeFilterToken,getOrders);
router.post("/Order",generateFilterToken)

export default router; 