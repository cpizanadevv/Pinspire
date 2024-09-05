# Pinspire

Pinspire is a partial clone of the popular website Pinterest, created as part of a collaborative group project. Pinterest is known for its intuitive platform, designed for discovering and sharing creative ideas through visual content. Our team was inspired by Pinterest's clean and user-friendly interface, which makes exploring content engaging and seamless. We aimed to replicate the fluid layout, infinite scrolling, and core features like saving pins and organizing them into boards, all while ensuring the design remained visually appealing.

## Live Link

https://pinspire.onrender.com/

## Tech Stack

#### Frameworks | Libraries | API

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![Pexels API](https://img.shields.io/badge/Pexels-05A081?style=for-the-badge&logo=pexels&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon&logoColor=white)

#### Database

![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)

#### Hosting

![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

## Index

[Featurelist](https://github.com/cpizanadevv/Pinspire/wiki/Feature-List) |
[Schema](https://github.com/cpizanadevv/Pinspire/wiki/Schema) |
[User Stories](https://github.com/cpizanadevv/Pinspire/wiki/User-Stories)

### Landing Page

image

### User's Boards Page

image

### Board Page

image

### User's Favorites Page

image

## Endpoints

### Auth

**`GET /`**  
 Authenticates the current user.

**Successful Response:**

```json
{
  "id": 1,
  "username": "user",
  "email": "user@example.com"
}
```

**Error Response:**  
 HTTP Status Code 401

```json
{
  "errors": {
    "message": "Unauthorized"
  }
}
```

**`POST /login`**  
Logs a user in. Requires email and password. Returns user details on successful login.

**Successful Response:**

```json
{
  "id": 1,
  "username": "user",
  "email": "user@example.com"
}
```

**Error Response:**  
 HTTP Status Code 401

```json
{
  "errors": {
    "first_name": ["This field is required."],
    "last_name": ["This field is required."],
    "email": ["This field is required."],
    "password": ["This field is required."]
  }
}
```

**`POST /signup`**
Creates a new user and logs them in. Requires username, first name, last name, email, and password. Returns user details on successful signup.

**Successful Response:**
```json
{
  "id": 1,
  "username": "user",
  "email": "user@example.com"
}
```

**`GET /unauthorized`**
Returns an unauthorized error JSON when authentication fails.
```json

```

**`GET /logout`**
Logs the user out. Returns a success message.
```json

```

### Boards
**`GET /`**
Retrieves all boards.

**Successful Response:**
```json
[
  {
    "id": 1,
    "name": "Board Name",
    "private": true,
    "pins": [
      {
        "id": 1,
        "img_url": "http://example.com/image.jpg"
      }
    ]
  }
]
```

Error Response:
HTTP Status Code 404

```json
{
  "message": "no boards found"
}
```


**`GET /<int:board_id>`**
Retrieves a specific board by its ID.

**Successful Response:**

```json
{
  "id": 1,
  "name": "Board Name",
  "private": true,
  "pins": [
    {
      "id": 1,
      "img_url": "http://example.com/image.jpg"
    }
  ]
}
```


**Error Response:**

HTTP Status Code 404

```json
{
  "error": "no board found"
}

```

**`POST /create`**

Creates a new board. Requires board name and privacy status.

**Successful Response:**


```json
{
  "id": 1,
  "name": "New Board",
  "private": false
}
```


**Error Response:**

HTTP Status Code 400

```json
{
  "errors": {
    "name": ["This field is required."]
  }
}

```
**`PUT /<int:board_id>`**

Updates a specific board by its ID.

**Successful Response:**

```json
{
  "message": "board changes successful",
  "board": {
    "id": 1,
    "name": "Updated Board",
    "private": false
  }
}

```

**Error Response:**

HTTP Status Code 404

```json
{
  "error": "no board found"
}

```

**`DELETE /<int:board_id>`**
Deletes a specific board by its ID.

**Successful Response:**

```json
{
  "message": "Successfully deleted board 1",
  "boardId": 1
}

```

**Error Response:**
HTTP Status Code 404

```json
{
  "error": "board does not exist"
}

```
**`GET /<int:board_id>/pins`**

Retrieves all pins associated with a specific board.

**Successful Response:**

```json
{
  "Pins": [
    {
      "id": 1,
      "img_url": "http://example.com/image.jpg"
    }
  ]
}

```
**Error Response:**

HTTP Status Code 404

```json
{
  "error": "no board found"
}

```
**`GET /<int:board_id>/pins/<int:pin_id>`**

Retrieves a specific pin associated with a board.

**Successful Response:**

```json
{
  "id": 1,
  "img_url": "http://example.com/image.jpg"
}

```
**Error Response:**

HTTP Status Code 404


```json
{
  "error": "pin not found"
}

```
**`POST /<int:board_id>/pins/<int:pin_id>/create`**

Adds a pin to a specific board.

**Successful Response:**

```json
{
  "id": 1,
  "img_url": "http://example.com/image.jpg"
}

```
**Error Response:**

HTTP Status Code 400

```json
{
  "message": "Pin already associated with this board"
}

```
**`DELETE /<int:board_id>/pins/<int:pin_id>/delete`**

Removes a pin from a specific board.

**Successful Response:**

```json
{
  "id": 1,
  "img_url": "http://example.com/image.jpg"
}

```
**Error Response:**

HTTP Status Code 400

```json
{
  "message": "Pin not associated with this board"
}

```

### Favorites

**`GET /user/<int:user_id>`**

Retrieves all favorite pins for a specific user.

**Successful Response:**

```json
[
  {
    "id": 1,
    "pin_id": 1,
    "user_id": 1
  }
]

```
**Error Response:**

HTTP Status Code 403

```json
{
  "error": "Unauthorized access"
}

```
**`POST /<int:pin_id>/create`**

Adds a pin to the current user's favorites.

**Successful Response:**

```json
{
  "id": 1,
  "pin_id": 1,
  "user_id": 1
}

```
**Error Response:**

HTTP Status Code 400

```json
{
  "errors": "Pin already favorited"
}

```
**`GET /all`**

Retrieves all favorite pins for the current user.

**Successful Response:**

```json
[
  {
    "id": 1,
    "pin_id": 1,
    "user_id": 1
  }
]

```
**`DELETE /<int:pin_id>/delete`**

Removes a pin from the current user's favorites.

**Successful Response:**

```json
{
  "id": 1,
  "pin_id": 1,
  "user_id": 1
}

```
**Error Response:**

HTTP Status Code 404

```json
{
  "error": "Favorite not found"
}

```
### Comments

**`GET /<int:pin_id>/comments`**

Retrieves all comments for a specific pin.

**Successful Response:**

```json
{
  "comments": [
    {
      "id": 1,
      "comment": "Great pin!",
      "user_id": 1
    }
  ]
}

```

**`POST /<int:pin_id>/new-comment`**

Creates a new comment on a specific pin. Requires comment text.

**Successful Response:**

```json
{
  "id": 1,
  "comment": "Great pin!",
  "user_id": 1
}

```
**Error Response:**

HTTP Status Code 400

```json
{
  "errors": {
    "comment": ["This field is required."]
  }
}

```

**`PUT /<int:pin_id>/<int:comment_id>/edit`**

Updates a specific comment on a pin.

**Successful Response:**

```json
{
  "id": 1,
  "comment": "Updated comment",
  "user_id": 1
}

```

**Error Response:**

HTTP Status Code 404

```json
{
  "error": "comment not found"
}

```
**`DELETE /<int:pin_id>/<int:comment_id>`**

Deletes a specific comment from a pin.

**Successful Response:**

```json
{
  "message": "Successfully deleted comment"
}

```

**Error Response:**

HTTP Status Code 404

```json
{
  "error": "comment not found"
}

```
### Image Upload

**`POST /create`**

Uploads an image for a new pin. Requires an image file.

**Successful Response:**

```json
{
  "img_url": "http://example.com/image.jpg"
}

```

**Error Response:**

HTTP Status Code 400

```json
{
  "errors": "Invalid image file"
}

```
### Users

**`GET /`**

Retrieves a list of all users.

**Successful Response:**

```json
[
  {
    "id": 1,
    "username": "user",
    "email": "user@example.com"
  }
]

```
**`GET /<int:id>`**

Retrieves details for a specific user by their ID.

**Successful Response:**

```json
{
  "id": 1,
  "username": "user",
  "email": "user@example.com"
}

```
**Error Response:**

HTTP Status Code 404

```json
{
  "error": "user not found"
}

```

## Devs

[Carol Pizana](https://www.linkedin.com/in/cpizanadevv/)

[Penelope Yang](https://www.linkedin.com/in/penelope-yang/)

[Nicole Magallanes](https://www.linkedin.com/in/nicolemagallanes/)

[Nhat Ngo](https://www.linkedin.com/in/nhat-ngo-590823149/)
