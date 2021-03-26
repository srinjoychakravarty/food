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
/* harmony export */   "convertError": () => (/* binding */ convertError),
/* harmony export */   "errMsgs": () => (/* binding */ errMsgs),
/* harmony export */   "triggerLoginService": () => (/* binding */ triggerLoginService),
/* harmony export */   "getLogIn": () => (/* binding */ getLogIn)
/* harmony export */ });
var convertError = function convertError(response) {
  if (response.ok) {
    return response.json();
  }

  return response.json().then(function (err) {
    return Promise.reject(err);
  });
};
var errMsgs = {
  'duplicate': 'That name already exists!\nPlease enter a new item... I am confused sir',
  'network-error': 'Request Timeout: Server seems to be down!'
};
var triggerLoginService = function triggerLoginService(enteredUsername) {
  return fetch("/login", {
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
  }).then(convertError);
};
var getLogIn = function getLogIn(chefName) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      chefName: chefName
    })
  })["catch"](function () {
    return Promise.reject({
      code: 'network-error'
    });
  }).then(convertError);
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
  var loginButton = document.querySelector('.login-area').querySelector('.login-btn');
  var loginAreaEl = document.querySelector('.login-area');
  var errorEl = document.querySelector('.error');
  var outputEl = document.querySelector('.output');
  var loggedInUserEl = document.querySelector('.logged-in-user');
  var loggedIn = false;
  var loggedInUser;

  function renderItems(items) {
    var html = Object.values(items).map(function (item) {
      return "\n              <li>\n                ".concat(item, "\n              </li>");
    }).join('');
    listEl.innerHTML = html;

    if (loggedIn) {
      loggedInUserEl.innerHTML = "Welcome, ".concat(loggedInUser);
    }
  }

  function populateItems() {
    fetch('/items/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })["catch"](function () {
      return Promise.reject({
        error: 'network-error'
      });
    }).then(_services__WEBPACK_IMPORTED_MODULE_0__.convertError).then(function (items) {
      console.log(items);
      console.table(items);
      renderItems(items);
    })["catch"](function (err) {
      updateStatus(_services__WEBPACK_IMPORTED_MODULE_0__.errMsgs[err.error] || err.error);
    });
  }

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

  function showContent() {
    // document.querySelector('.login-page').classList.add('hidden');
    // document.querySelector('.item-list').classList.remove('hidden');
    document.querySelector('.login-page').hidden = true;
    document.querySelector('.item-list').hidden = false;
  }

  function performLogin() {
    loginAreaEl.addEventListener('click', function (e) {
      if (e.target.classList.contains('login-btn')) {
        console.log('login button clicked!');
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
            console.log(items);
            var userName = items.username;
            loggedInUser = userName;
            loggedIn = true;
            console.log(loggedInUser);
            renderItems(loggedInUser);
            updateStatus("".concat(userName, " logged In Successfully!"), "success");
          })["catch"](function (err) {
            updateStatus(_services__WEBPACK_IMPORTED_MODULE_0__.errMsgs[err.error] || err.error, "failure");
          });
        }
      }
    });
  }

  performLogin();
  populateItems();
  disableLoginWhenEmpty();
})();
})();

/******/ })()
;
//# sourceMappingURL=index.js.map