#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output fotmat', 'stylish')
  .argument('<filePath1>')
  .argument('<filePath2>')
  .action((filePath1, filePath2, options) => {
    console.log(gendiff(filePath1, filePath2, options.format));
  });

program.parse(process.argv);
