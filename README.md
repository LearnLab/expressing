# Express

## Endpoints

### Users/Authors

GET /api/users
Get a list of all users

POST /api/users
Create a user

GET /api/users/{user}
Get all recorded information from the user

PUT /api/users/{user}
Update the recorded information from the user

DELETE /api/users/{user}
Delete the user from the database (this action can not be undone)

### Subscriptions

GET /api/users/{user}/subscriptions
Get a list of the authors a user is subscribed to

POST /api/users/{user}/subscriptions/{author}
Subscribe a user to the latest publications from an author

### Publications

GET /api/
Get latest publications from all authors. Starts a publish/subscribe interface with the server.

GET /api/authors/{author}/publications
Get all publications from the author.

POST /api/authors/{author}/publications
Create a new publication for the author

GET /api/authors/{author}/publications/{publication}
Get the publication from the author

PUT,PATCH /api/users/{user}/publications/{publication}
Update publication from user

DELETE /api/users/{user}/publications/{publication}
Delete the publication

### Likes

GET /api/authors/{author}/publications/{publication}/likes
Get all likes for the publication

POST /api/authors/{author}/publications/{publication}/likes
Like the current publication

DELETE /api/auhtors/{author}/publications/{publication}/likes/{user}
Delete a like from an user given to a publication
