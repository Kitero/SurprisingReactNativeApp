import { object } from "prop-types";

const apiUrl = 'http://x2021oxygene667208093000.francecentral.cloudapp.azure.com:5555/';

function fetchApi(path, method, headers = {}, data = {}) {
    let request_option = {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            ...headers
        }
    }
    if (method != 'GET' && method != 'HEAD') {
        request_option['body'] = JSON.stringify(data);
    }
    return new Promise((resolve, reject) => {
        fetch(apiUrl + path, request_option)
            .then((response) => {
                if (response.ok) {
                    response.json().then((json) => { resolve(json) });
                }
                else {
                    response.json().then((json) => {
                        let errors = [];
                        console.log(json)
                        for (let e in json) {
                            errors = errors.concat(json[e]);
                        }
                        reject(errors);
                    });
                }
            });
    })
}

function signUp(username, password) {
    return fetchApi('sign-up/', 'POST', {}, {
        username: username,
        password: password
    });
}

function signIn(username, password) {
    return fetchApi('sign-in/', 'POST', {}, {
        username: username,
        password: password
    });
}

function createItem(itemName, token) {
    return fetchApi('create-item/', 'POST', { token: token }, { name: itemName });
}

function getItems(token) {
    return fetchApi('get-items/', 'GET', { token: token });
}

function createShoppingList(shoppingListName, token) {
    return fetchApi('create-shopping-list/', 'POST', { token: token }, { name: shoppingListName });
}

function getShoppingList(token) {
    return fetchApi('get-shopping-lists/', 'GET', { token: token });
}

function putItemInShoppingList(shoppingListId, itemId, token) {
    return fetchApi('put-item-in-shopping-list/', 'POST', { token: token }, {
        shopping_list: shoppingListId,
        item: itemId
    });
}

function getShoppingListItems(listId, token) {
    return fetchApi('get-items-from-shopping-list/' + listId + '/', 'GET', { token: token });
}

function checkShippingListItem(shoppingListItemId, token) {
    return fetchApi('check-shopping-list-item/' + shoppingListItemId + '/', 'GET', { token: token });
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
}