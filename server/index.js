const express = require('express');
const fs = require('fs');
const proxy = require('http-proxy-middleware');

exports.HttpServer = exports.HTTPServer = HttpServer;

exports.createServer = function (options) {
  return new HttpServer(options);
};

function HttpServer(options){
  options = options || {};
  if (options.root) {
    this.root = options.root;
  }
  else {
    try {
      fs.lstatSync('./public');
      this.root = './public';
    }
    catch (err) {
      this.root = './';
    }
  }

  if(options.proxy){
    this.proxy = options.proxy;
  }

  this.server = express();
  this.server.use(express.static(this.root));
  this.server.use(proxy('/api', {
    target: this.proxy
  }));
}

HttpServer.prototype.listen = function () {
  this.server.listen.apply(this.server, arguments);
};

HttpServer.prototype.close = function () {
  return this.server.close();
};
