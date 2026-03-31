const puppeteer = require('puppeteer');
const path = require('path');

async function captureCharts() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport for crisp images
  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });

  const htmlPath = path.join(__dirname, '../public/wonder/essay/substack/charts.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });

  // Wait for fonts to load
  await page.waitForTimeout(1000);

  // Screenshot chart 1
  const chart1 = await page.$('#chart-scarcity');
  if (chart1) {
    await chart1.screenshot({
      path: path.join(__dirname, '../public/wonder/essay/substack/chart-scarcity.png'),
      omitBackground: false
    });
    console.log('Saved: chart-scarcity.png');
  }

  // Screenshot chart 2
  const chart2 = await page.$('#chart-question');
  if (chart2) {
    await chart2.screenshot({
      path: path.join(__dirname, '../public/wonder/essay/substack/chart-question.png'),
      omitBackground: false
    });
    console.log('Saved: chart-question.png');
  }

  await browser.close();
  console.log('Done!');
}

captureCharts().catch(console.error);
