#!/usr/bin/env node

'use strict';
const os         = require('os'),
    httpServer = require('../server'),
    portfinder = require('portfinder'),
    opener     = require('opener'),
    commander = require('commander'),
    utils = require('../utils'),
    chalk = require('chalk'),
    packages = require('../package.json');
    
const ifaces = os.networkInterfaces();
const { Logger } = utils;
const { version } = packages;
Logger.logo();

commander
  .option('-p, --port [port]', '指定服务启动端口，默认为[8080]')
  .option('-P, --proxy [url]', '开启代理服务')
  .option('-d, --debug', '是否禁止输出log信息在控制台，默认false')
  .option('-w, --watch', '页面加载性能分析／webpack构建性能分析')
  .option('--pack', '开启抓包')
  .option('-o, --open', '在服务启动之后，打开浏览器窗口，默认为true')
  .option('--cors', '配置Access-Control-Allow-Origin头部信息')
  .option('-g, --gzip', '启动服务器gzip配置项')
  .option('-c, --cache', '缓存相关配置')
  .parse(process.argv);

const port = commander.port || parseInt(process.env.PORT, 10),
      host = '0.0.0.0',
     proxy = commander.proxy;
let logger;

if (commander.debug) {
  logger = {
    info: function () {},
    request: function () {}
  };
}else{
  logger = Logger;
}

if (!port) {
  portfinder.basePort = 8080;
  portfinder.getPort(function (err, port) {
    if (err) { throw err; }
    listen(port);
  });
}
else {
  listen(port);
}

function listen(port) {
  var options = {
    root: '',
    showDir: '',
    logFn: logger.request,
    proxy: proxy,
    showDotfiles: ''
  };

  var server = httpServer.createServer(options);

  server.listen(port, host, function () {
    var canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host,
        protocol      = 'http://';
    logger.info([chalk.yellow('Starting up auto-fly, serving '),
      chalk.green(server.root),
      chalk.yellow('\nAvailable on:')
    ].join(''));

    if (commander.a && host !== '0.0.0.0') {
      logger.info(`${protocol}${canonicalHost}${chalk.green(port.toString())}`);
    }
    else {
      Object.keys(ifaces).forEach(function (dev) {
        ifaces[dev].forEach(function (details) {
          if (details.family === 'IPv4') {
            logger.info(` ${protocol}${details.address}:${chalk.green(port.toString())}`);
          }
        });
      });
    }

    if (typeof proxy === 'string') {
      logger.info(`${chalk.yellow('/proxy/api/url')} requests will be served from: ${chalk.green(proxy)}`);
    }

    logger.info('Hit CTRL-C to stop the server');
    if (commander.open) {
      opener(
        protocol + canonicalHost + ':' + port,
        { command: commander.open !== true ? commander.open : null }
      );
    }
  });
}

if (process.platform === 'win32') {
  require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  }).on('SIGINT', function () {
    process.emit('SIGINT');
  });
}

process.on('SIGINT', function () {
  logger.info(chalk.red('http-server stopped!'));
  process.exit();
});

process.on('SIGTERM', function () {
  logger.info(chalk.red('http-server stopped!'));
  process.exit();
});