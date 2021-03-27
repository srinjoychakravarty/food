const PORT = 3000;
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
app.use(express.static('./public'));
app.use(cookieParser());

const helper = require('./helper');

app.use(helper.ignoreFavicon);

let itemIDs = [uuidv4(), uuidv4()];

let usernames = ["jamie_oliver", "gordon_ramsey"];

let titles = ["Cranberry Chicken", "Lemon Farro Salad"];

let authors = ["Jamie Oliver", "Gordon Ramsey"];

let ingredients = [["4 skinned boned chicken thighs", "Lemon Vinaigrette", "1 cup uncooked farro", 
"2 ¼ teaspoons kosher salt", "2 garlic cloves"], ["¾ teaspoon black pepper", "½ red onion", "1 fennel bulb", 
"10 sweet mini peppers", "1 ½ teaspoons olive oil", "½ cup loosely packed fresh flat-leaf parsley leaves",
"⅓ cup torn fresh basil leaves", "1 tablespoon fresh thyme leaves"]];

let instructions = [["Place chicken and 1/4 cup Lemon Vinaigrette in a 1-gal.", 
"Zip-top plastic freezer bag.", 
"Seal and turn to coat.", 
"Chill 30 minutes.", 
"Reserve and chill remaining vinaigrette.",
"Meanwhile, cook farro according to package directions, adding 1 tsp. salt and 2 garlic cloves before bringing to a boil.", 
"Drain and rinse; discard garlic, and transfer farro to a large bowl.",
"Preheat grill to 350° to 400° (medium-high) heat."], 
["Remove chicken from marinade, discarding marinade in bag.", 
"Sprinkle chicken with 1/4 tsp. each salt and black pepper.", 
"Grill chicken, covered with grill lid, 4 to 5 minutes on each side or until done.", 
"Transfer to a platter; cover with foil.",
"Toss together onion, next 3 ingredients, and remaining 1 tsp. salt and 1/2 tsp. black pepper.", 
"Place vegetables in a large grill basket, and grill, covered with grill lid, 10 to 12 minutes or until vegetables start to char and soften, stirring and turning every 2 minutes.", 
"Transfer vegetables to bowl, and cover with foil.",
"Coarsely chop chicken; toss with farro, vegetables, parsley, basil, thyme, and 1/4 cup chilled reserved Lemon Vinaigrette.", 
"Season with salt and pepper, and serve with remaining vinaigrette."]];

const recipeObjects = {};
const cookieIdentifiers = {};

recipeObjects[itemIDs[0]] = {'uploaded_by': usernames[0], 'title': titles[0], 'author': authors[0], 'ingredients': ingredients[0], 'instructions': instructions[0]};
recipeObjects[itemIDs[1]] = {'uploaded_by': usernames[1], 'title': titles[1], 'author': authors[1], 'ingredients': ingredients[1], 'instructions': instructions[1]};

console.log(recipeObjects);

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
