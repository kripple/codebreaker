import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

const failureThreshold = 0.9 as const;
const url = 'https://kripple.github.io/codebreaker/' as const;
const port = 9222 as const;

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', `--remote-debugging-port=${port}`],
});
const result = await lighthouse(url, { port });
if (!result) throw Error('failed to create lighthouse report');

for (const category in result.lhr.categories) {
  const score = result.lhr.categories[category].score;
  if (!score) throw Error(`missing score for '${category}' category`);
  if (score < failureThreshold)
    console.warn(`failed ${category} audit with a score of ${score * 100}`);
  console.info(`${category}: ${score * 100}`);
}

await browser.close();
