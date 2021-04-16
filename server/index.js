const express = require("express");
const path = require('path');
const request = require('request');

const BB2_BASE_URL = 'https://sandbox.bluebutton.cms.gov';
const BB2_AUTH_URL = BB2_BASE_URL + '/v1/o/authorize';
const BB2_ACCESS_TOKEN_URL = BB2_BASE_URL + '/v1/o/token/';
const APP_SPECIFIC_CLIENT_ID = '9d6CVFOXOHMFyXQXpjK56XiN1HXMOuwW92IVX2oe';
const APP_SPECIFIC_CLIENT_SECRET = 'RWksNnmHB4ulbvvhpRiYrlTSPrxChfXxC6Ey1L44YzRhIHZ1FPIO5GqLl0pJ7YIOq0LKh6FeuImnBAgh6KLF2xGlXBR8LnlYmTzAHnH2YfvvE7r5E8H0DeWJPoFuzSyz';
const APP_SPECIFIC_REDIRECT_URI = 'http://localhost:3001/api/bluebutton/callback/'; // note that http is only allowed in sandbox

const config = {
    client: {
        id: APP_SPECIFIC_CLIENT_ID,
        secret: APP_SPECIFIC_CLIENT_SECRET
    },
    auth: {
        tokenHost: BB2_BASE_URL
    }
};
   
const { ClientCredentials, ResourceOwnerPassword, AuthorizationCode } = require('simple-oauth2');

const PORT = process.env.PORT || 3001;

const app = express();

app.localStorage = {};

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api/bluebutton/callback", async (req, res) => {
    request(
        // POST request to /token endpoint
        {
            method: 'POST',
            uri: BB2_ACCESS_TOKEN_URL,
            form: {
                'client_id': APP_SPECIFIC_CLIENT_ID,
                'client_secret': APP_SPECIFIC_CLIENT_SECRET,
                'code': req.query.code,
                'grant_type': 'authorization_code',
                'redirect_uri': APP_SPECIFIC_REDIRECT_URI
            }
        },

        // callback
        (error, response, body) => {
            const responseBodyJson = JSON.parse(body);
            // save token to session
            app.localStorage[responseBodyJson.patient] = responseBodyJson;

            // redirect to the React app
            res.redirect(`http://localhost:3000`);
        }
    );
});

app.get("/api/authorize", (req, res) => {
    const redirectUrl = BB2_AUTH_URL + '?client_id=' +
        APP_SPECIFIC_CLIENT_ID + '&redirect_uri=' +
        APP_SPECIFIC_REDIRECT_URI +
        '&response_type=code';

    res.redirect(redirectUrl);
});

app.get("/api", (req, res) => {
    res.json({ message: app.localStorage });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});