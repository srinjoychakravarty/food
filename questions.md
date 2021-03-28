# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.

* To say a URL should represent a resource, is to say that it should be a **noun** and not a verb, i.e. _doing thing_. This noun represents the resource or entity that the endpoint is retrieving or manipulating as its pathname. 

  > The following url does not represent a resource:

  ```js
  /api/GetUser
  ```
  Note: We can modify this by changing the "GetUser" to simply **user** as we can see that it is a GET request on closer inspection of the HTTP service.

    ```js
    /api/user
    return fetch(`/api/user`, {
    method: 'GET',
    ```

## Q2: If the service returns the username as a plain text string (not JSON), what is wrong with the below and what would fix it? (Assume the service works without error)

  * **Erroneous**
    ```js
      const username = fetch('/username');
      console.log(`user is named ${username}`);
    ```  
  * The **Fetch API** provides an interface for fetching resources replacing the now deprecated <u>XMLHttpRequest</u> service with a  _fetch()_ method that takes a mandatory **path** and returns a _Javascript_  **Promise**, that resolves to the request, regardless of any success criteria. This is why it cannot directly be assigned to a variable and accessed immediately. 
  
  * Instead, the body of the response needs to be waited for, and retrieved when ready with a _.then()_, after which point, it can be manipulate via a plethora of methods. The fix in the code is shown below:

  * **Correct**
    ```js
    return fetch(`/username`, {
      method: 'GET',
    })
    .catch( () => {
      return Promise.reject({ error: 'network-error' });
    })
    .then((convertError));
    .then( username => {
      console.log(`user is named ${username}`);
    })
    ```



## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?

* Storing state in the DOM, otherwise known as the Document Object Model, is when the client (usually a web browser) stores values
input by the end user or otherwise, on its local storage engine or in cookies. 
* These input values are stored with the intention of being fed onto the next web element in the code to render appropriate client-side behaviour such as **sorts** and **filters**. 

* Usually the client is talking to many servers so a DOM state could be accumulating data from multiple services and **fall out-of-sync.** In fact, the client state is often different even between multiple tabs within a single browser, i.e in an Amazon shopping cart session. This is why _DOM state_ is not reliable.

* The DOM is also at the mercy of the user, who may be malicious, and inject unexpected values. Therefore, **server-side state** should be treated as the _one source of truth._

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.

* A **single-page** web application is characterized predominantly by a **single document load**. In this spirit, the html is loaded by the client once, as a _single page document_ and then everything subsequent to this, is done by _modifying_ the existing html on the loaded page.

* Even if one is to hide /remove all the html and put in a completely disparate set of html, a **SPA** maintains its identity as a single page application, so long as **all javascript remains in memory** and there is **no further page load.**

* In contrast, a **multiple-page** web application is one that maintains a list of _named routes_, which are traversed for distinct document reloads. Here pages load every time the users make a request from their browser and the constant back-and-forth rendering of data, results in a poor user experience, as page reloads suffer from prominent network delays.

## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?

* **Progressive enhancement** is a strategy for building websites in which core functionality is available to all browsers, while non-critical enhancements are available to capable browsers.

* SPA that uses progressive enhancement allows for the **graceful fallback or degration of critical functionality** to the most basic of features, so that if more sophisticated web elements fail, the core business service is not impacted.

* SPA without progressive enhancement may be **prone to denial-of-service**, from a plethora of JavaScript failures.

* These can be caused by anything from poor network conditions or firewalls, to privacy restrictions, that prevent JavaScript from executing, leading to the catastrophic sight of a blank screen being rendered to the user!

## Q6: Explain how a REST service is or is not similar to a dynamic asset.

* Dynamic assets consist of HTML, Javascript and CSS resources that are partially or entirely **generated and rendered by the backend logic** of a web server.  

* In contrast, a REST service consists of a **set of Javascript files** that communicate with web servers to _morph the contents_ of a **master HTML** + CSS document file.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.

* Important **financial** information such as passwords, bank information, credit card numbers and CVV pins, as well as **PII** such as SSNs, DOBs, Shipping/Billing addresses **should not** be **stored in cookies!** 

* This is because in general, cookies are not encrypted, which means they can be hijacked in transit or from the web-browser of its destination. 

* Skilled attackers can utilize **malicious javascript** to **exfiltrate** cookie information through **in-site media** and use it to **hijack user's browser sessions!**

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data

* It is useful to separate a function that fetches data, to what it then does with that data, since **if you need to change** how the data retrieval happens down the line, you **do not** also have to **handle and update the code** in how the data is then manipulated.

 * This means source code changes are **contained to one area** at a time, without necessarily causing related html rendering to break.

* This **loose coupling of concerns** is very useful in reducing developer hours and eventually project overheads!

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)

* Try/catch is useless when dealing with promises and asynchronous errors in general because the promise is **never resolved before the try block has finished executing.**

* This means, that asynchronous code, will always be executed successfully in the try block, never once entering the catch block. Only, **once the try block completes**, does the _event loop_ go back to **handle the callback that deals with promise resolution**, which is when a network error or otherwise may occur, rendering in a failed state.


    ```js
    try {
      Promise.resolve()
        .then( () => {
          console.log("driving a red bull");
          throw new Error("max verstappen");
        });
      } catch(err) {
        // Doesn't happen
        console.log(`Hamilton can never catch ${err}`);
      }
      console.log('driving a mercedes');
      )
    }
    ```
    > Clever Formula 1 reference explaining the concept above

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.

* Separation of concerns should always be both a front-end and  server-side issue. 

* For example, you could have a **client-side** javascript file labelled **controller.js** that could utilize service calls using the _Fetch() API_ from a **services.js** and a **views.js** file for _dynamic fron-end HTML generation and rendering.

* Similarly, on the *server-side*, you could separate concerns by having a **server.js** server file utilizing functions from a **helper.js** file and importing database side logic from a **models.js** file. 

* The above example, illustrated the widely used best-practice, known as the **MVC pattern**, short for Model-View-Controller pattern.
