const { chromium } = require("playwright");
const fs = require('fs');
const path = require('path');

async function saveHackerNewsArticles() {
    const browser = await chromium.launch({ headless: false }); // Consider headless: true for production
    try {
        const page = await browser.newPage();
        console.log("Navigating to Hacker News...");
        await page.goto("https://news.ycombinator.com", { waitUntil: 'networkidle' });

        console.log("Waiting for article links to be visible...");
        await page.waitForSelector('.athing', { timeout: 60000 });

        console.log("Scraping articles...");
        const articles = await page.evaluate(() => {
            const items = Array.from(document.querySelectorAll('.athing')); // Each article row has the class 'athing'
            return items.slice(0, 10).map(el => {
                const titleElement = el.querySelector('span.titleline > a'); // Ensuring it targets the correct element
                const title = titleElement ? titleElement.innerText : 'Title not found';
                const url = titleElement ? titleElement.href : 'URL not found';
                return { title, url };
            });
        });
        

        if (articles.length === 0) {
            console.log('No articles were found. Check the page structure and selectors.');
            return;
        }

        const csvFile = path.join(__dirname, 'articles.csv');
        let csvContent = 'Title,URL\n';
        articles.forEach(({ title, url }) => {
            csvContent += `"${title.replace(/"/g, '""')}", "${url}"\n`;
        });

        fs.writeFileSync(csvFile, csvContent);
        console.log('CSV file has been created successfully.');
        console.log(`Found and saved ${articles.length} articles.`);
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await browser.close();
    }
}

(async () => {
    await saveHackerNewsArticles();
})();
