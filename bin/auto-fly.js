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
  .command('server', '启动。。。')
  .command('init [appName]', '创建一个以react为前端框架，webpack为构建工具的基础应用')
  .command('minify [fileDir]', '压缩js或css文件')
  .option('-v, --version', '输出当前auto-fly版本号', function(){
    Logger.info(chalk.yellow(`${name}@${version}`));
  })
  .parse(process.argv);