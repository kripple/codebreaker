import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

import subsetFont from 'subset-font';

import { appTitle } from '@/constants/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fontFamily = 'Tektur' as const;
const targetFormat = 'woff2';
const fontPath = resolve(
  __dirname,
  `../app/fonts/${fontFamily}/static/${fontFamily}-Regular.ttf`,
);

const fontBuffer = readFileSync(fontPath);
const subsetBuffer = await subsetFont(fontBuffer, appTitle, {
  targetFormat,
});
const base64 = subsetBuffer.toString('base64');

// generate @font-face
const css = `
@font-face {
  font-family: '${fontFamily}';
  src: url(data:font/${targetFormat};base64,${base64}) format('${targetFormat}');
  font-display: block;
}
`;
console.log(css);
