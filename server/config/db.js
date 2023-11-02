import mongoose from "mongoose";
import Product from "../model/product.js";
import axios from "axios";

mongoose
  .connect("mongodb://127.0.0.1:27017/searchFilterPagination", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  });

const db = mongoose.connection;
 
db.once("open", async () => {
  if ((await Product.countDocuments().exec()) > 0) return;
  // Function to fetch random Unsplash images
  const getRandomUnsplashImage = async () => {
    const response = await axios.get(
      "https://source.unsplash.com/random/400x400",
      {
        responseType: "stream",
      }
    );
    return response.request.res.responseUrl;
  };
  const productsToAdd = [
    {
      name: "iPhone 12",
      description:
        "The best iPhone ever with incredible performance and 2 hours of battery life.",
      price: 999.99,
      category: "Electronics",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Samsung Galaxy S22",
      description:
        "A top-tier Android phone with a stunning display and exceptional camera capabilities.",
      price: 899.99,
      category: "Electronics",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Sony Bravia 4K TV",
      description:
        "Experience stunning 4K visuals with this high-end television.",
      price: 1499.99,
      category: "Electronics",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Dell XPS 13 Laptop",
      description:
        "A premium laptop with a sleek design and powerful performance.",
      price: 1199.99,
      category: "Electronics",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Nike Air Max Shoes",
      description:
        "Get the latest in comfort and style with these Air Max sneakers.",
      price: 129.99,
      category: "Clothing",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Modern Living Room Sofa",
      description:
        "Upgrade your living space with this comfortable and stylish sofa.",
      price: 799.99,
      category: "Home Decor",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "LEGO Creator Expert Carousel",
      description:
        "Build a magnificent carousel with this LEGO set and bring joy to all.",
      price: 199.99,
      category: "Toys",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "The Great Gatsby - Hardcover",
      description:
        "A classic novel by F. Scott Fitzgerald, now in a beautiful hardcover edition.",
      price: 19.99,
      category: "Books",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Nike Dri-FIT Sports T-shirt",
      description:
        "Stay comfortable and dry during workouts with this Nike Dri-FIT shirt.",
      price: 29.99,
      category: "Sports",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Amazon Echo Dot (4th Gen)",
      description:
        "A smart speaker with Alexa, perfect for your home automation needs.",
      price: 49.99,
      category: "Electronics",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Adidas Ultraboost Running Shoes",
      description:
        "Experience the ultimate in running comfort with these Adidas Ultraboost shoes.",
      price: 149.99,
      category: "Sports",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Samsung 55-inch QLED 4K TV",
      description:
        "Immerse yourself in stunning 4K visuals with this Samsung QLED TV.",
      price: 899.99,
      category: "Electronics",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Fiction Bestsellers Collection",
      description:
        "Get the latest bestselling fiction novels in this exclusive collection.",
      price: 69.99,
      category: "Books",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Apple Watch Series 7",
      description:
        "Stay connected and track your fitness with the Apple Watch Series 7.",
      price: 349.99,
      category: "Electronics",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Modern Leather Recliner Chair",
      description:
        "Relax in style with this luxurious leather recliner chair for your living room.",
      price: 799.99,
      category: "Home Decor",
      image: await getRandomUnsplashImage(),
    },
    {
      name: "Canon EOS Rebel T7i DSLR Camera",
      description:
        "Capture stunning photos and videos with this high-quality DSLR camera.",
      price: 699.99,
      category: "Electronics",
      image: await getRandomUnsplashImage(),
    },
    // Add more products here to reach a total of 20
  ];

  Product.create(productsToAdd)
    .then(() => console.log("20 products added"))
    .catch((error) => console.error("Error adding products: ", error));
});
