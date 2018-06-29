function tryParseInt(value) {
    var n = Number.parseInt(value);
    if (n) return n;
    return value;
}

function parseInt(value) {
    var n = Number.parseInt(value);
    if (n) return n;
    return console.error(value + ' could not be parsed');
}

module.exports = {
    parseInt: parseInt,
    tryParseInt: tryParseInt
};