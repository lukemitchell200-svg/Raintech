import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] || '';

const dir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Auto-increment N
let n = 1;
while (fs.existsSync(path.join(dir, `screenshot-${n}${label ? `-${label}` : ''}.png`))) n++;
const outFile = path.join(dir, `screenshot-${n}${label ? `-${label}` : ''}.png`);

// Try common Chrome locations
const chromePaths = [
  'C:/Users/lukem/.cache/puppeteer/chrome/win64-149.0.7827.22/chrome-win64/chrome.exe',
  'C:/Users/nateh/.cache/puppeteer/chrome/win64-131.0.6778.85/chrome-win64/chrome.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
];
const executablePath = chromePaths.find(p => fs.existsSync(p));

const browser = await puppeteer.launch({
  ...(executablePath ? { executablePath } : {}),
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Force all scroll-reveal elements visible (they start at opacity:0 and only
// animate in via IntersectionObserver on scroll — Puppeteer never scrolls)
await page.evaluate(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
});

// Let reveal transitions settle (transition duration is 0.65s)
await new Promise(r => setTimeout(r, 800));

await page.screenshot({ path: outFile, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outFile}`);
