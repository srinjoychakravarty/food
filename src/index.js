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
    const storedRecipesEl = document.querySelector('.recipe-cards');

    const bodyEl = document.querySelector('.spa');

    const cardRight = document.querySelector('.card.right');
    const cardLeft = document.querySelector('.card.left');

    let loggedIn;
    let userName;

    function enableRecipeCreation() {
      bodyEl.addEventListener('input', event => {
        if (titleBox.value != "" && authorBox.value !== "" && ingredientsBox.value !== "" && instructionsBox.value !== "") {
          recipeButton.disabled = false;
        }
      });
    }

    function renderItems( userName ) {    
      if (loggedIn) {
        loggedInUserEl.innerHTML = `Welcome, ${userName}`;
        showContent();
      }
    }

    function showRecipeLibrary(recipeObjects, recipeIDArray) {
      let cardLeft = "card left";
      let cardRight = "card right";
      
      const testHTML = recipeIDArray.map(
        (recipeID, index) => `<section class="${index % 2 === 0 ? cardLeft : cardRight}">
                          <section class="container">
                            <h3>${recipeObjects[recipeID].title}</h3>
                            <h4>by ${recipeObjects[recipeID].author}</h4>
                            <h5>Ingredients</h5>
                            <ul>${recipeObjects[recipeID].ingredients.map(
                              (ingredient) => `<li> 
                                                  ${ingredient} 
                                                </li>`).join('')}
                            </ul>
                            <h5>Instructions</h5>
                            <ol>${recipeObjects[recipeID].instructions.map(
                              (instruction) => `<li> 
                                                  ${instruction} 
                                                </li>`).join('')}
                            </ol>
                            <h6>Submitted by: ${recipeObjects[recipeID].uploaded_by}</h6>
                          </section>
                      </section>`).join('');                    

                      storedRecipesEl.innerHTML = testHTML;
    }

    function submitRecipe() {
      createRecipeEl.addEventListener('click', (e) => {
        if(e.target.classList.contains('form-btn') ) { 
          const rawtitle = titleBox.value;
          const rawAuthor = authorBox.value;
          const rawIngredients = ingredientsBox.value;
          const rawInstructions = instructionsBox.value;
          fetch(`/recipe`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body : JSON.stringify({title: rawtitle, author: rawAuthor, ingredients: rawIngredients, instructions: rawInstructions}),
          })
          .catch( () => Promise.reject( { error: 'network-error' }) )
          .then( convertError)
          .then( recipeObjects => {
            let recipeIDArray = Object.keys(recipeObjects);
            showRecipesHome();
            showRecipeLibrary(recipeObjects, recipeIDArray);
          })
          .catch( err => {
            updateStatus(errMsgs[err.error] || err.error, "failure");
          });

        } 
      });
    }

    function showRecipesHome() {
      outputEl.innerHTML = "";
      createRecipeEl.hidden = true;
      storedRecipesEl.hidden = false;
    }

    function showContent() {
      loggedInUserEl.hidden = false;
      logoutAreaEl.hidden = false;
      createRecipeEl.hidden = false;
      loginPageEl.hidden = true;
    }

    function showLogin() {
      loggedInUserEl.hidden = true;
      logoutAreaEl.hidden = true;
      createRecipeEl.hidden = true;
      loginPageEl.hidden = false;
      storedRecipesEl.hidden = true;
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