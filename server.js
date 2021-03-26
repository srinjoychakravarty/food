const PORT = 3000;
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
app.use(express.static('./public'));
app.use(cookieParser());


const helper = require('./helper');

app.use(helper.ignoreFavicon);

  
const sample_item_names = ["Hoodies", "Sweatpants", "Pullovers"];
const cookieIdentifiers = {};

console.log(sample_item_names);

app.get('/items/', (req, res) => {
  const receivedCookie = req.cookies.sessionCookie;
  console.log(`Received Cookie: ${receivedCookie}`);
  res.json(sample_item_names);
});

app.post('/login', express.json(), (req, res) => {
  const { userName } = req.body;
  const unsanitizedUsernameInput = userName.trim();
  console.log(unsanitizedUsernameInput);
  const alphanumericUsername = unsanitizedUsernameInput.replace(/[^A-Za-z0-9_]/g, '');
  console.log(alphanumericUsername);
  const username = helper.sanitizeInput(alphanumericUsername);
  console.log(`Final Username: ${username}`);
  if (userName != unsanitizedUsernameInput || userName !== alphanumericUsername || userName !== username) {
    res.status(400).json({error: 'Bad Request: Only enter valid alphanumeric syntax as username!'});
  } else if (helper.dummyValidation(username) === 'DOG') {
    console.log("Dogs");
    res.status(401).json({error: 'Unauthorized: Dogs cannot maintain inventories!'});
  } else {
    const session_cookie = uuidv4(); // creates uuid
    console.log(`Session Cookie: ${session_cookie}`);
    cookieIdentifiers[session_cookie] = username;
    
    res.cookie('sessionCookie', session_cookie);  // assigns uuid to cookie 
        
    console.log("Username OK!")
    res.status(200).json({'username': username});
  }

  

});



app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
