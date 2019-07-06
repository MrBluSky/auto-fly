#!/usr/bin/env node

'use strict';
var os         = require('os'),
    httpServer = require('./server'),
    portfinder = require('portfinder'),
    opener     = require('opener'),
    argv       = require('optimist')
      .boolean('cors')
      .argv;

var ifaces = os.networkInterfaces();
const utils = require('./utils');
const chalk = require('chalk');
const { Logger } = utils;

if (argv.h || argv.help) {
  console.log([
    'usage: http-server [path] [options]',
    '',
    'options:',
    '  -p           Port to use [8080]',
    '  -a           Address to use [0.0.0.0]',
    '  -d           Show directory listings [true]',
    '  -g --gzip    Serve gzip files when possible [false]',
    '  -debug --debug  Suppress log messages from output',
    '  --cors[=headers]   Enable CORS via the "Access-Control-Allow-Origin" header',
    '                     Optionally provide CORS headers list separated by commas',
    '  -o [path]    Open browser window after starting the server',
    '  -P --proxy   Fallback proxy if the request cannot be resolved. e.g.: http://someurl.com',
    '  -h --help    Print this list and exit.'
  ].join('\n'));
  process.exit();
}

var port = argv.p || parseInt(process.env.PORT, 10),
    host = argv.a || '0.0.0.0',
    proxy = argv.P || argv.proxy,
    logger;

if (argv.debug) {
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
    root: argv._[0],
    showDir: argv.d,
    logFn: logger.request,
    proxy: proxy,
    showDotfiles: argv.dotfiles
  };

  var server = httpServer.createServer(options);

  server.listen(port, host, function () {
    var canonicalHost = host === '0.0.0.0' ? '127.0.0.1' : host,
        protocol      = 'http://';
    logger.info([chalk.yellow('Starting up http-server, serving '),
      chalk.cyan(server.root),
      chalk.yellow('\nAvailable on:')
    ].join(''));

    if (argv.a && host !== '0.0.0.0') {
      logger.info(('  ' + protocol + canonicalHost + ':' + chalk.green(port.toString())));
    }
    else {
      Object.keys(ifaces).forEach(function (dev) {
        ifaces[dev].forEach(function (details) {
          if (details.family === 'IPv4') {
            logger.info(('  ' + protocol + details.address + ':' + chalk.green(port.toString())));
          }
        });
      });
    }

    if (typeof proxy === 'string') {
      logger.info('Unhandled requests will be served from: ' + proxy);
    }

    logger.info('Hit CTRL-C to stop the server');
    if (argv.o) {
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
