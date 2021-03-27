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
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



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
  var recipeListEl = document.querySelector('.recipe-list');
  var bodyEl = document.querySelector('.spa');
  var cardRight = document.querySelector('.card.right');
  var cardLeft = document.querySelector('.card.left');
  var loggedIn;
  var userName;

  function enableRecipeCreation() {
    bodyEl.addEventListener('click', function (event) {
      if (titleBox.value != "" && authorBox.value !== "" && ingredientsBox.value !== "" && instructionsBox.value !== "") {
        recipeButton.disabled = false;
      }
    });
  }

  function renderItems(userName) {
    // const html =  Object.values(username).map(
    //   (username) => `
    //       <li>
    //         ${username}
    //       </li>`
    // ).join('');
    // listEl.innerHTML = html;
    if (loggedIn) {
      loggedInUserEl.innerHTML = "Welcome, ".concat(userName);
      showContent();
    }
  }

  function showRecipeLibrary(recipeObjects, recipeIDArray) {
    // recipeIDArray.forEach(recipe => console.log(recipeObjects[recipe]));
    // let recipeTitles = recipeIDArray.forEach(recipe => recipeObjects[recipe]);
    // console.log(recipeTitles);
    // let recipeTitles = [];
    // for (const recipe of recipeIDArray) {
    //   recipeTitles.push(recipeObjects[recipe].title);
    // }
    // console.log(recipeTitles);
    // const titlesHTML = recipeTitles.map(
    //   (title) => `<li> 
    //               ${title} 
    //             </li>`).join('');
    //document.querySelector('.bobo').innerHTML = titlesHTML;
    var recipes = [];

    var _iterator = _createForOfIteratorHelper(recipeIDArray),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _recipe = _step.value;
        recipes.push(recipeObjects[_recipe].ingredients);
      } // console.log(recipes);

    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var ingredientsListItemsHTML = [];

    for (var _i = 0, _recipes = recipes; _i < _recipes.length; _i++) {
      var recipe = _recipes[_i];
      var unorderedListHTML = recipe.map(function (ingredient) {
        return "<li> \n                        ".concat(ingredient, " \n                      </li>");
      }).join('');
      ingredientsListItemsHTML.push(unorderedListHTML);
    }

    console.log(ingredientsListItemsHTML);
    var testHTML = recipeIDArray.map(function (recipeID) {
      return "<section class=\"card right\">\n                          <section class=\"container\">\n                            <h3>".concat(recipeObjects[recipeID].title, "</h3>\n                            <h4>by ").concat(recipeObjects[recipeID].author, "</h4>\n                            <h5>Ingredients</h5>\n                            <ul>").concat(ingredientsListItemsHTML, "</ul>\n                          </section>\n                      </section>");
    }).join('');
    document.querySelector('.bobo').innerHTML = testHTML; //document.querySelector('.card.right').querySelector('.container').querySelector('.recipe-title').innerHTML = recipeTitles[1].toString();
    // document.querySelector('.card.right').querySelector('.container').querySelector('.recipe-title')
    // const cardHTML = recipeIDArray.forEach(
    //   recipe => `
    //   <section class="container">
    //   <h3>${recipeObjects[recipe].title}</h3>
    //   <h4>by ${recipeObjects[recipe].author}</h4>
    //   <h5>Ingredients</h5>
    //   <h6>Submitted by: ${recipeObjects[recipe].username}</h6>
    // </section>
    //   `);
    // const title = recipeIDArray.forEach(
    //   recipe => `
    //   <h3>
    //     ${recipeObjects[recipe].title}
    //   </h3>`);
    // document.querySelector('.card.right').innerHTML = title;
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
          var recipeIDArray = Object.keys(recipeObjects); // for (const recipe of recipeIDArray) {
          //   console.table(recipeObjects[recipe].author);
          // }
          // recipeIDArray.forEach(recipe => console.log(recipeObjects[recipe]));  

          showRecipeLibrary(recipeObjects, recipeIDArray); // renderItems(items);
          // updateStatus('Incremented Quantity by 1!', "success");
        })["catch"](function (err) {
          updateStatus(_services__WEBPACK_IMPORTED_MODULE_0__.errMsgs[err.error] || err.error, "failure");
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