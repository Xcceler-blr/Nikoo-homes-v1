import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  '/',
  '/privacy-policy',
  '/terms-and-conditions'
];

async function generateStaticHTML() {
  console.log('Starting static HTML generation...');
  
  // Start the preview server
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  const execAsync = promisify(exec);
  
  try {
    // Start the preview server
    console.log('Starting preview server...');
    const previewProcess = execAsync('npm run preview');
    
    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport
    await page.setViewport({ width: 1200, height: 800 });
    
    for (const route of routes) {
      console.log(`Generating static HTML for: ${route}`);
      
      try {
        // Navigate to the route
        await page.goto(`http://localhost:4173${route}`, { 
          waitUntil: 'networkidle0',
          timeout: 30000 
        });
        
        // Wait for React to render
        await page.waitForTimeout(3000);
        
        // Wait for any dynamic content to load
        await page.waitForSelector('#root', { timeout: 10000 });
        
        // Get the fully rendered HTML
        const html = await page.content();
        
        // Create output directory
        const outputDir = path.join(__dirname, '..', 'dist');
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Determine file path
        let filePath;
        if (route === '/') {
          filePath = path.join(outputDir, 'index.html');
        } else {
          const routePath = route.slice(1); // Remove leading slash
          const dirPath = path.join(outputDir, routePath);
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }
          filePath = path.join(dirPath, 'index.html');
        }
        
        // Write the HTML file
        fs.writeFileSync(filePath, html);
        console.log(`✅ Generated: ${filePath}`);
        
      } catch (error) {
        console.error(`❌ Error generating ${route}:`, error.message);
      }
    }
    
    await browser.close();
    console.log('✅ Static HTML generation complete!');
    
    // Kill the preview server
    previewProcess.child.kill();
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

generateStaticHTML().catch(console.error); 