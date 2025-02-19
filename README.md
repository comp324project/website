## Website Updates

See notes below for update messages.

#### 📍 Adrian, 02-19
I began working on the data store. There's a new folder for the DB connection files.

- job-data.py = data loading and cleaning
- mongo-connect.py = script for connecting DB using python driver (empty right now, will be creating Atlas-MongoDB account under this gmail so everyone has access)
- jobs_cleaned_02-19.csv = current version of data to import into MongoDB

I also created the presentation under this account in Google Slides. It's titled "Dev Week Demo". I am claiming the slides for the Overview & Data Description. Feel free to add your name to the speaker notes if you want to claim/work on that slide for the presentation.

#### 📍 Myles, 02-15
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
