const PORT = 3000;
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
app.use(express.static('./public'));
app.use(cookieParser());

const helper = require('./helper');

app.use(helper.ignoreFavicon);

let recipeIDs = [uuidv4(), uuidv4()];

let usernames = ["jamie_oliver", "gordon_ramsey"];

let titles = ["Cranberry Chicken", "Lemon Farro Salad"];

let authors = ["Jamie Oliver", "Gordon Ramsey"];

let ingredients = [["4 skinned boned chicken thighs", "Lemon Vinaigrette", "1 cup uncooked farro", 
"2 ¼ teaspoons kosher salt", "2 garlic cloves"], ["¾ teaspoon black pepper", "½ red onion", "1 fennel bulb", 
"10 sweet mini peppers", "1 ½ teaspoons olive oil", "½ cup loosely packed parsley",
"⅓ cup torn fresh basil leaves", "1 tablespoon fresh thyme leaves"]];

let instructions = [["Place chicken and 1/4 cup Lemon.", 
"Zip-top plastic freezer bag.", 
"Seal and turn to coat.", 
"Chill 30 minutes.", 
"Reserve and chill vinaigrette.",
"Meanwhile, cook farro.", 
"Drain and rinse; discard garlic.",
"Preheat grill to 350° to 400°."], 
["Remove chicken from marinade.", 
"Sprinkle chicken with 1/4 tsp.", 
"Grill chicken, covered with grill lid.", 
"Transfer to a platter; cover with foil.",
"Toss together onion & salt.", 
"Place vegetables in a large grill.", 
"Transfer vegetables to bowl.",
"Coarsely chop chicken.", 
"Season with salt and pepper."]];

const recipeObjects = {};
const cookieIdentifiers = {};

recipeObjects[recipeIDs[0]] = {'uploaded_by': usernames[0], 'title': titles[0], 'author': authors[0], 'ingredients': ingredients[0], 'instructions': instructions[0]};
recipeObjects[recipeIDs[1]] = {'uploaded_by': usernames[1], 'title': titles[1], 'author': authors[1], 'ingredients': ingredients[1], 'instructions': instructions[1]};

app.get('/recipe/:recipeID', (req, res) => {
  const recipe_id = req.params.recipeID;
  if(recipeObjects[recipe_id]) {
    res.status(200).json(recipeObjects[recipe_id]);
  } else {
    res.status(404).json({ error: `Unknown recipe id: ${recipe_id}!`});
  }
});

app.get('/home', (req, res) => {
  const receivedCookie = req.cookies.sessionCookie;
  const username = cookieIdentifiers[receivedCookie];
  if(!receivedCookie) {
    res.status(200).json({'loggedIn': false, 'recipes': recipeObjects});
  } else if (!helper.isValidUUID(receivedCookie) ) {
    // res.status(401).json({ error: 'Unauthorized: Please login to view inventory!' });
    res.status(200).json({'loggedIn': false, 'recipes': recipeObjects});
  } else {
    res.status(200).json({'loggedIn': true, 'username': username, 'recipes': recipeObjects});
  }
});

app.post('/login', express.json(), (req, res) => {
  const { userName } = req.body;
  const unsanitizedUsernameInput = userName.trim();
  const alphanumericUsername = unsanitizedUsernameInput.replace(/[^A-Za-z0-9_]/g, '');
  const username = helper.sanitizeInput(alphanumericUsername);
  if (userName != unsanitizedUsernameInput || userName !== alphanumericUsername || userName !== username) {
    res.status(400).json({error: 'Bad Request: Only enter valid alphanumeric syntax as username!'});
  } else if (helper.dummyValidation(username) === 'DOG') {
    res.status(401).json({error: 'Unauthorized: Dogs cannot maintain inventories!'});
  } else {
    const session_cookie = uuidv4();
    cookieIdentifiers[session_cookie] = username;
    res.cookie('sessionCookie', session_cookie);       
    res.status(200).json({'username': username, 'message': `${username}, logged in successfully...`});
  }
});

app.post('/logout', express.json(), (req, res) => {
  const sessionCookie = req.cookies.sessionCookie;
  let userName = cookieIdentifiers[sessionCookie];
  delete cookieIdentifiers[sessionCookie];
  res.clearCookie('sessionCookie');
  res.cookie("sessionCookie", {expires: Date.now()});
  res.json({'message': `${userName}, logged out successfully...`});
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
    const recipe_id = uuidv4();
    recipeObjects[recipe_id] = {'uploaded_by': username, 'title': escapedTitleString, 'author': escapedAuthorString, 'ingredients': escapedIngredientsArray, 'instructions': escapedInstructionsArray};
    res.status(200).json(recipeObjects);
  }
});




app.listen(PORT, () => console.log(`listening on http://localhost:${PORT}`));
