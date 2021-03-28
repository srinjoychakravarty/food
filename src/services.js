
export const errMsgs = {
    'duplicate': 'That name already exists!\nPlease enter a new item... I am confused sir',
    'network-error': 'Request Timeout: Server seems to be down!',
};

// export const triggerLoginService = ( enteredUsername ) => {
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
export const getHome = () => {
  return fetch('/home', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then( (convertError));
};

export const postLogin = (enteredUsername) => {
  return  fetch(`/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body : JSON.stringify({userName: enteredUsername}),
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
  })
  .then( (convertError));
};


export const convertError = (response) => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
  }


 