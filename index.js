const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const port = process.env.PORT || 3030;

app.get("/image", async (req, res) => {
  const html = `<div style="width: 100px; height: 100px; background: red; display: flex; color: white;"> I m here </div>`;

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set the viewport size
    await page.setViewport({ width: 1920, height: 1080 });

    // Navigate to the HTML content
    await page.setContent(html);

    // Take a screenshot of the page
    const screenshot = await page.screenshot({ type: "png" });

    // Set the response headers
    res.setHeader("Content-Type", "image/png");
    res.setHeader("Content-Disposition", "attachment; filename=screenshot.png");

    // Send the image data
    res.send(screenshot);

    // Close the browser
    await browser.close();
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("An error occurred");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
