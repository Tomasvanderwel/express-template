var moment = require('moment-timezone');

var LOG_LEVEL;
var TIMEZONE = process.env.TIMEZONE;

/**
 * Sets logging level
 * @returns {null} null
 */
function setLogLevel() {
    var levelString = process.env.LOG_LEVEL;
    switch (levelString) {
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
        case 1: return console.log({ error: message, ts: ts });
        case 2: return console.log({ warning: message, ts: ts });
        case 3: return console.log({ verbose: message, ts: ts });
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
 * Tries to parse a value as an integer
 * @param {any} value input value
 * @returns {Number|any} integer or input value
 */
function tryParseInt(value) {
    var n = Number.parseInt(value);
    if (n) return n;
    warning(value + ' could not be parsed as an integer');
    return value;
}

/**
 * Parses a value as an integer
 * @param {any} value input value
 * @returns {Number|null} integer or null
 */
function parseInt(value) {
    var n = Number.parseInt(value);
    if (n) return n;
    return error(value + ' could not be parsed as an integer');
}

module.exports = {
    error: error,
    log: log,
    parseInt: parseInt,
    tryParseInt: tryParseInt,
    verbose: verbose,
    warning: warning
};