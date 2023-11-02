import express from "express";
import cors from "cors";

// db 
import "./config/db.js"

  
// for using path
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";  

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Now you can use __dirname as you normally would in CommonJS modules.

 import productRoutes from './routes/product.js'
import Product from "./model/product.js";

const app = express();
app.use(express.json());
app.use(cors()); 

// routes
app.use('/api',productRoutes); 

app.listen(4000, () => console.log("server started at port 4000"));
 