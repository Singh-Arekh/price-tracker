import Product from "../models/Product.js";
import { scrapAmazonPrice } from "../services/scrapData.js";

export const scrapper = async (req, res) => {
  let { url } = req.body;
  if (!url) return res.status(400).json({ message: "Invalid URL format" });
  console.log("Original URL being scraped:", url);

  try {
    const cleanUrl = url.split("/ref")[0] + "/";
    console.log("Cleaned URL being returned:", cleanUrl);
    const data = await scrapAmazonPrice(cleanUrl);
    console.log("Scraped Data:", data);
    res.json({ data: data });
    if (!data || !data.title) {
      return res.status(400).json({
        message: "Could not fetch product details",
        scrapedData: data,
      });
    }
    const newProduct = new Product({
      title: data.title,
      url,
      image: data.image,
      currentPrice: data.price,
      priceHistory: [
        {
          price: data.price,
          date: new Date(),
          source: "Amazon",
          currency: "USD",
        },
      ],
      reviews: data.reviews || "",
      reviewCount: data.reviewCount || 0,
      description: data.description || "",
      categories: data.categories || [],
    });
    await newProduct.save();
    console.log("Product saved successfully!");
    res.json(newProduct);
  } catch (err) {
    console.error("Error processing URL:", err);
    res
      .status(500)
      .json({ message: "An error occurred while processing the URL" });
  }
};

export const getAllProducts = async(req,res)=>{
    try{
        const products = await Product.find();
        res.json(products);
    }
    catch(err){
        res.json(err)
    }
}

export const getProductbyId = async(req,res)=>{
    try{
        const {id} = req.params
        const product = await Product.findById(id);
        res.json(product);
    }
    catch(err){
        res.json(err)
    }
}
