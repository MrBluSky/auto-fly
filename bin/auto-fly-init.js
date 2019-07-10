#!/usr/bin/env node

'use strict';
const commander = require('commander'),
    utils = require('../utils'),
    chalk = require('chalk'),
    packages = require('../package.json'),
    emptyDir = require('empty-dir'),
    download = require('download-git-repo'),
    ora = require('ora'),
    path = require('path');
const { Logger } = utils;
const { name, version } = packages;
const dest = process.cwd();
//Logger.logo();
Logger.info(chalk.yellow('开始创建app'));
const spinner = ora(chalk.cyan('创建中...')).start();

commander
  .option('-t, --template [template]', '指定初始化模版 [当前默认react]')
  .parse(process.argv);

const appName = commander.args[0];
const appDir = path.join(dest, appName);

if(!appName){
  spinner.fail(chalk.red('创建失败!'));
  Logger.info(chalk.red('init [name] 不能为空！'));
  process.exit();
}

if (!emptyDir(dest)) {
  spinner.fail(chalk.red('创建失败!'));
  Logger.info(chalk.red('该目录不为空, 请选择一个空目录运行 [init]命令!'));
  process.exit();
}

spinner.warn(chalk.yellow('该工程正在赶来的路上, 请稍后...'));
/**
download('direct:https://github.com/http-party/http-server.git', '../tmp', { clone: true }, function (err) {
  if(err){
    spinner.fail(chalk.red('创建失败!'));
  }
  else{
    spinner.succeed(chalk.green('创建成功!'));
    Logger.success(`
      可以运行以下命令开始启动服务:
      cd ${appName}
      npm install
      npm start
    `);
  }
})
 */
