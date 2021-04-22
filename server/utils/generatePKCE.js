var crypto = require("crypto")

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}

module.exports.generateCodeChallenge = function() {
    var verifier = base64URLEncode(crypto.randomBytes(32));
    return base64URLEncode(sha256(verifier));
}