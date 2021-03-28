
export const errMsgs = {
    'duplicate': 'That name already exists!\nPlease enter a new item... I am confused sir',
    'network-error': 'Request Timeout: Server seems to be down!',
};

export const triggerHomeService = () => {
  return fetch('/home', {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  .catch( () => {
    return Promise.reject({code: 'network-error'});
  })
  .then( (convertError));
};

export const triggerLoginService = (enteredUsername) => {
  return fetch(`/login`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body : JSON.stringify({userName: enteredUsername})
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
  })
  .then( (convertError));
};

export const triggerLogoutService = () => {
  return fetch(`/logout`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'}
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
  })
  .then( (convertError));
}

export const triggerRecipeCallService = (recipe_id) => {
  return fetch(`/recipe/${recipe_id}`, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'}
  })
  .catch( () => {
    return Promise.reject({ error: 'network-error' });
  })
  .then( (convertError));
}

export const convertError = (response) => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
  }