var chalk = require('chalk');
var moment = require('moment-timezone');

var LOG_LEVEL;
var TIMEZONE = process.env.TIMEZONE;
var DATE_REG = /[12]\d{3}-(0\d)|(1[0-2])-([0-2]\d)|(3[01])/;
var TIME_REG = /([01]\d)|(2[0-3]):[0-5]\d:[0-5]\d/;

/**
 * Sets logging level
 * @param {string|null} level log level
 * @returns {null} null
 */
function setLogLevel(level) {
    var levelString;
    if (level) levelString = level;
    else levelString = process.env.LOG_LEVEL;
    switch (levelString) {
    case 'none': return LOG_LEVEL = 0;
    case 'error': return LOG_LEVEL = 1;
    case 'warning': return LOG_LEVEL = 2;
    case 'verbose': return LOG_LEVEL = 3;
    default:
        if (process.env.NODE_ENV === 'production') return LOG_LEVEL = 0;
        else return LOG_LEVEL = 3;
    }
}
setLogLevel();

/**
 * Logs to console if environment supports supplied level
 * @param {Number} level logging level
 * @example 1 Error
 * 2 Warning
 * 3 Verbose
 * @param {any} message data string
 * @returns {null} null
 */
function log(level, message) {
    if (level <= LOG_LEVEL) {
        var ts = moment().tz(TIMEZONE).format();
        switch (level) {
        case 1: return console.log(chalk.red(message + '\n' + ts));
        case 2: return console.log(chalk.yellow(message + '\n' + ts));
        case 3: return console.log(message + '\n' + ts);
        }
    }
}

/**
 * Logs error to console if possible
 * @param {any} message data string
 * @returns {null} null
 */
function error(message) {
    return log(1, message);
}

/**
 * Logs warning to console if possible
 * @param {any} message data string
 * @returns {null} null
 */
function warning(message) {
    return log(2, message);
}

/**
 * Logs verbose to console if possible
 * @param {any} message data string
 * @returns {null} null
 */
function verbose(message) {
    return log(3, message);
}

/**
 * Basic regex date, datetime or time check
 * @param {string} value string
 * @returns {Boolean} outcome
 */
function isDateTime(value) {
    if (typeof value !== 'string' || typeof value.search !== 'function') return false;
    if (value.search(DATE_REG) + 1 || value.search(TIME_REG) + 1) return true;
    return false;
}

/**
 * Tries to parse a value as an integer
 * @param {any} value input value
 * @returns {Number|any} integer or input value
 */
function tryParseInt(value) {
    if (isDateTime(value)) return value;
    var n = Number.parseInt(value);
    if (n) return n;
    verbose(value + ' could not be parsed as an integer');
    return value;
}

/**
 * Parses a value as an integer
 * @param {any} value input value
 * @returns {Number|null} integer or null
 */
function parseInt(value) {
    if (isDateTime(value)) return null;
    var n = Number.parseInt(value);
    if (n) return n;
    warning(value + ' could not be parsed as an integer');
    return null;
}

module.exports = {
    error: error,
    isDateTime: isDateTime,
    log: log,
    parseInt: parseInt,
    setLogLevel: setLogLevel,
    tryParseInt: tryParseInt,
    verbose: verbose,
    warning: warning
};