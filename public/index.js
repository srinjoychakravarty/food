/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "errMsgs": () => (/* binding */ errMsgs),
/* harmony export */   "getHome": () => (/* binding */ getHome),
/* harmony export */   "convertError": () => (/* binding */ convertError)
/* harmony export */ });
var errMsgs = {
  'duplicate': 'That name already exists!\nPlease enter a new item... I am confused sir',
  'network-error': 'Request Timeout: Server seems to be down!'
}; // export const triggerLoginService = ( enteredUsername ) => {
//     return fetch(`/login`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body : JSON.stringify({userName: enteredUsername}),
//     })
//     .catch( () => Promise.reject( { error: 'network-error' }) )
//     .then( convertError)
// };
// export const getLogIn = (chefName) => {
//     return fetch('/session', {
//         method: 'POST',
//         headers: new Headers({'content-type': 'application/json'}),
//         body: JSON.stringify({ chefName }),
//     })
//     .catch( () => { return Promise.reject({code: 'network-error'});})
//     .then( (convertError)) 
// };
//new one

var getHome = function getHome() {
  return fetch('/home', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(convertError);
};
var convertError = function convertError(response) {
  if (response.ok) {
    return response.json();
  }

  return response.json().then(function (err) {
    return Promise.reject(err);
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");


(function iife() {
  var listEl = document.querySelector('.items');
  var usernameBox = document.querySelector('.login-area').querySelector('.uname-input');
  var titleBox = document.querySelector("form[name='new-recipe'] input[name='title']");
  var authorBox = document.querySelector("form[name='new-recipe'] input[name='author']");
  var ingredientsBox = document.querySelector("form[name='new-recipe'] textarea[name='ingredients']");
  var instructionsBox = document.querySelector("form[name='new-recipe'] textarea[name='instructions']");
  var loginButton = document.querySelector('.login-area').querySelector('.login-btn');
  var recipeButton = document.querySelector('.create-recipe').querySelector('.form-btn');
  var loginAreaEl = document.querySelector('.login-area');
  var errorEl = document.querySelector('.error');
  var outputEl = document.querySelector('.output');
  var loggedInUserEl = document.querySelector('.logged-in-user');
  var logoutAreaEl = document.querySelector('.logout-area');
  var loginPageEl = document.querySelector('.login-page');
  var createRecipeEl = document.querySelector('.create-recipe');
  var storedRecipesEl = document.querySelector('.recipe-cards');
  var bodyEl = document.querySelector('.spa');
  var cardRight = document.querySelector('.card.right');
  var cardLeft = document.querySelector('.card.left');
  var loggedIn;
  var userName;

  function enableRecipeCreation() {
    bodyEl.addEventListener('input', function (event) {
      if (titleBox.value != "" && authorBox.value !== "" && ingredientsBox.value !== "" && instructionsBox.value !== "") {
        recipeButton.disabled = false;
      }
    });
  }

  function renderItems(userName) {
    if (loggedIn) {
      loggedInUserEl.innerHTML = "Welcome, ".concat(userName);
      showContent();
    }
  }

  function showRecipeLibrary(recipeObjects, recipeIDArray) {
    var cardLeft = "card left";
    var cardRight = "card right";
    var testHTML = recipeIDArray.map(function (recipeID, index) {
      return "<section class=\"".concat(index % 2 === 0 ? cardLeft : cardRight, "\">\n                          <section class=\"container\">\n                            <h3>").concat(recipeObjects[recipeID].title, "</h3>\n                            <h4>by ").concat(recipeObjects[recipeID].author, "</h4>\n                            <h5>Ingredients</h5>\n                            <ul>").concat(recipeObjects[recipeID].ingredients.map(function (ingredient) {
        return "<li> \n                                                  ".concat(ingredient, " \n                                                </li>");
      }).join(''), "\n                            </ul>\n                            <h5>Instructions</h5>\n                            <ol>").concat(recipeObjects[recipeID].instructions.map(function (instruction) {
        return "<li> \n                                                  ".concat(instruction, " \n                                                </li>");
      }).join(''), "\n                            </ol>\n                            <h6>Submitted by: ").concat(recipeObjects[recipeID].uploaded_by, "</h6>\n                          </section>\n                      </section>");
    }).join('');
    storedRecipesEl.innerHTML = testHTML;
  }

  function submitRecipe() {
    createRecipeEl.addEventListener('click', function (e) {
      if (e.target.classList.contains('form-btn')) {
        var rawtitle = titleBox.value;
        var rawAuthor = authorBox.value;
        var rawIngredients = ingredientsBox.value;
        var rawInstructions = instructionsBox.value;
        fetch("/recipe", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: rawtitle,
            author: rawAuthor,
            ingredients: rawIngredients,
            instructions: rawInstructions
          })
        })["catch"](function () {
          return Promise.reject({
            error: 'network-error'
          });
        }).then(_services__WEBPACK_IMPORTED_MODULE_0__.convertError).then(function (recipeObjects) {
          var recipeIDArray = Object.keys(recipeObjects);
          showRecipesHome();
          showRecipeLibrary(recipeObjects, recipeIDArray);
        })["catch"](function (err) {
          updateStatus(_services__WEBPACK_IMPORTED_MODULE_0__.errMsgs[err.error] || err.error, "failure");
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
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.getHome)().then(function (items) {
      loggedIn = items.loggedIn;
      userName = items.username;
      renderItems(userName);
    })["catch"](function (err) {
      updateStatus(_services__WEBPACK_IMPORTED_MODULE_0__.errMsgs[err.error] || err.error);
    });
  }

  ;

  function updateStatus(message, status) {
    if (status == "success") {
      outputEl.innerText = message;
    } else if (status == "failure") {
      errorEl.innerText = message;
    }
  }

  function disableLoginWhenEmpty() {
    usernameBox.addEventListener('input', function (evt) {
      loginButton.disabled = false;
    });
  }

  function performLogin() {
    loginAreaEl.addEventListener('click', function (e) {
      if (e.target.classList.contains('login-btn')) {
        var enteredUsername = usernameBox.value;

        if (enteredUsername) {
          fetch("/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userName: enteredUsername
            })
          })["catch"](function () {
            return Promise.reject({
              error: 'network-error'
            });
          }).then(_services__WEBPACK_IMPORTED_MODULE_0__.convertError).then(function (items) {
            showContent();
            userName = items.username;
            loggedIn = true;
            renderItems(userName);
            updateStatus("".concat(userName, " Logged in successfully!"), "success");
          })["catch"](function (err) {
            updateStatus(_services__WEBPACK_IMPORTED_MODULE_0__.errMsgs[err.error] || err.error, "failure");
          });
        }
      }
    });
  }

  function performLogout() {
    logoutAreaEl.addEventListener('click', function (e) {
      if (e.target.classList.contains('fa-sign-out-alt')) {
        fetch("/logout", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })["catch"](function () {
          return Promise.reject({
            error: 'network-error'
          });
        }).then(_services__WEBPACK_IMPORTED_MODULE_0__.convertError).then(function (items) {
          showLogin();
          var logoutMessage = items.message;
          updateStatus("".concat(logoutMessage, " Logged out Successfully!"), "success");
        })["catch"](function (err) {
          updateStatus(_services__WEBPACK_IMPORTED_MODULE_0__.errMsgs[err.error] || err.error, "failure");
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
})();

/******/ })()
;
//# sourceMappingURL=index.js.map