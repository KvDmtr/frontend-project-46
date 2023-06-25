#!/usr/bin/env node
import { Command } from 'commander';
import parser from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output fotmat')
  .argument('<filePath1>')
  .argument('<filePath2>')
  .action((filePath1, filePath2) => {
    console.log(parser(filePath1, filePath2));
  });

program.parse(process.argv);
