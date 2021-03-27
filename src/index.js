import { errMsgs, getHome, convertError, convertHTML } from './services';

(function iife() {

    const listEl = document.querySelector('.items');
    const usernameBox = document.querySelector('.login-area').querySelector('.uname-input');

    const titleBox = document.querySelector("form[name='new-recipe'] input[name='title']");
    const authorBox = document.querySelector("form[name='new-recipe'] input[name='author']");
    const ingredientsBox = document.querySelector("form[name='new-recipe'] textarea[name='ingredients']");
    const instructionsBox = document.querySelector("form[name='new-recipe'] textarea[name='instructions']");
    
    const loginButton = document.querySelector('.login-area').querySelector('.login-btn');
    const recipeButton = document.querySelector('.create-recipe').querySelector('.form-btn');
    const loginAreaEl = document.querySelector('.login-area');
    const errorEl = document.querySelector('.error');
    const outputEl = document.querySelector('.output');
    const loggedInUserEl = document.querySelector('.logged-in-user');
    const logoutAreaEl = document.querySelector('.logout-area');
    const loginPageEl = document.querySelector('.login-page');
    const createRecipeEl = document.querySelector('.create-recipe');
    const recipeListEl = document.querySelector('.recipe-list');

    const bodyEl = document.querySelector('.spa');

    let loggedIn;
    let userName;

    function enableRecipeCreation() {
      bodyEl.addEventListener('click', event => {
        if (titleBox.value != "" && authorBox.value !== "" && ingredientsBox.value !== "" && instructionsBox.value !== "") {
          recipeButton.disabled = false;
        }
      });
    }

    function submitRecipe() {
      createRecipeEl.addEventListener('click', (e) => {
        if(e.target.classList.contains('form-btn') ) { 

          const rawtitle = titleBox.value;
          const rawAuthor = authorBox.value;
          const rawIngredients = ingredientsBox.value;
          const rawInstructions = instructionsBox.value;
          
          console.log(`Title: ${rawtitle}`);
          console.log(`Author: ${rawAuthor}`);
          console.log(`Ingredients: ${rawIngredients}`);
          console.log(`Instructions: ${rawInstructions}`);
          console.log('create recipe button clicked!');

          fetch(`/recipe`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({title: rawtitle, author: rawAuthor, ingredients: rawIngredients, instructions: rawInstructions}),
          })
          .catch( () => Promise.reject( { error: 'network-error' }) )
          .then( convertError)
          .then( items => {
            // renderItems(items);
            // updateStatus('Incremented Quantity by 1!', "success");
          })
          .catch( err => {
            updateStatus(errMsgs[err.error] || err.error, "failure");
          });

          
        } 
      });
    }


    function showContent() {
      loggedInUserEl.hidden = false;
      logoutAreaEl.hidden = false;
      createRecipeEl.hidden = false;
      loginPageEl.hidden = true;
      recipeListEl.hidden = false;
    }

    function showLogin() {
      loggedInUserEl.hidden = true;
      logoutAreaEl.hidden = true;
      createRecipeEl.hidden = true;
      loginPageEl.hidden = false;
      recipeListEl.hidden = true;
    }

    function renderItems( userName ) {    
        // const html =  Object.values(username).map(
        //   (username) => `
        //       <li>
        //         ${username}
        //       </li>`
        // ).join('');
        // listEl.innerHTML = html;
        console.log(`Global Logged In Variable: ${loggedIn}`);
        if (loggedIn) {
          console.log("I antered the right if");
          loggedInUserEl.innerHTML = `Welcome, ${userName}`;
          showContent();
        }
    }

    function populateItems() {
      getHome()
      .then( items => {
          loggedIn = items.loggedIn;
          userName = items.username;
          renderItems(userName);
      })
      .catch( err => {
      updateStatus(errMsgs[err.error] || err.error);
      });
    };
  
    function updateStatus( message, status ) {
        if (status == "success") {
          outputEl.innerText = message;
        } else if (status == "failure") {
          errorEl.innerText = message;
        }
    }

    function disableLoginWhenEmpty() {
      usernameBox.addEventListener('input', (evt) => {
        loginButton.disabled = false;
      });
    }



    function performLogin() {
        loginAreaEl.addEventListener('click', (e) => {
          if(e.target.classList.contains('login-btn') ) {
            console.log('login button clicked!');
            const enteredUsername = usernameBox.value;
            if(enteredUsername) {
                fetch(`/login`, {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body : JSON.stringify({userName: enteredUsername}),
                })
                .catch( () => Promise.reject( { error: 'network-error' }) )
                .then( convertError)
                .then( items => {
                    showContent();
                    userName = items.username;
                    loggedIn = true;
                    renderItems(userName);
                    updateStatus(`${userName} Logged in successfully!`, "success");
                })
                .catch( err => {
                  updateStatus(errMsgs[err.error] || err.error, "failure");
                });
            }
          }
        });
    }

    function performLogout() {
      logoutAreaEl.addEventListener('click', (e) => {
        if(e.target.classList.contains('fa-sign-out-alt') ) {
          console.log('logout button clicked');
          fetch(`/logout`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
          })
          .catch( () => Promise.reject( { error: 'network-error' }) )
          .then( convertError)
          .then( items => {
            showLogin();
            const logoutMessage = items.message;
            updateStatus(`${logoutMessage} Logged out Successfully!`, "success");
          })
          .catch( err => {
            updateStatus(errMsgs[err.error] || err.error, "failure");
          });
        }
      });
    }
    
    submitRecipe();
    enableRecipeCreation();
    performLogout();
    performLogin();
    populateItems();
    disableLoginWhenEmpty();
})();