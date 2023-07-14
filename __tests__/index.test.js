import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import parser from '../src/index.js';

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

test('json test', () => {
  const filename1 = fixturePath('file1.json');
  const filename2 = fixturePath('file2.json');
  const resultName = fixturePath('result_json.txt');
  const result = readFileSync(resultName, 'utf-8');
  expect(parser(filename1, filename2)).toBe(result);
});

test('yaml test', () => {
  const fileName1 = fixturePath('file1.yml');
  const fileName2 = fixturePath('file2.yml');
  const resultName = fixturePath('result_json.txt');
  const result = readFileSync(resultName, 'utf-8');
  expect(parser(fileName1, fileName2)).toBe(result);
});

test('plain test', () => {
  const filename1 = fixturePath('file1.json');
  const filename2 = fixturePath('file2.json');
  const resultName = fixturePath('result_plain.txt');
  const result = readFileSync(resultName, 'utf-8');
  expect(parser(filename1, filename2, 'plain')).toBe(result);
});

test('formatter json', () => {
  const filename1 = fixturePath('file1.json');
  const filename2 = fixturePath('file2.json');
  const result = parser(filename1, filename2, 'json');
  expect(isJson(result)).toBeTruthy();
});
