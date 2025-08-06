import express from "express";

import indexRoute from "./src/routers/indexRoute";

const app = express()

app.use(express.json());


app.use("/api",indexRoute);

export default app;

const port = 3000;

app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})


