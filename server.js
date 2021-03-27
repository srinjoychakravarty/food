const PORT = 3000;
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
app.use(express.static('./public'));
app.use(cookieParser());

const helper = require('./helper');

app.use(helper.ignoreFavicon);
  
const recipeObjects = {};
const cookieIdentifiers = {};

app.get('/home', (req, res) => {
  const receivedCookie = req.cookies.sessionCookie;
  const username = cookieIdentifiers[receivedCookie];
  console.log(`Username Logged In: ${username}`);
  console.log(`Received Cookie: ${receivedCookie}`);
  if(!receivedCookie) {
    res.status(200).json({'loggedIn': false});
  } else if (!helper.isValidUUID(receivedCookie) ) {
    res.status(401).json({ error: 'Unauthorized: Please login to view inventory!' });
  } else {
    console.log('Valid UUID as Session Cookie!');
    res.status(200).json({'loggedIn': true, 'username': username});
  }
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
    const session_cookie = uuidv4();
    cookieIdentifiers[session_cookie] = username;
    res.cookie('sessionCookie', session_cookie);       
    console.log("Username OK!")
    res.status(200).json({'username': username});
    console.log(cookieIdentifiers);
  }
});

app.post('/logout', express.json(), (req, res) => {
  const sessionCookie = req.cookies.sessionCookie;
  delete cookieIdentifiers[sessionCookie];
  res.clearCookie('sessionCookie');
  res.cookie("sessionCookie", {expires: Date.now()});
  res.json({'message': "Logged out successfuly"});
  console.log(cookieIdentifiers);
});

app.post('/recipe', express.json(), (req, res) => {
  const { title, author, ingredients, instructions } = req.body;

  if (title === "") {
    res.status(411).json({error: 'Length Required: "Title" cannot be empty!'});
  } else if (author === "" ) {
    res.status(411).json({error: 'Length Required: "Author" cannot be empty!'});
  } else if (ingredients === "") {
    res.status(411).json({error: 'Length Required: "Ingredients" cannot be empty!'});
  } else if (instructions === "") {
    res.status(411).json({error: 'Length Required: "Instructions" cannot be empty!'});
  } else {
    const escapedTitleString = helper.convertHTML(title);
    const escapedAuthorString = helper.convertHTML(author);
    const escapedIngredientsArray = helper.convertHTML(helper.removeLineBreaks(ingredients)).split("*").splice(1);
    const escapedInstructionsArray = helper.convertHTML(helper.removeLineBreaks(instructions)).split("*").splice(1);
    const receivedCookie = req.cookies.sessionCookie;
    const username = cookieIdentifiers[receivedCookie];
    const item_id = uuidv4();
    recipeObjects[item_id] = {'uploaded_by': username, 'title': escapedTitleString, 'author': escapedAuthorString, 'ingredients': escapedIngredientsArray, 'instructions': escapedInstructionsArray};
    res.status(200).json(recipeObjects);
  }
  console.log(recipeObjects);
});




app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
