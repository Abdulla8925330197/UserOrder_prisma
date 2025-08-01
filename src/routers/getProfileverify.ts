import express from "express";
import {loginProfile,getProfileFromToken,} from "../controllers/getProfile";

const router = express();
//It is get profiles with token 
router.post("/loginUser",loginProfile);
router.get("/getUser",getProfileFromToken)

export default router;