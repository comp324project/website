## Website Updates

See notes below for update messages.

#### 📍 Adrian, 02-24
- MongoDB Atlas Cluster "Applique" is created. You can access through bookmarks & login is the same email/pw.
- Historical data cleaned to CS-specific jobs.
- .py and .csv both updated in /data

#### 📍 Alyssa, 02-24
Added HTML file for master resume input, implemented a way to add additional text field, and remove text field. As for now, the submit button only outputs the resume as is. Also added a JS file along it, called resume.js, which is used for buttons.

#### 📍 Alex, 02-23
Worked on css file, changing the background color and font styles. I think we should maybe reorganize the page and have things be more centered, but that's just an idea.

#### 📍 Adrian, 02-19
I began working on the data store. There's a new folder for the cleaned data (csv and .py file).

Files added:
- job-data.py = data loading and cleaning

Data:
[raw data - Kaggle](https://www.kaggle.com/datasets/arshkon/linkedin-job-postings)
- jobs_cleaned_02-19.csv = current version of data to import into MongoDB
  - current cleaned file is ~400MB. This is too large to store on GitHub. I can either have a remote link to keep the full dataset (I've never done this & not sure how it would affect DB access/connection) OR we can decide to clean the data to narrow the scope to CS-related jobs. The dataset currently includes positions for like Walgreen's managers, but we could prune it down to just Data Science, CS, and Engineering jobs. This would get the dataset to under 100MB limit for storing on GitHub.

Note: I've connected MongoDB with python as a driver before, so may need someone to hop on and assist with the database connection through JS since that's a new language for me. We can talk about this during our meeting this Friday. I will go ahead and create the Atlas account so we can work together on the connection.

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
