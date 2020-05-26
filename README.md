# DGAA - Disc Golf Anytime Anywhere
Welcome to the DGAA! DGAA is an application that allows users to search for disc golf courses, view details about the course, and play a round at a course! Users can view hole details and log stroke information as they proceed the course.

API Setup
From the back-end directory, run the following commands to set up and start the server:

$ bundle install            # Install gems
$ rails db:migrate db:seed  # Migrate and seed
$ rails s                   # Start the server
A full list of available routes can be found by visiting http://localhost:3000/rails/info/routes.

Start Up Front End
From the front-end directory, run the following command to open up the app in the browser:

$ npm i & s   

# Welcome
The Welcome page displays a log in form for returning users, and an option to sign up and create a new account for new users. An account is required to access the rest of the application. 


# Account Home
The account home page displays a map with the user's account address centered in the map box. The map also displays markers for each disc golf course. Clicking on a marker will render the course details. The course details include course name, address, rating, amount of holes, a link for more course details, and a start new round button. There is a filter for the map in the bottom right corner. A user can filter the map by course name, city, and/or zip code. The bottom left is the player card. This displays all the user's information. The user can update their player information here or update their password. A password change requires the current password for a successful update. A user aquires followers when another user starts following them. If a user has +20 followers they are considered certified. A trophy icon will be displayed next to their total followers. 

# DGAA Game Play
A game is started when a user clicks the start new round button on the course marker pop up. Once the game is started, a user will be redirected to the game page. The left container displays a course photo along with the course name. The right container contains hole information and stroke input for the user. Some holes may have up to 3 tee options. If a tee doesn't have a length then the tee option will not be available. A user is requried to select a tee option and enter a number for the amount of strokes if took him or her to complete the hole. Once information submitted, the next hole will render. The user's current standing in displayed in their stroke input container. The bottom container displays all past hole score cards. A user can keep track of their round scores as they progress through the course. Once all holes are complete, the user will be redirected to the Account Home. A message will display how the user performed and notify the user that they may view their past scorecards in the statistics page. 

# Statistics
The left side displays the most recent course played for the current user. The right side displays some analytics about the user's game play along with the option to view all past score cards. Some of the analytics include total courses played, total holes played, average score per round, average amount of throws per hole, and average difference for each hole. 

# Followers
A user can follow and unfollow other users here. A user can browse through all users to search for friends or by using the search feature. A user with +20 followers is considered DGAA certified. 

Thanks and a little more about the App

Front-end: 
- Javascript
- React
- Redux 
- HTML 
- CSS 

Back-end: 
- Ruby on Rails
- PostGres

API's and Libaries:
- DG Course Review for all course and hole information https://www.dgcoursereview.com/api.php
- Random user generator https://randomuser.me/
- Geocode https://www.npmjs.com/package/react-geocode    
- Leaflet https://react-leaflet.js.org/
- Semantics UI React https://react.semantic-ui.com/
- Font Awesome  https://fontawesome.com/icons?d=gallery
- Sketch  https://www.sketch.com/ 
- md5 https://www.npmjs.com/package/md5
- sweet alerts https://sweetalert.js.org/guides/

Thanks for playing and checking out the app! Hope you enjoyed it! 
(DGAA only includes disc golf courses in NY for testing purposes...)

---GC3