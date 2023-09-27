import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
test.each([
  {
    fileName1: 'file1.json',
    fileName2: 'file2.json',
    resultName: 'result_json.txt',
    format: 'stylish',
  },
  {
    fileName1: 'file1.yml',
    fileName2: 'file2.yml',
    resultName: 'result_json.txt',
  },
  {
    fileName1: 'file1.json',
    fileName2: 'file2.json',
    resultName: 'result_plain.txt',
    format: 'plain',
  },
])('tests: json, yaml, plain', ({
  fileName1,
  fileName2,
  resultName,
  format,
}) => {
  const filePath1 = fixturePath(fileName1);
  const filePath2 = fixturePath(fileName2);
  const result = readFileSync(fixturePath(resultName), 'utf-8');
  expect(genDiff(filePath1, filePath2, format)).toEqual(result);
});

test('formatter json', () => {
  const filename1 = fixturePath('file1.json');
  const filename2 = fixturePath('file2.json');
  const result = genDiff(filename1, filename2, 'json');
  expect(isJson(result)).toBeTruthy();
});
