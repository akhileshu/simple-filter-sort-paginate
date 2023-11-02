import mongoose from 'mongoose'

// Define a schema for your product
const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  // You can add more fields as needed
});
 
// Create a model based on the schema
const Product = mongoose.model('Product', productSchema);
export default Product

