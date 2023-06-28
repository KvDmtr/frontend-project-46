import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import parser from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json test', () => {
  const filename1 = fixturePath('file1.json');
  const filename2 = fixturePath('file2.json');
  const resultName = fixturePath('result_json.txt');
  const result = readFileSync(resultName, 'utf-8');
  expect(parser(filename1, filename2)).toBe(result);
});
