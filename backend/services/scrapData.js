import puppeteer from "puppeteer";

export const scrapAmazonPrice = async (url) => {
  if (!url) {
    throw new Error("Invalid URL");
  }
  console.log("Starting Puppeteer for URL:", url);
  const browser = await puppeteer.launch({
    headless: true, 
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

    console.log("Page loaded successfully!");

    const result = await page.evaluate(() => {
      const title = document.querySelector("#productTitle")?.innerText.trim();
      const image = document.querySelector("#landingImage")?.src;
      const priceElement = document.querySelector(".a-price .a-offscreen");
      const price = priceElement ? parseFloat(priceElement.innerText.replace(/[₹$,]/g, "")) : null;
      const discount = document.querySelector(".savingsPercentage")?.innerText.trim();
      const reviews = document.querySelector(".a-icon-alt")?.innerText.trim();
      const reviewCount = document.querySelector("#acrCustomerReviewText")?.innerText.trim();
      const availability = document.querySelector("#availability span.a-declarative")?.innerText.trim();
      const description = document.querySelector("#feature-bullets")?.innerText.trim();
      const categories = Array.from(document.querySelectorAll(".a-unordered-list.a-horizontal.a-size-small li a"))
        .map(a => a.innerText.trim());
      return { title, image, price,discount, reviews, reviewCount, availability, description, categories };
    });

    console.log("Scraped data:", result);

    await browser.close();
    return result;
  } catch (error) {
    console.error("Error scraping page:", error);
    await browser.close();
    return null;
  }
};

