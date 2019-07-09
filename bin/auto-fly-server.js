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
    if (commander.o) {
      opener(
        protocol + canonicalHost + ':' + port,
        { command: argv.o !== true ? argv.o : null }
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