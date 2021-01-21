
# Pcon-Nodejs-Todo
This project was made to learn to create a nodejs server with different endpoints connecting to a database. This is a simple todo app with frontend made in React.
The server is hosted at https://pcon-nodejs-todo.herokuapp.com.

The base url for the rest api is 'https://pcon-nodejs-todo.herokuapp.com/api'

# Endpoints
1.  '/addNote' : Adds a note to the database (request method : 'PUT')

    E.g. The request body looks like 
    
    	 body {
	            "publicId":"192.168.0.1",
	            "title": "This is the title of the note 2",
	            "description": "This is the description of the note"
	           }
           
2.  '/getNotes' : gets all the notes in the database (request method : 'GET')

3.  '/getNote/:noteId' : gets the note with the associated id (request method : 'GET')

4.  '/updateNote/:noteId' : updates the note with the associated id (request method : 'PATCH')

    E.g. The request body looks like 
    
    	 body {
	            "publicId":"192.168.0.1",
	            "title": "This is the new title of the note 2",
	            "description": "This is the new description of the note"
	           }
           
5.  '/deleteNote/:noteId' : deletes the note with the associated id (request method : 'DELETE')
