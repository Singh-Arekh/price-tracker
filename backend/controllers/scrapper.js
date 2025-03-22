import { scrapAmazonPrice } from "../services/scrapData.js";

export const scrapper = async(req, res) => {
    let { url } = req.body;
    if (!url) return res.status(400).json({ message: "Invalid URL format" });
    console.log("Original URL being scraped:", url);

    try {
        const cleanUrl = url.split('/ref')[0] + '/';
        console.log("Cleaned URL being returned:", cleanUrl);
        const data = await scrapAmazonPrice(cleanUrl);
        console.log("Scraped Data:", data);
        res.json({ data: data });
        

    } catch (err) {
        console.error("Error processing URL:", err);
        res.status(500).json({ message: "An error occurred while processing the URL" });
    }
};
