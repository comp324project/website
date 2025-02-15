This is just a basic login and sign up page so far. I think we should plan out the homepage before we begin coding it.
Feel free to change styles, layouts, design, etc if you think something else would work better.
To launch the project:
make sure you have npm installed, it comes with Node.js
Run "npm init" to generate node_modules and package-lock.json
type "npm run-script devStart" to start the http server with express in server.js.
Go to localhost:3000 in your browser of choice to see the webpage.
It is using the nodemon package to apply webpage changes in real time.

The next step is to get MongoDB hooked up. 
The models folder is for our db schemas, 
the controllers folder interacts with our db,
the routes folder defines our API endpoints,
the config folder handles connection to the db.
-Myles