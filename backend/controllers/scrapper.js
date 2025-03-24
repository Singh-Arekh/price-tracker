import Product from "../models/Product.js";
import { scrapAmazonPrice } from "../services/scrapData.js";

export const scrapper = async (req, res) => {
  let { url } = req.body;
  if (!url) return res.status(400).json({ message: "Invalid URL format" });


  console.log("Original URL being scraped:", url);

  try {
    const cleanUrl = url.split("/ref")[0]; //cleaning url
    console.log("Cleaned URL being returned:", cleanUrl);

    const data = await scrapAmazonPrice(cleanUrl);
    if (!data || !data.title) {
      return res.status(400).json({
        message: "Could not fetch product details",
        scrapedData: data,
      });
    }
    console.log("Scraped Data:", data);

    let existingProduct = await Product.findOne({ url: cleanUrl });

    if (existingProduct) {
      console.log("Product already exists, checking for price update...");

      const lastPriceEntry = existingProduct.priceHistory[existingProduct.priceHistory.length - 1];

      const today = new Date().toISOString().split('T')[0];

      const lastPriceEntryDate = new Date(lastPriceEntry.date).toISOString().split('T')[0];

      if (lastPriceEntryDate === today) {
        console.log("Price already recorded for today, no update needed.");
        return res.json(existingProduct);
      }

      if (lastPriceEntry && lastPriceEntry.price === data.price) {
        console.log("Price hasn't changed, no update needed.");
        return res.json(existingProduct);
      }

      existingProduct.priceHistory.push({
        price: data.price,
        date: new Date(),
        source: "Amazon",
        currency: "USD",
      });

      existingProduct.currentPrice = data.price;

      await existingProduct.save();
      return res.json(existingProduct);
    }

    // If product doesn't exist
    const newProduct = new Product({
      title: data.title,
      url: cleanUrl,
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
      discount:data.discount || "",
      reviews: data.reviews || "",
      reviewCount: data.reviewCount || 0,
      description: data.description || "",
      categories: data.categories || [],
    });

    await newProduct.save();
    console.log("Product saved successfully!");
    return res.json(newProduct);

  } catch (err) {
    console.error("Error processing URL:", err);
      return res.status(500).json({ message: "An unexpected error occurred", error: err.message });
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
