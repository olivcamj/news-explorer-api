# News Explorer Api

Backend for **news-explorer-api** 
<!-- domain name www.api.explorethenews.students.nomoreparties.site -->

Quick link to [FE](https://github.com/olivcamj/news-explorer-frontend)

## Description

The user will be able to create a user account, log in and log out, save and delete articles, and view their saved articles.

## Instructions (to run locally) 

- Clone this repo
- Run the dev script `npm run dev`
- Use [Postman](https://www.postman.com/downloads/), [Insomnia](https://insomnia.rest/), or even the [Thunder Client](https://www.thunderclient.io/) ext. on VS Code (or any other of your favorites) to test the endpoints 

  <br/>

> [!NOTE]
> First, create a user and then check out the endpoints below

 <br/>
  

  <details>
    <summary> 👀 How to create a user?</summary>
    <br />
   <p>Check below for a <a href="#endpoints-and-requests">table</a> that contains all endpoints and routes for this project.</p> 
    <img width="470" height="317" alt="Use Postman Client to create a new user account." src="https://github.com/user-attachments/assets/4af31083-e58d-48be-ab59-00f47fab7d15" />
    <p>Here we are using the <code>/signup</code> route, and inside Postman (or your choice of API client), we add the name, email, and password in the request body for our test account.</p>
    <p>Then, we will sign into the newly created account (switch route to <code>/signin</code>) and ensure that we grab the Bearer Token.</p>
    After sending the authentication request, the API's response will appear in the response section of Postman. Look within the "Body" tab
   
<img width="330" height="354" alt="Your Bearer Token would be located here in the response body using Postman client tool" src="https://github.com/user-attachments/assets/c4e6b2c4-dfc6-41f4-b73f-dbebf8825f24" />


<strong>Now</strong>, to use <em>any</em> of the endpoints, you will need to make the request with the Bearer token. 
Copy your token and paste it into the authorization or  header section of your request.

An example of retrieving user account info on Postman ✨ see image ⤵️.
<img width="872" height="340" alt="Screenshot 2025-07-22 at 11 57 33 AM" src="https://github.com/user-attachments/assets/3deb9a64-c30e-4e29-98e0-f9e9a150b252" />
  </details>


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
| /signup | POST | The response body should send an email and password { “email”: “foo@bar.com”, “password”: “12345”,} and if a user is created, expect a successful response http status of 201   |
| /signin | POST | The response body should send an email and password and an HTTP status of 200 |
| /users/me | GET | Return information about an authorized user ``` Content-Type: application/json, Authentication: Bearer “token” ```|
| /users/me | PATCH| Update user info |
| /articles | POST  | Create a card |
| /articles | GET | Return all cards from the database|


## Acknowledgement
This API was created as a part of the Practicum by Yandex curriculum
