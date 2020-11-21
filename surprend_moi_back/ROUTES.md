# Url
http://x2021oxygene667208093000.francecentral.cloudapp.azure.com:5555
# Routes
## POST sign-up/
Create new account.
### Required fields
```json
{
    "username": "MyUsername",
    "password": "MySecretPassword"
}
```
### Return value
```json
{
    "id": 1,
    "username": "MyUsername",
    "token": "12345678789abcdefghijklmnopqrstuvzxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "profile_picture": "http://picture.url"
}
```


## POST sign-in/
Connect user return user information.
### Required fields
```json
{
    "username": "MyUsername",
    "password": "MySecretPassword"
}
```
### Return value
```json
{
    "id": 1,
    "username": "MyUsername",
    "token": "12345678789abcdefghijklmnopqrstuvzxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "profile_picture": "http://picture.url"
}
```

################################################################
# What is it for?
## POST create-item/
Create new item.
### Required header
`token: 12345678789abcdefghijklmnopqrstuvzxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
### Required fields
```json
{
    "name": "Carotte"
}
```
### Return value
```json
{
    "id": 1,
    "name": "Carotte"
}
```


## GET get-items/
Get list of items.
### Required header
`token: 12345678789abcdefghijklmnopqrstuvzxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
### Return value
```json
[
    {
        "id": 1,
        "name": "Carotte"
    }, ...
]
```


## POST create-shopping-list/
Create new shopping list.
### Required header
`token: 12345678789abcdefghijklmnopqrstuvzxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
### Required fields
```json
{
    "name": "My shopping list"
}
```
### Return value
```json
{
    "id": 1,
    "name": "My shopping list"
}
```


## GET get-shopping-lists/
Get list of shopping list (created by user).
### Required header
`token: 12345678789abcdefghijklmnopqrstuvzxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
### Return value
```json
[
    {
        "id": 1,
        "name": "My shopping list"
    }, ...
]
```


## POST put-item-in-shopping-list/
Put item into shopping list.
### Required header
`token: 12345678789abcdefghijklmnopqrstuvzxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
### Required fields
```json
{
    "shopping_list": 1,
    "item": 1    
}
```
### Return value
```json
{
    "id": 1,
    "shopping_list": 1,
    "item": 1  
}
```


## GET get-items-from-shopping-list/\<int:shopping_list_id>/
Get items from shopping list.
### Required header
`token: 12345678789abcdefghijklmnopqrstuvzxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
### Return value
```json
[
    {
        "id": 1,
        "shopping_list": 1,
        "item": 1,
        "checked": false  
    }, ...
]
```


## GET check-shopping-list-item/\<int:shopping_list_item_id>/
Toggle shopping list item checked attribute.
### Required header
`token: 12345678789abcdefghijklmnopqrstuvzxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
### Return value
```json
{
    "id": 1,
    "shopping_list": 1,
    "item": 1,
    "checked": false  
}
```
