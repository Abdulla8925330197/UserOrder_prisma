import express from "express";


import {createProfile,getAllProfiles} from "../controllers/profileController";
    const route = express();
    import {adminLoginController} from "../controllers/adminController";
    import {verifyAdmin  } from "../middleware/jwtAuth";
    
route.post("/admin",adminLoginController)
    route.post("/postProfile",verifyAdmin,createProfile);
    route.get("/getProfile",verifyAdmin,getAllProfiles);
   
    
   


export default route;