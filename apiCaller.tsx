import fetch from 'isomorphic-fetch';
import {
  IListItem, IItem, IList, IUser,
} from './interfaces/api';

// const apiUrl = 'http://x2021oxygene667208093000.francecentral.cloudapp.azure.com:5555/';
const apiUrl = 'http://192.168.1.23:5555/';

interface IRequestOptions {
  method: string;
  headers: {};
  body?: string;
}

function fetchApi<T>(path: string, method: string, headers = {}, data = {}) {
  const requestOption: IRequestOptions = {
    method,
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json;multipart/form-data;',
      ...headers,
    },
  };
  if (method !== 'GET' && method !== 'HEAD') {
    requestOption.body = JSON.stringify(data);
  }
  return new Promise<T>((resolve, reject) => {
    fetch(apiUrl + path, requestOption)
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => { resolve(json); });
        } else {
          response.json().then((json: Object) => {
            let errors: string[] = [];
            Object.values(json).forEach((e) => {
              errors = errors.concat(e);
            });
            reject(errors);
          });
        }
      });
  });
}

function signUp(username: string, password: string): Promise<IUser> {
  return fetchApi('sign-up/', 'POST', {}, {
    username,
    password,
  });
}

function signIn(username: string, password: string): Promise<IUser> {
  return fetchApi('sign-in/', 'POST', {}, {
    username,
    password,
  });
}

function createItem(itemName: string, token: string): Promise<IItem> {
  return fetchApi('create-item/', 'POST', { token }, { name: itemName });
}

function getItems(token: string) {
  return fetchApi('get-items/', 'GET', { token });
}

function createShoppingList(shoppingListName: string, token: string): Promise<IList> {
  return fetchApi('create-shopping-list/', 'POST', { token }, { name: shoppingListName });
}

function getShoppingList(token: string): Promise<IList[]> {
  return fetchApi('get-shopping-lists/', 'GET', { token });
}

function putItemInShoppingList(shoppingListId: string,
  itemId: string, token: string): Promise<IListItem> {
  return fetchApi('put-item-in-shopping-list/', 'POST', { token }, {
    shopping_list: shoppingListId,
    item: itemId,
  });
}

function getShoppingListItems(listId: string, token: string): Promise<IListItem[]> {
  return fetchApi(`get-items-from-shopping-list/${listId}/`, 'GET', { token });
}

function checkShippingListItem(shoppingListItemId: string, token: string): Promise<IListItem> {
  return fetchApi(`check-shopping-list-item/${shoppingListItemId}/`, 'GET', { token });
}

function deleteShoppingList(shoppingListId: string, token: string) {
  return fetchApi(`delete-shopping-list/${shoppingListId}/`, 'GET', { token });
}

function uploadProfilePicture(picture: string, token: string) {
  return fetchApi('upload-profile-picture/', 'POST', { token }, picture);
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
  uploadProfilePicture,
};
