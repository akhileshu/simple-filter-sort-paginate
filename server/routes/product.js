import express from "express";
import { fetchProducts } from "../controller/product.js";


const router = express.Router();

// url -> root/task
router
  //   .get("/fetch/:id", getTasksByUserId)
  .get("/", fetchProducts)
  
  

export default router;
