import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const routes = [
  '/',
  '/privacy-policy',
  '/terms-and-conditions'
];

async function prerender() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set viewport
  await page.setViewport({ width: 1200, height: 800 });
  
  for (const route of routes) {
    console.log(`Prerendering: ${route}`);
    
    // Navigate to the route
    await page.goto(`http://localhost:4173${route}`, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait for content to load
    await page.waitForTimeout(2000);
    
    // Get the HTML content
    const html = await page.content();
    
    // Create output directory if it doesn't exist
    const outputDir = path.join(process.cwd(), 'dist');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write the HTML file
    const fileName = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
    const filePath = path.join(outputDir, fileName);
    
    // Ensure directory exists for nested routes
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, html);
    console.log(`Generated: ${filePath}`);
  }
  
  await browser.close();
  console.log('Prerendering complete!');
}

prerender().catch(console.error); 