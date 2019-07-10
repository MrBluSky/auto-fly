#!/usr/bin/env node

'use strict';
const commander = require('commander'),
    utils = require('../utils'),
    chalk = require('chalk'),
    packages = require('../package.json');
    
const { Logger } = utils;
const { name, version } = packages;
Logger.logo();
commander
  .option('-f, --file [file]', '压缩js或css文件')
  .parse(process.argv);

const appName = commander.file;

if(!appName){
  Logger.info(chalk.red('minify [file] 不能为空！'));
  process.exit();
}

Logger.warning(`压缩${commander.file}文件，正在赶来...`);