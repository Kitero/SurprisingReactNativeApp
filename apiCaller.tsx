import { object } from 'prop-types';

const apiUrl = 'http://x2021oxygene667208093000.francecentral.cloudapp.azure.com:5555/';

function fetchApi(path, method, headers = {}, data = {}) {
  const requestOption = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  };
  if (method !== 'GET' && method !== 'HEAD') {
    requestOption.body = JSON.stringify(data);
  }
  return new Promise((resolve, reject) => {
    fetch(apiUrl + path, requestOption)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => { resolve(json); });
        } else {
          response.json().then((json) => {
            let errors: any[] = [];
            json.values().forEach((e) => {
              errors = errors.concat(e);
            });
            reject(errors);
          });
        }
      });
  });
}

function signUp(username, password) {
  return fetchApi('sign-up/', 'POST', {}, {
    username,
    password,
  });
}

function signIn(username, password) {
  return fetchApi('sign-in/', 'POST', {}, {
    username,
    password,
  });
}

function createItem(itemName, token) {
  return fetchApi('create-item/', 'POST', { token }, { name: itemName });
}

function getItems(token) {
  return fetchApi('get-items/', 'GET', { token });
}

function createShoppingList(shoppingListName, token) {
  return fetchApi('create-shopping-list/', 'POST', { token }, { name: shoppingListName });
}

function getShoppingList(token) {
  return fetchApi('get-shopping-lists/', 'GET', { token });
}

function putItemInShoppingList(shoppingListId, itemId, token) {
  return fetchApi('put-item-in-shopping-list/', 'POST', { token }, {
    shopping_list: shoppingListId,
    item: itemId,
  });
}

function getShoppingListItems(listId, token) {
  return fetchApi(`get-items-from-shopping-list/${listId}/`, 'GET', { token });
}

function checkShippingListItem(shoppingListItemId, token) {
  return fetchApi(`check-shopping-list-item/${shoppingListItemId}/`, 'GET', { token });
}

function deleteShoppingList(shoppingListId, token) {
  return fetchApi(`delete-shopping-list/${shoppingListId}/`, 'GET', { token });
}

export {
  signUp,
  signIn,
  createItem,
  getItems,
  createShoppingList,
  getShoppingList,
  putItemInShoppingList,
  getShoppingListItems,
  checkShippingListItem,
  deleteShoppingList,
};
