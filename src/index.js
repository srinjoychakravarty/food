import { errMsgs, getHome, convertError, } from './services';

(function iife() {

    const listEl = document.querySelector('.items');
    const usernameBox = document.querySelector('.login-area').querySelector('.uname-input');
    const loginButton = document.querySelector('.login-area').querySelector('.login-btn');
    const loginAreaEl = document.querySelector('.login-area');
    const errorEl = document.querySelector('.error');
    const outputEl = document.querySelector('.output');
    const loggedInUserEl = document.querySelector('.logged-in-user');
    const logoutAreaEl = document.querySelector('.logout-area');
    const loginPageEl = document.querySelector('.login-page');
    const createRecipeEl = document.querySelector('.create-recipe');
    const recipeListEl = document.querySelector('.recipe-list');

    let loggedIn;
    let userName;

    function showContent() {
      logoutAreaEl.hidden = false;
      createRecipeEl.hidden = false;
      loginPageEl.hidden = true;
      recipeListEl.hidden = false;
    }

    function showLogin() {
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
  
    performLogout();
    performLogin();
    populateItems();
    disableLoginWhenEmpty();
})();