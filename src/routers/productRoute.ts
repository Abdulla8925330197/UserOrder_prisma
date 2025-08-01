import express from "express";

import{createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct} from "../controllers/productControllers";

    const router = express();

    router.post("/postProduct",createProduct);
    router.get("/getProduct",getAllProducts);
    router.put("/updateProduct",updateProduct);
    router.get("/getbyIdProduct/:id",getProductById);
    router.delete("deleteProduct/:id",deleteProduct);

    export default router;
