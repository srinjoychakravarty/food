import { errMsgs, getHome, convertError, convertHTML } from './services';

(function iife() {

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
    const writeRecipeEl = document.querySelector('.write-recipe');
    const goHomeEl = document.querySelector('.go-home');

    const storedRecipesEl = document.querySelector('.recipe-cards');
    const recipeSummariesEl = document.querySelector('.recipe-summaries');

    const bodyEl = document.querySelector('.spa');

    let loggedIn;
    let userName;

    function enableRecipeCreation() {
      bodyEl.addEventListener('input', event => {
        if (titleBox.value != "" && authorBox.value !== "" && ingredientsBox.value !== "" && instructionsBox.value !== "") {
          recipeButton.disabled = false;
        }
      });
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

    function showRecipeSummaries(recipeObjects, recipeIDArray) {
      let cardLeft = "card left";
      let cardRight = "card right";
      
      const testHTML = recipeIDArray.map(
        (recipeID, index) => `<section class="${index % 2 === 0 ? cardLeft : cardRight}">
                          <section class="container">
                            <h3>${recipeObjects[recipeID].title}</h3>
                            <h4>by ${recipeObjects[recipeID].author}</h4>
                            <h6>Submitted by: ${recipeObjects[recipeID].uploaded_by}</h6>
                            <button class="form-btn" type="button">Explore Recipe</button>
                          </section>
                      </section>`).join('');                    
                      recipeSummariesEl.innerHTML = testHTML;
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
            showRecipeSummaries(recipeObjects, recipeIDArray);
            showRecipesHome();
          })
          .catch( err => {
            updateStatus(errMsgs[err.error] || err.error, "failure");
          });

        } 
      });
    }

    function showRecipesHome() {
      goHomeEl.hidden = true;
      createRecipeEl.hidden = true;
      recipeSummariesEl.hidden = false;
      outputEl.innerHTML = "";
    }

    function showContent() {
      loggedInUserEl.hidden = false;
      logoutAreaEl.hidden = false;
      createRecipeEl.hidden = true;
      loginPageEl.hidden = true;
      writeRecipeEl.hidden = false;
    }

    function showLogin() {
      loggedInUserEl.hidden = true;
      logoutAreaEl.hidden = true;
      createRecipeEl.hidden = true;
      loginPageEl.hidden = false;
      storedRecipesEl.hidden = true;
      writeRecipeEl.hidden = true;
    }

    function writingRecipeInProgress() {
      createRecipeEl.hidden = false;
      recipeSummariesEl.hidden = true;
      writeRecipeEl.hidden = true;
      goHomeEl.hidden = false;
    }

    function renderItems( userName ) {    
      if (loggedIn) {
        loggedInUserEl.innerHTML = `Welcome, ${userName}`;
        showContent();
      }
    }

    function populateItems() {
      getHome()
      .then( response => {
          showRecipesHome();
          let recipeObjects = response.recipes;
          let recipeIDArray = Object.keys(recipeObjects);
          showRecipeSummaries(recipeObjects, recipeIDArray);
          loggedIn = response.loggedIn;
          userName = response.username;
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
                .then( response => {
                    userName = response.username;
                    loggedIn = true;
                    renderItems(userName);
                    const loginMessage = response.message;
                    updateStatus(loginMessage, "success");
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
          .then( response => {
            showLogin();
            const logoutMessage = response.message;
            updateStatus(logoutMessage, "success");
          })
          .catch( err => {
            updateStatus(errMsgs[err.error] || err.error, "failure");
          });
        }
      });
    }

    function writeRecipe() {
      writeRecipeEl.addEventListener('click', (e) => {
        if(e.target.classList.contains('fa-cheese') ) {
          writingRecipeInProgress();
        }
      });
    }

    function returnHome() {
      goHomeEl.addEventListener('click', (e) => {
        if(e.target.classList.contains('fa-home') ) {
          console.log('home button clicked');
          populateItems();
        }
      });
    }

    returnHome();
    writeRecipe();
    submitRecipe();
    enableRecipeCreation();
    performLogout();
    performLogin();
    populateItems();
    disableLoginWhenEmpty();
})();