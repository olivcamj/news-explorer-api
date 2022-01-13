# News Explorer Api
Backend for news-explorer-api
domain name www.api.explorethenews.students.nomoreparties.site

## Description

The user will be able to create a user, login in and out, save and delete articles, and view their saved articles.

## Instuctions (to run locally) 

- Clone this repo
- Run the dev script `npm run dev`
- Use [Postman](https://www.postman.com/downloads/), [Insomnia](https://insomnia.rest/), or even the [Thunder Client](https://www.thunderclient.io/) ext. on VS Code (or any other of your favorites) to test the the endpoints 

## Technologies 
- Node.js
- Express.js
- Mongodb

## Response Codes
```200: Success
201: Created
400: Bad request
404: Not found
403: Forbidden
409: Conflict
401: Unauthorized
```

## Endpoints and Requests

|Endpoint | Request | Description|
|:-------:| :------: | :---- |
| /signup | POST | The response body should send an email and password { “email”: “foo@bar.com”, “password”: “12345”,} and if a user is created expect a successful response http status of 201   |
| /signin | POST | The response body should send an email and password and a http status of 200 |
| /users/me | GET | Return information about an authorized user ```Content-Type: application/json, Authentication: Bearer “token” ```|
| /users/me | PATCH| Update user info |
| /users/me/avatar | PATCH | Update an avatar |
| /cards | POST  | Create a card |
| /cards | GET | Return all cards from the database|
| /cards/:cardId | DELETE | Delete card by id |
| /cards/likes/:cardId | PUT | Add likes |
| /cards/likes/:cardId | PUT | Remove like |


## Acknowledgement
This API was created as a part of the Practicum by Yandex curriculum
