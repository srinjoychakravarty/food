import { triggerLoginService, convertError, errMsgs } from './services';

(function iife() {

    const listEl = document.querySelector('.items');
    const usernameBox = document.querySelector('.login-area').querySelector('.uname-input');
    const loginButton = document.querySelector('.login-area').querySelector('.login-btn');
    const loginAreaEl = document.querySelector('.login-area');
    const errorEl = document.querySelector('.error');
    const outputEl = document.querySelector('.output');

    const loggedInUserEl = document.querySelector('.logged-in-user');

    let loggedIn = false;
    let loggedInUser;

    function renderItems( items ) {    
        const html =  Object.values(items).map(
          (item) => `
              <li>
                ${item}
              </li>`
        ).join('');
        listEl.innerHTML = html;
        if (loggedIn) {
          loggedInUserEl.innerHTML = `Welcome, ${loggedInUser}`;
        }
    }

    function populateItems() {
        fetch('/items/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then( convertError)
        .then( items => {
            console.log(items)
            console.table(items);
            renderItems(items);
        })
        .catch( err => {
        updateStatus(errMsgs[err.error] || err.error);
        });
    }

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

    function showContent() {
        // document.querySelector('.login-page').classList.add('hidden');
        // document.querySelector('.item-list').classList.remove('hidden');
        document.querySelector('.login-page').hidden = true;
        document.querySelector('.item-list').hidden = false;
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
                    console.log(items);
                    let userName = items.username;
                    loggedInUser = userName;
                    loggedIn = true;
                    console.log(loggedInUser);
                    renderItems(loggedInUser);
                    updateStatus(`${userName} logged In Successfully!`, "success");
                })
                .catch( err => {
                  updateStatus(errMsgs[err.error] || err.error, "failure");
                });
            }
          }
        });
    }

    performLogin();
    populateItems();
    disableLoginWhenEmpty();
})();