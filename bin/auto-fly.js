#!/usr/bin/env node

'use strict';
const commander = require('commander'),
    utils = require('../utils'),
    chalk = require('chalk'),
    packages = require('../package.json');
    
const { Logger } = utils;
const { name, version } = packages;
const simpleLogo = `
               _                    __  _
              | |                  / _|| |       
  __ _  _   _ | |_   ___   ______ | |_ | | _   _ 
 / _  || | | || __| / _ \\ |______||  _|| || | | |
| (_| || |_| || |_ | (_) |        | |  | || |_| |
 \\__,_| \\__,_| \\__| \\___/         |_|  |_| \\__, |
                                            __/ |
                                           |___/ `;
Logger.info(chalk.green(simpleLogo));

commander
  .command('server', '启动。。。')
  .command('init [appName]', '创建一个以react为前端框架，webpack为构建工具的基础应用。')
  .command('minify [fileDir]', '压缩js或css文件')
  .option('-v, --version', '输出当前auto-fly版本号', function(){
    Logger.info(chalk.yellow(`${name}@${version}`));
  })
  .option('-p, --port [port]', '指定服务启动端口，默认为[8080]')
  .option('-P, --proxy [url]', '开启代理服务')
  .option('-debug, --debug [true|false]', '是否禁止输出log信息在控制台，默认打开')
  .option('-w --watch', '页面加载性能分析／webpack构建性能分析')
  .option('-pack, --pack', '开启抓包')
  .option('-o', '在服务启动之后，打开浏览器窗口，默认为true')
  .option('--cors', '配置Access-Control-Allow-Origin头部信息')
  .option('-g --gzip', '启动服务器gzip配置项')
  .option('-c', '缓存相关配置')
  .parse(process.argv);