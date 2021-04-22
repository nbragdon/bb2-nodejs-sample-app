const express = require("express");
const path = require('path');

const { v4: uuidv4 } = require('uuid');

const { generateCodeChallenge } = require('./utils/generatePKCE');
const { getAccessToken, generateAuthorizeUrl } = require('./utils/bb2');

   
const PORT = process.env.PORT || 3001;

const app = express();

app.localStorage = {
    users: {},
    codeChallenge: generateCodeChallenge()
};

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.use('/api/users/login', (req, res) => {
    const userData = {
        token: uuidv4(),
        user: {
            id: uuidv4(),
            name: uuidv4(),
        }
    };
    app.localStorage.users[userData.token] = userData;
    res.send(userData);
});

app.use('/api/users/verifyToken', (req, res) => {
    res.send(app.localStorage.users[req.params.token]);
});

app.get("/api/bluebutton/callback", async (req, res) => {
    try {
        console.log('req.params', req.params);
        const response = getAccessToken(app.localStorage.codeChallenge);
    
        console.log(response);
        console.log(response.data);
    
        app.localStorage[response.data.patient] = response.data;
    } catch (e) {
        console.log(e);
    }
    
    res.redirect(`http://localhost:3000`);
});

app.get('/api/authorize', (req, res) => {
    res.send(generateAuthorizeUrl(app.localStorage.codeChallenge));
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});