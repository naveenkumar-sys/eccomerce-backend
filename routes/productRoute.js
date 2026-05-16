import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";
import { authentication } from "../middlewares/Authentication.js";
import { authorization } from "../middlewares/Authorization.js";

const router = express.Router();

router.post("/createProduct", authentication, authorization, createProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getProduct/:id", getProduct);
router.put("/updateProduct/:id", authentication, authorization, updateProduct);
router.delete(
  "/deleteProduct/:id",
  authentication,
  authorization,
  deleteProduct,
);
export default router;
