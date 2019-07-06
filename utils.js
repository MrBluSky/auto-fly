const chalk = require('chalk');
const config = require('./config');
const { isDebug } = config;

var Logger = {
  info: isDebug && console.log,
  error: function(args){
    Logger.info(chalk.red(args));
  },
  warning: function(args){
    Logger.info(chalk.yellow(args));
  },
  success: function(args){
    Logger.info(chalk.green(args));
  },
  request: function (req, res, error) {
    var date = new Date().toUTCString();
    if (error) {
      Logger.error('[%s] "%s %s" Error (%s): "%s"', date, req.method, req.url, error.status.toString(), error.message);
    } else {
      Logger.info('[%s] "%s %s" "%s"', date, req.method, req.url, req.headers['user-agent']);
    }
  }
};

module.exports = { Logger };