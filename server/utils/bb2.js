const axios = require('axios');
const FormData = require('form-data');

const { generateCodeChallenge } = require('./generatePKCE');

const BB2_BASE_URL = 'https://sandbox.bluebutton.cms.gov';
const BB2_AUTH_URL = BB2_BASE_URL + '/v1/o/authorize';
const BB2_ACCESS_TOKEN_URL = BB2_BASE_URL + '/v1/o/token/';
const APP_SPECIFIC_CLIENT_ID = '9d6CVFOXOHMFyXQXpjK56XiN1HXMOuwW92IVX2oe';
const APP_SPECIFIC_CLIENT_SECRET = 'RWksNnmHB4ulbvvhpRiYrlTSPrxChfXxC6Ey1L44YzRhIHZ1FPIO5GqLl0pJ7YIOq0LKh6FeuImnBAgh6KLF2xGlXBR8LnlYmTzAHnH2YfvvE7r5E8H0DeWJPoFuzSyz';
const APP_SPECIFIC_REDIRECT_URI = 'http://localhost:3001/api/bluebutton/callback/'; // note that http is only allowed in sandbox

module.exports.generateAuthorizeUrl = function(codeChallenge) {
    return BB2_AUTH_URL +
        '?client_id=' + APP_SPECIFIC_CLIENT_ID + 
        '&redirect_uri=' + APP_SPECIFIC_REDIRECT_URI + 
        '&code_challenge=' + codeChallenge + 
        '&response_type=code' +
        '&code_challenge_method=SHA256';
}

module.exports.getAccessToken = async function(codeChallenge) {
    const form = new FormData();
    form.append('client_id', APP_SPECIFIC_CLIENT_ID);
    form.append('client_secret', APP_SPECIFIC_CLIENT_SECRET);
    form.append('code', req.query.code);
    //form.append('code_challenge', codeChallenge);
    form.append('grant_type', 'authorization_code');
    form.append('redirect_uri', APP_SPECIFIC_REDIRECT_URI);
    return await axios.post(BB2_ACCESS_TOKEN_URL, form, { headers: form.getHeaders() });
}