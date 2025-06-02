import * as chromeLauncher from 'chrome-launcher';
import lighthouse, { type Flags } from 'lighthouse';

const failureThreshold = 0.9 as const;
const url = 'https://kripple.github.io/codebreaker/' as const;

const chrome = await chromeLauncher.launch({
  // This combination fixes many common Chrome launch failures in CI environments like GitHub Actions.
  chromeFlags: [
    '--headless',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
  ],
});
const options: Flags = {
  port: chrome.port,
};
const runnerResult = await lighthouse(url, options);
if (!runnerResult) throw Error('missing runner result');

for (const category in runnerResult.lhr.categories) {
  const score = runnerResult.lhr.categories[category].score;
  if (!score) throw Error(`missing score for '${category}' category`);
  if (score < failureThreshold)
    console.warn(`failed ${category} audit with a score of ${score * 100}`);
  console.info(`${category}: ${score * 100}`);
}

chrome.kill();
