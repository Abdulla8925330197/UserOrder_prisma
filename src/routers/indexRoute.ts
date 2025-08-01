import express from "express";

import orderoute from "./orderRoute";

import productRoute from "./productRoute";

 import profileroute from "./profileRoute";
import getUser from "./getProfileverify"
const app = express()
app.use("/userLogin",getUser)//getProfileverify
app.use("/apiOrder",orderoute)//orderRoute
app.use("/apiProduct",productRoute)//productRoute
 app.use("/apiProfile",profileroute)//profileRoute

export default app;